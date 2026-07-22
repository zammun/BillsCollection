import { Link } from 'react-router-dom';

export default function CaliforniaPrivacyRightsPage() {
  return (
    <div className="suave-luxury-theme text-zinc-800 py-12 md:py-16 pb-20 px-6 font-sans antialiased">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight">
            California <span className="text-[#d4af37]">Privacy Rights</span>
          </h1>
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
            Last Updated: July 15, 2026
          </p>
          <p className="text-base md:text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Supplements our primary Privacy Policy for California residents under CCPA and CPRA.
          </p>
        </div>

        {/* Rights Breakdown Card */}
        <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 md:p-12 shadow-xl space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
              CCPA / CPRA Framework
            </span>
            <h2 className="text-2xl font-bold text-zinc-900 tracking-tight mt-1">
              Your State Consumer Rights
            </h2>
          </div>

          <div className="space-y-6 text-sm md:text-base text-zinc-600 leading-relaxed">
            <p>
              If you reside in California, you hold specific rights regarding the collection, retention, and processing of your personal information.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-[#faf8f5] border border-[#e2e0d9] space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">Right to Know</span>
                <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
                  Request disclosure of what personal information we collect, use, disclose, and sell about you.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#faf8f5] border border-[#e2e0d9] space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">Right to Delete</span>
                <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
                  Request erasure of personal information collected and retained, subject to statutory exceptions.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#faf8f5] border border-[#e2e0d9] space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">Right to Correct</span>
                <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
                  Request corrections to inaccurate personal records maintained across our system databases.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#faf8f5] border border-[#e2e0d9] space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">Right to Opt-Out</span>
                <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
                  Opt out of the sale or sharing of your personal data.{' '}
                  <Link to="/DoNotSell" className="font-bold text-zinc-900 hover:text-[#d4af37] underline transition-colors block mt-1">
                    Manage Preferences &rarr;
                  </Link>
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#faf8f5] border border-[#e2e0d9] space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">Right to Limit</span>
                <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
                  Limit the use and disclosure of your sensitive personal data strictly to necessary operations.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#faf8f5] border border-[#e2e0d9] space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">Non-Discrimination</span>
                <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
                  We will never discriminate against you, alter service rates, or deny access for exercising privacy rights.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Collected Card */}
        <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 md:p-12 shadow-xl space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
            Data Auditing
          </span>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
            Categories of Personal Information Collected
          </h2>
          <p className="text-zinc-600 leading-relaxed text-sm md:text-base">
            In the preceding 12 months, Bills Collection has collected the following categories of personal information:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#e2e0d9]">
              <p className="font-bold text-zinc-900 text-sm">Identifiers</p>
              <p className="text-xs text-zinc-600 mt-1">Full name, email address, physical address, IP address.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#e2e0d9]">
              <p className="font-bold text-zinc-900 text-sm">Commercial Records</p>
              <p className="text-xs text-zinc-600 mt-1">Records of products viewed, ordered, or collected.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#e2e0d9]">
              <p className="font-bold text-zinc-900 text-sm">Network Activity</p>
              <p className="text-xs text-zinc-600 mt-1">Browsing history, session interactions, device metadata.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#e2e0d9]">
              <p className="font-bold text-zinc-900 text-sm">Geolocation Data</p>
              <p className="text-xs text-zinc-600 mt-1">Physical location derived from device connection IP.</p>
            </div>
          </div>
        </div>

        {/* Exercise Rights & Shine the Light Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-xl space-y-4">
            <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
              Requests & Verification
            </span>
            <h3 className="text-xl font-bold text-zinc-900">How to Exercise Your Rights</h3>
            <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
              Submit a verifiable consumer request directly to our privacy desk:
            </p>
            <div className="space-y-2 pt-2 border-t border-zinc-100 text-xs md:text-sm">
              <p><strong className="text-zinc-900">Email:</strong> <a href="mailto:contact@billscollection.co" className="text-zinc-900 font-bold hover:text-[#d4af37] transition-colors">contact@billscollection.co</a></p>
              <p><strong className="text-zinc-900">Phone:</strong> <span className="text-zinc-600">+1 (347) 327-6851</span></p>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed pt-1">
              Verification of consumer identity is required prior to processing data requests.
            </p>
          </div>

          <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-xl space-y-4">
            <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
              Civil Code § 1798.83
            </span>
            <h3 className="text-xl font-bold text-zinc-900">"Shine the Light" Law</h3>
            <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
              California residents may request disclosures regarding any personal information shared with third parties for direct marketing operations during the preceding calendar year.
            </p>
            <div className="pt-2 border-t border-zinc-100 text-xs md:text-sm">
              <a href="mailto:contact@billscollection.co" className="text-zinc-900 font-bold hover:text-[#d4af37] transition-colors">
                Submit Request &rarr;
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}