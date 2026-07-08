import Slider from "../components/Slider";
import ProductList from "../components/ProductList";
import Filter from "../components/Filter";

const HomePage = () => {
  return (
    <div className=''>
      {/* Slider is back and locked to the top layout frame */}
      <Slider />
      
      {/* The Filter Component */}
      <div className=''><Filter /></div>
      
      {/* The Reactive Product List */}
      <div className='mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64'>
        <h1 className='text-2xl font-bold'>Shop All</h1>
        <ProductList />
      </div>
      
      {/* Lifestyle Collage Section */}
      <div className="mt-32 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-24">
        <h1 className="text-2xl font-bold mb-12">Lifestyle</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[250px] md:auto-rows-[300px]">
          <div className="col-span-2 row-span-2 relative group overflow-hidden rounded-xl bg-slate-900">
            <img src="/15.jpg" alt="Lifestyle 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90" />
          </div>
          
          <div className="relative group overflow-hidden rounded-xl bg-slate-900">
            <img src="/14.jpg" alt="Lifestyle 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90" />
          </div>
          <div className="relative group overflow-hidden rounded-xl bg-slate-900">
            <img src="/11.jpg" alt="Lifestyle 3" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90" />
          </div>
          
          <div className="col-span-2 relative group overflow-hidden rounded-xl bg-slate-900">
            <img src="/7.jpg" alt="Lifestyle 4" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;