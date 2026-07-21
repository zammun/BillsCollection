export default function TechSupport() {
  return (
    <div className="min-h-screen suave-luxury-theme text-zinc-800 py-24 px-6 font-sans antialiased">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">
            Bills Collection <span className="text-[#d4af37]">Tech Support</span>
          </h1>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Reach out to me for any technical issues.
          </p>
        </div>

        {/* Developer Showcase Section */}
        <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-xl flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 overflow-hidden rounded-2xl shadow-md border border-zinc-200/40">
            <img 
              src="/dev.jpg" 
              alt="Lead Developer" 
              className="w-full h-auto object-contain transform hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-4 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">Direct Engineering Support</span>
            <h2 className="text-2xl font-semibold text-zinc-900">
              We're on it.
            </h2>
            <p className="text-zinc-600 leading-relaxed text-sm">
              Our system architecture is continuously monitored, but problems can happen. Hit me up if anything is wrong.
            </p>
          </div>
        </div>

        {/* Direct Email Contact Card */}
        <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 md:p-12 shadow-xl text-center space-y-6">
          <h3 className="text-2xl font-semibold text-zinc-900">Get in Touch</h3>
          <p className="text-zinc-600 max-w-md mx-auto text-sm leading-relaxed">
            Click below to open your email client and send a message directly to our engineering desk.
          </p>
          <a 
            href="mailto:muneebzaman6@gmail.com?subject=Bills%20Collection%20Support%20Inquiry"
            className="w-full block bg-zinc-900 hover:bg-zinc-800 text-white py-4 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-zinc-900/20 active:scale-98 cursor-pointer text-sm text-center"
          >
            Contact Developer
          </a>
        </div>

      </div>
    </div>
  );
}