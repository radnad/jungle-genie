export interface Product {
  id: string;
  name: string;
  slug: string;
  family: string;
  department?: string;
  category: string;
  subcategory?: string | null;
  priceEGP: number;
  salePriceEGP?: number | null;
  imageUrl?: string;
  gallery?: string[];
  photographer?: string;
  imageNote?: string;
  care?: {
    light: string;
    water: string;
    petSafe: boolean;
    size: string;
  };
  tags: string[];
  inStock?: boolean;
  isNewArrival?: boolean;
  description?: string;
}

export interface WishBundle {
  id: string;
  name: string;
  slug: string;
  wishLabel: string;
  plantIds: [string, string, string];
  bundlePriceEGP: number;
  savePercent: number;
  saveText: string;
  description?: string;
}

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  family: string;
  priceEGP: number;
  imageUrl: string;
  quantity: number;
  isBundle?: boolean;
  bundleLabel?: string;
}

export interface CartState {
  items: CartItem[];
  addItem: (product: Omit<CartItem, 'quantity'>, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

export interface WishlistState {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
}
