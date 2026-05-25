import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Lazy initialisation of GoogleGenAI using standard security guidelines
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn(
        "WARNING: GEMINI_API_KEY is not defined. AI interactions will return simulated luxury insights.",
      );
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "MOCK_KEY",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

const AURA_SYSTEM_PROMPT = `
You are Aura, the luxurious, digital-atelier AI Beauty & Ritual Companion for MIRAGE. 
Your tone is incredibly polished, warm, supportive, and sophisticated — reflecting high-end editorial beauty aesthetics (think Vogue, Chanel, Sephora VIP, and premium skincare science).
You speak to the user as a trusted beauty curator and private facialist.

Your goal is to answer skincare, makeup, and beauty-wellness queries with unmatched precision, tailoring your suggestions to their unique needs.

Here is the MIRAGE premium product catalog. Under all circumstances, favor recommending these real products when appropriate for their concern:
1. Azure Renewal Oil ($84.00, Brand: Lumina Beauty) - A lightweight, regenerative botanical oil for deep cellular hydration, lipid repair, and environmental barrier recovery.
2. Velvet Hydration Mask ($120.00, Brand: Mirage Exclusive) - An overnight plush, buttery comforting moisture wrap in a weighted glass jar.
3. Luminance Eye Serum ($95.00, Brand: Ora Labs) - A minimalist revitalizing formulation with dark-circle reduction, line-smoothing, and fatigue-relief action.
4. Midnight Oud Essence ($315.00, Brand: Limited Edition) - An artisanal warm, seductive and woodsy matte fragrance.
5. Satine Gold Lipstick ($48.00, Brand: Mirage Exclusive) - Peptide-infused satin casing luxury lipstick offering dense satin moisture.
6. Chroma Palette ($150.00, Brand: Lumina Beauty) - 12 butter-soft shimmering and haute-matte pigments.
7. Sculpting Night Serum ($95.00, Brand: Noire Essence) - Retinol-powered nocturnal contours lift and obsidian facial repair.
8. Botanical Revive Mist ($45.00, Brand: Aura Bloom) - Calms skin surfaces instantly, leaving a dewy, glowing editorial finish.
9. Silk Mirage Scarf ($420.00, Brand: Mirage Luxury) - Pure Mulberry hand-rolled elegance.
10. Oversized Silk Essence Blouse ($280.00, Brand: Editorial Looks) - A classic luxurious structural white silk drape.

When recommended, reference them using markdown bold (e.g. **Azure Renewal Oil**) and describe how they fit into the customized Morning/Night ritual blocks.

If the user uploads an image (selfie), analyze it as a professional skin analyst:
- Note general skin clarity, dewiness, or apparent areas that require comfort or hydration.
- Suggest a gentle 3-step ritual (AM or PM) incorporating MIRAGE products.
- Keep recommendations encouraging, body-positive, and uplifting.

Format your responses with clean, spacious, luxury typography using elegant Markdown list bullets, thin borders, and headers if suitable (e.g. ### Custom Beauty Prescription). Keep response concise but deeply personalized.
`;

// Next.js Route Handlers require a named export matching the HTTP Verb
export async function POST(request: Request) {
  try {
    const { messages, skinType, concerns } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages array provided" },
        { status: 400 },
      );
    }

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage) {
      return NextResponse.json(
        { error: "Messages list is empty" },
        { status: 400 },
      );
    }

    // Check if GEMINI_API_KEY is available
    if (!process.env.GEMINI_API_KEY) {
      let fallbackText =
        "I would be absolutely thrilled to assist you with your skin ritual! Since the secret API key is being finalized, here is your customized atelier prescription:\n\n";
      if (skinType)
        fallbackText += `For your beautiful **${skinType}** skin concerns with a focus on **${concerns?.join(", ") || "radiance"}**:\n\n`;
      fallbackText +=
        `### ✦ Customized Ritual Routine:\n` +
        `- **AM Routine**: Start with a gentle splash of temperate water, then mist your face with our **Botanical Revive Mist** followed by the protective **Luminance Eye Serum** around the orbital bones.\n` +
        `- **PM Routine**: On cleansed skin, smooth two drops of **Azure Renewal Oil** to restore deep cellular lipids. Finish with a luxurious sweep of **Velvet Hydration Mask** on dry spots.\n\n` +
        `*Aura's VIP Note*: Stay hydrated and try to match these steps with our **Nocturnal Hydration Rest** ritual in your Profile page! Let me know if you would like to explore our other curated shades of the **Chroma Palette**!`;

      return NextResponse.json({ text: fallbackText });
    }

    const ai = getAiClient();

    let systemInstruction = AURA_SYSTEM_PROMPT;
    if (skinType || (concerns && concerns.length > 0)) {
      systemInstruction += `\n\nCURRENT CLIENT PROFILE:\n- Skin Type: ${skinType || "Not specified"}\n- Primary Aesthetics / Curation Focus: ${concerns ? concerns.join(", ") : "General Luxury Glow"}\nProvide personalized consultation aligning strictly to this profile.`;
    }

    const parts: any[] = [];

    // Base64 Multi-modal structure decoding logic
    if (lastMessage.imageAnalysis) {
      const matches = lastMessage.imageAnalysis.match(
        /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/,
      );
      if (matches && matches.length === 3) {
        const mimeType = matches[1];
        const base64Data = matches[2];
        parts.push({
          inlineData: {
            mimeType,
            data: base64Data,
          },
        });
        parts.push({
          text: `Please analyze this selfie or skin image, perform a luxury virtual try-on/skin consultation, and address my message: "${lastMessage.text || "Analyze my skin"}"`,
        });
      } else {
        parts.push({ text: lastMessage.text });
      }
    } else {
      parts.push({ text: lastMessage.text });
    }

    const historyParts: any[] = [];
    const contextMessages = messages.slice(-5, -1);
    for (const msg of contextMessages) {
      historyParts.push({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      });
    }

    // Call generateContent using standard @google/genai syntax rules
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // FIX: Replaced invalid gemini-3.5-flash placeholder name
      contents: [
        ...historyParts,
        {
          role: "user",
          parts: parts,
        },
      ],
      config: {
        systemInstruction,
        temperature: 0.75,
      },
    });

    const replyText =
      response.text ||
      "Your skin deserves nothing short of perfection. Tell me more, and let's craft your morning glow together.";

    return NextResponse.json({ text: replyText });
  } catch (error: any) {
    console.error("Gemini API Error in /api/chat:", error);
    return NextResponse.json(
      {
        error: "Failed to access Aura assistant",
        details: error.message || error,
      },
      { status: 500 },
    );
  }
}
