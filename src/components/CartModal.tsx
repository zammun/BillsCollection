import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { supabase } from '../supabase';

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CartModal = ({ isOpen, onClose }: CartModalProps) => {
    const cartItems = useCartStore((state) => state.cartItems);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const updateQuantity = useCartStore((state) => state.updateQuantity);

    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
    const [isCheckingOut, setIsCheckingOut] = useState(false);

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

    // --- STRIPE SECURE CHECKOUT ---
    const handleCheckout = async () => {
        setIsCheckingOut(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            
            const currentUserId = user?.id || null;
            const userEmail = user ? user.email : undefined;
            const metadata = user ? user.user_metadata : null;
            
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
                    userEmail, 
                    userAddress 
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
        <div 
            className={`absolute top-full right-0 mt-3 w-[calc(100vw-24px)] max-w-sm sm:w-96 p-6 rounded-2xl shadow-2xl bg-[#D9D7D0] border border-slate-300/60 flex flex-col gap-6 z-[100] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu origin-top-right ${
                isOpen 
                    ? "opacity-100 translate-y-0 pointer-events-auto visible scale-100" 
                    : "opacity-0 -translate-y-4 pointer-events-none invisible scale-95"
            }`}
        >
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Shopping Cart</h2>
                {cartItems.length > 0 && (
                    <button 
                        onClick={onClose} 
                        className="text-slate-500 hover:text-slate-900 transition-colors p-1 cursor-pointer"
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
                <div className="text-slate-600 text-sm pb-2 text-center font-medium">No items in cart</div>
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
                                            className="w-20 h-24 bg-[#E6E4DC] rounded-xl p-1 flex-shrink-0 border border-slate-300/50 block hover:opacity-80 transition-opacity"
                                        >
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                        </Link>
                                        
                                        <div className="flex flex-col justify-between w-full">
                                            <div>
                                                <div className="flex items-start justify-between gap-4">
                                                    <Link 
                                                        to={`/product/${item.id}`}
                                                        onClick={onClose}
                                                        className="hover:text-slate-600 transition-colors flex-1"
                                                    >
                                                        <h3 className="font-semibold text-slate-900 line-clamp-1">{item.name}</h3>
                                                    </Link>
                                                    <span className="font-semibold text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                                <div className="text-xs text-slate-500 mt-0.5 uppercase tracking-wide">
                                                    {item.color} / {item.size}
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center bg-[#E6E4DC] rounded-lg ring-1 ring-slate-300/60 h-7 text-xs font-bold" onClick={(e) => e.stopPropagation()}>
                                                    <button 
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            if (item.quantity === 1) {
                                                                handleRemoveClick(e, itemKey);
                                                            } else {
                                                                updateQuantity(item.id, item.color, item.size, item.quantity - 1);
                                                            }
                                                        }}
                                                        className="w-7 h-full flex items-center justify-center hover:bg-[#D9D7D0] rounded-l-lg transition-colors cursor-pointer"
                                                    >-</button>
                                                    <span className="w-7 text-center text-slate-800">{item.quantity}</span>
                                                    <button 
                                                        disabled={item.quantity >= item.size_inventory}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            updateQuantity(item.id, item.color, item.size, item.quantity + 1);
                                                        }}
                                                        className={`w-7 h-full flex items-center justify-center rounded-r-lg transition-colors cursor-pointer 
                                                            ${item.quantity >= item.size_inventory ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'hover:bg-[#D9D7D0]'}`}
                                                    >+</button>
                                                </div>

                                                <button 
                                                    onClick={(e) => handleRemoveClick(e, itemKey)}
                                                    className="text-slate-500 font-medium hover:text-red-600 text-xs transition-colors cursor-pointer"
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
                                                className="px-3 py-1.5 text-xs font-bold bg-[#E6E4DC] text-slate-700 hover:bg-[#D9D7D0] rounded-lg shadow-xs ring-1 ring-slate-300 transition-all cursor-pointer"
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

                    <div className="flex flex-col gap-4 border-t border-slate-400/30 pt-6">
                        <div className="flex items-center justify-between font-bold text-lg text-slate-900">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-slate-600">Shipping and taxes calculated at checkout.</p>
                        
                        <div className="flex justify-between gap-3 mt-2">
                            <Link 
                                to="/cart" 
                                onClick={onClose}
                                className="flex-1 rounded-xl py-3 px-4 ring-1 ring-slate-400 text-slate-900 font-semibold text-center hover:bg-[#E6E4DC] transition-all active:scale-[0.98]"
                            >
                                View Cart
                            </Link>
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