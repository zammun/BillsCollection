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
        <div className="min-h-screen bg-transparent relative flex flex-col md:flex-row">
            {/* Mobile Header Bar */}
            <header className="sticky top-0 z-10 bg-[#f4f3ef]/90 backdrop-blur-md flex items-center justify-between p-4 border-b border-slate-200/60 md:hidden">
                <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="text-slate-800 p-1.5 rounded-lg cursor-pointer border border-slate-200/80"
                    aria-label="Open menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M4 12h16M4 6h16M4 18h16" />
                    </svg>
                </button>
                <div className="text-sm font-bold text-slate-900 tracking-wider uppercase">
                    {activeTab === 'products' ? 'Products Control' : 'Orders Management'}
                </div>
                <div className="w-10"></div>
            </header>

            {/* Mobile Sidebar Backdrop Overlay */}
            <div 
                onClick={() => setIsSidebarOpen(false)}
                className={`fixed inset-0 z-30 bg-black/40 backdrop-blur-xs transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} md:hidden`} 
            />

            {/* Global Admin Sidebar */}
            <aside className={`w-64 bg-slate-900 text-white flex flex-col justify-between p-6 flex-shrink-0
                fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out md:static md:translate-x-0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex flex-col gap-8">
                    <div className="flex items-center justify-between">
                        <div className="text-xl font-bold tracking-wider">STORE ADMIN</div>
                        <button onClick={() => setIsSidebarOpen(false)} className="text-white hover:text-red-400 p-1.5 md:hidden">✕</button>
                    </div>
                    <nav className="flex flex-col gap-2">
    <button 
        type="button"
        onClick={() => { setActiveTab('products'); setIsSidebarOpen(false); }}
        className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer
            ${activeTab === 'products' ? 'bg-slate-800 text-white shadow-xs' : 'text-slate-400 hover:bg-slate-800/40 hover:text-white'}`}
    >
        Products Dashboard
    </button>
    <button 
        type="button"
        onClick={() => { setActiveTab('orders'); setIsSidebarOpen(false); }}
        className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer
            ${activeTab === 'orders' ? 'bg-slate-800 text-white shadow-xs' : 'text-slate-400 hover:bg-slate-800/40 hover:text-white'}`}
    >
        Orders Dashboard
    </button>
</nav>
                </div>
                <button onClick={handleLogout} className="text-left text-sm text-slate-400 hover:text-red-400 transition-colors px-4 py-2 cursor-pointer font-medium">
                    Sign Out
                </button>
            </aside>

            {/* Dynamic Dashboard Target Render Frame */}
            <main className="flex-1 p-6 md:p-12 overflow-y-auto pt-8 md:pt-12">
                {activeTab === 'products' ? <ProductsDashboard /> : <OrdersDashboard />}
            </main>
        </div>
    );
};

export default AdminPage;