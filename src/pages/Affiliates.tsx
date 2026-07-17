export default function Affiliates() {
  return (
    <div className="min-h-screen suave-luxury-theme text-zinc-800 py-24 px-6 font-sans antialiased">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        
        {/* Header Section */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">
            BillsCollection <span className="text-[#d4af37]">Affiliates</span>
          </h1>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            We are building a network of trusted partners to bring you the best tools and resources for managing your collections.
          </p>
        </div>

        {/* Empty State / Coming Soon */}
        <div className="bg-white border border-zinc-200/60 rounded-3xl p-12 mt-12 shadow-xl">
          <div className="text-6xl mb-6 select-none">🤝</div>
          <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
            Partner Network Launching Soon
          </h2>
          <p className="text-zinc-600 mb-8 max-w-md mx-auto leading-relaxed">
            We don't have any official affiliates just yet. Check back later to see our integrated partners, or reach out if you represent a brand that wants to work with us.
          </p>
          
          <a 
            href="mailto:contact@billscollection.com" 
            className="inline-block bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-zinc-900/20 active:scale-95"
          >
            Become a Partner
          </a>
        </div>

      </div>
    </div>
  );
}