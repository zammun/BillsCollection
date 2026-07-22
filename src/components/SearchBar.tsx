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
            if (onSearch) onSearch(); // Closes mobile menu on search execution
        }
    };

    return (
        <form onSubmit={handleSearch} className="relative flex items-center w-full">
            {/* Left-Aligned Vector Search Icon */}
            <div className="absolute left-3.5 pointer-events-none flex items-center text-slate-400 z-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.3-4.3"/>
                </svg>
            </div>

            {/* Clean Full-Width Luxury Input */}
            <input
                type="text"
                name="name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search catalog..."
                className="w-full py-3 md:py-2.5 pl-10 pr-9 bg-[#faf8f5] text-slate-900 placeholder-slate-400 rounded-xl border border-[#e2e0d9] focus:bg-white focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-sm font-medium shadow-2xs transition-all duration-200"
            />

            {/* Quick Clear (X) Button when typing */}
            {query && (
                <button 
                    type="button" 
                    onClick={() => setQuery("")}
                    className="absolute right-3 p-1 text-slate-400 hover:text-slate-700 rounded-full cursor-pointer z-10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                </button>
            )}
        </form>
    );
};

export default SearchBar;