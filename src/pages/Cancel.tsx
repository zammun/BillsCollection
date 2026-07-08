import { Link } from "react-router-dom";

export default function CancelPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50/50 px-4 py-12">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl border border-gray-100 text-center animate-fadeIn">
        <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>

        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Checkout Canceled</h1>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          Your payment transaction loop was aborted. No funds have been moved, and your current cart selection has been kept exactly as you left it.
        </p>

        <div className="flex flex-col gap-3 mt-8">
          <Link to="/cart" className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer">
            Return to Cart Summary
          </Link>
          <Link to="/" className="w-full py-3 bg-white hover:bg-gray-50 text-gray-600 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer">
            Back to Home Shop
          </Link>
        </div>
      </div>
    </div>
  );
}