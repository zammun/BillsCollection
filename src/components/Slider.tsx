import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    title: "Welcome to Bills Collection.",
    subtitle: "EST. 2023",
    description: "Quality, style, and unique designs.",
    img: "/1.jpg",
    url: '/list', 
  },
  {
    id: 2,
    title: "Winter Collection",
    subtitle: "LIMITED DROP",
    description: "Shop exclusive pieces from our seasonal outerwear archive.", 
    img: "/2.jpg",
    url: '/list?type=Hoodie', 
  },
  {
    id: 3,
    title: "New Arrivals",
    subtitle: "JUST LANDED",
    description: "Discover modern essentials curated for everyday wear.",
    img: "/4.jpg",
    url: '/list?sort=date-desc', 
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const diffX = touchStartX.current - touchEndX;
    const diffY = touchStartY.current - touchEndY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) nextSlide();
      else prevSlide();
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div 
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      /* Restored large height using static vh to prevent reflow stutter */
      className="h-[calc(100vh-80px)] min-h-[600px] md:h-[calc(100vh-96px)] overflow-hidden relative touch-pan-y"
    >
      {/* Horizontal Slider Wrapper using percentage transforms for GPU acceleration */}
      <div 
        className="w-full h-full flex transition-transform ease-in-out duration-700 transform-gpu"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => {
          const isActive = current === index;

          return (
            <div className="w-full h-full flex-shrink-0 relative flex justify-center items-center" key={slide.id}>
              <img 
                src={slide.img} 
                alt={slide.title} 
                className="w-full h-full object-cover" 
                loading={index === 0 ? "eager" : "lazy"}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 pointer-events-none" />

              {/* Positioned higher on mobile (bottom-28) to avoid Safari/Chrome bottom bar overlay */}
              <div className="absolute w-full px-6 text-center z-10 max-w-5xl flex flex-col items-center bottom-28 md:bottom-auto md:top-1/2 md:-translate-y-1/2">
                
                <span className={`text-xs md:text-sm font-semibold tracking-[0.25em] text-[#d4af37] uppercase mb-3 transition-all duration-500 ease-out transform-gpu
                  ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                >
                  {slide.subtitle}
                </span>

                <h1 className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black text-white mb-4 drop-shadow-2xl tracking-tight leading-[0.95] transition-all duration-500 ease-out transform-gpu
                  ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                >
                  {slide.title}
                </h1>

                <p className={`text-sm md:text-lg text-slate-200 mb-8 max-w-md font-medium drop-shadow-md transition-all duration-500 ease-out transform-gpu
                  ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                >
                  {slide.description}
                </p>
                
                <Link 
                  to={slide.url}
                  className={`transition-all duration-500 ease-out transform-gpu ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                >
                  <button className="bg-[#faf8f5] hover:bg-[#e6e4dc] border border-[#e2e0d9] text-zinc-900 rounded-full px-8 py-3 font-bold transition-all shadow-md active:scale-95 cursor-pointer">
                    Explore Collection
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="hidden md:flex absolute top-1/2 left-8 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass-panel border border-white/20 items-center justify-center text-zinc-900 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg cursor-pointer"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
      </button>

      <button 
        onClick={nextSlide}
        className="hidden md:flex absolute top-1/2 right-8 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass-panel border border-white/20 items-center justify-center text-zinc-900 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg cursor-pointer"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute left-1/2 bottom-8 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((slide, index) => (
          <button 
            key={slide.id}
            onClick={() => setCurrent(index)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${current === index ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/70"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;