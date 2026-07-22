export default function Affiliates() {
  return (
    <div className="suave-luxury-theme text-zinc-800 py-12 md:py-16 pb-20 px-6 font-sans antialiased">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight">
            Bills Collection <span className="text-[#d4af37]">Affiliates</span>
          </h1>
          <p className="text-base md:text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            We are building a network of trusted partners to bring you the best.
          </p>
        </div>

        {/* Empty State / Coming Soon Card */}
        <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 md:p-12 shadow-xl text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
            Partner Network
          </span>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
              Launching Soon
            </h2>
            <p className="text-zinc-600 max-w-md mx-auto leading-relaxed text-sm md:text-base">
              We don't have any official affiliates just yet. Check back later to see our partners, or reach out if you want to work with us.
            </p>
          </div>

          <div className="pt-2">
            <a 
              href="mailto:contact@billscollection.com" 
              className="inline-block bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-zinc-900/20 active:scale-[0.98] cursor-pointer"
            >
              Become a Partner
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}