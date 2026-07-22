import { Link } from 'react-router-dom';

export default function StoresPage() {
  return (
    <div className="suave-luxury-theme text-zinc-800 py-12 md:py-16 pb-20 px-6 font-sans antialiased">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight">
            Store <span className="text-[#d4af37]">Locations</span>
          </h1>
          <p className="text-base md:text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Operating exclusively online to bring premium collections directly to your doorstep worldwide.
          </p>
        </div>

        {/* Digital First Main Card */}
        <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 md:p-12 shadow-xl space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
            Digital Sourcing
          </span>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
            Online Retail Storefront
          </h2>
          <div className="space-y-4 text-zinc-600 leading-relaxed text-sm md:text-base">
            <p>
              Currently, Bills Collection operates exclusively online. We do not have any physical retail storefronts or pop-up locations at this time.
            </p>
            <p>
              Operating as a digital-first brand allows us to focus our resources on delivering high-quality, premium products directly to your doorstep while maintaining a streamlined and accessible online shopping experience for our global community.
            </p>
          </div>
        </div>

        {/* Grid: Where to Shop & Get in Touch */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Shop Card */}
          <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
                24/7 Storefront
              </span>
              <h3 className="text-xl font-bold text-zinc-900">Where to Shop</h3>
              <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
                Our complete catalog of apparel and collections is available around the clock on our official website, featuring fast and reliable standard shipping.
              </p>
            </div>
            <div className="pt-2">
              <Link 
                to="/" 
                className="inline-block px-6 py-3.5 bg-zinc-900 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-zinc-800 transition-all shadow-md active:scale-[0.98]"
              >
                Browse Catalog &rarr;
              </Link>
            </div>
          </div>

          {/* Support Card */}
          <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
                Customer Assistance
              </span>
              <h3 className="text-xl font-bold text-zinc-900">Get in Touch</h3>
              <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
                Even without a physical storefront, our team is always here to assist you with sizing, orders, or any questions you may have.
              </p>
            </div>
            <div className="space-y-1.5 pt-2 border-t border-zinc-100 text-xs md:text-sm">
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