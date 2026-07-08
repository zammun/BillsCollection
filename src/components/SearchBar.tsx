import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';

const SearchBar = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Listen to active route changes
    const [searchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("search") || "");

    // Automatically clear the search bar text whenever the user navigates to a new page
    useEffect(() => {
        setQuery("");
    }, [location.pathname]); // Fires every time the URL path shifts

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (query.trim()) {
            navigate(`/results?search=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className="relative flex items-center w-full justify-end">
            <input
                type="text"
                name="name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-48 xl:w-56 p-2 pl-4 pr-10 bg-slate-700 text-white placeholder-slate-300 rounded-full border border-transparent focus:bg-white focus:text-slate-900 focus:placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 transition-all duration-400 ease-out focus:w-full"
            />
            <button type="submit" className="absolute right-3 cursor-pointer active:scale-95 flex items-center justify-center">
                <img src="/search.png" alt="Search" width={16} height={16} className="opacity-70 hover:opacity-100 transition-opacity" />
            </button>
        </form>
    );
};

export default SearchBar;