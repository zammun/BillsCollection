import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import ProductsDashboard from '../components/admin/ProductsDashboard';
import OrdersDashboard from '../components/admin/OrdersDashboard';

const AdminPage = () => {
    const navigate = useNavigate();
    const [authorized, setAuthorized] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    // Core state controlling which dashboard is rendered
    const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            const authorizedEmails = ['moneyygdaman@gmail.com'];
            
            if (!user || !authorizedEmails.includes(user.email || '')) {
                navigate('/');
            } else {
                setAuthorized(true);
            }
        };
        checkUser();
    }, [navigate]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    if (!authorized) return null;

    return (
        <div className="suave-luxury-theme flex flex-col md:flex-row font-sans antialiased flex-1 min-h-[calc(100vh-20rem)] w-full relative">
            {/* Mobile Header Bar */}
            <header className="sticky top-20 z-10 bg-[#E6E4DC]/95 backdrop-blur-md flex items-center justify-between p-4 border-b border-zinc-200/60 md:hidden">
                <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="text-zinc-800 p-2 rounded-xl cursor-pointer border border-zinc-200/80 bg-white shadow-2xs"
                    aria-label="Open menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 12h16M4 6h16M4 18h16" />
                    </svg>
                </button>
                <div className="text-xs font-bold text-zinc-900 tracking-wider uppercase">
                    {activeTab === 'products' ? (
                        <>Products <span className="text-[#d4af37]">Control</span></>
                    ) : (
                        <>Orders <span className="text-[#d4af37]">Management</span></>
                    )}
                </div>
                <div className="w-10"></div>
            </header>

            {/* Mobile Sidebar Backdrop Overlay */}
            {isSidebarOpen && (
                <div 
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 z-30 bg-zinc-900/40 backdrop-blur-xs md:hidden animate-fadeIn" 
                />
            )}

            {/* Global Admin Sidebar */}
            <aside className={`w-64 bg-zinc-900 text-white flex flex-col justify-between p-6 flex-shrink-0
                fixed top-20 bottom-0 left-0 z-40 transform transition-transform duration-300 ease-in-out md:static md:translate-x-0 shadow-2xl overflow-y-auto
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex flex-col gap-8">
                    <div className="flex items-center justify-between">
                        <div className="text-lg font-bold tracking-wider uppercase">
                            Bills <span className="text-[#d4af37]">Admin</span>
                        </div>
                        <button 
                            onClick={() => setIsSidebarOpen(false)} 
                            className="text-zinc-400 hover:text-white p-1.5 md:hidden cursor-pointer"
                        >
                            ✕
                        </button>
                    </div>

                    <nav className="flex flex-col gap-2">
                        <button 
                            type="button"
                            onClick={() => { setActiveTab('products'); setIsSidebarOpen(false); }}
                            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-between
                                ${activeTab === 'products' 
                                    ? 'bg-zinc-800 text-white border-l-4 border-[#d4af37] shadow-xs' 
                                    : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'}`}
                        >
                            <span>Products Dashboard</span>
                        </button>

                        <button 
                            type="button"
                            onClick={() => { setActiveTab('orders'); setIsSidebarOpen(false); }}
                            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-between
                                ${activeTab === 'orders' 
                                    ? 'bg-zinc-800 text-white border-l-4 border-[#d4af37] shadow-xs' 
                                    : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'}`}
                        >
                            <span>Orders Dashboard</span>
                        </button>
                    </nav>
                </div>

                <button 
                    onClick={handleLogout} 
                    className="text-left text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-rose-400 transition-colors px-4 py-3 rounded-xl hover:bg-zinc-800/40 cursor-pointer"
                >
                    Sign Out
                </button>
            </aside>

            {/* Dynamic Dashboard Target Render Frame */}
            <main className="flex-1 p-6 md:p-10 overflow-y-auto w-full">
                <div className="max-w-7xl mx-auto">
                    {activeTab === 'products' ? <ProductsDashboard /> : <OrdersDashboard />}
                </div>
            </main>
        </div>
    );
};

export default AdminPage;