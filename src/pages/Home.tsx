import Slider from "../components/Slider";
import ProductList from "../components/ProductList";
import Filter from "../components/Filter";
import ScrollReveal from "../components/ScrollReveal";

const HomePage = () => {
  return (
    <div className="pb-24">
      <Slider />
      
      <div className="mt-8"><Filter /></div>
      
      {/* 1. Product Grid Section */}
      <ScrollReveal>
        <div className="mt-16 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">Shop All</h1>
          <ProductList />
        </div>
      </ScrollReveal>
      
      {/* 2. Lifestyle Collage Section */}
      <div className="mt-32 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <ScrollReveal>
          <h1 className="text-2xl md:text-3xl font-bold mb-10 tracking-tight text-slate-900">Lifestyle</h1>
        </ScrollReveal>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] sm:auto-rows-[260px] md:auto-rows-[320px]">
          
          {/* Box 1 - Large Feature Hero */}
          <div className="col-span-2 row-span-2 relative group overflow-hidden rounded-2xl bg-slate-950 shadow-xs">
            <ScrollReveal className="h-full w-full">
              <img 
                src="/15.jpg" 
                alt="Casual Fridays" 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out md:group-hover:scale-[1.02] opacity-85 md:group-hover:opacity-75" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 text-white z-10">
                <p className="text-xs uppercase tracking-widest font-bold text-slate-300 mb-1">New Drop</p>
                <h2 className="text-xl font-black md:text-3xl tracking-tight">Stay Tuned For More Action...</h2>
              </div>
            </ScrollReveal>
          </div>
          
          {/* Box 2 - Top Right Stack Card */}
          <div className="relative group overflow-hidden rounded-2xl bg-slate-950 shadow-xs">
            <ScrollReveal delay="delay-100" className="h-full w-full">
              <img 
                src="/14.jpg" 
                alt="Outerwear" 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out md:group-hover:scale-[1.05] opacity-85 md:group-hover:opacity-75" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 pointer-events-none" />
              <div className="absolute bottom-4 left-4 text-white z-10">
                <span className="font-bold tracking-tight text-sm md:text-base">Outerwear</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Box 3 - Bottom Right Stack Card */}
          <div className="relative group overflow-hidden rounded-2xl bg-slate-950 shadow-xs">
            <ScrollReveal delay="delay-200" className="h-full w-full">
              <img 
                src="/11.jpg" 
                alt="Dapper" 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out md:group-hover:scale-[1.05] opacity-85 md:group-hover:opacity-75" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 pointer-events-none" />
              <div className="absolute bottom-4 left-4 text-white z-10">
                <span className="font-bold tracking-tight text-sm md:text-base">Easy Money Sniper</span>
              </div>
            </ScrollReveal>
          </div>
          
          {/* Box 4 - Wide Horizontal Banner */}
          <div className="col-span-2 relative group overflow-hidden rounded-2xl bg-slate-950 shadow-xs">
            <ScrollReveal delay="delay-300" className="h-full w-full">
              <img 
                src="/6.jpg" 
                alt="Lookbook" 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out md:group-hover:scale-[1.02] opacity-85 md:group-hover:opacity-75" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 left-6 flex flex-col justify-center text-white z-10">
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-300 mb-0.5">Seasonal</p>
                <h2 className="text-lg md:text-xl font-bold tracking-tight">We Got the Goods</h2>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HomePage;