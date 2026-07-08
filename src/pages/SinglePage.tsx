import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductImages from "../components/ProductImages";
import { useCartStore } from '../store/useCartStore';
import { supabase } from '../supabase';

interface Product {
    id: number;
    name: string;
    price: number;
    type: string;
    color: string;
    description: string;
    image_url: string[];
    inventory_count: number; 
    sizes: { S: number; M: number; L: number; XL: number }; 
}

const SinglePage = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    const [selectedSize, setSelectedSize] = useState('L');
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);
    const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
    
    const currentStock = product?.sizes ? (product.sizes[selectedSize as keyof typeof product.sizes] || 0) : 0;
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const addToCart = useCartStore((state) => state.addToCart);

    useEffect(() => {
        const fetchSingleProduct = async () => {
            if (!id) return;
            setLoading(true);
            
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', Number(id))
                .single();

            if (!error && data) {
                setProduct(data);
            } else {
                console.error("Error fetching product data:", error);
            }
            setLoading(false);
        };

        fetchSingleProduct();

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [id]);

    // Automatically scale down quantity if the selected size has lower stock boundaries
    useEffect(() => {
        const stockForSelectedSize = product?.sizes ? (product.sizes[selectedSize as keyof typeof product.sizes] || 0) : 0;
        if (quantity > stockForSelectedSize) {
            setQuantity(Math.max(1, stockForSelectedSize));
        }
    }, [selectedSize, product]);

    if (loading) {
        return <div className="text-center py-24 text-gray-500 font-medium">Loading item details...</div>;
    }

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
                <h1 className="text-2xl font-bold">Product not found</h1>
                <Link to="/" className="text-indigo-600 underline hover:text-indigo-800">Return to Shop</Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        const primaryImage = Array.isArray(product.image_url) && product.image_url.length > 0 
            ? product.image_url[0] 
            : '';

        addToCart({
            id: product.id.toString(),
            name: product.name,
            price: product.price,
            color: product.color,
            size: selectedSize,
            image: primaryImage, 
            quantity: quantity,
            size_inventory: currentStock, 
        });

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        setIsAdded(true);
        timeoutRef.current = setTimeout(() => setIsAdded(false), 1000);
    };

    const handleButtonReset = () => {
        if (isAdded) {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setIsAdded(false);
        }
    };

    return (
        <div className='px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16 py-12'>
            {/* Image Section */}
            <div className='w-full lg:w-1/2 lg:sticky top-20 h-max'>
                <ProductImages images={product.image_url || []} />
            </div>
            
            {/* Text & Interaction Section */}
            <div className='w-full lg:w-1/2 flex flex-col gap-6'>
                <h1 className='text-4xl font-bold text-gray-900'>{product.name}</h1>
                <p className='text-gray-500 text-lg leading-relaxed'>{product.description || ""}</p>
                
                <div className='h-[1px] bg-gray-200' />
                
                <div className='flex items-center gap-4'>
                    <h2 className='font-semibold text-3xl text-gray-900'>${product.price}</h2>
                </div>
                
                <div className='h-[1px] bg-gray-200' />
                
                <div className="flex flex-col gap-6">
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Color: <span className="font-normal text-gray-600">{product.color}</span></h4>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold text-gray-900">Size</h4>
                            <span 
                                onClick={() => setIsSizeGuideOpen(true)}
                                className="text-sm text-gray-500 underline cursor-pointer hover:text-gray-900 font-medium"
                            >
                                Size Guide
                            </span>
                        </div>
                        <div className="flex gap-3">
                            {['S', 'M', 'L', 'XL'].map((size) => {
                                const stockForThisSize = product.sizes ? (product.sizes[size as keyof typeof product.sizes] || 0) : 0;
                                const isOutOfStock = stockForThisSize === 0;

                                return (
                                    <button
                                        key={size}
                                        disabled={isOutOfStock}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-semibold transition-all border
                                            ${selectedSize === size && !isOutOfStock
                                                ? 'bg-slate-900 text-white border-slate-900 ring-2 ring-slate-900 ring-offset-2' 
                                                : 'bg-white text-gray-700 border-gray-200 hover:border-slate-400'
                                            }
                                            ${isOutOfStock ? 'opacity-30 cursor-not-allowed line-through border-gray-100' : ''}`}
                                        type="button"
                                    >
                                        {size}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Add to Cart Section */}
                <div className="flex flex-col gap-4 mt-4">
                    <h4 className="font-semibold text-gray-900">Quantity</h4>
                    <div className="flex gap-4">
                        <div className="flex items-center bg-gray-100 rounded-xl ring-1 ring-gray-200">
                            <button 
                                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                disabled={quantity <= 1}
                                className={`w-12 h-12 flex items-center justify-center text-xl rounded-l-xl transition-colors
                                    ${quantity <= 1 ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-200 cursor-pointer'}`}
                                type="button"
                            >
                                -
                            </button>
                            
                            <span className="w-12 text-center font-semibold text-gray-800">{quantity}</span>
                            
                            <button 
                                onClick={() => setQuantity(prev => prev + 1)}
                                disabled={quantity >= currentStock}
                                className={`w-12 h-12 flex items-center justify-center text-xl rounded-r-xl transition-colors
                                    ${quantity >= currentStock 
                                        ? 'bg-gray-50 text-gray-300 cursor-not-allowed border-l border-gray-200/40' 
                                        : 'hover:bg-gray-200 cursor-pointer'}`}
                                type="button"
                            >
                                +
                            </button>
                        </div>
                        
                        <button 
                            onClick={handleAddToCart}
                            onMouseEnter={handleButtonReset} 
                            disabled={currentStock === 0}
                            className={`flex-1 rounded-xl font-bold text-lg transition-all active:scale-[0.98] ${
                                currentStock === 0
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : isAdded 
                                    ? 'bg-emerald-800 text-white ring-1 ring-emerald-800 opacity-95' 
                                    : 'bg-slate-900 text-white ring-1 ring-slate-900 hover:bg-slate-800'
                            }`}
                            type="button"
                        >
                            {currentStock === 0 ? 'Out of Stock' : isAdded ? 'Added to Cart ✓' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
                
                <div className='h-[1px] bg-gray-200 my-4' />
                
                <div className='flex flex-col gap-8 text-sm text-gray-700'>
                    <div>
                        <h4 className='font-bold text-gray-900 mb-2 uppercase tracking-wide'>Shipping & Returns</h4>
                        <p>Free standard shipping on all US orders. Returns accepted within 14 days of delivery for store credit.</p>
                    </div>
                    <div>
                        <h4 className='font-bold text-gray-900 mb-2 uppercase tracking-wide'>Care Instructions</h4>
                        <p>Machine wash cold with like colors. Tumble dry low. Do not iron over graphics.</p>
                    </div>
                    <div>
                        <h4 className='font-bold text-gray-900 mb-2 uppercase tracking-wide'>Material</h4>
                        <p>100% Premium Cotton construction. Cut and sewn.</p>
                    </div>
                </div>
            </div>

            {/* Sizing Chart Reference Modal */}
            {isSizeGuideOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-gray-100 flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Sizing Chart Reference</h3>
                            <button 
                                onClick={() => setIsSizeGuideOpen(false)}
                                className="text-gray-400 hover:text-gray-900 text-xl font-bold p-1 transition-colors"
                                type="button"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="overflow-x-auto border border-gray-100 rounded-xl">
                            <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100 font-bold text-gray-700">
                                        <th className="p-3">Size label</th>
                                        <th className="p-3">Chest width (in)</th>
                                        <th className="p-3">Body length (in)</th>
                                    </tr>
                                </thead>
                                <tbody className="font-medium text-gray-600 divide-y divide-gray-50">
                                    <tr>
                                        <td className="p-3 font-semibold text-gray-900">S</td>
                                        <td className="p-3">34 - 36</td>
                                        <td className="p-3">27</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 font-semibold text-gray-900">M</td>
                                        <td className="p-3">38 - 40</td>
                                        <td className="p-3">28</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 font-semibold text-gray-900">L</td>
                                        <td className="p-3">42 - 44</td>
                                        <td className="p-3">29</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 font-semibold text-gray-900">XL</td>
                                        <td className="p-3">46 - 48</td>
                                        <td className="p-3">30</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-500 leading-relaxed">
                            <p className="font-bold text-gray-700 mb-1">How to gather accurate metric parameters:</p>
                            <p><strong>Chest:</strong> Measure completely around the widest perimeter boundary point of your chest context frame, maintaining the measuring tool straight and parallel with floor coordinates.</p>
                            <p className="mt-1"><strong>Length:</strong> Measure down from the highest point of your shoulder assembly down to the bottom baseline trim point.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SinglePage;