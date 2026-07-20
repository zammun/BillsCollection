import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { supabase } from '../supabase';

const CartPage = () => {
    const navigate = useNavigate();
    const cartItems = useCartStore((state) => state.cartItems);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const clearCart = useCartStore((state) => state.clearCart);

    const [isCheckingOut, setIsCheckingOut] = useState(false);

    // Custom Modal State Engine For Item Removal
    const [confirmModal, setConfirmModal] = useState<{
        isOpen: boolean;
        itemToRemove: { id: string; color: string; size: string; name: string } | null;
    }>({ isOpen: false, itemToRemove: null });

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleDecreaseQuantity = (item: any) => {
        if (item.quantity === 1) {
            setConfirmModal({
                isOpen: true,
                itemToRemove: { id: item.id, color: item.color, size: item.size, name: item.name }
            });
        } else {
            updateQuantity(item.id, item.color, item.size, item.quantity - 1);
        }
    };

    const handleConfirmRemove = () => {
        if (confirmModal.itemToRemove) {
            const { id, color, size } = confirmModal.itemToRemove;
            removeFromCart(id, color, size);
        }
        setConfirmModal({ isOpen: false, itemToRemove: null });
    };

    // --- STRIPE SECURE CHECKOUT REDIRECT ---
    const handleCheckout = async () => {
        setIsCheckingOut(true);
        try {
            // 1. Authenticate active user session context
            const { data: { user } } = await supabase.auth.getUser();
            const currentUserId = user ? user.id : 'guest';
            if (authError || !user) {
                alert("Please log in to complete your transaction checkout loop.");
                setIsCheckingOut(false);
                return;
            }

            // 2. Format cart items into standard Stripe line_items payload layout
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

            // 3. Request a secure payment session URL from your Netlify backend function
             const response = await fetch('http://localhost:9999/.netlify/functions/checkout', { // <-- Updated to standalone functions port
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        lineItems,
        userId: user.id,
    }),
});

            const session = await response.json();

            if (!response.ok || !session.url) {
                throw new Error(session.error || 'Failed to initialize secure checkout terminal.');
            }

            // 4. Handoff context routing seamlessly to Stripe's secure billing portal canvas
            window.location.assign(session.url);

        } catch (error: any) {
            console.error("Stripe gateway routing engine exception:", error);
            alert(error.message || "An error occurred while executing checkout processes.");
            setIsCheckingOut(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-24 text-center">
                <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
                <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
            </div>
        );
    }

    return (
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-16 relative max-w-[1600px] mx-auto w-full">
            
            {/* Action Confirmation Modal Overlay */}
            {confirmModal.isOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
                    <div className="bg-white border border-slate-100 rounded-2xl max-w-sm w-full p-6 shadow-2xl flex flex-col gap-4 text-left">
                        <div>
                            <h3 className="text-base font-bold text-slate-900 tracking-tight">Remove Item from Cart?</h3>
                            <p className="text-xs text-slate-500 leading-relaxed mt-1.5">
                                Are you sure you want to completely remove <span className="font-semibold text-slate-800">"{confirmModal.itemToRemove?.name}"</span> (Size {confirmModal.itemToRemove?.size}) from your active shopping cart?
                            </p>
                        </div>
                        <div className="flex gap-3 mt-2">
                            <button 
                                onClick={() => setConfirmModal({ isOpen: false, itemToRemove: null })} 
                                className="flex-1 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100 cursor-pointer transition-colors"
                            >
                                Keep Item
                            </button>
                            <button 
                                onClick={handleConfirmRemove} 
                                className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 cursor-pointer transition-colors shadow-xs"
                            >
                                Remove Item
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <h1 className="text-2xl font-bold mb-8 text-left text-slate-900">Your Shopping Cart</h1>
            
            <div className="flex flex-col lg:flex-row gap-12 items-start">
                
                {/* Left Side: Active Cart Items Feed */}
                <div className="flex-1 w-full flex flex-col gap-8">
                    {cartItems.map((item) => (
                        <div key={`${item.id}-${item.color}-${item.size}`}>
                            <div className="flex gap-6 md:gap-8 items-start sm:items-center">
                                
                                {/* Fluid responsive image box container */}
                                <Link 
                                    to={`/product/${item.id}`} 
                                    className="w-32 h-40 sm:w-44 sm:h-56 bg-[#f4f3ef] rounded-2xl p-4 border border-slate-200/60 flex-shrink-0 relative block hover:opacity-80 transition-opacity"
                                >
                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain"/>
                                </Link>
                                
                                {/* Item Details Stack */}
                                <div className="flex justify-between w-full min-h-[140px] sm:min-h-[200px] py-1 text-left">
                                    <div className="flex flex-col justify-between">
                                        <div>
                                            <Link to={`/product/${item.id}`} className="hover:text-indigo-600 transition-colors">
                                                <h3 className="font-semibold text-base sm:text-xl text-slate-900 leading-tight">{item.name}</h3>
                                            </Link>
                                            <p className="text-xs sm:text-sm text-gray-500 mt-1.5 font-medium">Color: {item.color} | Size: {item.size}</p>
                                            
                                            {item.size_inventory > 0 && item.size_inventory < 5 && (
                                                <p className="text-[11px] sm:text-xs font-bold text-amber-600 mt-2 flex items-center gap-1 animate-pulse">
                                                    ⚠️ Act fast! Only {item.size_inventory} left in stock.
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex items-center bg-transparent border border-slate-200/80 rounded-xl w-max h-9 mt-4">
                                            <button 
                                                disabled={isCheckingOut}
                                                onClick={() => handleDecreaseQuantity(item)}
                                                className="w-9 h-full flex items-center justify-center text-sm font-semibold hover:bg-slate-200/40 rounded-l-xl transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-slate-700"
                                            >
                                                -
                                            </button>
                                            <span className="w-8 text-center text-xs font-bold text-slate-800">{item.quantity}</span>
                                            <button 
                                                disabled={item.quantity >= item.size_inventory || isCheckingOut}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    updateQuantity(item.id, item.color, item.size, item.quantity + 1);
                                                }}
                                                className={`w-9 h-full flex items-center justify-center rounded-r-xl transition-colors cursor-pointer text-sm font-semibold
                                                    ${item.quantity >= item.size_inventory ? 'text-slate-300 cursor-not-allowed' : 'text-slate-700 hover:bg-slate-200/40'}`}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-between items-end flex-shrink-0">
                                        <div className="font-bold text-base sm:text-xl text-slate-900">${(item.price * item.quantity).toFixed(2)}</div>
                                        <button 
                                            disabled={isCheckingOut}
                                            onClick={() => removeFromCart(item.id, item.color, item.size)}
                                            className="text-red-500 text-xs sm:text-sm font-bold tracking-wide uppercase hover:text-red-700 cursor-pointer disabled:opacity-50 transition-colors"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <hr className="border-slate-200/40 mt-8" />
                        </div>
                    ))}
                </div>

                {/* Right Side: Order Summary Card Block */}
                <div className="w-full lg:w-[420px] bg-white border border-slate-200/80 rounded-2xl p-6 lg:sticky lg:top-24 flex flex-col gap-5 text-left shadow-xs">
                    <h2 className="text-lg font-bold text-slate-900 tracking-tight border-b border-slate-200/40 pb-3">Order Summary</h2>
                    
                    <div className="flex flex-col gap-3.5 text-sm text-slate-600">
                        <div className="flex justify-between w-full">
                            <span>Subtotal</span>
                            <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
                        </div>
                        
                        <div className="flex justify-between w-full items-center">
                            <span className="text-slate-600">Shipping & Taxes</span>
                            <span className="text-xs text-slate-400 font-medium bg-slate-50/50 border border-slate-200/60 px-2 py-0.5 rounded-md">
                                Calculated at checkout
                            </span>
                        </div>
                    </div>

                    <hr className="border-slate-200/60 my-1" />
                    
                    <div className="flex justify-between w-full text-lg font-bold text-slate-900 mb-2">
                        <span>Total</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <button 
                        onClick={handleCheckout}
                        disabled={isCheckingOut}
                        className="w-full bg-slate-900 text-white py-4 rounded-xl font-semibold hover:bg-slate-800 transition-all active:scale-[0.98] cursor-pointer disabled:bg-slate-700 disabled:cursor-not-allowed text-center text-sm tracking-wide shadow-xs"
                    >
                        {isCheckingOut ? "Processing Order..." : "Confirm & Pay"}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default CartPage;