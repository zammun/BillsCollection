import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useCartStore } from "../store/useCartStore";
import { useNotificationStore } from "../store/useNotificationStore"; // 1. Import store
import { supabase } from "../supabase";

interface OrderSummary {
  id: string;
  total_amount: number;
  created_at: string;
}

export default function SuccessPage() {
  const { user } = useAuthContext();
  const clearCart = useCartStore((state) => state.clearCart);
  const addNotification = useNotificationStore((state) => state.addNotification); // 2. Pull hook
  const [latestOrder, setLatestOrder] = useState<OrderSummary | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Wipe out active local shopping cart states instantly on successful entry
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  // 2. Fetch the newly written order row from Supabase to provide clear receipt records
  // 2. Fetch the newly written order row from Supabase
  useEffect(() => {
    async function fetchLatestOrder() {
      // Grab the session_id from the URL (e.g., /success?session_id=cs_test_123...)
      const searchParams = new URLSearchParams(window.location.search);
      const sessionId = searchParams.get('session_id');

      // If there's no session ID, stop loading and exit
      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("orders")
          .select("id, total_amount, created_at")
          .eq("stripe_session_id", sessionId) // Look up by Stripe Session ID instead of User ID
          .single();

        if (error) throw error;
        
        if (data) {
          setLatestOrder(data);
          addNotification(
            "Order Confirmed! 🎉", 
            `Your payment was successful. Order #${data.id.slice(0, 8)} is being prepared.`
          );
        }
      } catch (err) {
        console.error("Error retrieving order confirmation:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLatestOrder();
  }, [addNotification]);

  // Generate an estimated delivery target date 5 days out formatted in MM-DD-YYYY
  const getEstimatedDeliveryDate = () => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);
    
    const month = String(deliveryDate.getMonth() + 1).padStart(2, '0');
    const day = String(deliveryDate.getDate()).padStart(2, '0');
    const year = deliveryDate.getFullYear();
    
    return `${month}-${day}-${year}`;
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50/50 px-4 py-12">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl border border-gray-100 text-center animate-fadeIn">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Payment Successful!</h1>
        <p className="text-sm text-gray-500 mt-2">Thank you for your order. We are now processing for delivery.</p>

        <div className="my-6 p-4 bg-gray-50 rounded-xl border border-gray-100 text-left flex flex-col gap-3.5 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 font-medium">Confirmation #</span>
            <span className="font-mono font-bold text-gray-900 max-w-[180px] truncate">
              {loading ? "Fetching..." : latestOrder ? latestOrder.id : "GEN-OR-NEXUS"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 font-medium">Amount Paid</span>
            <span className="font-bold text-gray-900">
              {loading ? "..." : latestOrder ? `$${latestOrder.total_amount}` : "Processing"}
            </span>
          </div>
          <div className="border-t border-gray-200/60 my-0.5"></div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-400 font-medium">Estimated Delivery Timeline:</span>
            <span className="font-semibold text-slate-800 flex items-center gap-1.5 mt-0.5">
              🚚 Standard Shipping — Arriving on or before <span className="text-indigo-600 underline font-bold">{getEstimatedDeliveryDate()}</span>
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-8">
          <Link to="/orders" className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer">
            Track via Order History
          </Link>
          <Link to="/" className="w-full py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}