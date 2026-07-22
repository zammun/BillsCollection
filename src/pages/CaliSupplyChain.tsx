export default function CaliforniaTransparencyPage() {
  return (
    <div className="suave-luxury-theme text-zinc-800 py-12 md:py-16 pb-20 px-6 font-sans antialiased">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight">
            California <span className="text-[#d4af37]">Supply Chains</span> Act
          </h1>
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
            Last Updated: July 15, 2026
          </p>
          <p className="text-base md:text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Disclosing our commitment to ethical sourcing, fair labor practices, and eradicating human trafficking from direct supply chains.
          </p>
        </div>

        {/* Core Statement Card */}
        <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 md:p-12 shadow-xl space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
            SB 657 Compliance
          </span>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
            Ethical Business Standards
          </h2>
          <div className="space-y-4 text-zinc-600 leading-relaxed text-sm md:text-base">
            <p>
              The California Transparency in Supply Chains Act of 2010 (SB 657) requires retailers and manufacturers doing business in California to disclose their efforts to eradicate slavery and human trafficking from their direct supply chains.
            </p>
            <p>
              At Bills Collection, LLC, we are deeply committed to conducting our business ethically, responsibly, and with profound respect for human rights across every stage of design, manufacturing, and distribution.
            </p>
          </div>
        </div>

        {/* Supply Chain Protocols Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-xl space-y-3">
            <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
              Risk Evaluation
            </span>
            <h3 className="text-xl font-bold text-zinc-900">Verification</h3>
            <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
              We actively evaluate and address human trafficking risks in our product supply chains. Before onboarding new vendors, preliminary risk assessments review geographic location, manufacturing processes, and industry history.
            </p>
          </div>

          <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-xl space-y-3">
            <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
              Compliance Oversight
            </span>
            <h3 className="text-xl font-bold text-zinc-900">Supplier Audits</h3>
            <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
              We monitor direct suppliers against a strict vendor code of conduct. Through scheduled evaluations conducted by our internal supply chain team, we enforce zero-tolerance standards regarding forced labor.
            </p>
          </div>

          <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-xl space-y-3">
            <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
              Mandatory Attestation
            </span>
            <h3 className="text-xl font-bold text-zinc-900">Certification</h3>
            <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
              Direct suppliers must certify that all incorporated materials comply with anti-slavery and human trafficking laws in their operating jurisdictions. Compliance is a mandatory component of our master service agreements.
            </p>
          </div>

          <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-xl space-y-3">
            <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
              Enforcement Protocols
            </span>
            <h3 className="text-xl font-bold text-zinc-900">Internal Accountability</h3>
            <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
              We enforce internal accountability standards for employees and contractors. Any partner or employee failing to meet our anti-trafficking standards faces immediate remedial action, up to contract termination.
            </p>
          </div>

        </div>

        {/* Training & Contact Grid Card */}
        <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 md:p-12 shadow-xl space-y-8">
          
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
              Education & Awareness
            </span>
            <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
              Supply Chain Training
            </h2>
            <p className="text-zinc-600 leading-relaxed text-sm md:text-base">
              We provide specialized training on mitigating human trafficking and forced labor risks to company personnel and management with direct responsibility for supply chain logistics. This equips our management team to identify red flags and rigorously enforce ethical standards.
            </p>
          </div>

          <div className="pt-6 border-t border-zinc-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-bold text-zinc-900 text-base">Questions About Our Supply Chain Practices?</p>
              <p className="text-xs text-zinc-500 mt-0.5">Reach out to our ethics desk for further information or inquiry details.</p>
            </div>
            <a 
              href="mailto:contact@billscollection.co" 
              className="inline-block px-6 py-3.5 bg-zinc-900 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-zinc-800 transition-all shadow-md active:scale-[0.98] cursor-pointer shrink-0"
            >
              Email Ethics Desk
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}