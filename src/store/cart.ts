import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

// Helper function to read the cookie securely on the client side
const getCookie = (name: string) => {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
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
        
        // Build the base Shopify Cart Permalink
        const urlStr = items.map(item => `${extractId(item.variantId || item.id)}:${item.quantity}`).join(',');
        let checkoutUrl = `https://state-of-resonance.myshopify.com/cart/${urlStr}`;

        // Check if the user has a Collabs discount code saved
        const discountCode = getCookie('discount_code');
        
        // If they do, append it to the URL!
        if (discountCode) {
          checkoutUrl += `?discount=${discountCode}`;
        }

        return checkoutUrl;
      },
    }),
    {
      name: 'sor-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
