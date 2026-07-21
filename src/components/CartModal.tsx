import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { supabase } from '../supabase'; // <-- Added Supabase import for auth check

interface CartModalProps {
    onClose: () => void;
}

const CartModal = ({ onClose }: CartModalProps) => {
    const cartItems = useCartStore((state) => state.cartItems);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const updateQuantity = useCartStore((state) => state.updateQuantity);

    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
    const [isCheckingOut, setIsCheckingOut] = useState(false); // <-- Added loading state

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleRemoveClick = (e: React.MouseEvent, itemKey: string) => {
        e.preventDefault();
        e.stopPropagation();
        setConfirmDeleteId(itemKey);
    };

    const executeDelete = (e: React.MouseEvent, id: string, color: string, size: string) => {
        e.preventDefault();
        e.stopPropagation();
        removeFromCart(id, color, size);
        setConfirmDeleteId(null);
    };

    const cancelDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setConfirmDeleteId(null);
    };

    // --- STRIPE SECURE CHECKOUT FOR MODAL ---
    // --- STRIPE SECURE CHECKOUT FOR MODAL ---
    // --- STRIPE SECURE CHECKOUT ---
    const handleCheckout = async () => {
        setIsCheckingOut(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            
            const currentUserId = user?.id || null;
            const userEmail = user ? user.email : undefined;
            const metadata = user ? user.user_metadata : null;
            
            // Extract shipping data if it exists in the profile
            const userAddress = metadata?.streetAddress ? {
                name: metadata.name || userEmail?.split("@")[0],
                streetAddress: metadata.streetAddress,
                city: metadata.city,
                stateCode: metadata.stateCode,
                zipCode: metadata.zipCode
            } : null;

            const lineItems = cartItems.map((item) => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: `${item.name} (${item.color} / ${item.size})`,
                        images: item.image ? [item.image] : [],
                    },
                    unit_amount: Math.round(item.price * 100),
                },
                quantity: item.quantity,
            }));

            const response = await fetch('/api/stripe-checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    lineItems,
                    userId: currentUserId,
                    userEmail, // Sent to backend
                    userAddress // Sent to backend
                }),
            });

            const session = await response.json();

            if (!response.ok || !session.url) {
                throw new Error(session.error || 'Failed to initialize secure checkout terminal.');
            }

            window.location.assign(session.url);

        } catch (error: any) {
            console.error("Stripe gateway routing engine exception:", error);
            alert(error.message || "An error occurred while executing checkout processes.");
            setIsCheckingOut(false);
        }
    };

    return (
        <div className="absolute top-14 right-0 w-[calc(100vw-24px)] max-w-sm sm:w-96 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white border border-gray-100 flex flex-col gap-6 z-[100] pointer-events-auto">
            
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Shopping Cart</h2>
                {cartItems.length > 0 && (
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-gray-900 transition-colors p-1 cursor-pointer"
                        aria-label="Close cart"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                )}
            </div>
            
            {cartItems.length === 0 ? (
                <div className="text-gray-500 text-sm pb-2 text-center font-medium">No items in cart</div>
            ) : (
                <>
                    <div className="flex flex-col gap-6 max-h-[50vh] overflow-y-auto pr-2">
                        {cartItems.map((item) => {
                            const itemKey = `${item.id}-${item.color}-${item.size}`;
                            const isConfirming = confirmDeleteId === itemKey;

                            return (
                                <div className="relative overflow-hidden rounded-xl min-h-[96px]" key={itemKey}>
                                    
                                    <div className={`flex gap-4 transition-all duration-300 ${isConfirming ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
                                        <Link 
                                            to={`/product/${item.id}`}
                                            onClick={onClose}
                                            className="w-20 h-24 bg-gray-50 rounded-xl p-1 flex-shrink-0 border border-gray-100 block hover:opacity-80 transition-opacity"
                                        >
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                        </Link>
                                        
                                        <div className="flex flex-col justify-between w-full">
                                            <div>
                                                <div className="flex items-start justify-between gap-4">
                                                    <Link 
                                                        to={`/product/${item.id}`}
                                                        onClick={onClose}
                                                        className="hover:text-indigo-600 transition-colors flex-1"
                                                    >
                                                        <h3 className="font-semibold text-gray-900 line-clamp-1">{item.name}</h3>
                                                    </Link>
                                                    <span className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                                <div className="text-xs text-gray-400 mt-0.5 uppercase tracking-wide">
                                                    {item.color} / {item.size}
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center bg-gray-50 rounded-lg ring-1 ring-gray-200/60 h-7 text-xs font-bold" onClick={(e) => e.stopPropagation()}>
                                                    <button 
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            if (item.quantity === 1) {
                                                                handleRemoveClick(e, itemKey);
                                                            } else {
                                                                updateQuantity(item.id, item.color, item.size, item.quantity - 1);
                                                            }
                                                        }}
                                                        className="w-7 h-full flex items-center justify-center hover:bg-gray-200/70 rounded-l-lg transition-colors cursor-pointer"
                                                    >-</button>
                                                    <span className="w-7 text-center text-gray-800">{item.quantity}</span>
                                                    <button 
                                                        disabled={item.quantity >= item.size_inventory}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            updateQuantity(item.id, item.color, item.size, item.quantity + 1);
                                                        }}
                                                        className={`w-7 h-full flex items-center justify-center rounded-r-lg transition-colors cursor-pointer 
                                                            ${item.quantity >= item.size_inventory ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'hover:bg-gray-200/70'}`}
                                                    >+</button>
                                                </div>

                                                <button 
                                                    onClick={(e) => handleRemoveClick(e, itemKey)}
                                                    className="text-gray-400 font-medium hover:text-red-600 text-xs transition-colors cursor-pointer"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`absolute inset-0 bg-red-50/90 rounded-xl border border-red-100 flex items-center justify-between px-4 transition-all duration-300 ${isConfirming ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
                                        <div className="flex flex-col gap-0.5 max-w-[55%]">
                                            <span className="text-xs font-bold text-red-900">
                                                Remove <span className="lowercase">{item.name}</span>?
                                            </span>
                                        </div>
                                        <div className="flex gap-2 flex-shrink-0">
                                            <button 
                                                onClick={cancelDelete}
                                                className="px-3 py-1.5 text-xs font-bold bg-white text-gray-700 hover:bg-gray-50 rounded-lg shadow-xs ring-1 ring-gray-200 transition-all cursor-pointer"
                                            >
                                                Cancel
                                            </button>
                                            <button 
                                                onClick={(e) => executeDelete(e, item.id, item.color, item.size)}
                                                className="px-3 py-1.5 text-xs font-bold bg-red-600 text-white hover:bg-red-700 rounded-lg shadow-sm transition-all cursor-pointer"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            );
                        })}
                    </div>

                    <div className="flex flex-col gap-4 border-t border-gray-100 pt-6">
                        <div className="flex items-center justify-between font-bold text-lg text-gray-900">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-gray-500">Shipping and taxes calculated at checkout.</p>
                        
                        <div className="flex justify-between gap-3 mt-2">
                            <Link 
                                to="/cart" 
                                onClick={onClose}
                                className="flex-1 rounded-xl py-3 px-4 ring-1 ring-gray-300 text-gray-900 font-semibold text-center hover:bg-gray-50 transition-all active:scale-[0.98]"
                            >
                                View Cart
                            </Link>
                            {/* Updated Checkout Button */}
                            <button 
                                onClick={handleCheckout}
                                disabled={isCheckingOut}
                                className="flex-1 rounded-xl py-3 px-4 bg-slate-900 text-white font-semibold text-center hover:bg-slate-800 transition-all active:scale-[0.98] cursor-pointer disabled:bg-slate-700 disabled:cursor-not-allowed"
                            >
                                {isCheckingOut ? "Processing..." : "Checkout"}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartModal;