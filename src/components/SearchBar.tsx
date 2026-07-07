import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;

        if (name.trim()) {
            navigate(`/list?name=${name}`);
        }
    };

    return (
        <form 
            onSubmit={handleSearch}
            className="relative flex items-center w-full justify-end"
        >
            <input
                type="text"
                name="name"
                placeholder="Search..."
                className="w-48 xl:w-56 p-2 pl-4 pr-10 bg-slate-700 text-white placeholder-slate-300 rounded-full border border-transparent focus:bg-white focus:text-slate-900 focus:placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 transition-all duration-400 ease-out focus:w-full"
            />
            <button 
                type="submit" 
                className="absolute right-3 cursor-pointer transition-transform active:scale-95"
            >
                {/* Notice I kept your search.png icon here */}
                <img src="/search.png" alt="Search" width={16} height={16} className="opacity-70 hover:opacity-100 transition-opacity" />
            </button>
        </form>
    );
};

export default SearchBar;