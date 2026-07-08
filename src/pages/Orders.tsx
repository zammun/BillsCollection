import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { supabase } from "../supabase";

interface OrderItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  color?: string;
  size?: string;
}

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  fulfillment_status: "Processing" | "Shipped" | "Delivered";
  tracking_number: string | null;
  items: OrderItem[];
}

export default function OrdersPage() {
  const { user } = useAuthContext();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrderHistory() {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("id, created_at, total_amount, fulfillment_status, tracking_number, items")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data) setOrders(data as Order[]);
      } catch (err) {
        console.error("Error fetching order history ledger:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrderHistory();
  }, [user]);

  // Utility to strictly format database timestamps into standard MM-DD-YYYY layout
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const getStatusColor = (status: Order["fulfillment_status"]) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Shipped":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-24 text-center">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">No Orders Found</h1>
        <p className="text-gray-500 mt-2 mb-8 max-w-sm mx-auto">Looks like you haven't placed any purchases yet through your account profile ledger.</p>
        <Link to="/list" className="py-3 px-6 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all hover:bg-slate-800 shadow-md">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    /* FIXED: Cleared grey background layers to match core studio background canvas scaling rules */
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-24 bg-transparent min-h-screen text-left">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Order History</h1>
        <p className="text-sm text-gray-500 mb-10">View tracking numbers and delivery estimates, manage orders, and update information here.</p>

        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            /* FIXED: Replaced gray border lines with matching thin slate parameters */
            <div key={order.id} className="bg-white border border-slate-200/60 rounded-2xl shadow-xs overflow-hidden">
              
              {/* Card Meta Header */}
              {/* FIXED: Restyled meta header backing with warm background tint opacity mixes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-[#f4f3ef]/60 border-b border-slate-200/60 text-xs text-slate-600 font-medium">
                <div>
                  <p className="text-gray-400 uppercase tracking-wider text-[10px] mb-1">Date Placed</p>
                  <p className="text-slate-900 font-bold">{formatDate(order.created_at)}</p>
                </div>
                <div>
                  <p className="text-gray-400 uppercase tracking-wider text-[10px] mb-1">Total Amount</p>
                  <p className="text-slate-900 font-bold">${order.total_amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-400 uppercase tracking-wider text-[10px] mb-1">Order Identifier</p>
                  <p className="font-mono text-slate-700 truncate max-w-[140px]">{order.id}</p>
                </div>
                <div className="flex sm:justify-end items-center">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${getStatusColor(order.fulfillment_status)}`}>
                    {order.fulfillment_status}
                  </span>
                </div>
              </div>

              {/* Card Product Item List */}
              <div className="p-6 divide-y divide-slate-100">
                {order.items?.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0 items-center">
                    {/* FIXED: Reconfigured background container fill parameters to hide default border blocks */}
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-20 bg-[#f4f3ef] rounded-xl object-contain p-2 border border-slate-200/60 flex-shrink-0" 
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 text-sm truncate">{item.name}</h4>
                      <p className="text-xs text-gray-500 mt-0.5 font-medium">
                        Qty: {item.quantity} {item.color && `| Color: ${item.color}`} {item.size && `| Size: ${item.size}`}
                      </p>
                    </div>
                    <div className="text-sm font-bold text-slate-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Card Footer Actions / Tracking Data Block */}
              {order.tracking_number && (
                /* FIXED: Synchronized footer segment matching light template panel properties */
                <div className="px-6 py-4 bg-[#f4f3ef]/30 border-t border-slate-200/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="text-gray-400">Tracking Reference:</span>
                    <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-800">{order.tracking_number}</span>
                  </div>
                  <a 
                    href={`https://www.fedex.com/apps/fedextrack/?tracknumbers=${order.tracking_number}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors cursor-pointer"
                  >
                    Track Shipment Route →
                  </a>
                </div>
              )}

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}