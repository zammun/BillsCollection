import { useState, useRef, type TouchEvent } from "react";

// This interface explicitly tells TypeScript that 'images' is a valid prop
interface ProductImagesProps {
    images: string[];
}

const ProductImages = ({ images }: ProductImagesProps) => {
    const [index, setIndex] = useState(0);
    // Use useRef to store the touch starting position without triggering re-renders
    const touchStartX = useRef<number | null>(null);

    if (!images || images.length === 0) {
        return <div className="w-full h-80 bg-transparent rounded-md animate-pulse" />;
    }

    // --- SWIPE LOGIC FOR MOBILE ---
    
    // Minimum distance (in pixels) to travel to be considered a swipe
    const minSwipeDistance = 50;

    const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
        // Record the exact starting X coordinate
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
        // If we didn't get a start position, ignore
        if (touchStartX.current === null) return;

        const touchEndX = e.changedTouches[0].clientX;
        const distance = touchStartX.current - touchEndX;

        // Check if the swipe distance exceeds the threshold
        if (Math.abs(distance) > minSwipeDistance) {
            if (distance > 0) {
                // Swiped Left -> Show Next image (loop around to 0 if at the end)
                setIndex((prevIndex) => (prevIndex + 1) % images.length);
            } else {
                // Swiped Right -> Show Previous image (loop around to end if at 0)
                setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
            }
        }

        // Reset the start position for the next touch
        touchStartX.current = null;
    };
    // --------------------------------

    return (
        <div className="flex flex-col gap-4">
            {/* Main Featured Image Display - Added Touch Handlers here */}
            <div 
                className="h-[500px] relative bg-transparent rounded-xl overflow-hidden p-4 flex items-center justify-center touch-pan-y md:touch-auto cursor-grab active:cursor-grabbing"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {/* Swipe Indicator Dots (Visible on mobile only, md:hidden) */}
                {images.length > 1 && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10 md:hidden p-2 bg-slate-950/5 rounded-full backdrop-blur-sm">
                        {images.map((_, dotIdx) => (
                            <div
                                key={dotIdx}
                                className={`w-2.5 h-2.5 rounded-full border border-slate-950/30 transition-colors duration-300 ${
                                    index === dotIdx ? 'bg-slate-950' : 'bg-transparent'
                                }`}
                            />
                        ))}
                    </div>
                )}

                <img 
                    src={images[index]} 
                    alt="Product preview" 
                    // mix-blend-multiply added to drop white background
                    // select-none prevents users from accidentally "dragging" the image instead of swiping
                    className="w-full h-full object-contain mix-blend-multiply select-none pointer-events-none"
                />
            </div>
            
            {/* Thumbnail Grid Selector for multi-pics - unchanged, still valid for desktop/tapping */}
            <div className="flex gap-4 overflow-x-auto py-2">
                {images.map((url, idx) => (
                    <div 
                        key={idx} 
                        onClick={() => setIndex(idx)}
                        className={`w-24 h-24 bg-transparent rounded-lg overflow-hidden border-2 cursor-pointer flex-shrink-0 p-1 transition-all
                            ${index === idx ? 'border-slate-950 scale-95 shadow-sm' : 'border-transparent hover:border-gray-300'}`}
                    >
                        {/* mix-blend-multiply to the thumbnails as well */}
                        <img 
                            src={url} 
                            alt="" 
                            className="w-full h-full object-cover rounded-md mix-blend-multiply" 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductImages;