import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    color: string;
    type: string;
    image_url: string[];
}

const AdminPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [authorized, setAuthorized] = useState(false);
    
    // Inventory List State
    const [products, setProducts] = useState<Product[]>([]);
    
    // Form States
    const [formData, setFormData] = useState({ name: '', price: '', description: '', color: '', type: 'T-Shirt' });
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const typeOptions = ['T-Shirt', 'Hoodie', 'Pant', 'Shirt', 'Hat', 'Accessory'];

    // Fetch products for the dashboard list view
    const fetchInventory = async () => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('id', { ascending: false });
        
        if (!error && data) {
            setProducts(data);
        }
    };

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            const authorizedEmails = ['moneyygdaman@gmail.com'];
            
            if (!user || !authorizedEmails.includes(user.email || '')) {
                navigate('/');
            } else {
                setAuthorized(true);
                fetchInventory(); // Pull inventory upon authenticating successfully
            }
        };
        checkUser();
    }, [navigate]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setImages(prevImages => [...prevImages, ...newFiles]);

            const newPreviews = newFiles.map(file => URL.createObjectURL(file));
            setImagePreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
        }
    };

    const removeImage = (indexToRemove: number) => {
        URL.revokeObjectURL(imagePreviews[indexToRemove]);
        setImages(prevImages => prevImages.filter((_, idx) => idx !== indexToRemove));
        setImagePreviews(prevPreviews => prevPreviews.filter((_, idx) => idx !== indexToRemove));
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    // New Delete Controller Action
    const handleDeleteProduct = async (id: number, name: string) => {
        const confirmDelete = window.confirm(`Are you sure you want to permanently remove "${name}" from the store catalog?`);
        if (!confirmDelete) return;

        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id);

            if (error) throw error;

            // Instantly clear it from UI view space without requiring a full page refresh
            setProducts(prevProducts => prevProducts.filter(item => item.id !== id));
            alert("Product removed successfully.");
        } catch (err: any) {
            console.error("Error deleting item:", err);
            alert(err.message || "Could not delete this item.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (images.length === 0) return alert("Please upload at least one image!");
        setLoading(true);

        try {
            const uploadedUrls: string[] = [];

            for (const file of images) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                
                const { error: uploadError } = await supabase.storage
                    .from('product-images')
                    .upload(fileName, file);

                if (uploadError) throw new Error(`Storage Error: ${uploadError.message}`);

                const { data: urlData } = supabase.storage
                    .from('product-images')
                    .getPublicUrl(fileName);

                uploadedUrls.push(urlData.publicUrl);
            }

            const { error: dbError } = await supabase.from('products').insert([
                { 
                    name: formData.name,
                    price: parseFloat(formData.price),
                    description: formData.description || null,
                    color: formData.color,
                    type: formData.type, 
                    image_url: uploadedUrls 
                }
            ]);

            if (dbError) throw new Error(`Database Error: ${dbError.message}`);
            
            alert("Product added successfully!");
            
            setFormData({ name: '', price: '', description: '', color: '', type: 'T-Shirt' });
            imagePreviews.forEach(url => URL.revokeObjectURL(url));
            setImages([]);
            setImagePreviews([]);
            
            fetchInventory();
        } catch (err: any) {
            console.error(err);
            alert(err.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    if (!authorized) return null;

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between p-6">
                <div className="flex flex-col gap-8">
                    <div className="text-xl font-bold tracking-wider">STORE ADMIN</div>
                    <nav className="flex flex-col gap-3">
                        <span className="bg-slate-800 px-4 py-2.5 rounded-lg text-sm font-medium cursor-pointer text-white">
                            Products Dashboard
                        </span>
                    </nav>
                </div>
                <button onClick={handleLogout} className="text-left text-sm text-slate-400 hover:text-red-400 transition-colors px-4 py-2">
                    Sign Out
                </button>
            </aside>

            {/* Main Workspace Frame */}
            <main className="flex-1 p-12 max-w-6xl overflow-y-auto">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-slate-900">Products Control Center</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage, audit, and push updates straight to your live store inventory view.</p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
                    
                    {/* Creation Form Panel */}
                    <form onSubmit={handleSubmit} className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col md:flex-row gap-8">
                        <div className="flex-1 flex flex-col gap-5">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Product Name</label>
                                <input required type="text" placeholder="Product Title" className="border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Price ($)</label>
                                    <input required type="number" step="0.01" placeholder="0.00" className="border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Item Type</label>
                                    <select required className="border border-slate-200 bg-white rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all h-[46px]" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                                        {typeOptions.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Color Base</label>
                                <input required type="text" placeholder="e.g. Matte Black" className="border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all" value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <textarea rows={3} placeholder="Describe item metrics (optional)..." className="border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                            </div>
                        </div>

                        <div className="w-full md:w-64 flex flex-col gap-4 justify-between">
                            <div className="flex flex-col gap-4">
                                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Media Files</label>
                                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100/50 relative h-32 cursor-pointer group">
                                    <input multiple type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                                    <span className="text-xs font-medium text-slate-600">Upload Photos</span>
                                </div>

                                {imagePreviews.length > 0 && (
                                    <div className="grid grid-cols-4 gap-1.5 p-2 border rounded-xl bg-slate-50">
                                        {imagePreviews.map((url, idx) => (
                                            <div key={idx} className="relative aspect-square rounded-md overflow-hidden group border border-slate-200">
                                                <img src={url} alt="preview" className="w-full h-full object-cover" />
                                                <button type="button" onClick={() => removeImage(idx)} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs transition-opacity">✕</button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button disabled={loading} type="submit" className="w-full bg-slate-900 text-white font-semibold text-sm py-3 rounded-xl hover:bg-slate-800 transition-colors disabled:bg-slate-300">
                                {loading ? "Publishing..." : "Publish Item"}
                            </button>
                        </div>
                    </form>

                    {/* Mini Inventory View Sheet */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4 h-[410px]">
                        <h2 className="font-bold text-slate-900 text-lg">Active Storefront Catalog ({products.length})</h2>
                        <div className="overflow-y-auto flex flex-col gap-3 pr-1">
                            {products.map((item) => (
                                <div key={item.id} className="flex items-center justify-between border border-slate-100 p-2.5 rounded-xl hover:bg-slate-50/70 transition-colors group/item">
                                    <div className="flex items-center gap-3 overflow-hidden mr-2">
                                        <div className="w-10 h-10 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0">
                                            {item.image_url && item.image_url[0] && (
                                                <img src={item.image_url[0]} alt="" className="w-full h-full object-cover" />
                                            )}
                                        </div>
                                        <div className="overflow-hidden">
                                            <div className="text-xs font-bold text-slate-800 line-clamp-1">{item.name}</div>
                                            <div className="text-[10px] uppercase tracking-wide font-medium text-slate-400 mt-0.5">{item.type} • {item.color}</div>
                                        </div>
                                    </div>
                                    
                                    {/* Action items layout container panel */}
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <span className="text-xs font-semibold text-slate-900">${item.price.toFixed(2)}</span>
                                        {/* Dynamic Trash / Delete Trigger */}
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteProduct(item.id, item.name)}
                                            className="text-slate-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-all text-xs"
                                            title="Delete product"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                </div>
            </main>
        </div>
    );
};

export default AdminPage;   