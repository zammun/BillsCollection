export default function AccessibilityPage() {
  return (
    <div className="suave-luxury-theme text-zinc-800 py-12 md:py-16 pb-20 px-6 font-sans antialiased">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight">
            Digital <span className="text-[#d4af37]">Accessibility</span> Statement
          </h1>
          <p className="text-base md:text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Committed to providing an inclusive, seamless shopping experience for everyone.
          </p>
        </div>

        {/* Core Statement Card */}
        <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 md:p-12 shadow-xl space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
            Inclusion & Standards
          </span>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
            Empowering Every Customer
          </h2>
          <div className="space-y-4 text-zinc-600 leading-relaxed text-sm md:text-base">
            <p>
              At Bills Collection, we are committed to creating an inclusive shopping experience for everyone, regardless of their abilities. We believe in bold representation and creating a future that empowers voice, choice, and ownership for all our customers and communities.
            </p>
            <p>
              We actively work to comply with accessibility standards, including the W3C's <strong className="text-zinc-900 font-semibold">Web Content Accessibility Guidelines (WCAG) 2.1</strong>, a set of internationally recognized guidelines for digital accessibility.
            </p>
            <p>
              Our goal is to provide an easy shopping experience, whether you are using assistive technologies, such as screen readers, magnifiers, voice recognition software, or video captions.
            </p>
          </div>
        </div>

        {/* Grid: Ongoing Effort & Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-xl space-y-3">
            <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
              Continuous Progress
            </span>
            <h3 className="text-xl font-bold text-zinc-900">Ongoing Effort</h3>
            <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
              Digital accessibility is an ongoing process. Our team continuously audits, reviews, and evaluates our digital experience to improve performance, usability, and efficiency.
            </p>
          </div>

          <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-xl space-y-3">
            <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
              Enhanced Experience
            </span>
            <h3 className="text-xl font-bold text-zinc-900">Accessibility Tools</h3>
            <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
              In partnership with industry-leading accessibility experts, Bills Collection offers digital tools to help customers access our catalog easily and effectively.
            </p>
          </div>
        </div>

        {/* Support & Feedback Card */}
        <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 md:p-12 shadow-xl space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
              Support & Feedback
            </span>
            <h2 className="text-2xl font-bold text-zinc-900 tracking-tight mt-1">
              We're Here to Help
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Direct Phone Support */}
            <div className="space-y-2 pb-6 md:pb-0 border-b md:border-b-0 md:border-r border-zinc-100 md:pr-6">
              <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
                Immediate Assistance
              </span>
              <p className="font-semibold text-zinc-900">Need Help Navigating?</p>
              <p className="text-sm text-zinc-600 leading-relaxed">
                If you experience issues accessing any part of our site, call customer support:
              </p>
              <a 
                href="tel:+13473276851" 
                className="inline-block pt-1 font-bold text-zinc-900 hover:text-[#d4af37] transition-colors text-base"
              >
                +1 (347) 327-6851
              </a>
            </div>

            {/* Feedback Email */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
                Direct Feedback
              </span>
              <p className="font-semibold text-zinc-900">Suggestions & Feedback</p>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Have thoughts on how we can improve our digital accessibility? Email us:
              </p>
              <a 
                href="mailto:contact@billscollection.co" 
                className="inline-block pt-1 font-bold text-zinc-900 hover:text-[#d4af37] transition-colors text-base"
              >
                contact@billscollection.co
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}