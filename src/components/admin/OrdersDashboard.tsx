import { useState, useEffect } from 'react';
import { supabase } from '../../supabase';
import { useNotificationStore } from '../../store/useNotificationStore';

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
    const [isDeleting, setIsDeleting] = useState(false);
    
    // Toast State
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
    
    // Notification Store Hook
    const addNotification = useNotificationStore((state) => state.addNotification);

    const triggerToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3500);
    };

    const fetchOrders = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching orders:", error);
            triggerToast("Failed to fetch orders from database.", 'error');
        } else if (data) {
            setOrders(data as Order[]);
        }
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
            triggerToast(`Order #${order.id.slice(0, 8)} updated to ${order.fulfillment_status}`, 'success');

            if (order.fulfillment_status === 'Shipped') {
                addNotification(
                    "Order Shipped",
                    `Your order #${order.id.slice(0, 8)} is on its way.`
                );
            } else if (order.fulfillment_status === 'Delivered') {
                addNotification(
                    "Order Delivered",
                    `Your order #${order.id.slice(0, 8)} has arrived.`
                );
            }
        } else {
            console.error("Error updating status:", error);
            triggerToast("Failed to update status in database.", 'error');
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
            console.error("Error saving tracking:", error);
            triggerToast("Failed to save tracking number.", 'error');
        }
    };

    const confirmDeleteOrder = async (orderId: string) => {
        setIsDeleting(true);
        try {
            const { error } = await supabase
                .from('orders')
                .delete()
                .eq('id', orderId);

            if (error) {
                console.error("Supabase Order Deletion Error:", error);
                throw error;
            }

            setOrders(prev => prev.filter(o => o.id !== orderId));
            triggerToast("Order record permanently removed.", 'success');
        } catch (err: any) {
            console.error("Deletion execution failed:", err);
            triggerToast(err.message || "Failed to delete order from database.", 'error');
        } finally {
            setIsDeleting(false);
            setOrderToDelete(null);
        }
    };

    if (loading) return <div className="text-center py-16 text-sm text-zinc-500 font-semibold">Loading orders data...</div>;

    return (
        <div className="text-left font-sans antialiased text-zinc-800 w-full">
            {/* --- RESPONSIVE TOAST NOTIFICATIONS UI NODE --- */}
            {toast && (
                <div className={`fixed bottom-6 left-4 right-4 md:bottom-auto md:top-28 md:left-auto md:right-8 z-[9999] flex items-center gap-3 px-5 py-3.5 rounded-2xl border bg-white shadow-2xl animate-fadeIn transition-all duration-300 md:max-w-sm mx-auto
                    ${toast.type === 'success' ? 'border-emerald-200' : ''}
                    ${toast.type === 'error' ? 'border-rose-200' : ''}
                    ${toast.type === 'info' ? 'border-indigo-200' : ''}
                `}>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
                        {toast.type === 'success' ? 'STATUS' : toast.type === 'error' ? 'ALERT' : 'INFO'}
                    </span>
                    <p className="text-xs font-semibold text-zinc-700">{toast.message}</p>
                </div>
            )}

            {/* Header Section */}
            <div className="mb-10 space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
                    Order Operations
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight font-heading">
                    Orders <span className="text-[#d4af37]">Control Center</span>
                </h1>
                <p className="text-sm md:text-base text-zinc-600">Review transactions, update shipping tracking numbers, and manage fulfillment status.</p>
            </div>

            <div className="flex flex-col gap-6">
                {orders.length === 0 ? (
                    <div className="text-center py-16 border border-dashed border-zinc-200 rounded-3xl text-sm text-zinc-500 bg-white">
                        No customer orders recorded in database yet.
                    </div>
                ) : (
                    orders.map((order) => (
                        <div key={order.id} className="bg-white border border-zinc-200/60 shadow-xl rounded-3xl overflow-hidden flex flex-col relative">
                            
                            {/* Deletion Confirmation Modal Overlay */}
                            {orderToDelete === order.id && (
                                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
                                    <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center text-lg mb-3 shadow-xs border border-rose-100 font-bold">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 6L6 18M6 6l12 12" />
                                        </svg>
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-rose-600 mb-1">
                                        Permanent Removal
                                    </span>
                                    <h3 className="text-xl font-bold text-zinc-900 mb-2 tracking-tight">Delete Order #{order.id.slice(0, 8)}?</h3>
                                    <p className="text-zinc-600 text-xs max-w-sm mb-6 leading-relaxed">This action cannot be undone. This will permanently remove the transaction record from your database.</p>
                                    <div className="flex items-center gap-3">
                                        <button 
                                            onClick={() => setOrderToDelete(null)} 
                                            disabled={isDeleting}
                                            className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-600 bg-zinc-100 hover:bg-zinc-200 rounded-xl transition-colors cursor-pointer"
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            onClick={() => confirmDeleteOrder(order.id)} 
                                            disabled={isDeleting}
                                            className="px-5 py-2.5 bg-rose-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs hover:bg-rose-700 transition-colors cursor-pointer disabled:opacity-50"
                                        >
                                            {isDeleting ? "Removing..." : "Confirm Removal"}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Meta Top Strip */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-zinc-50 border-b border-zinc-200/60 text-xs font-semibold text-zinc-600">
                                <div>
                                    <p className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider mb-0.5">Order ID</p>
                                    <p className="font-mono text-zinc-900 truncate max-w-[150px]">{order.id}</p>
                                </div>
                                <div>
                                    <p className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider mb-0.5">Total Revenue</p>
                                    <p className="text-zinc-900 font-bold">${order.total_amount.toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider mb-0.5">Payment Status</p>
                                    <span className="text-emerald-800 bg-emerald-50 px-2.5 py-0.5 border border-emerald-200/80 rounded-md font-bold text-[10px] uppercase tracking-wider inline-block mt-0.5">
                                        {order.payment_status}
                                    </span>
                                </div>
                                
                                <div className="flex md:justify-end items-center gap-2">
                                    <select 
                                        value={order.fulfillment_status}
                                        onChange={(e) => handleLocalStatusChange(order.id, e.target.value)}
                                        className="bg-white border border-zinc-200 text-zinc-800 text-[11px] font-bold uppercase py-1.5 px-2.5 rounded-xl cursor-pointer focus:outline-none"
                                    >
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                    <button 
                                        onClick={() => handleUpdateFulfillment(order)}
                                        className="px-3.5 py-1.5 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer shadow-xs"
                                    >
                                        Update
                                    </button>
                                    
                                    <div className="w-px h-6 bg-zinc-200 mx-1 hidden sm:block"></div>
                                    
                                    <button 
                                        onClick={() => setOrderToDelete(order.id)}
                                        className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                                        title="Remove Order"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 6L6 18M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Main Details Body */}
                            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 justify-between items-start">
                                <div className="flex-1 w-full divide-y divide-zinc-100">
                                    {order.items?.map((item) => (
                                        <div key={item.id} className="flex gap-4 py-3.5 first:pt-0 last:pb-0 items-center">
                                            <div className="w-14 h-16 bg-zinc-50 border border-zinc-200/60 rounded-xl p-1 flex-shrink-0">
                                                <img src={item.image} alt="" className="w-full h-full object-contain" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h4 className="font-bold text-zinc-900 text-sm truncate">{item.name}</h4>
                                                <p className="text-xs text-zinc-500 font-medium mt-0.5">
                                                    Qty: {item.quantity} {item.size && `| Size: ${item.size}`} {item.color && `| Color: ${item.color}`}
                                                </p>
                                            </div>
                                            <div className="text-sm font-bold text-zinc-900">${(item.price * item.quantity).toFixed(2)}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="w-full md:w-72 flex flex-col gap-1.5 bg-zinc-50 border border-zinc-200/60 rounded-2xl p-5 text-xs font-medium text-zinc-600">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Shipping Address</span>
                                    {order.shipping_address ? (
                                        <>
                                            <p className="font-bold text-zinc-900 text-sm capitalize mt-1">{order.shipping_address.name}</p>
                                            <p className="mt-0.5">{order.shipping_address.street}</p>
                                            <p>{order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zip}</p>
                                            {order.shipping_address.phone && <p className="text-zinc-500 mt-1 font-mono">Tel: {order.shipping_address.phone}</p>}
                                        </>
                                    ) : (
                                        <p className="text-zinc-400 italic mt-1">No delivery profile attached.</p>
                                    )}
                                </div>
                            </div>

                            {/* Tracking Footer Bar */}
                            <div className="px-6 py-4 border-t border-zinc-100 bg-zinc-50/50 text-xs font-semibold flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-bold">Tracking Number:</span>
                                    {editingTrackingId === order.id ? (
                                        <input 
                                            type="text" 
                                            value={tempTracking} 
                                            onChange={(e) => setTempTracking(e.target.value)}
                                            placeholder="Enter reference number"
                                            className="border border-zinc-300 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-zinc-500 font-mono bg-white text-zinc-900"
                                        />
                                    ) : (
                                        <span className="font-mono bg-white px-2.5 py-1 rounded-lg border border-zinc-200 text-zinc-900 shadow-2xs font-bold">
                                            {order.tracking_number || "Unassigned"}
                                        </span>
                                    )}
                                </div>
                                <div className="flex gap-3">
                                    {editingTrackingId === order.id ? (
                                        <>
                                            <button onClick={() => handleSaveTracking(order.id)} className="text-emerald-700 hover:text-emerald-900 font-bold uppercase tracking-wider text-[11px] transition-colors cursor-pointer">Save</button>
                                            <button onClick={() => setEditingTrackingId(null)} className="text-zinc-400 hover:text-zinc-600 font-bold uppercase tracking-wider text-[11px] transition-colors cursor-pointer">Cancel</button>
                                        </>
                                    ) : (
                                        <button 
                                            onClick={() => { setEditingTrackingId(order.id); setTempTracking(order.tracking_number || ''); }}
                                            className="text-zinc-900 hover:text-[#d4af37] font-bold uppercase tracking-wider text-[11px] transition-colors cursor-pointer"
                                        >
                                            {order.tracking_number ? "Edit Tracking Reference" : "Assign Tracking Reference"}
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