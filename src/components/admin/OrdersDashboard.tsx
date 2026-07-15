import { useState, useEffect } from 'react';
import { supabase } from '../../supabase';

// --- UI TOAST COMPONENT (INTERNAL) ---
const Toast = ({ message, type, onClose }: { message: string, type: 'success' | 'error' | 'info', onClose: () => void }) => {
    useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
    const styles = {
        success: 'bg-white border-emerald-200 text-emerald-800',
        error: 'bg-white border-rose-200 text-rose-800',
        info: 'bg-white border-indigo-200 text-indigo-900',
    };
    return (
        <div className={`fixed top-6 right-6 z-[999] flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-xl animate-fadeIn ${styles[type]}`}>
            <span className="font-bold">{type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
            <p className="font-semibold text-sm">{message}</p>
        </div>
    );
};

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
    fulfillment_status: 'Processing' | 'Shipped' | 'Delivered';
    payment_status: string;
    tracking_number: string | null;
    shipping_address: {
        name: string;
        street: string;
        city: string;
        state: string;
        zip: string;
        phone?: string;
    } | null;
    items: OrderItem[];
}

const OrdersDashboard = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingTrackingId, setEditingTrackingId] = useState<string | null>(null);
    const [tempTracking, setTempTracking] = useState('');
    
    // Deletion State
    const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
    
    // Toast State
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

    const triggerToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
        setToast({ message, type });
    };

    const fetchOrders = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) setOrders(data as Order[]);
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleLocalStatusChange = (orderId: string, newStatus: string) => {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, fulfillment_status: newStatus as any } : o));
    };

    const handleUpdateFulfillment = async (order: Order) => {
        const { error } = await supabase
            .from('orders')
            .update({ fulfillment_status: order.fulfillment_status })
            .eq('id', order.id);

        if (!error) {
            triggerToast(`Order ${order.id.slice(0, 6)} updated to ${order.fulfillment_status}`, 'success');
        } else {
            triggerToast("Failed to update status.", 'error');
        }
    };

    const handleSaveTracking = async (orderId: string) => {
        const { error } = await supabase
            .from('orders')
            .update({ tracking_number: tempTracking.trim() || null })
            .eq('id', orderId);

        if (!error) {
            setOrders(prev => prev.map(o => o.id === orderId ? { ...o, tracking_number: tempTracking.trim() || null } : o));
            setEditingTrackingId(null);
            triggerToast("Tracking number updated.", 'success');
        } else {
            triggerToast("Failed to save tracking.", 'error');
        }
    };

    const confirmDeleteOrder = async (orderId: string) => {
        const { error } = await supabase
            .from('orders')
            .delete()
            .eq('id', orderId);

        if (!error) {
            setOrders(prev => prev.filter(o => o.id !== orderId));
            triggerToast("Order successfully removed.", 'success');
        } else {
            triggerToast("Failed to remove order.", 'error');
        }
        setOrderToDelete(null);
    };

    if (loading) return <div className="text-center py-12 text-sm text-slate-500 font-semibold">Loading orders data...</div>;

    return (
        <div className="text-left">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-slate-900">Orders Control Center</h1>
                <p className="text-sm text-slate-500 mt-1">View and update order information here</p>
            </div>

            <div className="flex flex-col gap-6">
                {orders.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl text-sm text-slate-400 bg-white">
                        No customer orders recorded in database yet.
                    </div>
                ) : (
                    orders.map((order) => (
                        <div key={order.id} className="bg-white border border-slate-200 shadow-xs rounded-2xl overflow-hidden flex flex-col relative">
                            
                            {/* Deletion Confirmation Overlay */}
                            {orderToDelete === order.id && (
                                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
                                    <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center text-2xl mb-4 shadow-sm border border-rose-100">
                                        ✕
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Order {order.id.slice(0, 8)}?</h3>
                                    <p className="text-slate-500 text-sm max-w-sm mb-6">This action cannot be undone. This will permanently remove the order record and all associated items from the database.</p>
                                    <div className="flex items-center gap-3">
                                        <button 
                                            onClick={() => setOrderToDelete(null)} 
                                            className="px-5 py-2.5 text-slate-600 font-bold bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer shadow-xs"
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            onClick={() => confirmDeleteOrder(order.id)} 
                                            className="px-5 py-2.5 bg-rose-600 text-white font-bold rounded-xl shadow-xs hover:bg-rose-700 transition-colors cursor-pointer"
                                        >
                                            Yes, Remove
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Meta Top Strip */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-[#f4f3ef]/40 border-b border-slate-200/60 text-xs font-semibold text-slate-600">
                                <div>
                                    <p className="text-slate-400 text-[10px] uppercase tracking-wider mb-0.5">Order ID</p>
                                    <p className="font-mono text-slate-800 truncate max-w-[150px]">{order.id}</p>
                                </div>
                                <div>
                                    <p className="text-slate-400 text-[10px] uppercase tracking-wider mb-0.5">Total Revenue</p>
                                    <p className="text-slate-900 font-bold">${order.total_amount.toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="text-slate-400 text-[10px] uppercase tracking-wider mb-0.5">Payment</p>
                                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-100 rounded-md font-bold text-[10px] uppercase tracking-wider">{order.payment_status}</span>
                                </div>
                                
                                <div className="flex md:justify-end items-center gap-2">
                                    <select 
                                        value={order.fulfillment_status}
                                        onChange={(e) => handleLocalStatusChange(order.id, e.target.value)}
                                        className="bg-white border border-slate-200 text-slate-700 text-[11px] font-bold uppercase py-1.5 px-2 rounded-lg cursor-pointer focus:outline-none"
                                    >
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                    <button 
                                        onClick={() => handleUpdateFulfillment(order)}
                                        className="px-3 py-1.5 bg-slate-900 text-white text-[10px] font-bold uppercase rounded-lg hover:bg-slate-800 transition-colors cursor-pointer shadow-xs"
                                    >
                                        Update
                                    </button>
                                    
                                    <div className="w-px h-6 bg-slate-200/80 mx-1 hidden sm:block"></div>
                                    
                                    <button 
                                        onClick={() => setOrderToDelete(order.id)}
                                        className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                        title="Remove Order"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col md:flex-row gap-8 justify-between items-start">
                                <div className="flex-1 w-full divide-y divide-slate-100">
                                    {order.items?.map((item) => (
                                        <div key={item.id} className="flex gap-4 py-3 first:pt-0 last:pb-0 items-center">
                                            <div className="w-12 h-14 bg-[#f4f3ef] border border-slate-200/60 rounded-xl p-1 flex-shrink-0">
                                                <img src={item.image} alt="" className="w-full h-full object-contain" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h4 className="font-bold text-slate-800 text-sm truncate">{item.name}</h4>
                                                <p className="text-xs text-slate-400 font-medium mt-0.5">Qty: {item.quantity} {item.size && `| Size: ${item.size}`} {item.color && `| Color: ${item.color}`}</p>
                                            </div>
                                            <div className="text-sm font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="w-full md:w-64 flex flex-col gap-1 bg-[#f4f3ef]/20 border border-slate-200/40 rounded-2xl p-4 text-xs font-medium text-slate-600">
                                    <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">Shipping Target Address</p>
                                    {order.shipping_address ? (
                                        <>
                                            <p className="font-bold text-slate-800 capitalize">{order.shipping_address.name}</p>
                                            <p className="mt-0.5">{order.shipping_address.street}</p>
                                            <p>{order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zip}</p>
                                            {order.shipping_address.phone && <p className="text-slate-400 mt-1">📞 {order.shipping_address.phone}</p>}
                                        </>
                                    ) : (
                                        <p className="text-slate-400 italic">No delivery profile attached.</p>
                                    )}
                                </div>
                            </div>

                            <div className="px-6 py-3 border-t border-slate-200/40 bg-slate-50/20 text-xs font-semibold flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-slate-400">Tracking Number:</span>
                                    {editingTrackingId === order.id ? (
                                        <input 
                                            type="text" 
                                            value={tempTracking} 
                                            onChange={(e) => setTempTracking(e.target.value)}
                                            placeholder="Enter parcel reference"
                                            className="border border-slate-300 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-slate-500 font-mono bg-white"
                                        />
                                    ) : (
                                        <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-800 shadow-2xs">
                                            {order.tracking_number || "Unassigned"}
                                        </span>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    {editingTrackingId === order.id ? (
                                        <>
                                            <button onClick={() => handleSaveTracking(order.id)} className="text-emerald-600 hover:text-emerald-800 font-bold transition-colors cursor-pointer">Save</button>
                                            <button onClick={() => setEditingTrackingId(null)} className="text-slate-400 hover:text-slate-600 font-bold transition-colors cursor-pointer">Cancel</button>
                                        </>
                                    ) : (
                                        <button 
                                            onClick={() => { setEditingTrackingId(order.id); setTempTracking(order.tracking_number || ''); }}
                                            className="text-indigo-600 hover:text-indigo-800 font-bold transition-colors cursor-pointer"
                                        >
                                            {order.tracking_number ? "Edit Tracking Reference" : "Assign Tracking Reference →"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default OrdersDashboard;