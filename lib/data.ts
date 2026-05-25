import { Product, CommunityPost, Notification, UserRitual } from "./types";

export const products: Product[] = [
  {
    id: "azure_renewal",
    name: "Azure Renewal Oil",
    category: "skincare",
    brand: "Lumina Beauty",
    price: 84.0,
    rating: 4.9,
    description:
      "A sleek, modern glass serum bottle containing dynamic botanical extracts. Ripples of clear hydrators restore moisture barrier on pale stone textures.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDDIlzwGocn0xjpJ9JLo9z5CiENKih21PLOAZMFPE39LE7lsHC7V3sO6Cv6EZNfpZi5ddwp6AYihnLVzLwsCXdZ6anwyP8wrLNLIegLpAOQGLueEY-LPpON2-jyDEsIOIhquVQPWHKDmidTrcCsLhxlQPdRPVm7hdwkD8OC4NJPJybUISz-_gkHfHvZoYDjdeZ9wxoQuZ-zuhVyT5zT1lEwRbwHqjEAI6YOP5gj_smvPke-ILCW1EZYeLkpofo1Sq81o2XHfEEfnS0",
    size: "30ml",
    inStock: true,
    benefits: [
      "Intense cellular hydration",
      "Neutralizes environmental stress",
      "Repairs surface lipds",
    ],
    isWishlisted: true,
  },
  {
    id: "velvet_mask",
    name: "Velvet Hydration Mask",
    category: "skincare",
    brand: "Mirage Exclusive",
    price: 120.0,
    rating: 5.0,
    description:
      "A luxury face cream in a weighted glass jar with a gold lid, resting on a velvet peach surface. Soft-box lighting creates gentle highlights.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDtmJQy5VXGMP5Pp12ofZO4Yiy4S_RDpT9tNnJhugd4ZAD6VSBjiDjaDGrualPWhzfLzlp3pHGfwUT6-K0_4mnW_D-zlS2E6h6CSk4P-aF4Z6_3ZzJadHk2SjfAcJHolxLXuDR_4HZTF5WyOb7EVU93JxAE114OvJIKtCnrJJWLY9fSOAbX40MeKi831XfQx_W1w15rsc37ptw3GmK5lncxBMjOl3wHTkpNfimRz3zzvj0t5fYdOmYD6nIimrg0jIuaMOCMRRDX39Y",
    size: "50ml",
    inStock: true,
    benefits: [
      "Deep plumping action",
      "Plush, comfortable overnight wrap",
      "Imparts soft glow",
    ],
  },
  {
    id: "luminance_eye",
    name: "Luminance Eye Serum",
    category: "skincare",
    brand: "Ora Labs",
    price: 95.0,
    rating: 4.8,
    description:
      "A minimalist eye serum bottle standing amongst soft-focus white flowers. Translucent fluid and background blur.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDMVOxV0PkcS5OUX2GHvIGIbMArg6Coo9cpGUZtJNKJYKHSZL3Hj6b90KuA0MEiZwf9UnKdEQu8vVrPcH4AHWg2e6A-C8IXxBMBQBL3hR7n0KYdgd6iaskmoqvgr6_FEQWAd4aDYaIWshx78JrRTWBr77_wjm5ZfRDWtH9Xrt_aS4RmzAFvLi-AX7UalrIRF3vCyxEz9UsQ6DFwNdeeHMLiiv5x1v6tM7IPwb5vXFYjI32inhv_kZprprOCnCY7g8i4-6UZDdhklXU",
    size: "15ml",
    inStock: true,
    benefits: [
      "Reduces dark circles",
      "Smooths fine lines",
      "Refreshes fatigued eyes",
    ],
  },
  {
    id: "midi_oud",
    name: "Midnight Oud Essence",
    category: "fragrance",
    brand: "Limited Edition",
    price: 315.0,
    rating: 4.9,
    description:
      "An artisanal hand-crafted ceramic fragrance vessel with a minimalist matte black finish. Bathed in ambient golden light.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDLRRgkCTO4SLKH-katYZkzm8BeCCRelbNNPxZE-lS4crTGiwSTb8zoFlyjY5KWXnSVD1yiGI4avSoGyqjmPRi6GAkEjxJ6j2zpHa_x3zL3Y2vcCqKlB_nSV3Q2wNp0t7uPZMJ7uOP36iPiW3kVtKKBZZdEKbcuF7dgr2_lQFPpDRk1DQqD_KJbrqCujdfJiB6KnTZY_fsNjueGBVDR66wb_98ESf-W3Ar0RAXyjqVoBfZAtPUDz4Ovs0uMm5DDdTW7dwXro8d87Mg",
    size: "100ml",
    inStock: true,
    benefits: [
      "Sophisticated and seductive notes",
      "Sulphur-free clean extraction",
      "All-day projection",
    ],
  },
  {
    id: "silk_scarf",
    name: "Silk Mirage Scarf",
    category: "makeup",
    brand: "Mirage Luxury",
    price: 420.0,
    rating: 5.0,
    description:
      "A luxury silk minimalist scarf draped elegantly over a sculpted white marble bust. Warm champagne gold tone and soft editorial shadows.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDTkFRMJTQNws6rnYRLdVGZ9phaAHTyFLQkGLvXIP4qFPyAwGp-h8IISrxOGEkK6HBl7stTcKyOlR8bEfRFFWioLoYYs44Cm9Cgzqqgh32Jxl1vB011_C6at5uCPscCifxyVkWSSGCYnCFw6-TXGnmrDXe_X_RbG75TbngV5ivfbU0H8SzrwTemR9at0NBTN7aU7MLEhBfIVt9Gc8hxUEn6_9Qi3XOVpI15MohOgv4mAHnvXfzecL4f1KhLyPeEPr2cZNVILOcsvFs",
    size: "OS",
    inStock: true,
    benefits: [
      "Pure Mulberry silk",
      "Hand-rolled edges",
      "Atmospheric shimmer",
    ],
  },
  {
    id: "chroma_palette",
    name: "Chroma Palette",
    category: "makeup",
    brand: "Lumina Beauty",
    price: 150.0,
    rating: 4.7,
    description:
      "A professional makeup palette with diverse shimmering and matte shades. Employs a dark, warm editorial charcoal background.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAGk8bSkKtri7h8EKoYseOrHWaV5vYNEPNAw6bWvku0Y7yR-a_UU3fJFbea3lsIOfpEVEuSKKDjUM_l2GxhvfgvvJz0LwIZhYxEXI9BF4186ZSOA3iFLP4f4Oe-wjIG2Dc-LqrIwmG8LtLpkzaavuXp5VPx44oX89p6ThU6-OdE73sIEcB6O29JtlsJQGdTVc2yNfnParKRzzavsut_z0HhybJNdrIMjw9Finh95YG0_Mw1jK-HIcwK6PFMtNy0OfBvtJfyBAFokNg",
    size: "12 Shades",
    inStock: true,
    benefits: [
      "Buttery high-impact powders",
      "Crease-free wearing formula",
      "Complementary warm tones",
    ],
  },
  {
    id: "gold_lipstick",
    name: "Satine Gold Lipstick",
    category: "makeup",
    brand: "Mirage Exclusive",
    price: 48.0,
    rating: 4.8,
    description:
      "A macro shot of a single lipstick in a luxurious gold casing with soft, delicate reflections.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDQv0aAdQmkWo5FmdDNyjSGkpbsh_omlw8dEFYTiqBfUVAy1VmQQqpPWPSF9eUdv83KqAE0OCLEDSu-JCPntFhPGO54ODTCymV-jUnEdTRj7CLUxxsOtlw6gzbQGIkYEKp5Ia0GCmRmCeyY2c7xyRwVtr-J7BAyt0fkcSmOUGXiToFJwW76C4mKevigDKO5DIZhW7ytUABU_dyLKwx8cyFZJD9g-SS64UaZOEN8UNG3HNYWn50ena1r5l32jQAhPOmxbXKOkpvCvZE",
    size: "3.5g",
    inStock: true,
    benefits: [
      "Enriched with peptide complex",
      "Satin finish",
      "Smooth continuous moisture",
    ],
  },
  {
    id: "sculpt_night",
    name: "Sculpting Night Serum",
    category: "skincare",
    brand: "Noire Essence",
    price: 95.0,
    rating: 4.9,
    description:
      "A sleek black obsidian bottle paired with an advanced facial tightening liquid.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA177W9a7TL0g3nKB3sHuioPmoNyZZZra6g-Tlr_Iq61_TrSZijD9BpAYNANFTIxIb8QvqJOIL-U6GevrKuS88BmKUtPtz00EzRbUNia70i-jLhwkFiq7McqflFe55JdGHdY_tm8m5fkXc7b8-6W1UglxI-bzupYpGrwI6DBrH2g2o-2Lr2ouCVpF09mgZ7QgfZI_DtDC4oQfOPrmT0NDYHXPd3XTwJtNmXib0yFi-UC0Fr2ImhEmsW-WzG5rg15jRPO-qq_aa4pyM",
    size: "30ml",
    inStock: true,
    benefits: [
      "Intensifies nocturnal renewal",
      "Tightens skin contours",
      "Smooths skin surface",
    ],
  },
  {
    id: "botanical_mist",
    name: "Botanical Revive Mist",
    category: "skincare",
    brand: "Aura Bloom",
    price: 45.0,
    rating: 4.6,
    description:
      "A delicate frosted glass spray bottle for face mist set against a dappled tropical greenery environment.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC6J4l_pyREQ2N1JODpxwkCF_PWtX2291CZ6PcPSk1i5tKMGGVofdbIWhTJPmu17T5VOrJzAQ8I-6wcZ4AZUqnY6TdtCehkoDqZznY-ehT94el1zAKSQiFN-hOhUkx0zG0hk6KOpfDC56nlezhm550BVrEU8ewZs8zAlH7oALa5dH4OsUUYBoD6KIjogQjpJFse1hnvTZYMzsicGmAhB8kjZB6O4o6wq2aIUhYpuzCT4_D0YzpY4Abo7uuhgVpY1_iYBlBoSSxT9yw",
    size: "100ml",
    inStock: true,
    benefits: [
      "Instantly calms irritation",
      "Supercharges skin barrier",
      "Dewry editorial finish",
    ],
  },
  {
    id: "gold_cuff",
    name: "Linear Gold Cuff",
    category: "bath", // mapped to complete the look
    brand: "Mirage Fine",
    price: 195.0,
    rating: 4.9,
    description:
      "A macro shot of a sleek gold-plated cuff bracelet resting on textured warm linen.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCmuEVZWhY1gJTsfuVd6IkiCFf9aTlRwcHWIf1noGJaE8UVf6lpiIkIGIxqmFuJrwtzAu2WGsDrOVs3azncv5o5tqBVc4C0q0OInjJ6r7dygBPqZ8T8MeTCRJK_zMUBCqrXVgANUNJY3j3nb_H6jCYAs3d1VqFG8mM7xVjUN4-rIVOILHvrKuMztZfd8bAacMtK8z3xcSeb8JyuSWM9QrZMG5WaOqNQ6vbsTyGkwZiR-KA_lckI7FM_1f_mI1OCGeJRZC-p1OXtm1E",
    size: "One Size",
    inStock: true,
    benefits: [
      "24k gold-plated",
      "Fluid architecture styling",
      "Ultra luxe presentation",
    ],
  },
  {
    id: "silk_blouse",
    name: "Oversized Silk Essence Blouse",
    category: "makeup",
    brand: "Editorial Looks",
    price: 280.0,
    rating: 4.9,
    description:
      "A volumetric white silk blouse draped elegantly, designed for those who admire the quiet intensity of luxury.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAqoQzvO1BLTXc06zwIUhqvj1NDIQ3ZNvBKQuQ8BD9dbvoGJJ6LURndMS7iLLmNhnKmOJY7ZBRMUmGSTEASa0ISxcIksY2c9Zsxqls8V7v7K465EsLl8Q72fWxaQxcAELfxPJPOAlxoPrwJV8ASmarnKtuBxFYq4ffMlGIJvq_hlQzidGE_mCHyo1rNJpq0jU4zoi8vm20miMxK9kgobt5ina50O7pvHBERv835UMPDcW3hcx422nNadAM912RRiQ-JEilLDRamRN8",
    size: "S/M/L",
    inStock: true,
    benefits: [
      "100% fine organza-weave silk",
      "Soft breathable structure",
      "Luxury drape contours",
    ],
  },
  {
    id: "sculptral_vases",
    name: "Sculptural Form Series 02",
    category: "bath",
    brand: "Limited Atelier",
    price: 450.0,
    rating: 4.5,
    description:
      "Geometric luxury clay vessels resting on frosted glass with delicate shadows.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDaIPJDtZrzUC_8yCyJGs0y1Qod8oTlE1awEm4HQMKQLEcufGJYvVnVS4cJyQHnoL0mivmJrYs4yt0w1bc016s2Nf6wqowX2MrghPhq62Gt3QIepETctV-abGqtmwEEBU3uGBEZ1zmzblgYYzNJNCbeDKNviFwaHgZ1mcOyQ9F-K6t5WDZ8MnRhSO9NDic93HKNkvGZqh0I7tz3AXePX6Ywu87vpBVV3RNlKGTLwM3QGtdREmxoM0iGwMgkPsGIBUKuDVZNEgHQ6pk",
    size: "Set of 3",
    inStock: true,
    benefits: [
      "Unique organic textures",
      "Sophisticated clean design",
      "Lustrous warm accents",
    ],
  },
];

export const mockPosts: CommunityPost[] = [
  {
    id: "post_1",
    authorName: "Elena Rossi",
    authorHandle: "@elara_rose",
    authorAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA2tA1-TQqXmB-NLVd3VrbQpv1LEqp2tgic4wX6YULpkZwdPmuD87PCM7f4ZrD_xyzodWtWzzJp7CiJwc7kWfvyUYuwToBhQbil-MJN-znNsPa87YsuWRiFSA2uji1X9CfVlNkCnAjmiotc8PkZGmvzPucc2jfw4c2rqrseGPMn9LkRyUDAGIlkdKt-isfIWUDFy9Ums-6ZbIYOlA6gw8Y_GiHlGBNglkphNx_AnHJ6WjRAFnJlClkeXPhKr6pafzbG7pjQCqUsa3M",
    content:
      '"The Lumière Serum has completely transformed my morning ritual. That elusive lit-from-within glow is finally achievable in just minutes of application. Perfect for keeping a soft luxury vibe."',
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD5fLNZCTnAFvOSW7lzHhvAOJJDze5nN38AypBSH9vdBiMKZtpFdeQPak3Ux8Z6_XxmlzC7GhjdpKLL5Q5wVwbi2ZaRhNUSM_iJU73WKtDI6M9ViJyUJPeGKs6QFnBPCMlL40pg3yBn-zpzsHn6HeejZ_I8x0YfPEjLwdCml8Prr1grmdkpdSNMUIdJ-CNWXIAH-dquGC0l0-UQ9VhvusvftNBNNCKIUQojH9nqiw_H5q28bunQarEHTv6NvvL9EFX7zeUv5gtx3xs",
    likes: 1200,
    comments: 48,
    timestamp: "2 hours ago",
    rating: 5,
    shopProduct: products[0],
  },
  {
    id: "post_2",
    authorName: "Julian S.",
    authorHandle: "@julian_s",
    authorAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBfKELN0dRFzPkbcZybGMcU2GMPU22WmFOE43t_klnc6LrgmoKU71_Ln2MUZH85BJ40za96ALzts2WJg2v9YApY3v2RLL95zVVxHEbVyLqjER3juUXiHGJ4Yea-f2tsSB5-0iIwHmA77d6aTujSjdbzOk88XdfAyJbzb5SiFJNdu3IUjgpsBe7BPScF5aPi5ar5NumR5CrruxH8UCLq6t21SYLG0gzLn3_L7EjTRrXPxxwlpaavE0QEKrS7R5TfA48wyNcpw9ZQmSw",
    content:
      "The complexity of Midnight Oud is unmatched. It opens with sharp crisp citrus and settles into a warm, woodsy embrace that lasts through the entire evening. Truly a signature luxury scent.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD-_5Cu1KYHv-DLefGyhHNuXk3e6unpDt0CUdsYz-Zy6uuz1eMsh8h936eOig_vQj-icDu3EoawB7q34vtDeBQHPcLxWF5DqkIwauR8isbytD43kNZTV0vL2AHC8gNoczMrt03w4iykkUkeQ9HHJk2NKKZrS5Ulaw0nnToWu8hpmko6d6yC3vJklBsp9lD9e3L6MV-LUVBxeyXQaNHG8chrWtUrrob5w8emozqok0WxPQbgsI4XCIWKNnjVXHKGg-EM6Vc9yNmwOKc",
    likes: 856,
    comments: 12,
    timestamp: "4 hours ago",
    rating: 5,
    shopProduct: products[3],
  },
  {
    id: "post_3",
    authorName: "Sophie Wellness",
    authorHandle: "@sophie_wellness",
    authorAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDBWQAIaU29PGQiynpfh84oNwABmW8AuHogJuBtl9uG96fvgWUYiZltmTeeHXjIET1CogjTXtEhpWAoRG2U7t-J6iG2xd00yof3tSLpJtWeunleyyQZsF91xP3_5XswBMvz8d90P1MJMSwe-Ebyq5O26vozatYjLPsOejfGMPN_Hs9ZSpD3WeTfOA74rUgUk1BB0_Qd0g15gsyB6_uMg4hLyDQgn5MyJ1l0E7lfADxo3tKwjIA8eebYFQSPSl2Xt5R41vpvZ7PTYE4",
    content:
      "Restocked on my favorites! The glass jars look spectacular alongside my vanity items. #MirageSkincare #MinimalistRoutine",
    likes: 312,
    comments: 5,
    timestamp: "Yesterday",
    rating: 4,
  },
];

export const mockNotifications: Notification[] = [
  {
    id: "notif_1",
    title: "Price Drop on your Wishlist",
    description:
      "The Silk Radiance Foundation you loved is now 20% off. Secure your custom shade.",
    timeAgo: "2h ago",
    type: "price_drop",
  },
  {
    id: "notif_2",
    title: "Order Shipped",
    description:
      "Your MIRAGE signature package #MRG-8829410 is on its way. Estimated arrival: Tomorrow.",
    timeAgo: "5h ago",
    type: "shipping",
  },
  {
    id: "notif_3",
    title: "New Beauty Trend",
    description:
      "Discover 'Glass Skin' secrets. Aura curated the ultimate routine for a cinematic dewy glow.",
    timeAgo: "Yesterday",
    type: "editorial",
  },
  {
    id: "notif_4",
    title: "Private Invitation",
    description:
      "Elena, you are invited to the MIRAGE Atelier in New York. Book your 1-on-1 skin consultation.",
    timeAgo: "2 days ago",
    type: "invitation",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDSQZmt9eY2jwhCVtpj3eEwlHgtZD0X25-91eaKw-oT_cQiLpu3ynnKHDqGCcZo_p2DPwXCw5r3YI3oM6p0dgm-xygCRJ2nFzHsy5USHCzAlQ4DeclkfENmKVcVCdjDj8aiIZyeskwlTX7u35HScozC3v7JPxK3Qq02MebkVERq0bh7Hw7n43-W1sx656x_NYl_dqUhHhWS7ks-rGd-CGKfy-y3yG6XmocGcoXUiN8ezF0VyDqLWABzZxtSsCFoCQ7y_dCAwbrWdAY",
  },
];

export const userRituals: UserRitual[] = [
  {
    id: "am_ritual",
    title: "Luminous Dawn Routine",
    duration: "6 mins",
    type: "am",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAtZOv65A8VFgRkqYZXp9aKABi8-ismswm4lxto6sXgLME3cqwY306DN4QU_kuXWR_YkSIuEQetlLmgDcKshJM3uDqO8_hF3ut44f5tXdCh_NuXdJI0uSPUWIbzVMuyTirEOrsjDQzXtW4OhPtop5F7LUyvSRQ82AwyaHuPTHQYy11EEQTxZ4IdlJxKC36mdeFhw5sH78K-2yUDujWbmeMMKyJgRigsAtVs4FfsIUBWKs8ekWkR7XXehKa8PXwx7UpAow83Tv9kqfM",
    items: ["Silk Milk Cleanser", "Radiance C+ Serum", "Velvet Shield SPF 50"],
  },
  {
    id: "pm_ritual",
    title: "Nocturnal Hydration Rest",
    duration: "9 mins",
    type: "pm",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBVFM8XVdHbP-rbUzI1YA3cFgtIasNPk--Md-hC5ZmL8vAQDb1cze4u7uT9mqZUZemqBV00TMAInavUGfjaOkXNRWgkF14ImEr5jDnP95vdwvmM0IF6LeVd2uIH0M7cnyBnIFLJC6nSm8f_Za5CKFn6QbCwlwxO2EoyMNKG3Cscua1ODYIPwSxz_T5iHi7YCpol0cbiZR3qBJK4DE18orNKTofPLkcXQtKEouRgW5u_3ROCTQ-xv4HuSm7_11k8HCmBFAJTpRv3z74",
    items: [
      "Double Oil Cleanser",
      "Retinol Night Repair",
      "Midnight Recovery Balm",
    ],
  },
  {
    id: "weekly_ritual",
    title: "Glow Rejuvenation treatment",
    duration: "20 mins",
    type: "weekly",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAXFysEKoxi41T1dMwSCSNJm_Ktv20ha1vn-eOCWp--3_4Qv7DHfXgA1HoGAreZVxmc-1z9E6-30DnSfEZYMeZAnnqzzwPHayBIuypP-bzJfefiRoiaT9kQJGtwNWEXodwYRCf53CwFmjIJFZ21uBiO8OT7xOC0Odr3YCuaLOMM_SC7KPY9Ldz_vMq-ZR-gVw6ux21yRXBTcyucxuottUuqc_hdhsAH70TdR_GBPEKAlroVJEbeY3zzwoCepBqjTOBHvFF6Ra4ozVs",
    items: [
      "AHA/BHA Exfoliant",
      "Deep Moisture Sheet Mask",
      "Jade Roller Massage",
    ],
  },
];
