import { useState } from 'react'

const images = [
    { id: 1, url: '/4.jpg' },
    { id: 2, url: '/5.jpg' },
    { id: 3, url: '/6.jpg' },
];

const ProductImages = () => {
    const [index, setIndex] = useState(0);
    
    return (
        <div className=''>
            <div className='h-[500px] relative'>
                <img 
                    src={images[index].url} 
                    alt='Product main view' 
                    className='w-full h-full object-cover rounded-md' 
                />
            </div>
            <div className='flex justify-between gap-4 mt-8'>
                {images.map((img, i) => (
                    <div 
                        className='w-1/4 h-32 relative cursor-pointer' 
                        key={img.id} 
                        onClick={() => setIndex(i)}
                    >
                        <img 
                            src={img.url} 
                            alt={`Product thumbnail ${i + 1}`} 
                            className='w-full h-full object-cover rounded-md' 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductImages;