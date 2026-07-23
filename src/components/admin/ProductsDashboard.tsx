import { useState, useEffect } from 'react';
import { supabase } from '../../supabase';

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

interface ProductTemplate {
    id: number; 
    name: string;
    price: string;
    description: string;
    color: string;
    type: string;
    sizes: { S: string; M: string; L: string; XL: string };
    image_urls: string[];
}

const ProductsDashboard = () => {
    const [loading, setLoading] = useState(false);
    
    // Inventory & Template States
    const [products, setProducts] = useState<Product[]>([]);
    const [templates, setTemplates] = useState<ProductTemplate[]>([]);
    
    // Track if form is editing an existing live item vs creating a new one
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
    const [existingImageUrls, setOriginalImageUrls] = useState<string[]>([]);

    const typeOptions = ['T-Shirt', 'Hoodie', 'Pant', 'Shirt', 'Hat', 'Accessory'];

    // --- CUSTOM UI ALERTS & NOTIFICATIONS SYSTEMS ---
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
    const [confirmModal, setConfirmModal] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        onConfirm: () => void;
    }>({ isOpen: false, title: '', message: '', onConfirm: () => {} });

    const triggerToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3500);
    };

    const triggerConfirmation = (title: string, message: string, onConfirm: () => void) => {
        setConfirmModal({ isOpen: true, title, message, onConfirm });
    };

    const closeConfirmation = () => {
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
    };

    // Fetch live inventory
    const fetchInventory = async () => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('id', { ascending: false });
        
        if (!error && data) setProducts(data);
    };

    // Fetch saved templates from database
    const fetchTemplates = async () => {
        const { data, error } = await supabase
            .from('product_templates')
            .select('*')
            .order('id', { ascending: false });
        
        if (!error && data) setTemplates(data as ProductTemplate[]);
    };

    // Load datasets automatically on component mount
    useEffect(() => {
        fetchInventory();
        fetchTemplates();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            setImages(prevImages => [...prevImages, ...newFiles]);
            const newPreviews = newFiles.map(file => URL.createObjectURL(file));
            setImagePreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
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

    const handleSaveAsTemplate = async () => {
        if (!formData.name.trim()) return triggerToast("Please enter at least a product name to save a template blueprint.", "error");
        
        setLoading(true);
        try {
            const uploadedUrls: string[] = [...existingImageUrls];

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

            const templatePayload = {
                name: formData.name,
                price: formData.price,
                description: formData.description,
                color: formData.color,
                type: formData.type,
                sizes: { ...formData.sizes },
                image_urls: uploadedUrls
            };

            const { error } = await supabase
                .from('product_templates')
                .insert([templatePayload]);

            if (error) throw error;

            setOriginalImageUrls(uploadedUrls);
            imagePreviews.forEach(url => URL.revokeObjectURL(url));
            setImages([]);
            setImagePreviews([]);

            triggerToast(`Template "${formData.name}" saved securely.`);
            fetchTemplates(); 
        } catch (err: any) {
            console.error("Error saving template to DB:", err);
            triggerToast(err.message || "Failed to save layout preset template.", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleLoadTemplate = (template: ProductTemplate) => {
        setEditingProductId(null); 
        setFormData({
            name: template.name,
            price: template.price || '',
            description: template.description || '',
            color: template.color || '',
            type: template.type || 'T-Shirt',
            sizes: {
                S: template.sizes?.S || '',
                M: template.sizes?.M || '',
                L: template.sizes?.L || '',
                XL: template.sizes?.XL || ''
            }
        });
        setOriginalImageUrls(template.image_urls || []);
        
        imagePreviews.forEach(url => URL.revokeObjectURL(url));
        setImages([]);
        setImagePreviews([]);
        triggerToast("Template preset parameters loaded into form.", "info");
    };

    const handleDeleteTemplate = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        
        triggerConfirmation(
            "Remove Template Blueprint",
            "Are you sure you want to delete this structural listing template blueprint from your database context?",
            async () => {
                try {
                    const { error } = await supabase
                        .from('product_templates')
                        .delete()
                        .eq('id', id);

                    if (error) throw error;
                    setTemplates(prev => prev.filter(t => t.id !== id));
                    triggerToast("Template configuration dropped successfully.");
                } catch (err: any) {
                    console.error("Error breaking template configuration:", err);
                    triggerToast("Could not drop template asset.", "error");
                } finally {
                    closeConfirmation();
                }
            }
        );
    };

    const handleDeleteProduct = (e: React.MouseEvent, id: number, name: string) => {
        e.stopPropagation(); 
        
        triggerConfirmation(
            "Delete Live Product",
            `Are you sure you want to permanently remove "${name}" from the active catalog? This cannot be undone.`,
            async () => {
                try {
                    const { error } = await supabase
                        .from('products')
                        .delete()
                        .eq('id', id);

                    if (error) throw error;

                    setProducts(prevProducts => prevProducts.filter(item => item.id !== id));
                    if (editingProductId === id) handleCancelEdit();
                    triggerToast("Product removed from live catalog context.");
                } catch (err: any) {
                    console.error("Error deleting item:", err);
                    triggerToast(err.message || "Could not delete this catalog entry.", "error");
                } finally {
                    closeConfirmation();
                }
            }
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (images.length === 0 && existingImageUrls.length === 0) {
            return triggerToast("Please upload at least one product image!", "error");
        }

        const totalCount = parseInt(formData.sizes.S || '0') + parseInt(formData.sizes.M || '0') + 
                           parseInt(formData.sizes.L || '0') + parseInt(formData.sizes.XL || '0');

        setLoading(true);

        try {
            const uploadedUrls: string[] = [...existingImageUrls];

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
                inventory_count: totalCount,
                sizes: {
                    S: parseInt(formData.sizes.S || '0'),
                    M: parseInt(formData.sizes.M || '0'),
                    L: parseInt(formData.sizes.L || '0'),
                    XL: parseInt(formData.sizes.XL || '0'),
                }
            };

            if (editingProductId !== null) {
                const { error: dbError } = await supabase
                    .from('products')
                    .update(productPayload)
                    .eq('id', editingProductId);

                if (dbError) throw new Error(`Database Error: ${dbError.message}`);
                triggerToast("Product changes pushed successfully!");
            } else {
                const { error: dbError } = await supabase
                    .from('products')
                    .insert([productPayload]);

                if (dbError) throw new Error(`Database Error: ${dbError.message}`);
                triggerToast("New product published live successfully!");
            }
            
            handleCancelEdit();
            fetchInventory();
        } catch (err: any) {
            console.error(err);
            triggerToast(err.message || "An unexpected error occurred during publishing.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full font-sans antialiased text-zinc-800">
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

            {/* --- ACTION CONFIRMATION MODAL OVERLAY --- */}
            {confirmModal.isOpen && (
                <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
                    <div className="bg-white border border-zinc-200/60 rounded-3xl max-w-sm w-full p-8 shadow-2xl flex flex-col gap-6">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
                                Confirmation Required
                            </span>
                            <h3 className="text-xl font-bold text-zinc-900 tracking-tight mt-1">{confirmModal.title}</h3>
                            <p className="text-xs text-zinc-600 leading-relaxed mt-2">{confirmModal.message}</p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={closeConfirmation} className="flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-600 bg-zinc-100 hover:bg-zinc-200 cursor-pointer transition-colors">
                                Cancel
                            </button>
                            <button onClick={confirmModal.onConfirm} className="flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-700 cursor-pointer transition-colors shadow-sm">
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header Section */}
            <div className="mb-10 space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
                    Catalog Management
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight font-heading">
                    Products <span className="text-[#d4af37]">Control Center</span>
                </h1>
                <p className="text-sm md:text-base text-zinc-600">View, create, and update public catalog offerings.</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
                {/* Main Form Card */}
                <form onSubmit={handleSubmit} className="xl:col-span-2 bg-white rounded-3xl border border-zinc-200/60 shadow-xl p-8 md:p-10 flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 flex flex-col gap-6">
                        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
                                    {editingProductId !== null ? "Editing Mode Active" : "Add New Item"}
                                </span>
                                <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
                                    {editingProductId !== null ? "Update Product Details" : "Product Specification"}
                                </h2>
                            </div>
                            {editingProductId !== null && (
                                <button type="button" onClick={handleCancelEdit} className="text-xs font-bold text-zinc-900 hover:text-[#d4af37] underline cursor-pointer transition-colors">
                                    Switch to Add Item
                                </button>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider">Product Name</label>
                            <input required type="text" placeholder="Product Title" className="border border-zinc-200/80 rounded-xl p-3.5 text-sm focus:outline-none focus:border-zinc-400 focus:bg-white transition-all bg-zinc-50/50 text-zinc-900 placeholder-zinc-400" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider">Price ($)</label>
                                <input required type="number" step="0.01" placeholder="0.00" className="border border-zinc-200/80 rounded-xl p-3.5 text-sm focus:outline-none focus:border-zinc-400 focus:bg-white transition-all bg-zinc-50/50 text-zinc-900 placeholder-zinc-400" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider">Item Type</label>
                                <select required className="border border-zinc-200/80 bg-zinc-50/50 text-zinc-900 rounded-xl p-3.5 text-sm focus:outline-none focus:border-zinc-400 focus:bg-white transition-all h-[48px]" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                                    {typeOptions.map(option => <option key={option} value={option}>{option}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider">Color Base</label>
                            <input required type="text" placeholder="e.g. Matte Black" className="border border-zinc-200/80 rounded-xl p-3.5 text-sm focus:outline-none focus:border-zinc-400 focus:bg-white transition-all bg-zinc-50/50 text-zinc-900 placeholder-zinc-400" value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase text-zinc-700 tracking-wider">Inventory Count (Per Size)</label>
                            <div className="grid grid-cols-4 gap-3">
                                {['S', 'M', 'L', 'XL'].map((size) => (
                                    <div key={size} className="flex flex-col gap-1">
                                        <label className="text-[11px] text-zinc-500 font-bold uppercase">{size}</label>
                                        <input type="number" min="0" required className="border border-zinc-200/80 p-2.5 rounded-xl text-sm bg-zinc-50/50 text-zinc-900 text-center font-semibold focus:outline-none focus:border-zinc-400 focus:bg-white transition-all" value={formData.sizes[size as keyof typeof formData.sizes]} onChange={e => setFormData({...formData, sizes: {...formData.sizes, [size]: e.target.value}})} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider">Description</label>
                            <textarea rows={3} placeholder="Describe item details..." className="border border-zinc-200/80 rounded-xl p-3.5 text-sm focus:outline-none focus:border-zinc-400 focus:bg-white transition-all resize-none bg-zinc-50/50 text-zinc-900 placeholder-zinc-400" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                        </div>
                    </div>

                    <div className="w-full lg:w-72 flex flex-col gap-6 lg:justify-between pt-2">
                        <div className="flex flex-col gap-4">
                            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider">Media Files</label>
                            <div className="border-2 border-dashed border-zinc-200 rounded-2xl p-4 flex flex-col items-center justify-center bg-zinc-50/50 hover:bg-zinc-100/50 relative h-28 cursor-pointer transition-colors">
                                {loading ? (
                                    <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37] animate-pulse">Uploading Media...</span>
                                ) : (
                                    <>
                                        <input multiple type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                                        <span className="text-xs font-bold text-zinc-900 uppercase tracking-wide">Upload Photos</span>
                                        <span className="text-[10px] text-zinc-500 mt-1">PNG, JPG, or WEBP</span>
                                    </>
                                )}
                            </div>

                            {(existingImageUrls.length > 0 || imagePreviews.length > 0) && (
                                <div className="grid grid-cols-2 gap-3 mt-2">
                                    {existingImageUrls.map((url, idx) => (
                                        <div key={`exist-${idx}`} className="relative aspect-square rounded-xl overflow-hidden border border-zinc-200 shadow-xs">
                                            <img src={url} alt="existing" className="w-full h-full object-cover" />
                                            <button type="button" onClick={() => removeImage(idx, true)} className="absolute top-1.5 right-1.5 bg-zinc-900/80 hover:bg-rose-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full transition-colors cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                            </button>
                                            <div className="absolute bottom-1.5 left-1.5 flex gap-1 bg-zinc-900/70 p-0.5 rounded-lg">
                                                <button type="button" onClick={() => moveImage(idx, 'left', true)} className="text-white text-[10px] w-4 hover:text-[#d4af37] flex items-center justify-center cursor-pointer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                                                </button>
                                                <button type="button" onClick={() => moveImage(idx, 'right', true)} className="text-white text-[10px] w-4 hover:text-[#d4af37] flex items-center justify-center cursor-pointer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    {imagePreviews.map((url, idx) => (
                                        <div key={`new-${idx}`} className="relative aspect-square rounded-xl overflow-hidden border border-emerald-500 shadow-xs">
                                            <img src={url} alt="preview" className="w-full h-full object-cover" />
                                            <button type="button" onClick={() => removeImage(idx, false)} className="absolute top-1.5 right-1.5 bg-zinc-900/80 hover:bg-rose-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full transition-colors cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                            </button>
                                            <div className="absolute bottom-1.5 left-1.5 flex gap-1 bg-zinc-900/70 p-0.5 rounded-lg">
                                                <button type="button" onClick={() => moveImage(idx, 'left', false)} className="text-white text-[10px] w-4 hover:text-emerald-300 flex items-center justify-center cursor-pointer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                                                </button>
                                                <button type="button" onClick={() => moveImage(idx, 'right', false)} className="text-white text-[10px] w-4 hover:text-emerald-300 flex items-center justify-center cursor-pointer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-3 mt-6 lg:mt-0">
                            <button disabled={loading} type="submit" className="w-full bg-zinc-900 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-zinc-800 transition-all cursor-pointer shadow-md active:scale-[0.99] disabled:bg-zinc-400">
                                {loading ? "Processing..." : (editingProductId !== null ? "Save Changes" : "Publish Item")}
                            </button>
                            
                            <button type="button" onClick={handleSaveAsTemplate} disabled={loading} className="w-full bg-white text-zinc-900 font-bold text-xs uppercase tracking-wider py-3 rounded-xl border border-zinc-200 hover:bg-zinc-50 transition-all cursor-pointer shadow-xs disabled:opacity-50">
                                Save Preset Template
                            </button>

                            {editingProductId !== null && (
                                <button type="button" onClick={handleCancelEdit} className="w-full bg-zinc-100 text-zinc-700 font-bold text-xs uppercase tracking-wider py-3 rounded-xl hover:bg-zinc-200 transition-all cursor-pointer">
                                    Cancel Edit
                                </button>
                            )}
                        </div>
                    </div>
                </form>

                {/* Sidebar Stack */}
                <div className="xl:col-span-1 flex flex-col gap-8">
                    {/* Live Catalog Card */}
                    <div className="bg-white rounded-3xl border border-zinc-200/60 shadow-xl p-6 md:p-8 max-h-[420px] flex flex-col overflow-hidden">
                        <div className="mb-4 flex-shrink-0">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">Live Inventory</span>
                            <h2 className="font-bold text-zinc-900 text-xl tracking-tight mt-0.5">Catalog ({products.length})</h2>
                        </div>
                        <div className="overflow-y-auto flex flex-col gap-3 pr-1 custom-scrollbar">
                            {products.map((item) => (
                                <div 
                                    key={item.id} 
                                    onClick={() => handleStartEdit(item)} 
                                    className={`flex items-center justify-between border p-3 rounded-2xl transition-colors cursor-pointer text-left
                                        ${editingProductId === item.id ? 'bg-zinc-50 border-zinc-400 shadow-xs' : 'border-zinc-100 hover:bg-zinc-50/80'}`}
                                >
                                    <div className="flex items-center gap-3 overflow-hidden mr-2">
                                        <div className="w-11 h-11 bg-zinc-100 rounded-xl overflow-hidden border border-zinc-200 flex-shrink-0">
                                            {item.image_url && item.image_url[0] && (
                                                <img src={item.image_url[0]} alt="" className="w-full h-full object-cover" />
                                            )}
                                        </div>
                                        <div className="overflow-hidden">
                                            <div className="text-xs font-bold text-zinc-900 line-clamp-1">{item.name}</div>
                                            <div className="text-[10px] uppercase tracking-wider font-semibold text-zinc-500 mt-0.5">
                                                S:{item.sizes?.S || 0} M:{item.sizes?.M || 0} L:{item.sizes?.L || 0} XL:{item.sizes?.XL || 0}
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={(e) => handleDeleteProduct(e, item.id, item.name)} className="text-zinc-400 hover:text-rose-600 p-1.5 rounded-lg text-xs cursor-pointer flex-shrink-0 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Saved Templates Card */}
                    <div className="bg-white rounded-3xl border border-zinc-200/60 shadow-xl p-6 md:p-8 max-h-[420px] flex flex-col overflow-hidden">
                        <div className="mb-4 flex-shrink-0">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">Database Presets</span>
                            <h2 className="font-bold text-zinc-900 text-xl tracking-tight mt-0.5">Saved Templates ({templates.length})</h2>
                            <p className="text-[11px] text-zinc-500 mt-1">Select a blueprint preset to re-populate form parameters.</p>
                        </div>
                        <div className="overflow-y-auto flex flex-col gap-3 pr-1 custom-scrollbar">
                            {templates.length === 0 ? (
                                <div className="text-center py-8 border border-dashed border-zinc-200 rounded-2xl text-xs text-zinc-500 font-medium">
                                    No database blueprints saved yet.
                                </div>
                            ) : (
                                templates.map((template) => (
                                    <div 
                                        key={template.id} 
                                        onClick={() => handleLoadTemplate(template)}
                                        className="flex items-center justify-between border border-zinc-100 p-3 rounded-2xl hover:bg-zinc-50/80 transition-colors cursor-pointer text-left"
                                    >
                                        <div className="flex items-center gap-3 overflow-hidden mr-2">
                                            <div className="w-11 h-11 bg-zinc-100 rounded-xl overflow-hidden border border-zinc-200 flex-shrink-0 flex items-center justify-center">
                                                {template.image_urls && template.image_urls[0] ? (
                                                    <img src={template.image_urls[0]} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">LAYOUT</span>
                                                )}
                                            </div>
                                            <div className="overflow-hidden">
                                                <div className="text-xs font-bold text-zinc-900 line-clamp-1">{template.name}</div>
                                                <div className="text-[10px] uppercase tracking-wider font-bold text-[#d4af37] mt-0.5">
                                                    Preset · {template.type}
                                                </div>
                                            </div>
                                        </div>
                                        <button onClick={(e) => handleDeleteTemplate(e, template.id)} className="text-zinc-400 hover:text-rose-600 p-1.5 rounded-lg text-xs cursor-pointer flex-shrink-0 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsDashboard;