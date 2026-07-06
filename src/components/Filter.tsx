"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    
    if (value) params.set(name, value);
    else params.delete(name);
    
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-12 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex flex-col md:flex-row justify-between gap-6">
      {/* Filter Section */}
      <div className="flex gap-6 flex-wrap">
        <select name="type" onChange={handleFilterChange} className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]">
          <option value="">Type</option>
          <option value="physical">Physical</option>
          <option value="digital">Digital</option>
        </select>

        <input type="text" name="min" placeholder="min price" onChange={handleFilterChange} className="text-xs rounded-2xl pl-4 w-24 ring-1 ring-gray-400 placeholder:text-gray-500" />
        <input type="text" name="max" placeholder="max price" onChange={handleFilterChange} className="text-xs rounded-2xl pl-4 w-24 ring-1 ring-gray-400 placeholder:text-gray-500" />

        <select name="size" onChange={handleFilterChange} className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]">
          <option value="">Size</option>
          <option value="s">Small</option>
          <option value="m">Medium</option>
          <option value="l">Large</option>
        </select>

        <select name="color" onChange={handleFilterChange} className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]">
          <option value="">Color</option>
          <option value="black">Black</option>
          <option value="white">White</option>
          <option value="blue">Blue</option>
        </select>
      </div>

      {/* Sort Section */}
      <div className="">
        <select name="sort" onChange={handleFilterChange} className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400 w-full md:w-auto">
          <option value="">Sort By</option>
          <option value="price-asc">Price (low to high)</option>
          <option value="price-desc">Price (high to low)</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;