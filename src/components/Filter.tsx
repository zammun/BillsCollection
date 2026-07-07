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

  useEffect(() => {
    const fetchFilterOptions = async () => {
      // Grab only the type and color columns from active products
      const { data, error } = await supabase
        .from('products')
        .select('type, color');

      if (!error && data) {
        // Extract unique, non-null values using a Set
        const uniqueTypes = Array.from(new Set(data.map(p => p.type).filter(Boolean)));
        const uniqueColors = Array.from(new Set(data.map(p => p.color).filter(Boolean)));

        setAvailableTypes(uniqueTypes);
        setAvailableColors(uniqueColors);
      }
    };

    fetchFilterOptions();
  }, []);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleFilterChange(e);
    }
  };

  return (
    <div className="mt-12 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex flex-col gap-6">
      
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex items-center justify-center gap-2 w-full py-3.5 bg-gray-50 ring-1 ring-gray-200 rounded-2xl font-semibold text-sm text-gray-700 transition-colors hover:bg-gray-100 active:scale-[0.98]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
        {isOpen ? "Close Filters" : "Filter & Sort"}
      </button>

      {/* Filter Options */}
      <div className={`flex-col md:flex-row justify-between gap-6 ${isOpen ? 'flex' : 'hidden md:flex'}`}>
        
        {/* Left Side: Filtering */}
        <div className="flex gap-4 flex-wrap">
          
          {/* Dynamic Item Type Dropdown */}
          <select 
            name="type" 
            onChange={handleFilterChange} 
            value={searchParams.get("type") || ""} 
            className="py-3 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED] cursor-pointer outline-none flex-grow sm:flex-grow-0 capitalize"
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

          <input 
            type="text" 
            inputMode="numeric"
            name="min" 
            placeholder="Min price" 
            defaultValue={searchParams.get("min") || ""}
            onBlur={handleFilterChange} 
            onKeyDown={handleKeyDown}
            className="text-xs rounded-2xl pl-4 py-3 w-[calc(50%-8px)] sm:w-24 ring-1 ring-gray-400 placeholder:text-gray-500 outline-none focus:ring-indigo-500" 
          />
          <input 
            type="text" 
            inputMode="numeric"
            name="max" 
            placeholder="Max price" 
            defaultValue={searchParams.get("max") || ""}
            onBlur={handleFilterChange} 
            onKeyDown={handleKeyDown}
            className="text-xs rounded-2xl pl-4 py-3 w-[calc(50%-8px)] sm:w-24 ring-1 ring-gray-400 placeholder:text-gray-500 outline-none focus:ring-indigo-500" 
          />

          {/* Dynamic Color Dropdown */}
          <select 
            name="color" 
            onChange={handleFilterChange} 
            value={searchParams.get("color") || ""} 
            className="py-3 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED] cursor-pointer outline-none flex-grow sm:flex-grow-0 capitalize"
          >
            <option value="">All Colors</option>
            {availableColors.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>

        {/* Right Side: Sorting */}
        <div className="">
          <select name="sort" onChange={handleFilterChange} defaultValue={searchParams.get("sort") || ""} className="py-3 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400 w-full md:w-auto cursor-pointer outline-none focus:ring-indigo-500">
            <option value="">Default Sorting</option>
            <option value="price-asc">Price (low to high)</option>
            <option value="price-desc">Price (high to low)</option>
          </select>
        </div>
        
      </div>
    </div>
  );
};

export default Filter;