import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../supabase'; 
import { ProductCard } from '../components/ProductList';

const ResultsPage = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    
    const searchQuery = searchParams.get("search") || "";
    const sortParam = searchParams.get("sort") || "";

    useEffect(() => {
        const fetchSearchResults = async () => {
            setLoading(true);
            
            let queryBuilder = supabase.from('products').select('*');
            
            if (searchQuery.trim()) {
                queryBuilder = queryBuilder.ilike('name', `%${searchQuery.trim()}%`);
            }

            // Supabase Database-level query modifier sorts items before payload transfers
            if (sortParam === "price-asc") {
                queryBuilder = queryBuilder.order('price', { ascending: true });
            } else if (sortParam === "price-desc") {
                queryBuilder = queryBuilder.order('price', { ascending: false });
            } else if (sortParam === "date-desc") {
                queryBuilder = queryBuilder.order('created_at', { ascending: false });
            } else if (sortParam === "date-asc") {
                queryBuilder = queryBuilder.order('created_at', { ascending: true });
            }

            const { data, error } = await queryBuilder;
            
            if (error) console.error("Error fetching search results:", error);
            else setProducts(data || []);
            
            setLoading(false);
        };

        fetchSearchResults();
    }, [searchQuery, sortParam]); // Triggers refetch when user drops down sorting changes

    if (loading) {
        return (
            <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 pt-32 pb-24 text-center text-sm font-medium text-gray-500 min-h-[60vh]">
                Searching catalog...
            </div>
        );
    }

    return (
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 pt-32 pb-24 min-h-[60vh]">
            <h1 className="text-2xl font-bold mb-2 text-slate-900">Search Results</h1>
            <p className="text-sm text-gray-500 mb-12">
                Showing results for <span className="font-semibold text-slate-900">"{searchQuery}"</span> ({products.length} items found)
            </p>

            {products.length === 0 ? (
                <div className="w-full text-center text-gray-500 py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    No items match your search. Try looking for something else!
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16'>
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ResultsPage;