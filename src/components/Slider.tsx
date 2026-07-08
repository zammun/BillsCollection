import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    title: "Welcome to Bills Collection.",
    description: "Discover our latest collection of clothing. Quality, style, and unique designs.",
    img: "/1.jpg",
    url: '/list', 
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50"
  },
  {
    id: 2,
    title: "Winter Sale Collection",
    description: "Sale! Up to 50% off! Shop now and get the best deals on winter clothing.", 
    img: "/2.jpg",
    url: '/list?type=outerwear', 
    bg: "bg-gradient-to-r from-blue-50 to-green-50",
  },
  {
    id: 3,
    title: "New Arrivals",
    description: "Shop our latest collection.",
    img: "/4.jpg",
    url: '/list?sort=date-desc', 
    bg: 'bg-gradient-to-r from-yellow-50 to-blue-50',
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);
  /* FIXED: Added landing page entrance animation flag */
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger the overall component animation immediately on mount
    setIsLoaded(true);

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  return (
    /* FIXED: The entire slider component now smoothly scales and lifts up when landing on the page */
    <div className={`h-[calc(100vh-80px)] overflow-hidden relative transition-all duration-[1200ms] ease-out transform will-change-transform
      ${isLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-[0.98]"}`}
    >
      {/* Horizontal Filmstrip Wrapper */}
      <div className='w-max h-full flex transition-all ease-in-out duration-1000 will-change-transform'
        style={{ transform: `translateX(-${current * 100}vw)` }} >
        {slides.map((slide, index) => {
          const isActive = current === index;

          return (
            <div
              className={`${slide.bg} w-screen h-full relative flex justify-center items-center`}
              key={slide.id}
            >
              <img src={slide.img} alt='' className='w-full h-full object-cover' />
              
              <div className='absolute p-4 text-center z-10 max-w-3xl flex flex-col items-center justify-center overflow-hidden'>
                
                {/* 1. Subtitle (Optimized layout performance: removed blur filter entirely) */}
                <h2 className={`text-lg lg:text-xl text-white mb-6 drop-shadow-md transition-all duration-700 ease-out transform will-change-transform
                  ${isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12"}`}
                  style={{ transitionDelay: isActive ? '500ms' : '0ms' }}
                >
                  {slide.description}
                </h2>
                
                {/* 2. Main Title (Optimized layout performance: removed expensive tracking/blur adjustments) */}
                <h1 className={`text-4xl lg:text-6xl font-extrabold text-white mb-12 drop-shadow-lg transition-all duration-700 ease-out transform tracking-tight will-change-transform
                  ${isActive ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-16 scale-95"}`}
                  style={{ transitionDelay: isActive ? '650ms' : '0ms' }}
                >
                  {slide.title}
                </h1>
                
                {/* 3. Action Shop Target Button */}
                <Link 
                  to={slide.url}
                  className={`transition-all duration-500 ease-out transform will-change-transform
                    ${isActive ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-90"}`}
                  style={{ transitionDelay: isActive ? '850ms' : '0ms' }}
                >
                  <button className='rounded-md bg-white text-black py-3.5 px-10 hover:bg-slate-600 hover:text-white font-bold text-xs tracking-widest uppercase transition-all cursor-pointer shadow-lg active:scale-95 duration-300'>
                    Shop Now
                  </button>
                </Link>
              </div>

              <div className="absolute inset-0 bg-black/30 pointer-events-none" />
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 left-4 md:left-8 cursor-pointer z-10 -translate-y-1/2" onClick={prevSlide}>
          <div className="bg-white/50 p-3 md:p-4 rounded-full hover:bg-white text-slate-900 transition-colors duration-300 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6"/>
              </svg>
          </div>
      </div>
      <div className="absolute top-1/2 right-4 md:right-8 cursor-pointer z-10 -translate-y-1/2" onClick={nextSlide}>
          <div className="bg-white/50 p-3 md:p-4 rounded-full hover:bg-white text-slate-900 transition-colors duration-300 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"/>
              </svg>
          </div>
      </div>

      {/* Dots */}
      <div className='absolute m-auto left-1/2 bottom-8 flex gap-4 transform -translate-x-1/2 z-10'>
        {slides.map((slide, index) => (
          <div className={`w-3 h-3 rounded-full ring-1 ring-white cursor-pointer transition-all duration-300 ${current === index ? "scale-125 bg-white" : "bg-white/40"}`}
            key={slide.id}
            onClick={() => setCurrent(index)}>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;