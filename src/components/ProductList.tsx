import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { supabase } from '../supabase'; 

export const ProductCard = React.memo(({ product }: { product: any }) => {
    const [selectedSize, setSelectedSize] = useState('S'); 
    const [currentImgIdx, setCurrentImgIdx] = useState(0);
    const [isAdded, setIsAdded] = useState(false); 
    
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const addToCart = useCartStore((state) => state.addToCart);

    const stockForSelectedSize = product.sizes ? (product.sizes[selectedSize] || 0) : 0;

    const images = useMemo(() => {
        return Array.isArray(product.image_url) && product.image_url.length > 0 
            ? product.image_url 
            : [product.image_url || ''];
    }, [product.image_url]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    // Sync state when native CSS scroll occurs
    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const scrollPosition = scrollContainerRef.current.scrollLeft;
        const width = scrollContainerRef.current.offsetWidth;
        const newIndex = Math.round(scrollPosition / width);
        if (newIndex !== currentImgIdx) setCurrentImgIdx(newIndex);
    };

    const scrollToImage = (index: number) => {
        if (!scrollContainerRef.current) return;
        const width = scrollContainerRef.current.offsetWidth;
        scrollContainerRef.current.scrollTo({ left: width * index, behavior: 'smooth' });
    };

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
        const nextIdx = currentImgIdx === images.length - 1 ? 0 : currentImgIdx + 1;
        scrollToImage(nextIdx);
    };

    const prevSlide = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const prevIdx = currentImgIdx === 0 ? images.length - 1 : currentImgIdx - 1;
        scrollToImage(prevIdx);
    };

    return (
        <div className='w-full flex flex-col gap-4 relative group/card'>
            {/* Image Box utilizing native horizontal scrolling for pure smoothness */}
            <div className='relative w-full h-80 bg-transparent rounded-md overflow-hidden flex items-center justify-center group/slider'>
                
                {stockForSelectedSize > 0 && stockForSelectedSize < 5 && (
                    <div className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md z-20 shadow-xs pointer-events-none">
                        Act fast, only {stockForSelectedSize} left
                    </div>
                )}

                {/* Native Snap Container */}
                <div 
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-none touch-pan-y pointer-events-auto"
                >
                    {images.map((imgUrl: string, idx: number) => (
                        <Link 
                            key={idx}
                            to={`/product/${product.id}`} 
                            className="w-full h-full flex-shrink-0 snap-center snap-always block p-4"
                        >
                            <img 
                                src={imgUrl} 
                                alt={product.name} 
                                loading="lazy"
                                decoding="async"
                                className='w-full h-full object-contain pointer-events-none select-none'
                            />
                        </Link>
                    ))}
                </div>

                {/* Mobile Dot Indicators */}
                {images.length > 1 && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 md:hidden pointer-events-none">
                        {images.map((_: string, idx: number) => (
                            <div 
                                key={idx} 
                                className={`h-1.5 rounded-full transition-all duration-300 ${currentImgIdx === idx ? 'w-4 bg-slate-900' : 'w-1.5 bg-slate-400/50'}`} 
                            />
                        ))}
                    </div>
                )}

                {images.length > 1 && (
                    <>
                        <button 
                            onClick={prevSlide}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#faf8f5]/90 hover:bg-[#e6e4dc] border border-[#e2e0d9] text-slate-900 shadow-md rounded-full w-9 h-9 md:w-8 md:h-8 flex items-center justify-center text-lg font-bold z-10 opacity-100 md:opacity-0 md:group-hover/slider:opacity-100 transition-all cursor-pointer"
                        >
                            ‹
                        </button>
                        <button 
                            onClick={nextSlide}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#faf8f5]/90 hover:bg-[#e6e4dc] border border-[#e2e0d9] text-slate-900 shadow-md rounded-full w-9 h-9 md:w-8 md:h-8 flex items-center justify-center text-lg font-bold z-10 opacity-100 md:opacity-0 md:group-hover/slider:opacity-100 transition-all cursor-pointer"
                        >
                            ›
                        </button>
                    </>
                )}
            </div>

            {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto py-1 scrollbar-none justify-start touch-pan-x">
                    {images.map((url: string, idx: number) => (
                        <button
                            key={idx}
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); scrollToImage(idx); }}
                            className={`w-12 h-12 bg-transparent rounded border aspect-square overflow-hidden p-0.5 flex-shrink-0 transition-all cursor-pointer
                                ${currentImgIdx === idx ? 'border-slate-900 ring-1 ring-slate-900 scale-95' : 'border-[#e2e0d9] hover:border-slate-400'}`}
                        >
                            <img src={url} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover rounded-[2px]" />
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

            {/* Size Selector Buttons */}
            <div className="flex gap-2 my-1">
                {['S', 'M', 'L', 'XL'].map((size: string) => {
                    const stock = product.sizes ? (product.sizes[size] || 0) : 0;
                    const isOutOfStock = stock === 0;

                    return (
                        <button
                            key={size}
                            disabled={isOutOfStock}
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); if(!isOutOfStock) setSelectedSize(size); }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all border relative z-10 cursor-pointer
                                ${selectedSize === size && !isOutOfStock ? 'bg-slate-900 text-white border-slate-900' : 'bg-[#faf8f5] text-slate-800 border-[#e2e0d9] hover:bg-[#e6e4dc]'}
                                ${isOutOfStock ? 'text-gray-300 line-through cursor-not-allowed border-[#e2e0d9]/50 bg-[#faf8f5]/50' : 'hover:border-slate-400'}`}
                        >
                            {size}
                        </button>
                    );
                })}
            </div>

            {/* Add to Cart Button */}
            <button 
                onClick={handleAddToCart}
                disabled={stockForSelectedSize === 0}
                className={`w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 active:scale-[0.98] z-10 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xs cursor-pointer
                    ${stockForSelectedSize === 0 
                      ? 'border border-[#e2e0d9] text-gray-400 bg-[#e6e4dc]/50' 
                      : isAdded 
                        ? 'bg-emerald-800 text-white ring-1 ring-emerald-800 scale-[1.02]' 
                        : 'border border-[#e2e0d9] text-slate-900 bg-[#faf8f5] hover:bg-slate-900 hover:text-white hover:border-slate-900'
                    }`}
            >
                {stockForSelectedSize === 0 ? "Out of Stock" : isAdded ? "Added to Cart ✓" : "Add to Cart"}
            </button>
        </div>
    );
});

ProductCard.displayName = 'ProductCard';

const ProductList = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
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

    const filteredProducts = useMemo(() => {
        let result = [...products];
        const typeParam = searchParams.get("type");
        const colorParam = searchParams.get("color");
        const minParam = searchParams.get("min");
        const maxParam = searchParams.get("max");
        const sortParam = searchParams.get("sort");
        const searchParam = searchParams.get("search");

        if (typeParam) result = result.filter(p => p.type === typeParam);
        if (colorParam) result = result.filter(p => p.color === colorParam);
        
        if (minParam && !isNaN(Number(minParam))) {
            result = result.filter(p => p.price >= Number(minParam));
        }
        if (maxParam && !isNaN(Number(maxParam))) {
            result = result.filter(p => p.price <= Number(maxParam));
        }

        if (searchParam) {
            result = result.filter(p => 
                p.name?.toLowerCase().includes(searchParam.toLowerCase())
            );
        }

        if (sortParam) {
            if (sortParam === "price-asc") {
                result.sort((a, b) => a.price - b.price);
            } else if (sortParam === "price-desc") {
                result.sort((a, b) => b.price - a.price);
            } else if (sortParam === "date-desc") {
                result.sort((a, b) => new Date(b.created_at || b.id).getTime() - new Date(a.created_at || a.id).getTime());
            } else if (sortParam === "date-asc") {
                result.sort((a, b) => new Date(a.created_at || a.id).getTime() - new Date(b.created_at || b.id).getTime());
            }
        }

        return result;
    }, [products, searchParams]);

    if (loading) {
        return (
            <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16'>
                {Array.from({ length: 8 }).map((_: unknown, idx: number) => (
                    <div key={idx} className="w-full flex flex-col gap-4">
                        <div className="w-full h-80 bg-[#e6e4dc]/60 rounded-md animate-pulse" />
                        <div className="flex justify-between items-center mt-1">
                            <div className="h-4 bg-[#e6e4dc]/60 rounded w-1/2 animate-pulse" />
                            <div className="h-4 bg-[#e6e4dc]/60 rounded w-12 animate-pulse" />
                        </div>
                        <div className="flex gap-2 my-1">
                            {Array.from({ length: 4 }).map((_: unknown, i: number) => (
                                <div key={i} className="w-8 h-8 rounded-full bg-[#e6e4dc]/60 animate-pulse" />
                            ))}
                        </div>
                        <div className="w-full h-10 bg-[#e6e4dc]/60 rounded-xl animate-pulse" />
                    </div>
                ))}
            </div>
        );
    }

    if (filteredProducts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center mt-12 bg-[#faf8f5]/60 rounded-2xl border border-[#e2e0d9] max-w-2xl mx-auto animate-fadeIn">
                <div className="mb-4 text-slate-400 select-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="8" cy="21" r="1"/>
                        <circle cx="19" cy="21" r="1"/>
                        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">Your search drew a blank</h3>
                <p className="text-sm text-gray-500 max-w-sm mt-2 leading-relaxed">
                    We couldn't find items matching those exact parameter options. Try wiping your active dashboard parameters to browse full catalog stock.
                </p>
                <button 
                    onClick={() => setSearchParams({})} 
                    className="mt-6 px-5 py-2.5 bg-slate-900 text-white text-xs font-bold tracking-wide uppercase rounded-xl hover:bg-slate-800 transition-all active:scale-[0.97] shadow-md cursor-pointer"
                >
                    Reset All Filters
                </button>
            </div>
        );
    }

    return (
        <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16'>
            {filteredProducts.map((product: any) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;