import { create } from 'zustand';

export interface CartItem {
  id: string;
  variantId?: string;
  title: string;
  price: string;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  toggleCart: () => void;
  getCheckoutUrl: () => string;
}

const extractId = (gid: string) => gid.includes('gid://') ? gid.split('/').pop() : gid;

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  toggleCart: () => set(s => ({ isOpen: !s.isOpen })),
  addItem: (product) => set(s => {
    const existing = s.items.find(i => i.id === product.id);
    if (existing) return { items: s.items.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i) };
    return { items: [...s.items, { ...product, quantity: 1 }] };
  }),
  removeItem: (id) => set(s => ({ items: s.items.filter(i => i.id !== id) })),
  updateQuantity: (id, qty) => set(s => ({
    items: qty < 1 ? s.items.filter(i => i.id !== id) : s.items.map(i => i.id === id ? { ...i, quantity: qty } : i)
  })),
  getCheckoutUrl: () => {
    const items = get().items;
    if (!items.length) return '#';
    const urlStr = items.map(item => `${extractId(item.variantId || item.id)}:${item.quantity}`).join(',');
    return `https://state-of-resonance.myshopify.com/cart/${urlStr}`;
  },
}));
