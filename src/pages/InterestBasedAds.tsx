import { Link } from 'react-router-dom';

export default function InterestBasedAdsPage() {
  return (
    <div className="suave-luxury-theme text-zinc-800 py-12 md:py-16 pb-20 px-6 font-sans antialiased">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight">
            Interest-Based <span className="text-[#d4af37]">Advertising</span>
          </h1>
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
            Last Updated: July 15, 2026
          </p>
          <p className="text-base md:text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            How we tailor advertisements to your preferences and how you can control your personalized ad settings.
          </p>
        </div>

        {/* How It Works Card */}
        <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 md:p-12 shadow-xl space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
            Targeting & Personalization
          </span>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
            How Interest-Based Advertising Works
          </h2>
          <p className="text-zinc-600 leading-relaxed text-sm md:text-base">
            We and our third-party advertising partners (such as Google and Meta) use tracking technologies like cookies, web beacons, and pixels to collect information about your browsing activities across websites.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#e2e0d9]">
              <p className="font-bold text-zinc-900 text-sm">Preference Insights</p>
              <p className="text-xs text-zinc-600 mt-1">Understand your interests based on your store interactions.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#e2e0d9]">
              <p className="font-bold text-zinc-900 text-sm">Relevant Apparel Ads</p>
              <p className="text-xs text-zinc-600 mt-1">Deliver tailored Bills Collection recommendations you actually want to see.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#e2e0d9]">
              <p className="font-bold text-zinc-900 text-sm">Campaign Metrics</p>
              <p className="text-xs text-zinc-600 mt-1">Measure the reach, performance, and efficiency of our marketing campaigns.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#e2e0d9]">
              <p className="font-bold text-zinc-900 text-sm">Frequency Control</p>
              <p className="text-xs text-zinc-600 mt-1">Prevent repetitive ads from showing to you too frequently.</p>
            </div>
          </div>
        </div>

        {/* Shared Info Card */}
        <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 md:p-12 shadow-xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
            Data Protections
          </span>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
            The Information We Share
          </h2>
          <p className="text-zinc-600 leading-relaxed text-sm md:text-base">
            We do not share your name, email address, or phone number with advertising partners for interest-based advertising without your explicit consent. Shared data is tied strictly to pseudonymous identifiers—such as cookie IDs or mobile ad tokens—which recognize your browser without identifying you directly.
          </p>
        </div>

        {/* Industry Choices & Mobile Settings Grid */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
              User Controls
            </span>
            <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
              Opt-Out Tools & Preferences
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-lg space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">DAA Alliance</span>
                <h3 className="text-base font-bold text-zinc-900">Digital Advertising Alliance</h3>
                <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
                  Opt out of participant ad networks directly via the DAA industry tool.
                </p>
              </div>
              <a 
                href="https://optout.aboutads.info" 
                target="_blank" 
                rel="noreferrer" 
                className="font-bold text-xs text-zinc-900 hover:text-[#d4af37] transition-colors pt-2 block"
              >
                optout.aboutads.info &rarr;
              </a>
            </div>

            <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-lg space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">NAI Initiative</span>
                <h3 className="text-base font-bold text-zinc-900">Network Advertising Initiative</h3>
                <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
                  Manage behavioral advertising choices across member networks.
                </p>
              </div>
              <a 
                href="https://optout.networkadvertising.org" 
                target="_blank" 
                rel="noreferrer" 
                className="font-bold text-xs text-zinc-900 hover:text-[#d4af37] transition-colors pt-2 block"
              >
                optout.networkadvertising.org &rarr;
              </a>
            </div>

            <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-lg space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">Mobile Privacy</span>
                <h3 className="text-base font-bold text-zinc-900">Device Settings</h3>
                <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
                  Use your iOS or Android settings to limit ad tracking or reset device advertising IDs.
                </p>
              </div>
              <Link 
                to="/DoNotSell" 
                className="font-bold text-xs text-zinc-900 hover:text-[#d4af37] transition-colors pt-2 block"
              >
                Manage Store Privacy &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Important Notes & Contact Card */}
        <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 md:p-12 shadow-xl space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
              Notice
            </span>
            <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
              Important Notes About Opting Out
            </h2>
            <p className="text-zinc-600 leading-relaxed text-sm md:text-base">
              Opting out does not mean you will stop seeing advertisements altogether. It simply means that ads will no longer be tailored to your browsing behavior and may feel less relevant. Because these opt-out mechanisms rely on browser cookies, clearing your browser cache will require you to set your preferences again.
            </p>
          </div>

          <div className="pt-6 border-t border-zinc-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-bold text-zinc-900 text-base">Questions Regarding Advertising Practices?</p>
              <p className="text-xs text-zinc-500 mt-0.5">Contact our team for further clarification.</p>
            </div>
            <a 
              href="mailto:contact@billscollection.co" 
              className="inline-block px-6 py-3.5 bg-zinc-900 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-zinc-800 transition-all shadow-md active:scale-[0.98] cursor-pointer shrink-0"
            >
              Email Ad Desk
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}