export default function PricingPolicyPage() {
  return (
    <div className="suave-luxury-theme text-zinc-800 py-12 md:py-16 pb-20 px-6 font-sans antialiased">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight">
            Pricing <span className="text-[#d4af37]">Policy</span>
          </h1>
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
            Last Updated: July 8, 2026
          </p>
          <p className="text-base md:text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Transparent guidelines regarding product costs, promotional discounts, taxes, and payment processing.
          </p>
        </div>

        {/* Core Pricing Accuracy Card */}
        <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 md:p-12 shadow-xl space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
            Integrity & Adjustments
          </span>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
            Pricing Accuracy & Modifications
          </h2>
          <div className="space-y-4 text-zinc-600 leading-relaxed text-sm md:text-base">
            <p>
              We make every reasonable effort to ensure that the pricing displayed across our catalog is accurate and current. However, despite our best efforts, typographical or technical errors may occur.
            </p>
            <p>
              In the event a product is listed at an incorrect price due to an error, Bills Collection reserves the right to refuse or cancel any orders placed for products listed at the incorrect rate. Prices and item availability remain subject to change at any time without prior notice.
            </p>
          </div>
        </div>

        {/* Grid: Taxes, Currency, Promotions, Payments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-xl space-y-3">
            <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
              Duties & Checkout
            </span>
            <h3 className="text-xl font-bold text-zinc-900">Taxes and Fees</h3>
            <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
              Listed prices exclude applicable sales tax, VAT, or government duties. All applicable taxes are calculated and added to your order total at checkout based on your designated shipping address.
            </p>
          </div>

          <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-xl space-y-3">
            <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
              Sales & Discount Codes
            </span>
            <h3 className="text-xl font-bold text-zinc-900">Promotional Pricing</h3>
            <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
              Promotions and discount codes are valid strictly for specified timeframes and cannot be combined unless explicitly noted. We reserve the right to modify or revoke promotional offers at any time.
            </p>
          </div>

          <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-xl space-y-3">
            <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
              USD Denomination
            </span>
            <h3 className="text-xl font-bold text-zinc-900">Currency</h3>
            <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
              All catalog prices are listed in United States Dollars (USD). If purchasing internationally, your card issuer or bank may apply its own exchange rate and foreign transaction fees.
            </p>
          </div>

          <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-xl space-y-3">
            <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
              Secure Gateway
            </span>
            <h3 className="text-xl font-bold text-zinc-900">Third-Party Payments</h3>
            <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
              Transactions are securely processed through Stripe. Full card details are never stored on our servers, and purchases remain subject to our payment processor's terms of service.
            </p>
          </div>

        </div>

        {/* Contact Support Card */}
        <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 md:p-12 shadow-xl space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
                Discrepancies & Assistance
              </span>
              <h2 className="text-2xl font-bold text-zinc-900 tracking-tight mt-1">
                Pricing Questions?
              </h2>
              <p className="text-xs text-zinc-500 mt-1">
                If you have questions regarding taxes, checkout rates, or order discrepancies, reach out directly.
              </p>
            </div>
            <a 
              href="mailto:contact@billscollection.co?subject=Pricing%20Policy%20Inquiry" 
              className="inline-block px-6 py-3.5 bg-zinc-900 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-zinc-800 transition-all shadow-md active:scale-[0.98] cursor-pointer shrink-0"
            >
              Contact Support Desk
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}