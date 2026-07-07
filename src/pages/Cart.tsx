import { Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';

const CartPage = () => {
    const cartItems = useCartStore((state) => state.cartItems);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const updateQuantity = useCartStore((state) => state.updateQuantity); // Pull action hook

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (cartItems.length === 0) {
        return (
            <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-24 text-center">
                <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
                <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
            </div>
        );
    }

    return (
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-16">
            <h1 className="text-2xl font-bold mb-8">Your Shopping Cart</h1>
            
            <div className="flex flex-col gap-8">
                {cartItems.map((item) => (
                    <div key={`${item.id}-${item.color}-${item.size}`}>
                        <div className="flex gap-6 items-center">
                            
                            {/* Clickable Image Container */}
                            <Link 
                                to={`/product/${item.id}`} 
                                className="w-24 h-32 bg-gray-50 rounded-xl p-2 border border-gray-100 flex-shrink-0 relative block hover:opacity-80 transition-opacity"
                            >
                                <img src={item.image} alt={item.name} className="w-full h-full object-contain"/>
                            </Link>
                            
                            <div className="flex justify-between w-full h-full py-2">
                                <div className="flex flex-col justify-between">
                                    <div>
                                        {/* Clickable Title */}
                                        <Link to={`/product/${item.id}`} className="hover:text-indigo-600 transition-colors">
                                            <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                                        </Link>
                                        <p className="text-sm text-gray-500 mt-1">Color: {item.color} | Size: {item.size}</p>
                                    </div>

                                    {/* Interactive Quantity Control Stepper Wrapper */}
                                    <div className="flex items-center bg-gray-100 rounded-lg ring-1 ring-gray-200 w-max h-9 mt-2">
                                        <button 
                                            onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)}
                                            className="w-8 h-full flex items-center justify-center text-sm font-semibold hover:bg-gray-200 rounded-l-lg transition-colors cursor-pointer"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center text-xs font-semibold text-gray-800">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}
                                            className="w-8 h-full flex items-center justify-center text-sm font-semibold hover:bg-gray-200 rounded-r-lg transition-colors cursor-pointer"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-between items-end">
                                    <div className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</div>
                                    <button 
                                        onClick={() => removeFromCart(item.id, item.color, item.size)}
                                        className="text-red-500 text-sm font-medium hover:text-red-700 cursor-pointer"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                        <hr className="border-gray-100 mt-8" />
                    </div>
                ))}

                {/* Totals Section */}
                <div className="flex flex-col items-end gap-4 mt-4">
                    <div className="flex justify-between w-full md:w-[400px] text-gray-700">
                        <span>Subtotal</span>
                        <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between w-full md:w-[400px] text-gray-700">
                        <span>Shipping</span>
                        <span className="font-semibold text-green-600">FREE</span>
                    </div>
                    <hr className="w-full md:w-[400px] border-gray-200 my-2" />
                    <div className="flex justify-between w-full md:w-[400px] text-xl font-bold text-gray-900 mb-4">
                        <span>Total</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <button className="w-full md:w-[400px] bg-slate-900 text-white py-4 rounded-xl font-semibold hover:bg-slate-800 transition-colors active:scale-[0.98]">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;