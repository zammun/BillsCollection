export default function CookiePreferencesPage() {
  return (
    <div className="suave-luxury-theme text-zinc-800 py-12 md:py-16 pb-20 px-6 font-sans antialiased">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight">
            Cookie <span className="text-[#d4af37]">Preferences</span>
          </h1>
          <p className="text-base md:text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Transparency on how we use tracking technologies and how you can manage your settings.
          </p>
        </div>

        {/* Overview Card */}
        <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 md:p-12 shadow-xl space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
            Overview
          </span>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
            What Are Cookies?
          </h2>
          <div className="space-y-4 text-zinc-600 leading-relaxed text-sm md:text-base">
            <p>
              At Bills Collection, we use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and assist in our marketing efforts.
            </p>
            <p>
              Cookies are small text files placed on your device when you visit a website. They help the website remember your actions and preferences (such as login details, active cart items, and language) over a period of time, ensuring a seamless checkout and navigation experience.
            </p>
          </div>
        </div>

        {/* Types of Cookies Section */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
              Classification
            </span>
            <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
              Types of Cookies We Use
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-lg space-y-2">
              <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
                Strictly Necessary
              </span>
              <h3 className="text-base font-bold text-zinc-900">Essential Cookies</h3>
              <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
                Strictly necessary for core store features such as security protocols, account authentication, and maintaining your shopping cart.
              </p>
            </div>

            <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-lg space-y-2">
              <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
                Performance
              </span>
              <h3 className="text-base font-bold text-zinc-900">Analytics & Metrics</h3>
              <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
                Allows us to count traffic sources and measure store performance, showing us which pages are most popular and how visitors navigate.
              </p>
            </div>

            <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-lg space-y-2">
              <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
                Targeting
              </span>
              <h3 className="text-base font-bold text-zinc-900">Marketing & Ads</h3>
              <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
                Set through our site by advertising partners to build a profile of your interests and show relevant tailored apparel recommendations.
              </p>
            </div>
          </div>
        </div>

        {/* Control & Contact Card */}
        <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 md:p-12 shadow-xl space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
              User Controls
            </span>
            <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
              Managing Your Preferences
            </h2>
            <p className="text-zinc-600 leading-relaxed text-sm md:text-base">
              You have the right to decide whether to accept or reject non-essential cookies. You can adjust your browser settings to refuse cookies or to alert you when a cookie is being sent. Please note that blocking essential cookies may impact checkout and store features.
            </p>
          </div>

          <div className="pt-6 border-t border-zinc-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-bold text-zinc-900 text-base">Questions About Our Cookie Policy?</p>
              <p className="text-xs text-zinc-500 mt-0.5">Reach out to our privacy desk for any inquiries.</p>
            </div>
            <a 
              href="mailto:contact@billscollection.co" 
              className="inline-block px-6 py-3.5 bg-zinc-900 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-zinc-800 transition-all shadow-md active:scale-[0.98] cursor-pointer shrink-0"
            >
              Email Privacy Desk
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}