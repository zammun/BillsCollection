import { create } from 'zustand';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    color: string;
    size: string;
    image: string;
    quantity: number;
}

interface CartStore {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string, color: string, size: string) => void;
    updateQuantity: (id: string, color: string, size: string, newQuantity: number) => void; // Added interface type
    clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
    cartItems: [],
    
    addToCart: (item) => set((state) => {
        const existingItem = state.cartItems.find(
            (i) => i.id === item.id && i.color === item.color && i.size === item.size
        );

        if (existingItem) {
            return {
                cartItems: state.cartItems.map((i) => 
                    i.id === item.id && i.color === item.color && i.size === item.size
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i
                )
            };
        }
        return { cartItems: [...state.cartItems, item] };
    }),

    removeFromCart: (id, color, size) => set((state) => ({
        cartItems: state.cartItems.filter(
            (i) => !(i.id === id && i.color === color && i.size === size)
        )
    })),

    // Added quantity updater action
    updateQuantity: (id, color, size, newQuantity) => set((state) => ({
        cartItems: state.cartItems.map((i) =>
            i.id === id && i.color === color && i.size === size
                ? { ...i, quantity: Math.max(1, newQuantity) } // Lower boundary lock at 1
                : i
        )
    })),

    clearCart: () => set({ cartItems: [] }),
}));