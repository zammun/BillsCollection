const CareersPage = () => {
  return (
    <div className="suave-luxury-theme text-zinc-800 py-12 md:py-16 pb-20 px-6 font-sans antialiased">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight">
            Join <span className="text-[#d4af37]">Bills Collection</span>
          </h1>
          <p className="text-base md:text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            We are constantly looking for innovative minds to help shape the future of modern apparel.
          </p>
        </div>

        {/* Career Opportunities / State Card */}
        <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 md:p-12 shadow-xl text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
            Current Openings
          </span>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
              No Active Listings
            </h2>
            <p className="text-zinc-600 max-w-md mx-auto leading-relaxed text-sm md:text-base">
              We currently do not have any open job positions. However, we are growing rapidly and plan to open up several new opportunities soon.
            </p>
          </div>

          <div className="p-6 bg-[#faf8f5] border border-[#e2e0d9] rounded-2xl max-w-lg mx-auto space-y-4">
            <p className="text-xs md:text-sm text-zinc-600 font-medium leading-relaxed">
              Interested in working with us? Send your resume and portfolio directly to our talent team for future consideration.
            </p>
            <a 
              href="mailto:contact@billscollection.co?subject=General%20Career%20Inquiry" 
              className="inline-block px-6 py-3 bg-zinc-900 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-zinc-800 transition-all shadow-md active:scale-[0.98] cursor-pointer"
            >
              Submit Future Application
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CareersPage;