import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    title: "Welcome to Bills Collection.",
    subtitle: "EST. 2023",
    description: "Quality, style, and unique designs.",
    img: "/1.jpg",
    url: '/list', 
    position: "object-center"
  },
  {
    id: 2,
    title: "Winter Collection",
    subtitle: "LIMITED DROP",
    description: "Shop exclusive pieces from our seasonal outerwear archive.", 
    img: "/2.jpg",
    url: '/list?type=Hoodie', 
    position: "md:object-[50%_35%] object-center"
  },
  {
    id: 3,
    title: "New Arrivals",
    subtitle: "JUST LANDED",
    description: "Discover modern essentials curated for everyday wear.",
    img: "/4.jpg",
    url: '/list?sort=date-desc', 
    position: "object-center"
  },
];

// 1. Create clones for infinite scrolling (Last Slide -> Real Slides -> First Slide)
const extendedSlides = [
  { ...slides[slides.length - 1], id: 'clone-last' },
  ...slides,
  { ...slides[0], id: 'clone-first' }
];

const Slider = () => {
  const [current, setCurrent] = useState(1); 
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Instantly jump to the first REAL slide on component mount only
  useLayoutEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const width = container.offsetWidth;
      if (width > 0) {
        container.scrollLeft = width * current;
      } else {
        requestAnimationFrame(() => {
          if (container) {
            container.scrollLeft = container.offsetWidth * current;
          }
        });
      }
    }
  }, []); // Removed [current] dependency to prevent jitter on slide change

  // Snap tightly aligned on browser window resizes
  useEffect(() => {
    const handleResize = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = scrollContainerRef.current.offsetWidth * current;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [current]);

  // Auto-advance interval
  useEffect(() => {
    const interval = setInterval(() => {
      scrollToSlide(current + 1);
    }, 8000); 
    return () => clearInterval(interval);
  }, [current]);

  // INSTANT SCROLL & INFINITE LOOP TELEPORT: Zero lag, zero rewind glitch
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollPosition = container.scrollLeft;
    const slideWidth = container.offsetWidth;
    if (slideWidth === 0) return;
    
    // Update active indicators/animations
    const newIndex = Math.round(scrollPosition / slideWidth);
    if (newIndex !== current) setCurrent(newIndex);

    // The Invisible Cut: If user swipes onto a clone, teleport instantly to the real slide
    if (scrollPosition <= 0) {
      container.scrollLeft = slideWidth * slides.length;
    } else if (scrollPosition >= slideWidth * (slides.length + 1) - 1) { // -1 accounts for sub-pixel rendering
      container.scrollLeft = slideWidth;
    }
  };

  // Programmatic scroll (used for buttons and auto-advance)
  const scrollToSlide = (index: number) => {
    if (!scrollContainerRef.current) return;
    const slideWidth = scrollContainerRef.current.offsetWidth;
    scrollContainerRef.current.scrollTo({ 
      left: slideWidth * index, 
      behavior: 'smooth' 
    });
  };

  const prevSlide = () => scrollToSlide(current - 1);
  const nextSlide = () => scrollToSlide(current + 1);

  return (
    <div className="h-[100vh] min-h-[600px] max-h-[1050px] md:h-screen md:min-h-[700px] md:max-h-none overflow-hidden relative">
      
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-none"
      >
        {extendedSlides.map((slide, index) => {
          
          // Keeps clones and real slides perfectly synchronized so they teleport invisibly
          const isActive = 
            index === current || 
            (current === 0 && index === slides.length) || 
            (current === slides.length + 1 && index === 1) ||
            (current === 1 && index === slides.length + 1) ||
            (current === slides.length && index === 0);

          return (
            <div className="w-full h-full flex-shrink-0 relative flex justify-center items-center snap-center snap-always overflow-hidden" key={`${slide.id}-${index}`}>
              
              <img 
                src={slide.img} 
                alt={slide.title} 
                className={`w-full h-full object-cover transition-transform duration-[12s] ease-out transform-gpu
                  ${isActive ? "scale-[1.15]" : "scale-100"} ${slide.position || 'object-center'}`} 
                loading={index === 1 ? "eager" : "lazy"}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 pointer-events-none" />

              <div className="absolute w-full px-6 text-center z-10 max-w-5xl flex flex-col items-center bottom-28 md:bottom-1000 md:top-1/2 md:-translate-y-1/2">
                
                <span className={`text-xs md:text-sm font-semibold text-[#d4af37] uppercase mb-2 md:mb-3 transition-all duration-1000 delay-100 ease-out transform-gpu
                  ${isActive ? "opacity-100 translate-y-0 tracking-[0.25em] blur-0" : "opacity-0 translate-y-10 tracking-[1em] blur-md"}`}
                >
                  {slide.subtitle}
                </span>

                <h1 className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black text-white mb-3 md:mb-4 drop-shadow-2xl leading-[1] md:leading-[0.95] transition-all duration-1000 delay-300 ease-[cubic-bezier(0.25,1,0.5,1)] transform-gpu
                  ${isActive ? "opacity-100 translate-y-0 scale-100 blur-0" : "opacity-0 translate-y-16 scale-90 blur-lg"}`}
                >
                  {slide.title}
                </h1>

                <p className={`text-xs sm:text-sm md:text-lg text-slate-200 mb-6 md:mb-8 max-w-md font-medium drop-shadow-md transition-all duration-1000 delay-500 ease-out transform-gpu
                  ${isActive ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-12 blur-md"}`}
                >
                  {slide.description}
                </p>
                
                <Link 
                  to={slide.url}
                  className={`transition-all duration-1000 delay-700 ease-out transform-gpu ${isActive ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-10 blur-sm"}`}
                >
                  <button className="bg-[#faf8f5] hover:bg-[#b8b5a6] border border-[#e2e0d9] hover:border-[#c4c2b7] text-zinc-900 rounded-full px-6 py-2.5 md:px-8 md:py-3 text-sm md:text-base font-bold transition-all shadow-md active:scale-95 cursor-pointer">
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
        {slides.map((slide, index) => {
          const indicatorIndex = index + 1;
          const isActiveIndicator = current === 0 ? indicatorIndex === slides.length : current === slides.length + 1 ? indicatorIndex === 1 : current === indicatorIndex;
          
          return (
            <button 
              key={slide.id}
              onClick={() => scrollToSlide(indicatorIndex)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${isActiveIndicator ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/70"}`}
              aria-label={`Go to slide ${indicatorIndex}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Slider;