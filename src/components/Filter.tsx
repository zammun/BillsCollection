import { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../supabase";

const Filter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // State to manage mobile filter visibility
  const [isOpen, setIsOpen] = useState(false);

  // Dynamic filter lists populated from database rows
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);
  const [availableColors, setAvailableColors] = useState<string[]>([]);

  const [localFilters, setLocalFilters] = useState({
    type: searchParams.get("type") || "",
    min: searchParams.get("min") || "",
    max: searchParams.get("max") || "",
    color: searchParams.get("color") || "",
    sort: searchParams.get("sort") || "",
  });

  useEffect(() => {
    setLocalFilters({
      type: searchParams.get("type") || "",
      min: searchParams.get("min") || "",
      max: searchParams.get("max") || "",
      color: searchParams.get("color") || "",
      sort: searchParams.get("sort") || "",
    });
  }, [searchParams]);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('type, color');

      if (!error && data) {
        const uniqueTypes = Array.from(new Set(data.map(p => p.type).filter(Boolean)));
        const uniqueColors = Array.from(new Set(data.map(p => p.color).filter(Boolean)));

        setAvailableTypes(uniqueTypes);
        setAvailableColors(uniqueColors);
      }
    };

    fetchFilterOptions();
  }, []);

  // Handles input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    
    setLocalFilters(prev => ({ ...prev, [name]: value }));

    if (window.innerWidth >= 768) {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      navigate(`${location.pathname}?${params.toString()}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && window.innerWidth >= 768) {
      const target = e.target as HTMLInputElement;
      const params = new URLSearchParams(searchParams.toString());
      if (target.value) {
        params.set(target.name, target.value);
      } else {
        params.delete(target.name);
      }
      navigate(`${location.pathname}?${params.toString()}`);
    }
  };

  // Mobile batch confirmation submission handler
  const handleApplyMobileFilters = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(localFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    navigate(`${location.pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  return (
    <div className="mt-12 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex flex-col gap-6">
      
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex items-center justify-center gap-2 w-full py-3.5 bg-[#faf8f5] hover:bg-[#e6e4dc] border border-[#e2e0d9] rounded-2xl font-semibold text-sm text-slate-800 transition-all shadow-2xs active:scale-[0.98]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
        {isOpen ? "Close Filters" : "Filter & Sort"}
      </button>

      {/* Filter Options Panel Container */}
      <div className={`flex-col md:flex-row justify-between gap-6 ${isOpen ? 'flex bg-[#faf8f5]/90 backdrop-blur-md p-6 rounded-2xl border border-[#e2e0d9] md:p-0 md:bg-transparent md:border-none animate-fadeIn' : 'hidden md:flex'}`}>
        
        {/* Left Side: Filtering */}
        <div className="flex gap-4 flex-wrap">
          
          {/* Dynamic Item Type Dropdown */}
          <select 
            name="type" 
            onChange={handleInputChange} 
            value={localFilters.type} 
            className="py-3 px-4 rounded-2xl text-xs font-semibold bg-[#faf8f5] hover:bg-[#e6e4dc] text-slate-800 border border-[#e2e0d9] cursor-pointer outline-none flex-grow sm:flex-grow-0 capitalize transition-all focus:border-slate-400 shadow-2xs"
          >
            <option value="">All Types</option>
            {availableTypes.map(type => {
              const displayLabel = type.endsWith('y') 
                ? `${type.slice(0, -1)}ies` 
                : `${type}s`;
              return (
                <option key={type} value={type}>{displayLabel}</option>
              );
            })}
          </select>

          {/* Min Price Box Input */}
          <input 
            type="text" 
            inputMode="numeric"
            name="min" 
            placeholder="Min price" 
            value={localFilters.min}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="text-xs rounded-2xl pl-4 py-3 w-[calc(50%-8px)] sm:w-24 bg-[#faf8f5] text-slate-800 border border-[#e2e0d9] placeholder:text-slate-400 outline-none transition-all focus:border-slate-400 shadow-2xs" 
          />

          {/* Max Price Box Input */}
          <input 
            type="text" 
            inputMode="numeric"
            name="max" 
            placeholder="Max price" 
            value={localFilters.max}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="text-xs rounded-2xl pl-4 py-3 w-[calc(50%-8px)] sm:w-24 bg-[#faf8f5] text-slate-800 border border-[#e2e0d9] placeholder:text-slate-400 outline-none transition-all focus:border-slate-400 shadow-2xs" 
          />

          {/* Dynamic Color Dropdown */}
          <select 
            name="color" 
            onChange={handleInputChange} 
            value={localFilters.color} 
            className="py-3 px-4 rounded-2xl text-xs font-semibold bg-[#faf8f5] hover:bg-[#e6e4dc] text-slate-800 border border-[#e2e0d9] cursor-pointer outline-none flex-grow sm:flex-grow-0 capitalize transition-all focus:border-slate-400 shadow-2xs"
          >
            <option value="">All Colors</option>
            {availableColors.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>

        {/* Right Side: Sorting */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <select 
            name="sort" 
            onChange={handleInputChange} 
            value={localFilters.sort} 
            className="py-3 px-4 rounded-2xl text-xs font-semibold bg-[#faf8f5] hover:bg-[#e6e4dc] text-slate-800 border border-[#e2e0d9] w-full md:w-auto cursor-pointer outline-none transition-all focus:border-slate-400 shadow-2xs"
          >
            <option value="">Default Sorting</option>
            <option value="price-asc">Price (low to high)</option>
            <option value="price-desc">Price (high to low)</option>
            <option value="date-desc">Newest</option>
            <option value="date-asc">Oldest</option>
          </select>

          {/* Mobile Apply Button */}
          <button
            onClick={handleApplyMobileFilters}
            className="md:hidden w-full py-3 bg-slate-900 text-white text-xs font-bold rounded-xl transition-all active:scale-[0.98] shadow-sm hover:bg-slate-800"
            type="button"
          >
            Apply Selection Changes
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Filter;