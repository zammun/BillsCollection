const LegalNotice = () => {
  return (
    <div className="suave-luxury-theme text-zinc-800 py-12 md:py-16 pb-20 px-6 font-sans antialiased">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight">
            Legal <span className="text-[#d4af37]">Notice</span>
          </h1>
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
            &copy;2026 Bills Collection, LLC &bull; All Rights Reserved
          </p>
          <p className="text-base md:text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Terms of Use, intellectual property disclosures, and operational guidelines governing your access to our platform.
          </p>
        </div>

        {/* Company Identity & Terms Card */}
        <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 md:p-12 shadow-xl space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
            Corporate Info & Terms
          </span>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
            Website Ownership & Usage
          </h2>
          <div className="space-y-4 text-zinc-600 leading-relaxed text-sm md:text-base">
            <p>
              This website is owned and operated by <strong className="text-zinc-900 font-semibold">Bills Collection, LLC</strong>. Official website domain: <a href="https://billscollection.co" className="font-bold text-zinc-900 hover:text-[#d4af37] underline transition-colors">billscollection.co</a>.
            </p>
            <p>
              Mailing Address: <span className="text-zinc-900 font-medium">365 Carteret Avenue, Carteret, New Jersey, USA</span>.
            </p>
            <p>
              All users agree that access to and use of this website are subject to the terms and conditions set forth in this legal notice and all applicable laws. Any access or use is undertaken at the user's own risk. Bills Collection is not intended for children under the age of 18. Terms and conditions are subject to change at any time without prior notice.
            </p>
          </div>
        </div>

        {/* Grid: Privacy & Transactions + Intellectual Property */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-xl space-y-3">
            <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
              Operations
            </span>
            <h3 className="text-xl font-bold text-zinc-900">Privacy & Transactions</h3>
            <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
              By making a purchase, you agree that Bills Collection may share necessary transaction data with verified partners strictly for processing orders, fraud prevention, payment authorization, and order fulfillment.
            </p>
          </div>

          <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-xl space-y-3">
            <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
              Licensing
            </span>
            <h3 className="text-xl font-bold text-zinc-900">Intellectual Property</h3>
            <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
              All visual assets, graphic designs, custom code, software, and apparel branding are subject to intellectual property rights held by or licensed to Bills Collection, LLC. Personal, non-commercial use licenses are granted subject to compliance.
            </p>
          </div>
        </div>

        {/* Disclaimer of Warranties Card */}
        <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 md:p-12 shadow-xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
            Statutory Disclaimer
          </span>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
            Disclaimer of Warranties
          </h2>
          <div className="p-6 rounded-2xl bg-[#faf8f5] border border-[#e2e0d9] text-xs font-semibold text-zinc-700 leading-relaxed uppercase tracking-wide">
            THE BILLS COLLECTION WEBSITE AND ALL INFORMATION, CONTENT, MATERIALS, PRODUCTS, AND SERVICES INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. YOU EXPRESSLY AGREE THAT YOUR USE OF THIS WEBSITE IS AT YOUR SOLE RISK.
          </div>
        </div>

        {/* Grid: Liability & DMCA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-xl space-y-3">
            <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
              Legal Scope
            </span>
            <h3 className="text-xl font-bold text-zinc-900">Limitation of Liability</h3>
            <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
              To the fullest extent permitted by law, neither Bills Collection, LLC nor its officers, directors, or contractors shall be held liable for damages of any kind arising out of or related to the use of this digital storefront.
            </p>
          </div>

          <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-xl space-y-3">
            <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
              Copyright Act
            </span>
            <h3 className="text-xl font-bold text-zinc-900">DMCA Takedown Notice</h3>
            <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
              If you believe in good faith that any content hosted on our site infringes your copyrighted material, submit a formal claim to our legal desk:
            </p>
            <a 
              href="mailto:contact@billscollection.co?subject=DMCA%20Takedown%20Notice" 
              className="inline-block pt-1 font-bold text-xs text-zinc-900 hover:text-[#d4af37] transition-colors"
            >
              contact@billscollection.co &rarr;
            </a>
          </div>
        </div>

        {/* Customer Care & CA State Rights Card */}
        <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 md:p-12 shadow-xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2 pb-6 md:pb-0 border-b md:border-b-0 md:border-r border-zinc-100 md:pr-6">
              <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
                Direct Line
              </span>
              <p className="font-semibold text-zinc-900">Customer Care Desk</p>
              <p className="text-sm text-zinc-600 leading-relaxed">
                For questions regarding care policies, unresolved inquiries, or support:
              </p>
              <a 
                href="tel:+13473276851" 
                className="inline-block pt-1 font-bold text-zinc-900 hover:text-[#d4af37] transition-colors text-base"
              >
                +1 (347) 327-6851
              </a>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
                CA Civil Code § 1789.3
              </span>
              <p className="font-semibold text-zinc-900">California Consumer Rights</p>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Reach the Complaint Assistance Unit of the Division of Consumer Services of the CA Dept. of Consumer Affairs by mail at 1625 North Market Blvd., Sacramento, CA 95834, or by phone at 1-800-952-5210.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LegalNotice;