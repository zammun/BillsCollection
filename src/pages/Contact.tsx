const ContactPage = () => {
  return (
    <div className="suave-luxury-theme text-zinc-800 py-12 md:py-16 pb-20 px-6 font-sans antialiased">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight">
            Contact <span className="text">Us</span>
          </h1>
          <p className="text-base md:text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Have a question, feedback, or need assistance with an order? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info Card */}
          <div className="md:col-span-5 bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-xl space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
                Reach Out Directly
              </span>
              <h2 className="text-2xl font-bold text-zinc-900 tracking-tight mt-1">
                Contact Details
              </h2>
            </div>

            <div className="space-y-6">
              {/* Address */}
              <div className="space-y-1.5 pb-6 border-b border-zinc-100">
                <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
                  HQ Address
                </span>
                <p className="font-semibold text-zinc-900">Bills Collection Studio</p>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  365 Carteret Avenue<br />
                  Carteret, New Jersey, USA
                </p>
              </div>

              {/* Email */}
              <div className="space-y-1.5 pb-6 border-b border-zinc-100">
                <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
                  Direct Email
                </span>
                <p className="font-semibold text-zinc-900">Customer Desk</p>
                <p className="text-sm text-zinc-600">contact@billscollection.co</p>
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
                  Phone Support
                </span>
                <p className="font-semibold text-zinc-900">Direct Line</p>
                <p className="text-sm text-zinc-600">+1 (347) 327-6851</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form Card */}
          <div className="md:col-span-7 bg-white border border-zinc-200/60 rounded-3xl p-8 md:p-10 shadow-xl">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
                Online Inquiry
              </span>
              <h2 className="text-2xl font-bold text-zinc-900 tracking-tight mt-1">
                Send a Message
              </h2>
            </div>

            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="First Name" 
                  className="p-3.5 w-full bg-[#faf8f5] text-zinc-900 placeholder-zinc-400 rounded-xl border border-[#e2e0d9] focus:bg-white focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 text-sm font-medium transition-all"
                />
                <input 
                  type="text" 
                  placeholder="Last Name" 
                  className="p-3.5 w-full bg-[#faf8f5] text-zinc-900 placeholder-zinc-400 rounded-xl border border-[#e2e0d9] focus:bg-white focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 text-sm font-medium transition-all"
                />
              </div>

              <input 
                type="email" 
                placeholder="Email Address" 
                className="p-3.5 w-full bg-[#faf8f5] text-zinc-900 placeholder-zinc-400 rounded-xl border border-[#e2e0d9] focus:bg-white focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 text-sm font-medium transition-all"
              />

              <textarea 
                rows={5} 
                placeholder="How can we help you?" 
                className="p-3.5 w-full bg-[#faf8f5] text-zinc-900 placeholder-zinc-400 rounded-xl border border-[#e2e0d9] focus:bg-white focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 text-sm font-medium transition-all resize-none"
              ></textarea>

              <button 
                type="submit" 
                className="w-full sm:w-max px-8 py-3.5 bg-zinc-900 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-zinc-800 transition-all shadow-md active:scale-[0.98] cursor-pointer mt-2"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ContactPage;