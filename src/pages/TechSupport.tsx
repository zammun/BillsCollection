import { useState } from 'react';

export default function TechSupport() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen suave-luxury-theme text-zinc-800 py-24 px-6 font-sans antialiased">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">
            BillsCollection <span className="text-[#d4af37]">Tech Support</span>
          </h1>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Experiencing a bug or technical issue? Report it directly to our engineering desk below.
          </p>
        </div>

        {/* Developer Showcase Section */}
        <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-xl flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 overflow-hidden rounded-2xl shadow-md border border-zinc-200/40">
            <img 
              src="/dev.jpg" 
              alt="Lead Developer" 
              className="w-full h-96 object-cover object-top transform hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-4 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">Direct Engineering Support</span>
            <h2 className="text-2xl font-semibold text-zinc-900">
              We're on it.
            </h2>
            <p className="text-zinc-600 leading-relaxed text-sm">
              Our system architecture is continuously monitored, but edge cases happen. Send details regarding unexpected behavior, broken checkouts, or glitches directly to the desk of our lead developer.
            </p>
          </div>
        </div>

        {/* Contact/Bug Report Form */}
        <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 md:p-12 shadow-xl">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="text-5xl">✅</div>
              <h3 className="text-2xl font-semibold text-zinc-900">Bug Report Received</h3>
              <p className="text-zinc-600 max-w-md mx-auto">
                Thank you for helping us improve BillsCollection. Our engineering team has logged your ticket.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-2xl font-semibold text-zinc-900 mb-6 text-center">Report an Issue</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 text-left">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-600">Your Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="LeBron James"
                    className="w-full p-4 rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 text-sm transition-colors bg-zinc-50/50" 
                  />
                </div>
                <div className="space-y-2 text-left">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-600">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="name@example.com"
                    className="w-full p-4 rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 text-sm transition-colors bg-zinc-50/50" 
                  />
                </div>
              </div>
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-600">Describe the Bug / Issue</label>
                <textarea 
                  required 
                  rows={4}
                  placeholder="Provide steps to reproduce, error logs, or page details..."
                  className="w-full p-4 rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 text-sm transition-colors bg-zinc-50/50 resize-none"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-zinc-900 hover:bg-zinc-800 text-white py-4 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-zinc-900/20 active:scale-98 cursor-pointer"
              >
                Submit Bug Report
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}