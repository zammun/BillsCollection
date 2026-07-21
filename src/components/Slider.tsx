import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    title: "Welcome to Bills Collection.",
    description: "Quality, style, and unique designs.",
    img: "/1.jpg",
    url: '/list', 
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50"
  },
  {
    id: 2,
    title: "Winter Sale Collection",
    description: "Shop now and get the best deals on our winter selection.", 
    img: "/2.jpg",
    url: '/list?type=outerwear', 
    bg: "bg-gradient-to-r from-blue-50 to-green-50",
  },
  {
    id: 3,
    title: "New Arrivals",
    description: "Take a look at our latest collection.",
    img: "/4.jpg",
    url: '/list?sort=date-desc', 
    bg: 'bg-gradient-to-r from-yellow-50 to-blue-50',
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Touch tracking state for swipe gestures
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  useEffect(() => {
    setIsLoaded(true);

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 20000);
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
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div 
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className={`h-[calc(100dvh-80px)] overflow-hidden relative transition-all duration-[1200ms] ease-out transform will-change-transform
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
              
              {/* Positioned text blocks down on mobile, centered on desktop */}
              <div className='absolute w-full px-6 text-center z-10 max-w-3xl flex flex-col items-center bottom-28 md:bottom-auto md:top-1/2 md:-translate-y-1/2'>
                
                {/* Title using Outfit display font */}
                <h1 className={`text-4xl lg:text-6xl font-display font-extrabold text-white mb-4 drop-shadow-xl transition-all duration-700 ease-out transform tracking-tight will-change-transform
                  ${isActive ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-16 scale-95"}`}
                  style={{ transitionDelay: isActive ? '500ms' : '0ms' }}
                >
                  {slide.title}
                </h1>

                {/* Description */}
                <h2 className={`text-sm md:text-lg lg:text-xl text-white/90 mb-8 max-w-lg drop-shadow-md transition-all duration-700 ease-out transform will-change-transform
                  ${isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12"}`}
                  style={{ transitionDelay: isActive ? '650ms' : '0ms' }}
                >
                  {slide.description}
                </h2>
                
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
      <div className="hidden md:block absolute top-1/2 left-8 cursor-pointer z-10 -translate-y-1/2" onClick={prevSlide}>
          <div className="bg-white/50 p-4 rounded-full hover:bg-white text-slate-900 transition-colors duration-300 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6"/>
              </svg>
          </div>
      </div>
      <div className="hidden md:block absolute top-1/2 right-8 cursor-pointer z-10 -translate-y-1/2" onClick={nextSlide}>
          <div className="bg-white/50 p-4 rounded-full hover:bg-white text-slate-900 transition-colors duration-300 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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