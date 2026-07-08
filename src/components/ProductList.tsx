import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { supabase } from '../supabase'; 

export const ProductCard = ({ product }: { product: any }) => {
    const [selectedSize, setSelectedSize] = useState('S'); 
    const [currentImgIdx, setCurrentImgIdx] = useState(0);
    const [isAdded, setIsAdded] = useState(false); 
    
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const addToCart = useCartStore((state) => state.addToCart);

    const stockForSelectedSize = product.sizes ? (product.sizes[selectedSize] || 0) : 0;

    const images = Array.isArray(product.image_url) && product.image_url.length > 0 
        ? product.image_url 
        : [product.image_url || ''];

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        
        if (stockForSelectedSize <= 0) {
            alert(`Sorry, ${product.name} size ${selectedSize} is out of stock.`);
            return;
        }

        addToCart({
            id: product.id.toString(), 
            name: product.name,
            price: product.price,
            color: product.color,
            size: selectedSize,
            image: images[0], 
            quantity: 1, 
            size_inventory: stockForSelectedSize, 
        });

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsAdded(true);
        timeoutRef.current = setTimeout(() => setIsAdded(false), 1000);
    };

    const nextSlide = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImgIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImgIdx((prev) => (prev === 0 ? images.length - 1 : prev + 1));
    };

    return (
        <div className='w-full flex flex-col gap-4 relative group/card'>
            <div className='relative w-full h-80 bg-[#f4f3ef] rounded-md overflow-hidden p-4 flex items-center justify-center group/slider'>
                {stockForSelectedSize > 0 && stockForSelectedSize < 5 && (
                    <div className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md z-20 shadow-xs pointer-events-none animate-pulse">
                        Act fast, only {stockForSelectedSize} left
                    </div>
                )}

                <Link to={`/product/${product.id}`} className="w-full h-full block">
                    <img 
                        src={images[currentImgIdx]} 
                        alt={product.name} 
                        className='w-full h-full object-contain pointer-events-none'
                    />
                </Link>

                {images.length > 1 && (
                    <>
                        <button 
                            onClick={prevSlide}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-900 shadow-md rounded-full w-9 h-9 md:w-8 md:h-8 flex items-center justify-center text-lg font-bold z-10 opacity-100 md:opacity-0 md:group-hover/slider:opacity-100 transition-opacity cursor-pointer"
                        >
                            ‹
                        </button>
                        <button 
                            onClick={nextSlide}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-900 shadow-md rounded-full w-9 h-9 md:w-8 md:h-8 flex items-center justify-center text-lg font-bold z-10 opacity-100 md:opacity-0 md:group-hover/slider:opacity-100 transition-opacity cursor-pointer"
                        >
                            ›
                        </button>
                    </>
                )}
            </div>

            {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto py-1 scrollbar-none justify-start">
                    {images.map((url: string, idx: number) => (
                        <button
                            key={idx}
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentImgIdx(idx); }}
                            className={`w-12 h-12 bg-white rounded border aspect-square overflow-hidden p-0.5 flex-shrink-0 transition-all cursor-pointer
                                ${currentImgIdx === idx ? 'border-slate-900 ring-1 ring-slate-900 scale-95' : 'border-gray-200 hover:border-gray-400'}`}
                        >
                            <img src={url} alt="" className="w-full h-full object-cover rounded-[2px]" />
                        </button>
                    ))}
                </div>
            )}
            
            <Link to={`/product/${product.id}`} className="flex flex-col gap-1">
                <div className='flex justify-between items-center'>
                    <span className='font-medium text-gray-900'>{product.name}</span>
                    <span className='font-medium text-gray-900'>${product.price}</span>
                </div>
            </Link>

            <div className="flex gap-2 my-1">
                {['S', 'M', 'L', 'XL'].map((size) => {
                    const stock = product.sizes ? (product.sizes[size] || 0) : 0;
                    const isOutOfStock = stock === 0;

                    return (
                        <button
                            key={size}
                            disabled={isOutOfStock}
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); if(!isOutOfStock) setSelectedSize(size); }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all border relative z-10 cursor-pointer
                                ${selectedSize === size && !isOutOfStock ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-gray-700 border-gray-200'}
                                ${isOutOfStock ? 'text-gray-300 line-through cursor-not-allowed border-gray-100' : 'hover:border-slate-400'}`}
                        >
                            {size}
                        </button>
                    );
                })}
            </div>

            <button 
                onClick={handleAddToCart}
                disabled={stockForSelectedSize === 0}
                className={`w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 active:scale-[0.98] z-10 disabled:opacity-50 disabled:cursor-not-allowed shadow-xs cursor-pointer
                    ${stockForSelectedSize === 0 
                        ? 'ring-1 ring-gray-200 text-gray-400 bg-gray-50' 
                        : isAdded 
                            ? 'bg-emerald-800 text-white ring-1 ring-emerald-800 scale-[1.02]' 
                            : 'ring-1 ring-slate-900 text-slate-900 bg-white hover:bg-slate-900 hover:text-white'
                    }`}
            >
                {stockForSelectedSize === 0 ? "Out of Stock" : isAdded ? "Added to Cart ✓" : "Add to Cart"}
            </button>
        </div>
    );
};

const ProductList = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    /* FIXED: Extracted search parameter updates mutation frame */
    const [searchParams, setSearchParams] = useSearchParams();

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
    const minParam = searchParams.get("min");
    const maxParam = searchParams.get("max");
    const sortParam = searchParams.get("sort");
    const searchParam = searchParams.get("search");

    if (typeParam) filteredProducts = filteredProducts.filter(p => p.type === typeParam);
    if (colorParam) filteredProducts = filteredProducts.filter(p => p.color === colorParam);
    
    if (minParam && !isNaN(Number(minParam))) {
        filteredProducts = filteredProducts.filter(p => p.price >= Number(minParam));
    }
    if (maxParam && !isNaN(Number(maxParam))) {
        filteredProducts = filteredProducts.filter(p => p.price <= Number(maxParam));
    }

    if (searchParam) {
        filteredProducts = filteredProducts.filter(p => 
            p.name?.toLowerCase().includes(searchParam.toLowerCase())
        );
    }

    if (sortParam) {
        if (sortParam === "price-asc") {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortParam === "price-desc") {
            filteredProducts.sort((a, b) => b.price - a.price);
        } else if (sortParam === "date-desc") {
            filteredProducts.sort((a, b) => new Date(b.created_at || b.id).getTime() - new Date(a.created_at || a.id).getTime());
        } else if (sortParam === "date-asc") {
            filteredProducts.sort((a, b) => new Date(a.created_at || a.id).getTime() - new Date(b.created_at || b.id).getTime());
        }
    }

    if (loading) {
        return (
            <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16'>
                {Array.from({ length: 8 }).map((_, idx) => (
                    <div key={idx} className="w-full flex flex-col gap-4">
                        <div className="w-full h-80 bg-gray-200/60 rounded-md animate-pulse" />
                        <div className="flex justify-between items-center mt-1">
                            <div className="h-4 bg-gray-200/60 rounded w-1/2 animate-pulse" />
                            <div className="h-4 bg-gray-200/60 rounded w-12 animate-pulse" />
                        </div>
                        <div className="flex gap-2 my-1">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="w-8 h-8 rounded-full bg-gray-200/60 animate-pulse" />
                            ))}
                        </div>
                        <div className="w-full h-10 bg-gray-200/60 rounded-xl animate-pulse" />
                    </div>
                ))}
            </div>
        );
    }

    /* FIXED: Transformed raw empty fallback string into a fully styled responsive user portal escape hatch */
    if (filteredProducts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center mt-12 bg-gray-50/50 rounded-2xl border border-gray-100 max-w-2xl mx-auto animate-fadeIn">
                <div className="text-5xl mb-4 text-gray-400 select-none">🛒</div>
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">Your search drew a blank</h3>
                <p className="text-sm text-gray-500 max-w-sm mt-2 leading-relaxed">
                    We couldn't find items matching those exact parameter options. Try wiping your active dashboard parameters to browse full catalog stock.
                </p>
                <button 
                    onClick={() => setSearchParams({})} 
                    className="mt-6 px-5 py-2.5 bg-slate-900 text-white text-xs font-bold tracking-wide uppercase rounded-xl hover:bg-slate-800 transition-all active:scale-[0.97] shadow-md shadow-slate-900/10 cursor-pointer"
                >
                    Reset All Filters
                </button>
            </div>
        );
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