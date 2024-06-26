"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";


const slides = [
    {
        id: 1,
        title: "Welcome to Bill's Collection",
        description: "Discover our latest collection of clothing. Quality, style, and unique designs.",
        img: "/1.jpg",
        url: '/',
        bg: "bg-gradient-to-r from-yellow-50 to-pink-50"
    },
    {
        id: 2,
        title: "Winter Sale Collection",
        description: "Sale! Up to 50% off! Shop now and get the best deals on winter clothing.",
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

// useEffect(() => {
//     const interval = setInterval(() => {
//         setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
//     }, 7000);
//     return () => clearInterval(interval);
// }, []);

    return (
        <div className='h-[calc(100vh-80px)] overflow-hidden'>
            <div className='w-max h-full flex transition-all ease-in-out duration-1000'
            style={{transform:`translateX(-${current * 100}vw)`}} >
                {slides.map((slide) => (
                    <div 
                    className={`${slide.bg} w-screen h-full flex flex-col gap-16 xl:flex-row`} 
                    key={slide.id}
                    >
                        {/*  Text Container */}
                        <div className='h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center'>
                            <h2 className='text-xl lg:text-3xl 2xl:text-5xl'>{slide.description}</h2>
                            <h1 className='text-5xl lg:text-6xl 2xl:text-8xl font-semibold'>{slide.title}</h1>
                            <Link href={slide.url}>
                                <button className='rounded-md bg-black text-white py-3 px-4'>Shop Now</button>
                            </Link>
                        </div>
                        {/* Image Container */}
                        <div className='h-1/2 xl:w-1/2 xl:h-full relative'>
                            <Image src={slide.img} alt='' fill sizes='100%' className='object-cover'/>
                        </div>
                    </div>
                ))}
            </div>
            <div className='absolute m-auto left-1/2 bottom-8 flex gap-4'>
                {slides.map((slide, index) => (
                    <div className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
                        current === index ? "scale-150" : ""}`} 
                    key={slide.id}
                    onClick={() => setCurrent(index)}>
                        { current === index && (<div className='w-[6px] h-[6px] bg-gray-600 rounded-full'></div>
                )}
                </div>
            ))}
            </div>
            </div>
    );
};

export default Slider;