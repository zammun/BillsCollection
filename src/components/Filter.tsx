import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Filter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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
    <div className="mt-12 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex flex-col md:flex-row justify-between gap-6">
      {/* Filter Section */}
      <div className="flex gap-6 flex-wrap">
        <select name="type" onChange={handleFilterChange} defaultValue={searchParams.get("type") || ""} className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]">
          <option value="">All Types</option>
          <option value="T-Shirt">T-Shirts</option>
          <option value="Hoodie">Hoodies</option>
        </select>

        {/* Changed to type="text" with inputMode="numeric" to remove arrows */}
        <input 
          type="text" 
          inputMode="numeric"
          name="min" 
          placeholder="Min price" 
          defaultValue={searchParams.get("min") || ""}
          onBlur={handleFilterChange} 
          onKeyDown={handleKeyDown}
          className="text-xs rounded-2xl pl-4 w-24 ring-1 ring-gray-400 placeholder:text-gray-500 outline-none focus:ring-indigo-500" 
        />
        <input 
          type="text" 
          inputMode="numeric"
          name="max" 
          placeholder="Max price" 
          defaultValue={searchParams.get("max") || ""}
          onBlur={handleFilterChange} 
          onKeyDown={handleKeyDown}
          className="text-xs rounded-2xl pl-4 w-24 ring-1 ring-gray-400 placeholder:text-gray-500 outline-none focus:ring-indigo-500" 
        />

        <select name="color" onChange={handleFilterChange} defaultValue={searchParams.get("color") || ""} className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]">
          <option value="">Color</option>
          <option value="black">Black</option>
          <option value="white">White</option>
        </select>
      </div>

      {/* Sort Section */}
      <div className="">
        <select name="sort" onChange={handleFilterChange} defaultValue={searchParams.get("sort") || ""} className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400 w-full md:w-auto outline-none focus:ring-indigo-500">
          <option value="">Sort By</option>
          <option value="price-asc">Price (low to high)</option>
          <option value="price-desc">Price (high to low)</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;