import { create } from 'zustand';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    color: string;
    size: string; 
    image: string;
    quantity: number;
    size_inventory: number; // The specific count for this size
}

interface CartStore {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string, color: string, size: string) => void;
    updateQuantity: (id: string, color: string, size: string, newQuantity: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
    cartItems: [],
    
    addToCart: (item) => set((state) => {
    const existingItem = state.cartItems.find(
        (i) => i.id === item.id && i.color === item.color && i.size === item.size
    );

        if (existingItem) {
        // FIXED: Check against size_inventory
        if (existingItem.quantity + item.quantity > existingItem.size_inventory) {
            alert(`Cannot add more. Only ${existingItem.size_inventory} of size ${item.size} available.`);
            return state; 
        }
        return {
            cartItems: state.cartItems.map((i) => 
                i.id === item.id && i.color === item.color && i.size === item.size
                    ? { ...i, quantity: i.quantity + item.quantity }
                    : i
            )
        };
    }

        // Check: Adding initial item exceeds limit (unlikely but safe)
        if (item.quantity > item.size_inventory) {
        alert(`Only ${item.size_inventory} in stock.`);
        return state;
    }

    return { cartItems: [...state.cartItems, item] };
}),

    removeFromCart: (id, color, size) => set((state) => ({
        cartItems: state.cartItems.filter(
            (i) => !(i.id === id && i.color === color && i.size === size)
        )
    })),

    updateQuantity: (id, color, size, newQuantity) => set((state) => ({
    cartItems: state.cartItems.map((i) => {
        if (i.id === id && i.color === color && i.size === size) {
            // Validate against the specific size inventory
            if (newQuantity > i.size_inventory) {
                alert(`Only ${i.size_inventory} items available for size ${size}.`);
                return i;
            }
            return { ...i, quantity: Math.max(1, newQuantity) };
        }
        return i;
    })
})),

    clearCart: () => set({ cartItems: [] }),
}));