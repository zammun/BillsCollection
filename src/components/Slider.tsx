import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    title: "Welcome to Bills Collection.",
    subtitle: "EST. 2026",
    description: "Quality, style, and unique architectural designs.",
    img: "/1.jpg",
    url: '/list', 
  },
  {
    id: 2,
    title: "Winter Sale Collection",
    subtitle: "LIMITED DROP",
    description: "Shop exclusive pieces from our seasonal outerwear archive.", 
    img: "/2.jpg",
    url: '/list?type=outerwear', 
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
  const [isLoaded, setIsLoaded] = useState(false);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  useEffect(() => {
    setIsLoaded(true);

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) nextSlide();
    else if (distance < -minSwipeDistance) prevSlide();
  };

  return (
    <div 
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className={`h-[calc(100dvh-80px)] overflow-hidden relative transition-all duration-1000 ease-out
      ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {/* Horizontal Slider Wrapper */}
      <div 
        className='w-max h-full flex transition-transform ease-in-out duration-1000'
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide, index) => {
          const isActive = current === index;

          return (
            <div className="w-screen h-full relative flex justify-center items-center" key={slide.id}>
              <img src={slide.img} alt={slide.title} className='w-full h-full object-cover' />
              
              {/* Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 pointer-events-none" />

              {/* Content Overlay */}
              <div className='absolute w-full px-6 text-center z-10 max-w-4xl flex flex-col items-center bottom-24 md:bottom-auto md:top-1/2 md:-translate-y-1/2'>
                
                {/* Subtitle / Tag */}
                <span className={`text-xs md:text-sm font-semibold tracking-[0.25em] text-amber-300 uppercase mb-3 transition-all duration-700 ease-out
                  ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: isActive ? '300ms' : '0ms' }}
                >
                  {slide.subtitle}
                </span>

                {/* Editorial Heading */}
                <h1 className={`text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white mb-4 drop-shadow-2xl transition-all duration-700 ease-out
                  ${isActive ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"}`}
                  style={{ transitionDelay: isActive ? '450ms' : '0ms' }}
                >
                  {slide.title}
                </h1>

                {/* Subheading */}
                <p className={`text-sm md:text-lg text-slate-200 mb-8 max-w-md font-medium drop-shadow-md transition-all duration-700 ease-out
                  ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: isActive ? '600ms' : '0ms' }}
                >
                  {slide.description}
                </p>
                
                {/* CTA Button */}
                <Link 
                  to={slide.url}
                  className={`transition-all duration-500 ease-out
                    ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: isActive ? '750ms' : '0ms' }}
                >
                  <button className='rounded-full bg-white text-slate-950 px-9 py-4 font-bold text-xs tracking-[0.2em] uppercase hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95 cursor-pointer border border-white/20'>
                    Explore Collection
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modern Minimal Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="hidden md:flex absolute top-1/2 left-8 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass-panel border border-white/20 items-center justify-center text-slate-900 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg cursor-pointer"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
      </button>

      <button 
        onClick={nextSlide}
        className="hidden md:flex absolute top-1/2 right-8 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass-panel border border-white/20 items-center justify-center text-slate-900 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg cursor-pointer"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className='absolute left-1/2 bottom-8 -translate-x-1/2 z-20 flex gap-3'>
        {slides.map((slide, index) => (
          <button 
            key={slide.id}
            onClick={() => setCurrent(index)}
            className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${current === index ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/70"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;