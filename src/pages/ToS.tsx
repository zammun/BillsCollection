export default function TosPage() {
  return (
    <div className="suave-luxury-theme text-zinc-800 py-12 md:py-16 pb-20 px-6 font-sans antialiased">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight">
            Terms of <span className="text-[#d4af37]">Service</span>
          </h1>
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
            Last Updated: July 8, 2026
          </p>
          <p className="text-base md:text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Rules, guidelines, and legal agreements governing your access to and use of Bills Collection.
          </p>
        </div>

        {/* Acceptance & Eligibility Main Card */}
        <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 md:p-12 shadow-xl space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
            Agreement & Scope
          </span>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
            Acceptance of Terms & Eligibility
          </h2>
          <div className="space-y-4 text-zinc-600 leading-relaxed text-sm md:text-base">
            <p>
              By accessing or using the Bills Collection website ("Site"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use this Site. Bills Collection, LLC reserves the right to update or modify these terms at any time without prior notice. Your continued use of the Site signifies your acceptance of any changes.
            </p>
            <p>
              You must be at least 18 years old to make purchases or create an account on this Site. By using this Site, you represent and warrant that you meet this age requirement.
            </p>
          </div>
        </div>

        {/* Grid for Core Terms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-xl space-y-3">
            <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
              Account Responsibilities
            </span>
            <h3 className="text-xl font-bold text-zinc-900">User Accounts</h3>
            <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
              If you create an account, you are responsible for maintaining credential confidentiality and all activities under your account. We reserve the right to refuse service, terminate accounts, or cancel orders at our sole discretion.
            </p>
          </div>

          <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-xl space-y-3">
            <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
              Fulfillment & Corrections
            </span>
            <h3 className="text-xl font-bold text-zinc-900">Orders & Pricing</h3>
            <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
              All orders are subject to availability and acceptance. We reserve the right to correct pricing errors or omissions at any time. In the event of an error, we will notify you with options to cancel or proceed at the corrected price.
            </p>
          </div>

          <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-xl space-y-3">
            <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
              Submissions & Licensing
            </span>
            <h3 className="text-xl font-bold text-zinc-900">User Content</h3>
            <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
              By submitting reviews, comments, or suggestions, you grant Bills Collection, LLC an irrevocable, perpetual, royalty-free, sub-licensable license to reproduce, modify, and distribute such content across any media channels.
            </p>
          </div>

          <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-xl space-y-3">
            <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
              Prohibited Conduct
            </span>
            <h3 className="text-xl font-bold text-zinc-900">Prohibited Activities</h3>
            <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
              You agree not to use the Site for unlawful purposes, including data mining, deploying automated extraction bots, engaging in abusive behavior, or transmitting malicious code. Unauthorized use terminates granted site permissions.
            </p>
          </div>

          <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-xl space-y-3">
            <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
              Legal Scope
            </span>
            <h3 className="text-xl font-bold text-zinc-900">Limitation of Liability</h3>
            <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
              To the fullest extent permitted by applicable law, Bills Collection, LLC shall not be liable for any direct, indirect, incidental, or consequential damages resulting from your use of, or inability to use, the Site or services.
            </p>
          </div>

          <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-xl space-y-3">
            <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
              Jurisdiction
            </span>
            <h3 className="text-xl font-bold text-zinc-900">Governing Law</h3>
            <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
              These Terms of Service are governed by the laws of the State of New Jersey. Any legal disputes arising hereunder shall be subject to the exclusive jurisdiction of the state and federal courts located in Middlesex County, New Jersey.
            </p>
          </div>

        </div>

        {/* Contact Support Card */}
        <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 md:p-12 shadow-xl space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
                Legal Support
              </span>
              <h2 className="text-2xl font-bold text-zinc-900 tracking-tight mt-1">
                Questions About Our Terms?
              </h2>
              <p className="text-xs text-zinc-500 mt-1">
                Reach out to our customer service desk for any inquiries regarding these terms.
              </p>
            </div>
            <div className="space-y-1 text-xs md:text-sm shrink-0">
              <p>
                <strong className="text-zinc-900">Email:</strong>{' '}
                <a href="mailto:contact@billscollection.co" className="text-zinc-900 font-bold hover:text-[#d4af37] transition-colors">
                  contact@billscollection.co
                </a>
              </p>
              <p>
                <strong className="text-zinc-900">Phone:</strong>{' '}
                <a href="tel:+13473276851" className="text-zinc-900 font-bold hover:text-[#d4af37] transition-colors">
                  +1 (347) 327-6851
                </a>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}