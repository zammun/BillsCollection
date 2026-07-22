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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-advance interval (resets whenever the slide changes so it doesn't fight manual swipes)
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = current === slides.length - 1 ? 0 : current + 1;
      scrollToSlide(nextIndex);
    }, 8000); 
    return () => clearInterval(interval);
  }, [current]);

  // DEBOUNCED SCROLL: This is the magic fix for the mobile stutter.
  // It prevents React from re-rendering the heavy DOM *during* the swipe.
  const handleScroll = () => {
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    
    scrollTimeout.current = setTimeout(() => {
      if (!scrollContainerRef.current) return;
      const scrollPosition = scrollContainerRef.current.scrollLeft;
      const slideWidth = scrollContainerRef.current.offsetWidth;
      if (slideWidth === 0) return;
      
      const newIndex = Math.round(scrollPosition / slideWidth);
      if (newIndex !== current) {
        setCurrent(newIndex);
      }
    }, 100); // Waits 100ms after scroll stops before firing animations
  };

  const scrollToSlide = (index: number) => {
    if (!scrollContainerRef.current) return;
    const slideWidth = scrollContainerRef.current.offsetWidth;
    scrollContainerRef.current.scrollTo({
      left: slideWidth * index,
      behavior: 'smooth'
    });
    setCurrent(index); // Immediate update for button clicks
  };

  const prevSlide = () => {
    const nextIndex = current === 0 ? slides.length - 1 : current - 1;
    scrollToSlide(nextIndex);
  };

  const nextSlide = () => {
    const nextIndex = current === slides.length - 1 ? 0 : current + 1;
    scrollToSlide(nextIndex);
  };

  // Height reduced to 80vh on mobile to ensure room at the bottom for page scrolling
  return (
    <div className="h-[80vh] min-h-[480px] max-h-[800px] md:h-[calc(100vh-96px)] md:min-h-[600px] md:max-h-none overflow-hidden relative">
      
      {/* Native CSS Scroll Snapping (touch utility classes removed entirely) */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-none"
        style={{ scrollBehavior: 'smooth' }}
      >
        {slides.map((slide, index) => {
          const isActive = current === index;

          return (
            <div className="w-full h-full flex-shrink-0 relative flex justify-center items-center snap-center snap-always overflow-hidden" key={slide.id}>
              
              {/* Subtle slow-zoom animation on the active image */}
              <img 
                src={slide.img} 
                alt={slide.title} 
                className={`w-full h-full object-cover transition-transform duration-[8s] ease-out transform-gpu
                  ${isActive ? "scale-105" : "scale-100"}`} 
                loading={index === 0 ? "eager" : "lazy"}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 pointer-events-none" />

              {/* Staggered text animations triggered when slide becomes active */}
              <div className="absolute w-full px-6 text-center z-10 max-w-5xl flex flex-col items-center top-1/2 -translate-y-1/2">
                
                <span className={`text-xs md:text-sm font-semibold tracking-[0.25em] text-[#d4af37] uppercase mb-2 md:mb-3 transition-all duration-700 delay-100 ease-out transform-gpu
                  ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                >
                  {slide.subtitle}
                </span>

                <h1 className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black text-white mb-3 md:mb-4 drop-shadow-2xl tracking-tight leading-[1] md:leading-[0.95] transition-all duration-700 delay-200 ease-out transform-gpu
                  ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                  {slide.title}
                </h1>

                <p className={`text-xs sm:text-sm md:text-lg text-slate-200 mb-6 md:mb-8 max-w-md font-medium drop-shadow-md transition-all duration-700 delay-300 ease-out transform-gpu
                  ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                >
                  {slide.description}
                </p>
                
                <Link 
                  to={slide.url}
                  className={`transition-all duration-700 delay-500 ease-out transform-gpu ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                >
                  <button className="bg-[#faf8f5] hover:bg-[#e6e4dc] border border-[#e2e0d9] text-zinc-900 rounded-full px-6 py-2.5 md:px-8 md:py-3 text-sm md:text-base font-bold transition-all shadow-md active:scale-95 cursor-pointer">
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
      <div className="absolute left-1/2 bottom-6 md:bottom-8 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((slide, index) => (
          <button 
            key={slide.id}
            onClick={() => scrollToSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${current === index ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/70"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;