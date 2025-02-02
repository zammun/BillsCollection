"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

const slides = [
    {
        id: 1,
        title: "Welcome to Bill's Collection.",
        description: "Discover our latest collection of clothing. Quality, style, and unique designs.",
        img: "/1.jpg",
        url: '/',
        bg: "bg-gradient-to-r from-yellow-50 to-pink-50"
    },
    {
        id: 2,
        title: "Winter Sale Collection",
        description: "Sale! Up to 0% off! Shop now and get the best deals on winter clothing.",
        img: "/2.jpg",
        url: '/',
        bg: "bg-gradient-to-r from-blue-50 to-green-50",
    },
    {
        id: 3,
        title: "New Arrivals",
        description: "Shop our latest collection.",
        img: "/4.jpg",
        url: '/',
        bg: 'bg-gradient-to-r from-yellow-50 to-blue-50',
    },
];
const Slider = () => {
    const [current, setCurrent] = useState(0);

    return (
        <div className='h-[calc(50vh-40px)] overflow-hidden'> {/* Adjusted height */}
            <div className='w-max h-full flex transition-all ease-in-out duration-1000'
            style={{transform:`translateX(-${current * 100}vw)`}} >
                {slides.map((slide) => (
                    <div 
                    className={`${slide.bg} w-screen h-full relative flex justify-center items-center`} 
                    key={slide.id}
                    >
                        {/* Image Container */}
                        <Image src={slide.img} alt='' layout='fill' objectFit='cover' className='' quality={100}/>
                        {/* Text Container */}
                        <div className='absolute p-4 md:p-8 lg:p-12 text-center'>
                            <h2 className='text-lg md:text-lg lg:text-xl xl:text-3xl text-white mb-10'>{slide.description}</h2> {/* Adjusted text size */}
                            <h1 className='text-3xl md:text-3xl lg:text-4xl xl:text-6xl font-semibold text-white mb-10'>{slide.title}</h1> {/* Adjusted text size */}
                            <Link href={slide.url}>
                                <button className='mt-4 rounded-md bg-white text-black py-2 px-4 md:py-3 md:px-6 hover:bg-slate-600 hover:text-gray-50 transition-colors duration-300'>Shop Now</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className='absolute m-auto left-1/2 bottom-8 flex gap-4 transform -translate-x-1/2'>
                {slides.map((slide, index) => (
                    <div className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer ${current === index ? "scale-150 bg-gray-600" : ""}`} 
                    key={slide.id}
                    onClick={() => setCurrent(index)}>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Slider;