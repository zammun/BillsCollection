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
    inventory_count: number;
    sizes: { S: number; M: number; L: number; XL: number };
}

const AdminPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [authorized, setAuthorized] = useState(false);
    
    // Inventory List State
    const [products, setProducts] = useState<Product[]>([]);
    
    // Track if form is editing an existing item vs creating a new one
    const [editingProductId, setEditingProductId] = useState<number | null>(null);
    
    // Form States
    const [formData, setFormData] = useState({ 
        name: '', 
        price: '', 
        description: '', 
        color: '', 
        type: 'T-Shirt', 
        sizes: { S: '', M: '', L: '', XL: '' } 
    });
    
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    // Track original URLs for an item when editing so we don't clear them if new files aren't uploaded
    const [existingImageUrls, setOriginalImageUrls] = useState<string[]>([]);

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
                fetchInventory(); 
            }
        };
        checkUser();
    }, [navigate]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
        const newFiles = Array.from(e.target.files);
        
        // 1. Update your states
        setImages(prevImages => [...prevImages, ...newFiles]);
        const newPreviews = newFiles.map(file => URL.createObjectURL(file));
        setImagePreviews(prevPreviews => [...prevPreviews, ...newPreviews]);

        // 2. IMPORTANT: Reset the input value so the same file can be selected again
        e.target.value = ''; 
    }
};

    const removeImage = (indexToRemove: number, isExisting: boolean = false) => {
        if (isExisting) {
            setOriginalImageUrls(prev => prev.filter((_, idx) => idx !== indexToRemove));
        } else {
            URL.revokeObjectURL(imagePreviews[indexToRemove]);
            setImages(prevImages => prevImages.filter((_, idx) => idx !== indexToRemove));
            setImagePreviews(prevPreviews => prevPreviews.filter((_, idx) => idx !== indexToRemove));
        }
    };

    const moveImage = (index: number, direction: 'left' | 'right', isExisting: boolean) => {
    if (isExisting) {
        const newArr = [...existingImageUrls];
        const targetIdx = direction === 'left' ? index - 1 : index + 1;
        if (targetIdx < 0 || targetIdx >= newArr.length) return;
        [newArr[index], newArr[targetIdx]] = [newArr[targetIdx], newArr[index]];
        setOriginalImageUrls(newArr);
    } else {
        const newImgs = [...images];
        const newPreviews = [...imagePreviews];
        const targetIdx = direction === 'left' ? index - 1 : index + 1;
        if (targetIdx < 0 || targetIdx >= newImgs.length) return;
        [newImgs[index], newImgs[targetIdx]] = [newImgs[targetIdx], newImgs[index]];
        [newPreviews[index], newPreviews[targetIdx]] = [newPreviews[targetIdx], newPreviews[index]];
        setImages(newImgs);
        setImagePreviews(newPreviews);
    }
};

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    // Load selected product values back into input fields for update staging
    const handleStartEdit = (product: Product) => {
        setEditingProductId(product.id);
        setFormData({
            name: product.name,
            price: product.price.toString(),
            description: product.description || '',
            color: product.color,
            type: product.type,
            sizes: {
                S: product.sizes?.S?.toString() || '0',
                M: product.sizes?.M?.toString() || '0',
                L: product.sizes?.L?.toString() || '0',
                XL: product.sizes?.XL?.toString() || '0'
            }
        });
        setOriginalImageUrls(product.image_url || []);
        
        // Clear out any new unstaged media inputs hanging around
        imagePreviews.forEach(url => URL.revokeObjectURL(url));
        setImages([]);
        setImagePreviews([]);
    };

    const handleCancelEdit = () => {
        setEditingProductId(null);
        setFormData({ name: '', price: '', description: '', color: '', type: 'T-Shirt', sizes: { S: '', M: '', L: '', XL: '' } });
        setOriginalImageUrls([]);
        imagePreviews.forEach(url => URL.revokeObjectURL(url));
        setImages([]);
        setImagePreviews([]);
    };

    const handleDeleteProduct = async (e: React.MouseEvent, id: number, name: string) => {
        e.stopPropagation(); // Avoid triggering edit view loader state on the row card layout click
        const confirmDelete = window.confirm(`Are you sure you want to permanently remove "${name}" from the store catalog?`);
        if (!confirmDelete) return;

        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setProducts(prevProducts => prevProducts.filter(item => item.id !== id));
            if (editingProductId === id) handleCancelEdit();
            alert("Product removed successfully.");
        } catch (err: any) {
            console.error("Error deleting item:", err);
            alert(err.message || "Could not delete this item.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (images.length === 0 && existingImageUrls.length === 0) {
            return alert("Please upload at least one image!");
        }

        // Calculate total count automatically
        const totalCount = parseInt(formData.sizes.S || '0') + parseInt(formData.sizes.M || '0') + 
                           parseInt(formData.sizes.L || '0') + parseInt(formData.sizes.XL || '0');

        setLoading(true);

        try {
            const uploadedUrls: string[] = [...existingImageUrls];

            // Loop and stage new raw asset files to storage bucket structure path layers
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

            const productPayload = {
                name: formData.name,
                price: parseFloat(formData.price),
                description: formData.description || null,
                color: formData.color,
                type: formData.type, 
                image_url: uploadedUrls,
                inventory_count: totalCount, // Automated total
                sizes: {
                    S: parseInt(formData.sizes.S || '0'),
                    M: parseInt(formData.sizes.M || '0'),
                    L: parseInt(formData.sizes.L || '0'),
                    XL: parseInt(formData.sizes.XL || '0'),
                }
            };

            if (editingProductId !== null) {
                // UPDATE Target Product parameters rows directly
                const { error: dbError } = await supabase
                    .from('products')
                    .update(productPayload)
                    .eq('id', editingProductId);

                if (dbError) throw new Error(`Database Error: ${dbError.message}`);
                alert("Product updated successfully!");
            } else {
                // INSERT New row payload entries
                const { error: dbError } = await supabase
                    .from('products')
                    .insert([productPayload]);

                if (dbError) throw new Error(`Database Error: ${dbError.message}`);
                alert("Product added successfully!");
            }
            
            handleCancelEdit();
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
                <button onClick={handleLogout} className="text-left text-sm text-slate-400 hover:text-red-400 transition-colors px-4 py-2 cursor-pointer">
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
                    
                    {/* Creation & Editing Dual State Form Panel */}
                    <form onSubmit={handleSubmit} className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col md:flex-row gap-8">
                        <div className="flex-1 flex flex-col gap-5">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                                    {editingProductId !== null ? `⚡ Editing: Mode Active` : "✨ Add New Product"}
                                </h3>
                                {editingProductId !== null && (
                                    <button type="button" onClick={handleCancelEdit} className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline cursor-pointer">
                                        Switch to Add Item
                                    </button>
                                )}
                            </div>

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

                            {/* SIZE INPUTS */}
                            <label className="text-xs font-bold uppercase text-slate-500 mt-2">Inventory Count (Per Size)</label>
                            <div className="grid grid-cols-4 gap-2">
                                {['S', 'M', 'L', 'XL'].map((size) => (
                                    <div key={size} className="flex flex-col">
                                        <label className="text-[10px] text-slate-400 font-bold">{size}</label>
                                        <input type="number" min="0" required className="border border-slate-200 p-2 rounded-lg text-sm" value={formData.sizes[size as keyof typeof formData.sizes]} onChange={e => setFormData({...formData, sizes: {...formData.sizes, [size]: e.target.value}})} />
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <textarea rows={3} placeholder="Describe item metrics (optional)..." className="border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                            </div>
                        </div>

                        <div className="w-full md:w-64 flex flex-col gap-4 justify-between">
                            <div className="flex flex-col gap-4">
                                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Media Files</label>
                                {/* UPLOAD BOX WITH LOADING FEEDBACK */}
                                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100/50 relative h-24 cursor-pointer group">
                                    {loading ? (
                                        <span className="text-xs font-bold text-indigo-600 animate-pulse">Uploading...</span>
                                    ) : (
                                        <>
                                            <input multiple type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                                            <span className="text-xs font-medium text-slate-600">Upload New Photos</span>
                                        </>
                                    )}
                                </div>

                                {/* Image Preview Grid */}
                                {/* Only show the grid if there are existing images OR new previews */}
{(existingImageUrls.length > 0 || imagePreviews.length > 0) && (
    <div className="grid grid-cols-2 gap-3 mt-2">
        {/* Existing Images */}
        {existingImageUrls.map((url, idx) => (
            <div key={`exist-${idx}`} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200">
                <img src={url} alt="existing" className="w-full h-full object-cover" />
                <button type="button" onClick={() => removeImage(idx, true)} className="absolute top-1.5 right-1.5 bg-black/60 hover:bg-red-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full transition-colors">✕</button>
                {/* Move Controls */}
                <div className="absolute bottom-1.5 left-1.5 flex gap-1 bg-black/40 p-0.5 rounded">
                    <button type="button" onClick={() => moveImage(idx, 'left', true)} className="text-white text-[10px] w-4 hover:text-indigo-300">←</button>
                    <button type="button" onClick={() => moveImage(idx, 'right', true)} className="text-white text-[10px] w-4 hover:text-indigo-300">→</button>
                </div>
            </div>
        ))}
        {/* New Previews */}
        {imagePreviews.map((url, idx) => (
            <div key={`new-${idx}`} className="relative aspect-square rounded-lg overflow-hidden border border-emerald-300">
                <img src={url} alt="preview" className="w-full h-full object-cover" />
                <button type="button" onClick={() => removeImage(idx, false)} className="absolute top-1.5 right-1.5 bg-black/60 hover:bg-red-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full transition-colors">✕</button>
                {/* Move Controls */}
                <div className="absolute bottom-1.5 left-1.5 flex gap-1 bg-black/40 p-0.5 rounded">
                    <button type="button" onClick={() => moveImage(idx, 'left', false)} className="text-white text-[10px] w-4 hover:text-emerald-300">←</button>
                    <button type="button" onClick={() => moveImage(idx, 'right', false)} className="text-white text-[10px] w-4 hover:text-emerald-300">→</button>
                </div>
            </div>
        ))}
    </div>
)}
                            </div>

                            <div className="flex flex-col gap-2">
                                <button disabled={loading} type="submit" className="w-full bg-slate-900 text-white font-semibold text-sm py-3 rounded-xl hover:bg-slate-800 transition-colors disabled:bg-slate-300 cursor-pointer shadow-xs active:scale-[0.99]">
                                    {loading ? "Processing..." : (editingProductId !== null ? "Save Changes" : "Publish Item")}
                                </button>
                                {editingProductId !== null && (
                                    <button type="button" onClick={handleCancelEdit} className="w-full bg-white text-gray-700 ring-1 ring-gray-200 font-semibold text-sm py-2.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                                        Cancel Edit
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>

                    {/* Mini Inventory View Sheet */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-[460px] overflow-y-auto">
                        <h2 className="font-bold text-slate-900 text-lg mb-4">Catalog ({products.length})</h2>
                        <div className="overflow-y-auto flex flex-col gap-3 pr-1">
                            {products.map((item) => (
                                <div 
                                    key={item.id} 
                                    onClick={() => handleStartEdit(item)} 
                                    className={`flex items-center justify-between border p-2.5 rounded-xl transition-colors group/item cursor-pointer 
                                        ${editingProductId === item.id ? 'bg-indigo-50/50 border-indigo-200 shadow-xs' : 'border-slate-100 hover:bg-slate-50/70'}`}
                                >
                                    <div className="flex items-center gap-3 overflow-hidden mr-2">
                                        <div className="w-10 h-10 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0">
                                            {item.image_url && item.image_url[0] && (
                                                <img src={item.image_url[0]} alt="" className="w-full h-full object-cover" />
                                            )}
                                        </div>
                                        <div className="overflow-hidden">
                                            <div className="text-xs font-bold text-slate-800 line-clamp-1">{item.name}</div>
                                            <div className="text-[10px] uppercase tracking-wide font-medium text-slate-400 mt-0.5">
                                                S:{item.sizes?.S || 0} M:{item.sizes?.M || 0} L:{item.sizes?.L || 0} XL:{item.sizes?.XL || 0}
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={(e) => handleDeleteProduct(e, item.id, item.name)} className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg text-xs cursor-pointer">✕</button>
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