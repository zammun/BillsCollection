import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';

interface SearchBarProps {
    onSearch?: () => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("search") || "");

    useEffect(() => {
        setQuery("");
    }, [location.pathname]);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (query.trim()) {
            navigate(`/results?search=${encodeURIComponent(query.trim())}`);
            if (onSearch) onSearch();
        }
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center w-full md:w-auto justify-end">
            <div className="relative flex items-center w-full md:w-auto group">
                
                {/* Left-Aligned Search Icon */}
                <div className="absolute left-3.5 pointer-events-none flex items-center text-slate-400 z-10 transition-colors group-focus-within:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="m21 21-4.3-4.3"/>
                    </svg>
                </div>

                {/* Dark Input Matching Track Order Button (bg-slate-900) */}
                <input
                    type="text"
                    name="name"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search catalog..."
                    className="w-full md:w-48 lg:w-56 focus:md:w-72 focus:lg:w-80 py-2.5 pl-12 pr-9 bg-slate-900 text-white placeholder-slate-400 rounded-xl border border-slate-800 hover:border-slate-700 focus:bg-slate-950 focus:outline-none focus:border-slate-700 focus:ring-4 focus:ring-slate-800/50 text-sm font-medium shadow-md transition-all duration-300 ease-out"
                />

                {/* Clear Button (X) */}
                {query ? (
                    <button 
                        type="button" 
                        onClick={() => setQuery("")}
                        className="absolute right-3 p-1 text-slate-400 hover:text-white rounded-full cursor-pointer z-10 transition-colors"
                        aria-label="Clear search"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                    </button>
                ) : (
                    <button type="submit" className="sr-only">Search</button>
                )}
            </div>
        </form>
    );
};

export default SearchBar;