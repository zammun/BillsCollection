export default function PrivacyPolicyPage() {
  return (
    <div className="suave-luxury-theme text-zinc-800 py-12 md:py-16 pb-20 px-6 font-sans antialiased">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight">
            Privacy <span className="text-[#d4af37]">Policy</span>
          </h1>
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
            Last Updated: July 8, 2026
          </p>
          <p className="text-base md:text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            How Bills Collection, LLC collects, uses, protects, and handles your personal information.
          </p>
        </div>

        {/* Intro & Information We Collect Card */}
        <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 md:p-12 shadow-xl space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
            Overview & Collection
          </span>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
            Introduction & Data Practices
          </h2>
          <div className="space-y-4 text-zinc-600 leading-relaxed text-sm md:text-base">
            <p>
              At Bills Collection, LLC ("we," "us," or "our"), your privacy is a top priority. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and make purchases from our store.
            </p>
            <p>
              We collect information provided directly during checkout (such as name, billing/shipping address, email address, phone number, and transaction details). We also automatically gather technical information when you navigate our platform, including IP address, browser type, device identifiers, and session activity via cookies.
            </p>
          </div>
        </div>

        {/* How We Use & Share Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-xl space-y-3">
            <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
              Operations
            </span>
            <h3 className="text-xl font-bold text-zinc-900">How We Use Your Data</h3>
            <ul className="text-xs md:text-sm text-zinc-600 space-y-2 leading-relaxed pt-1">
              <li className="flex items-start gap-2">
                <span className="text-[#d4af37] font-bold">&bull;</span>
                <span>Process, fulfill, and manage your orders.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4af37] font-bold">&bull;</span>
                <span>Communicate order status updates and customer support.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4af37] font-bold">&bull;</span>
                <span>Prevent transaction fraud and safeguard store security.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4af37] font-bold">&bull;</span>
                <span>Optimize store performance and digital experience.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-xl space-y-3">
            <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
              Third-Party Sharing
            </span>
            <h3 className="text-xl font-bold text-zinc-900">Sharing Your Information</h3>
            <p className="text-xs md:text-sm text-zinc-600 leading-relaxed mb-2">
              We do not sell your personal information. Data is shared strictly with trusted partners performing essential operational duties:
            </p>
            <ul className="text-xs md:text-sm text-zinc-600 space-y-1.5 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#d4af37] font-bold">&bull;</span>
                <span>Payment gateways (e.g., Stripe)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4af37] font-bold">&bull;</span>
                <span>Logistics and delivery fulfillment providers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4af37] font-bold">&bull;</span>
                <span>Fraud prevention and security auditors</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Cookies, Security & Rights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-lg space-y-2">
            <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">Tracking</span>
            <h3 className="text-base font-bold text-zinc-900">Cookies & Tracking</h3>
            <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
              We use cookies to enhance browsing, analyze traffic, and personalize store features. You can adjust browser preferences to refuse cookies if desired.
            </p>
          </div>

          <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-lg space-y-2">
            <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">Protection</span>
            <h3 className="text-base font-bold text-zinc-900">Data Security</h3>
            <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
              We employ industry-standard encryption and security measures to protect your data against unauthorized access, alteration, or destruction.
            </p>
          </div>

          <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-lg space-y-2">
            <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">Control</span>
            <h3 className="text-base font-bold text-zinc-900">Your Data Rights</h3>
            <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
              Depending on your location, you hold statutory rights to access, correct, or request deletion of your personal records maintained in our systems.
            </p>
          </div>
        </div>

        {/* Contact Support Card */}
        <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 md:p-12 shadow-xl space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
                Privacy Desk
              </span>
              <h2 className="text-2xl font-bold text-zinc-900 tracking-tight mt-1">
                Questions About Your Data?
              </h2>
              <p className="text-xs text-zinc-500 mt-1">
                Reach out to our dedicated privacy support team for any inquiries or requests.
              </p>
            </div>
            <a 
              href="mailto:contact@billscollection.co?subject=Privacy%20Policy%20Inquiry" 
              className="inline-block px-6 py-3.5 bg-zinc-900 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-zinc-800 transition-all shadow-md active:scale-[0.98] cursor-pointer shrink-0"
            >
              Email Privacy Team
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}