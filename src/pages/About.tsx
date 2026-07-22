export default function AboutPage() {
  return (
    <div className="suave-luxury-theme text-zinc-800 py-12 md:py-16 pb-20 px-6 font-sans antialiased">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight">
            About <span className="text-[#d4af37]">Bills Collection</span>
          </h1>
          <p className="text-base md:text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Crafting the perfect balance between modern aesthetics and everyday comfort.
          </p>
        </div>

        {/* Story & Heritage Card */}
        <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 md:p-12 shadow-xl space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
            Our Story & Vision
          </span>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
            Redefining Wardrobe Essentials
          </h2>
          <div className="space-y-4 text-zinc-600 leading-relaxed text-sm md:text-base">
            <p>
              Welcome to Bills Collection. We are a dedicated team focused on bringing 
              quality, style, and unique designs to your wardrobe. Our mission is to 
              provide clothing that balances modern aesthetics with everyday comfort.
            </p>
            <p>
              Founded with a passion for creative expression, Bills Collection was born 
              out of a desire to create pieces that tell a story. Whether you are looking 
              for your next favorite outfit or timeless essentials, we strive to ensure 
              that every item in our catalog meets the highest standards.
            </p>
          </div>
        </div>

        {/* Pillars of Commitment Section */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
              Pillars of Excellence
            </span>
            <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
              Our Commitment
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-lg space-y-2">
              <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">Quality</span>
              <h3 className="text-base font-bold text-zinc-900">Quality Craftsmanship</h3>
              <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
                Premium materials and meticulous attention to detail in every single garment.
              </p>
            </div>

            <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-lg space-y-2">
              <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">Design</span>
              <h3 className="text-base font-bold text-zinc-900">Exclusive Designs</h3>
              <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
                Unique, tailored pieces designed to express individuality and modern style.
              </p>
            </div>

            <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-lg space-y-2">
              <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">Service</span>
              <h3 className="text-base font-bold text-zinc-900">Customer Focus</h3>
              <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
                Dedicated service and support to ensure a seamless shopping experience.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}