import { useState } from "react";

// This interface explicitly tells TypeScript that 'images' is a valid prop
interface ProductImagesProps {
    images: string[];
}

const ProductImages = ({ images }: ProductImagesProps) => {
    const [index, setIndex] = useState(0);

    if (!images || images.length === 0) {
        return <div className="w-full h-80 bg-transparent rounded-md animate-pulse" />;
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Main Featured Image Display */}
            <div className="h-[500px] relative bg-transparent rounded-xl overflow-hidden p-4 flex items-center justify-center">
                <img 
                    src={images[index]} 
                    alt="Product preview" 
                    // Added mix-blend-multiply here to dynamically drop the white background
                    className="w-full h-full object-contain mix-blend-multiply"
                />
            </div>
            
            {/* Thumbnail Grid Selector for multi-pics */}
            <div className="flex gap-4 overflow-x-auto py-2">
                {images.map((url, idx) => (
                    <div 
                        key={idx} 
                        onClick={() => setIndex(idx)}
                        className={`w-24 h-24 bg-transparent rounded-lg overflow-hidden border-2 cursor-pointer flex-shrink-0 p-1 transition-all
                            ${index === idx ? 'border-slate-950 scale-95 shadow-sm' : 'border-transparent hover:border-gray-300'}`}
                    >
                        {/* Added mix-blend-multiply to the thumbnails as well */}
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