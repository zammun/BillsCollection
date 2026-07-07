import { Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';

interface CartModalProps {
    onClose: () => void;
}

const CartModal = ({ onClose }: CartModalProps) => {
    const cartItems = useCartStore((state) => state.cartItems);
    const removeFromCart = useCartStore((state) => state.removeFromCart);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="absolute top-12 right-0 w-80 sm:w-96 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white border border-gray-100 flex flex-col gap-6 z-50">
            
            {/* Header with Close Button — Conditional: ONLY show the X if items exist */}
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Shopping Cart</h2>
                {cartItems.length > 0 && (
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-gray-900 transition-colors p-1"
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
                /* Updated placeholder message matching your exact phrasing */
                <div className="text-gray-500 text-sm pb-2 text-center font-medium">No items in cart</div>
            ) : (
                <>
                    <div className="flex flex-col gap-6 max-h-[60vh] overflow-y-auto pr-2">
                        {cartItems.map((item) => (
                            <div className="flex gap-4" key={`${item.id}-${item.color}-${item.size}`}>
                                <div className="w-20 h-24 bg-gray-50 rounded-xl p-1 flex-shrink-0 border border-gray-100">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                </div>
                                
                                <div className="flex flex-col justify-between w-full">
                                    <div>
                                        <div className="flex items-start justify-between gap-4">
                                            <h3 className="font-semibold text-gray-900 line-clamp-2">{item.name}</h3>
                                            <span className="font-semibold text-gray-900">${item.price * item.quantity}</span>
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">
                                            {item.color} / {item.size}
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between text-sm mt-2">
                                        <span className="font-medium text-gray-700">Qty: {item.quantity}</span>
                                        <button 
                                            onClick={() => removeFromCart(item.id, item.color, item.size)}
                                            className="text-red-500 font-medium hover:text-red-700 transition-colors cursor-pointer"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-4 border-t border-gray-100 pt-6">
                        <div className="flex items-center justify-between font-bold text-lg text-gray-900">
                            <span>Subtotal</span>
                            <span>${subtotal}</span>
                        </div>
                        <p className="text-xs text-gray-500">Shipping, taxes, and discount codes calculated at checkout.</p>
                        
                        <div className="flex justify-between gap-3 mt-2">
                            <Link 
                                to="/cart" 
                                onClick={onClose}
                                className="flex-1 rounded-xl py-3 px-4 ring-1 ring-gray-300 text-gray-900 font-semibold text-center hover:bg-gray-50 transition-all active:scale-[0.98]"
                            >
                                View Cart
                            </Link>
                            <button 
                                onClick={onClose}
                                className="flex-1 rounded-xl py-3 px-4 bg-slate-900 text-white font-semibold text-center hover:bg-slate-800 transition-all active:scale-[0.98] cursor-pointer"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartModal;