import { useState } from 'react';

const TrackOrderPage = () => {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [order, setOrder] = useState<any>(null);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOrder(null);

    try {
      const res = await fetch('/api/track-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: orderId.trim(), email: email.trim() }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Order not found.');

      setOrder(data.order);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-left">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Track Guest Order</h1>
      <p className="text-xs text-gray-500 mb-8">Enter your order confirmation number and email address to view status.</p>

      <form onSubmit={handleLookup} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs flex flex-col gap-4 mb-8">
        <div>
          <label className="text-xs font-bold text-slate-700 uppercase">Order / Session ID</label>
          <input
            type="text"
            required
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="e.g. cs_test_a1b2c3..."
            className="w-full p-3 border border-slate-200 rounded-xl text-sm mt-1 outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 uppercase">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full p-3 border border-slate-200 rounded-xl text-sm mt-1 outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>

        {error && <p className="text-xs font-bold text-red-500 mt-1">✕ {error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl text-sm hover:bg-slate-800 transition-all cursor-pointer disabled:bg-gray-300"
        >
          {loading ? 'Searching...' : 'Find Order'}
        </button>
      </form>

      {/* Order Results Card */}
      {order && (
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs flex flex-col gap-4 animate-fadeIn">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs text-gray-400 font-medium">Order ID</span>
              <p className="text-sm font-bold text-slate-900">{order.id}</p>
            </div>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
              {order.fulfillment_status || 'Processing'}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {order.items?.map((item: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center text-sm">
                <span className="text-slate-700 font-medium">{item.name} (x{item.quantity})</span>
                <span className="font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-3 flex justify-between items-center font-bold text-slate-900 text-base">
            <span>Total Paid</span>
            <span>${order.total_amount?.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrderPage;