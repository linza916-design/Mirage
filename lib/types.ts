export interface Product {
  id: string;
  name: string;
  category: 'skincare' | 'makeup' | 'haircare' | 'fragrance' | 'bath';
  brand: string;
  price: number;
  rating: number;
  description: string;
  image: string;
  size?: string;
  inStock?: boolean;
  benefits?: string[];
  isWishlisted?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  imageAnalysis?: string;
  recommendations?: Product[];
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  rating?: number;
  shopProduct?: Product;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  type: 'price_drop' | 'shipping' | 'editorial' | 'invitation';
  image?: string;
}

export interface UserRitual {
  id: string;
  title: string;
  duration: string;
  type: 'am' | 'pm' | 'weekly';
  image: string;
  items: string[];
}
