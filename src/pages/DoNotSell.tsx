import { Link } from 'react-router-dom';

export default function DoNotSellPage() {
  return (
    <div className="suave-luxury-theme text-zinc-800 py-12 md:py-16 pb-20 px-6 font-sans antialiased">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight">
            Do Not Sell or Share <span className="text-[#d4af37]">My Personal Information</span>
          </h1>
          <p className="text-base md:text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Manage your data preferences and exercise your consumer privacy choices.
          </p>
        </div>

        {/* Overview & Choices Card */}
        <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 md:p-12 shadow-xl space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
            Your Privacy Choices
          </span>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
            Data Sharing & Opt-Out
          </h2>
          <div className="space-y-4 text-zinc-600 leading-relaxed text-sm md:text-base">
            <p>
              You have the right to opt out of the sale or sharing of your Personal Information, including Interest-Based/Targeted Advertising and Retargeting.
            </p>
            <p>
              While Bills Collection does not sell your personal information for monetary consideration, we do share information for analytics and operational purposes that may be defined as a "sale" or "sharing" under certain privacy legislation.
            </p>
          </div>
          <div className="pt-2">
            <Link 
              to="/PrivacyPolicy" 
              className="inline-block bg-zinc-900 text-white px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-md active:scale-[0.98]"
            >
              View Full Privacy Policy
            </Link>
          </div>
        </div>

        {/* California Privacy Rights Section */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
              CPRA Protections
            </span>
            <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
              Your California Rights
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-lg space-y-2">
              <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">Deletion</span>
              <h3 className="text-base font-bold text-zinc-900">Right to Deletion</h3>
              <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
                Request the erasure of Personal Information collected about you. Upon verification, we will also instruct third-party partners to delete your records.
              </p>
            </div>

            <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-lg space-y-2">
              <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">Correction</span>
              <h3 className="text-base font-bold text-zinc-900">Right to Correct</h3>
              <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
                Request corrections to inaccurate Personal Information. You can manage this directly within your account profile or by reaching out to us.
              </p>
            </div>

            <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-lg space-y-2">
              <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">Access</span>
              <h3 className="text-base font-bold text-zinc-900">Right to Know</h3>
              <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
                Access details regarding the categories of personal information collected over the past 12 months, collection purposes, and third-party sharing.
              </p>
            </div>

            <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-lg space-y-2">
              <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">Restriction</span>
              <h3 className="text-base font-bold text-zinc-900">Limit Sensitive Info</h3>
              <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
                Opt out of the disclosure of Sensitive Personal Information if used for purposes beyond essential operational necessity.
              </p>
            </div>

            <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-lg space-y-2 md:col-span-2">
              <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">Protection</span>
              <h3 className="text-base font-bold text-zinc-900">Right to No Retaliation</h3>
              <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
                Bills Collection will never discriminate or retaliate against you for exercising any of your statutory privacy rights.
              </p>
            </div>
          </div>
        </div>

        {/* Exercise Rights & Authorized Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-xl space-y-4">
            <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
              Submission Methods
            </span>
            <h3 className="text-xl font-bold text-zinc-900">How to Exercise Your Rights</h3>
            <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
              Submit a verifiable consumer request through any of the following channels:
            </p>
            <div className="space-y-2 pt-2 border-t border-zinc-100 text-xs md:text-sm">
              <p>
                <strong className="text-zinc-900">Privacy Desk:</strong>{' '}
                <Link to="/PrivacyPolicy" className="text-zinc-900 font-bold hover:text-[#d4af37] transition-colors">
                  View Privacy Policy & Submit
                </Link>
              </p>
              <p>
                <strong className="text-zinc-900">Phone Support:</strong>{' '}
                <span className="text-zinc-600">+1 (347) 327-6851 (TTY: 711)</span>
              </p>
            </div>
          </div>

          <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-xl space-y-4">
            <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
              Representation
            </span>
            <h3 className="text-xl font-bold text-zinc-900">Authorized Agents</h3>
            <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
              To enter a request on behalf of a California resident, submit proof of written authorization from the customer via our Privacy Policy page. We reserve the right to verify customer identity directly.
            </p>
          </div>
        </div>

        {/* Shine the Light Card */}
        <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 md:p-12 shadow-xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
            Civil Code § 1798.83
          </span>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
            California Shine the Light
          </h2>
          <p className="text-zinc-600 leading-relaxed text-sm md:text-base">
            California residents may request an annual accounting of personal information shared with third parties for direct marketing purposes. Send written inquiries to:
          </p>
          <div className="p-4 rounded-2xl bg-[#faf8f5] border border-[#e2e0d9] text-xs md:text-sm font-semibold text-zinc-900">
            Bills Collection Studio &bull; 365 Carteret Avenue, Carteret, New Jersey, USA
          </div>
          <p className="text-xs text-zinc-500">Please allow up to 30 days for processing and response.</p>
        </div>

      </div>
    </div>
  );
}