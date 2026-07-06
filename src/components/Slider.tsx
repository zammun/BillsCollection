"use client";

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

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  // Navigation functions
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className='h-[calc(100vh-80px)] overflow-hidden relative'>
      <div className='w-max h-full flex transition-all ease-in-out duration-1000'
        style={{ transform: `translateX(-${current * 100}vw)` }} >
        {slides.map((slide) => (
          <div
            className={`${slide.bg} w-screen h-full relative flex justify-center items-center`}
            key={slide.id}
          >
            <Image src={slide.img} alt='' fill sizes="100vw" style={{ objectFit: "cover" }} quality={100} />
            <div className='absolute p-4 text-center'>
              <h2 className='text-lg lg:text-xl text-white mb-10'>{slide.description}</h2>
              <h1 className='text-4xl lg:text-6xl font-semibold text-white mb-10'>{slide.title}</h1>
              <Link href={slide.url}>
                <button className='rounded-md bg-white text-black py-3 px-6 hover:bg-slate-600 hover:text-white transition-colors'>Shop Now</button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Increased size for better mobile accessibility */}
        <div className="absolute top-1/2 left-4 md:left-8 cursor-pointer z-10" onClick={prevSlide}>
            <div className="bg-white/50 p-3 md:p-4 rounded-full hover:bg-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6"/>
                </svg>
            </div>
        </div>
        <div className="absolute top-1/2 right-4 md:right-8 cursor-pointer z-10" onClick={nextSlide}>
            <div className="bg-white/50 p-3 md:p-4 rounded-full hover:bg-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"/>
                </svg>
            </div>
        </div>

      {/* Dots */}
      <div className='absolute m-auto left-1/2 bottom-8 flex gap-4 transform -translate-x-1/2'>
        {slides.map((slide, index) => (
          <div className={`w-3 h-3 rounded-full ring-1 ring-white cursor-pointer ${current === index ? "scale-150 bg-white" : ""}`}
            key={slide.id}
            onClick={() => setCurrent(index)}>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;