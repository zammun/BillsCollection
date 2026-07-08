import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { supabase } from '../supabase'; 

export const ProductCard = ({ product }: { product: any }) => {
    // Default to 'S' or first available size.
    const [selectedSize, setSelectedSize] = useState('S'); 
    const [currentImgIdx, setCurrentImgIdx] = useState(0);
    const [isAdded, setIsAdded] = useState(false); // Track add state
    
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const addToCart = useCartStore((state) => state.addToCart);

    // Get stock for the currently selected size. Defaults to 0 if sizes column is empty/missing
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

        // Trigger the button feedback animation
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
        setCurrentImgIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    return (
        <div className='w-full flex flex-col gap-4 relative group/card'>
            <div className='relative w-full h-80 bg-gray-50 rounded-md overflow-hidden p-4 flex items-center justify-center group/slider'>
                {/* Floating stock alert: only pulse if stock is low for the selected size */}
                {stockForSelectedSize > 0 && stockForSelectedSize < 5 && (
                    <div className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md z-20 shadow-xs pointer-events-none animate-pulse">
                        Only {stockForSelectedSize} {selectedSize} Left
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
            
            <Link to={`/product/${product.id}`} className="flex flex-col gap-1">
                <div className='flex justify-between items-center'>
                    <span className='font-medium text-gray-900'>{product.name}</span>
                    <span className='font-medium text-gray-900'>${product.price}</span>
                </div>
            </Link>

            {/* Size Selector with Slash Logic */}
            <div className="flex gap-2 my-1">
                {['S', 'M', 'L', 'XL'].map((size) => {
                    const stock = product.sizes ? (product.sizes[size] || 0) : 0;
                    const isOutOfStock = stock === 0;

                    return (
                        <button
                            key={size}
                            disabled={isOutOfStock}
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); if(!isOutOfStock) setSelectedSize(size); }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all border relative z-10
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
                className={`w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 active:scale-[0.98] z-10 disabled:opacity-50 disabled:cursor-not-allowed shadow-xs
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