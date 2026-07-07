import { useState, useEffect } from 'react';
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
}

const SinglePage = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    // Page-level states for the cart integration
    const [selectedSize, setSelectedSize] = useState('L');
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);

    const addToCart = useCartStore((state) => state.addToCart);

    useEffect(() => {
        const fetchSingleProduct = async () => {
            if (!id) return;
            setLoading(true);
            
            // Fixed type error by parsing string route ID to a number
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
    }, [id]);

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
            quantity: quantity, // <--- Add this line right here to pass the state value
        });

        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className='px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16 py-12'>
            
            {/* Image Section - Maps directly to your text array bucket paths */}
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
                            <span className="text-sm text-gray-500 underline cursor-pointer hover:text-gray-900">Size Guide</span>
                        </div>
                        <div className="flex gap-3">
                            {['S', 'M', 'L', 'XL'].map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-semibold transition-all border
                                        ${selectedSize === size 
                                            ? 'bg-slate-900 text-white border-slate-900 ring-2 ring-slate-900 ring-offset-2' 
                                            : 'bg-white text-gray-700 border-gray-200 hover:border-slate-400'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
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
                                className="w-12 h-12 flex items-center justify-center text-xl hover:bg-gray-200 rounded-l-xl transition-colors cursor-pointer"
                            >
                                -
                            </button>
                            <span className="w-12 text-center font-semibold">{quantity}</span>
                            <button 
                                onClick={() => setQuantity(prev => prev + 1)}
                                className="w-12 h-12 flex items-center justify-center text-xl hover:bg-gray-200 rounded-r-xl transition-colors cursor-pointer"
                            >
                                +
                            </button>
                        </div>
                        
                        <button 
                            onClick={handleAddToCart}
                            disabled={isAdded}
                            className={`flex-1 rounded-xl font-bold text-lg transition-all active:scale-[0.98] ${
                                isAdded 
                                ? 'bg-green-600 text-white ring-1 ring-green-600' 
                                : 'bg-slate-900 text-white ring-1 ring-slate-900 hover:bg-slate-800'
                            }`}
                        >
                            {isAdded ? 'Added to Cart ✓' : 'Add to Cart'}
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
        </div>
    );
};

export default SinglePage;