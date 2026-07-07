import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { supabase } from '../supabase'; 

const ProductCard = ({ product }: { product: any }) => {
    const [selectedSize, setSelectedSize] = useState('L'); 
    const [currentImgIdx, setCurrentImgIdx] = useState(0);
    const addToCart = useCartStore((state) => state.addToCart);

    // Safe normalization to always get an array of image strings
    const images = Array.isArray(product.image_url) && product.image_url.length > 0 
        ? product.image_url 
        : [product.image_url || ''];

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addToCart({
            id: product.id.toString(), // Cast numerical DB id to string for the cart store
            name: product.name,
            price: product.price,
            color: product.color,
            size: selectedSize,
            image: images[0], 
            quantity: 1, // Satisfies the cart store requirements by providing an explicit quantity
        });
    };

    const nextSlide = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImgIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImgIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    return (
        <div className='w-full flex flex-col gap-4 relative group/card'>
            {/* Main Active Image Display Frame */}
            <div className='relative w-full h-80 bg-gray-50 rounded-md overflow-hidden p-4 flex items-center justify-center group/slider'>
                
                {/* Image Redirect Link */}
                <Link to={`/product/${product.id}`} className="w-full h-full block">
                    <img 
                        src={images[currentImgIdx]} 
                        alt={product.name} 
                        className='w-full h-full object-contain pointer-events-none'
                    />
                </Link>

                {/* Left/Right Control Overlay Arrows */}
                {images.length > 1 && (
                    <>
                        <button 
                            onClick={prevSlide}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-900 shadow-md rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold z-10 opacity-0 group-hover/slider:opacity-100 transition-opacity"
                        >
                            ‹
                        </button>
                        <button 
                            onClick={nextSlide}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-900 shadow-md rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold z-10 opacity-0 group-hover/slider:opacity-100 transition-opacity"
                        >
                            ›
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnail Preview Row */}
            {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto py-1 scrollbar-none justify-start">
                    {images.map((url: string, idx: number) => (
                        <button
                            key={idx}
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentImgIdx(idx); }}
                            className={`w-12 h-12 bg-white rounded border aspect-square overflow-hidden p-0.5 flex-shrink-0 transition-all
                                ${currentImgIdx === idx ? 'border-slate-900 ring-1 ring-slate-900 scale-95' : 'border-gray-200 hover:border-gray-400'}`}
                        >
                            <img src={url} alt="" className="w-full h-full object-cover rounded-[2px]" />
                        </button>
                    ))}
                </div>
            )}
            
            {/* Metadata Text */}
            <Link to={`/product/${product.id}`} className="flex flex-col gap-1">
                <div className='flex justify-between items-center'>
                    <span className='font-medium text-gray-900'>{product.name}</span>
                    <span className='font-medium text-gray-900'>${product.price}</span>
                </div>
            </Link>

            {/* Size Options Row */}
            <div className="flex gap-2 my-1">
                {['S', 'M', 'L', 'XL'].map((size) => (
                    <button
                        key={size}
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedSize(size); }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors border z-10
                            ${selectedSize === size ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-gray-700 border-gray-200 hover:border-slate-400'}`}
                    >
                        {size}
                    </button>
                ))}
            </div>

            {/* Submit Action Control */}
            <button 
                className='rounded-xl ring-1 ring-slate-900 text-slate-900 w-full py-2.5 px-4 text-sm font-semibold hover:bg-slate-900 hover:text-white transition-all active:scale-[0.98] z-10'
                onClick={handleAddToCart}
            >
                Add to Cart
            </button>
        </div>
    );
};

const ProductList = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('products').select('*');
            if (error) console.error("Error fetching:", error);
            else setProducts(data || []);
            setLoading(false);
        };
        fetchProducts();
    }, []);

    let filteredProducts = [...products];
    const typeParam = searchParams.get("type");
    const colorParam = searchParams.get("color");

    if (typeParam) filteredProducts = filteredProducts.filter(p => p.type === typeParam);
    if (colorParam) filteredProducts = filteredProducts.filter(p => p.color === colorParam);

    if (loading) return <div className="text-center py-12">Loading store...</div>;

    if (filteredProducts.length === 0) {
        return <div className="w-full text-center text-gray-500 py-12">No products :(</div>;
    }

    return (
        <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16'>
            {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList; 