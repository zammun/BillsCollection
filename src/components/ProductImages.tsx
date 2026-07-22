import { useState, useRef, type TouchEvent } from "react";

interface ProductImagesProps {
    images: string[];
}

const ProductImages = ({ images }: ProductImagesProps) => {
    const [index, setIndex] = useState(0);
    
    const touchStartX = useRef<number | null>(null);
    const touchStartY = useRef<number | null>(null);

    if (!images || images.length === 0) {
        return <div className="w-full h-80 bg-[#e6e4dc]/50 rounded-xl animate-pulse" />;
    }

    const minSwipeDistance = 40;

    const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
        if (touchStartX.current === null || touchStartY.current === null) return;

        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;

        const diffX = touchStartX.current - touchEndX;
        const diffY = touchStartY.current - touchEndY;

        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
            if (diffX > 0) {
                setIndex((prev) => (prev + 1) % images.length);
            } else {
                setIndex((prev) => (prev - 1 + images.length) % images.length);
            }
        }

        touchStartX.current = null;
        touchStartY.current = null;
    };

    const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);
    const prevSlide = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

    return (
        <div className="flex flex-col gap-4">
            {/* Main Featured Image Box - Removed explicit touch CSS classes to allow vertical scrolls */}
            <div 
                className="h-[420px] sm:h-[500px] relative bg-transparent rounded-2xl overflow-hidden p-4 flex items-center justify-center group/gallery"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {images.length > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 bg-[#faf8f5]/90 hover:bg-[#e6e4dc] border border-[#e2e0d9] text-slate-900 shadow-md rounded-full w-10 h-10 items-center justify-center text-xl font-bold z-20 opacity-0 group-hover/gallery:opacity-100 transition-all cursor-pointer"
                            aria-label="Previous image"
                        >
                            ‹
                        </button>
                        <button
                            onClick={nextSlide}
                            className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 bg-[#faf8f5]/90 hover:bg-[#e6e4dc] border border-[#e2e0d9] text-slate-900 shadow-md rounded-full w-10 h-10 items-center justify-center text-xl font-bold z-20 opacity-0 group-hover/gallery:opacity-100 transition-all cursor-pointer"
                            aria-label="Next image"
                        >
                            ›
                        </button>
                    </>
                )}

                {images.length > 1 && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10 md:hidden p-2 bg-slate-900/10 rounded-full backdrop-blur-xs">
                        {images.map((_, dotIdx) => (
                            <div
                                key={dotIdx}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    index === dotIdx ? 'bg-slate-900 w-5' : 'bg-slate-900/30'
                                }`}
                            />
                        ))}
                    </div>
                )}

                <img 
                    src={images[index]} 
                    alt="Product preview" 
                    className="w-full h-full object-contain mix-blend-multiply select-none pointer-events-none transition-all duration-300"
                />
            </div>
            
            {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto py-2 scrollbar-hide">
                    {images.map((url, idx) => (
                        <button 
                            key={idx} 
                            onClick={() => setIndex(idx)}
                            className={`w-20 h-20 sm:w-24 sm:h-24 bg-transparent rounded-xl overflow-hidden border-2 cursor-pointer flex-shrink-0 p-1 transition-all
                                ${index === idx 
                                    ? 'border-slate-900 ring-1 ring-slate-900 scale-95 shadow-2xs' 
                                    : 'border-[#e2e0d9] hover:border-slate-400 opacity-75 hover:opacity-100'
                                }`}
                        >
                            <img 
                                src={url} 
                                alt="" 
                                className="w-full h-full object-cover rounded-lg mix-blend-multiply" 
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductImages;