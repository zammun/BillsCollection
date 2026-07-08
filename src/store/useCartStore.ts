import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../supabase'; 

export interface CartItem {
    id: string;
    name: string;
    price: number;
    color: string;
    size: string; 
    image: string;
    quantity: number;
    size_inventory: number;
}

interface CartStore {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string, color: string, size: string) => void;
    updateQuantity: (id: string, color: string, size: string, newQuantity: number) => void;
    clearCart: () => void;
    fetchCart: () => Promise<void>;
    syncToDb: (items: CartItem[]) => Promise<void>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
        cartItems: [],

        // Helper to sync to DB
        syncToDb: async (items: CartItem[]) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                await supabase.from('carts').upsert({
                    user_id: user.id,
                    items: items,
                    updated_at: new Date().toISOString()
                });
            }
        },

        fetchCart: async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data } = await supabase
                    .from('carts')
                    .select('items')
                    .eq('user_id', user.id)
                    .single();
                if (data) set({ cartItems: data.items });
            }
        },

        addToCart: (item) => {
            const state = get();
            const existingItem = state.cartItems.find(
                (i) => i.id === item.id && i.color === item.color && i.size === item.size
            );

            let newItems;
            if (existingItem) {
                if (existingItem.quantity + item.quantity > existingItem.size_inventory) {
                    alert(`Cannot add more. Only ${existingItem.size_inventory} of size ${item.size} available.`);
                    return;
                }
                newItems = state.cartItems.map((i) => 
                    i.id === item.id && i.color === item.color && i.size === item.size
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i
                );
            } else {
                if (item.quantity > item.size_inventory) {
                    alert(`Only ${item.size_inventory} in stock.`);
                    return;
                }
                newItems = [...state.cartItems, item];
            }
            
            set({ cartItems: newItems });
            get().syncToDb(newItems); // Sync to DB
        },

        removeFromCart: (id, color, size) => {
            const newItems = get().cartItems.filter(
                (i) => !(i.id === id && i.color === color && i.size === size)
            );
            set({ cartItems: newItems });
            get().syncToDb(newItems); // Sync to DB
        },

        updateQuantity: (id, color, size, newQuantity) => {
            const newItems = get().cartItems.map((i) => {
                if (i.id === id && i.color === color && i.size === size) {
                    if (newQuantity > i.size_inventory) {
                        alert(`Only ${i.size_inventory} items available for size ${size}.`);
                        return i;
                    }
                    return { ...i, quantity: Math.max(1, newQuantity) };
                }
                return i;
            });
            set({ cartItems: newItems });
            get().syncToDb(newItems); // Sync to DB
        },

        clearCart: () => {
            set({ cartItems: [] });
            get().syncToDb([]); // Sync to DB
        },
    }),
    {
        name: "shopping-cart-storage", // Unique local storage namespace key
    }
  )
);