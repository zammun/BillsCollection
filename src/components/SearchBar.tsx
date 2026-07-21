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
        <form onSubmit={handleSearch} className="relative flex items-center w-full justify-end">
            <input
                type="text"
                name="name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-48 xl:w-56 p-2 pl-4 pr-10 bg-slate-700 text-white placeholder-slate-300 rounded-full border border-transparent focus:bg-white focus:text-slate-900 focus:placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#F35C7A]/30 focus:border-[#F35C7A]/50 selection:bg-[#F35C7A] selection:text-white transition-all duration-400 ease-out focus:w-full"
            />
            <button type="submit" className="absolute right-3 cursor-pointer active:scale-95 flex items-center justify-center">
                <img src="/search.png" alt="Search" width={16} height={16} className="opacity-70 hover:opacity-100 transition-opacity" />
            </button>
        </form>
    );
};

export default SearchBar;