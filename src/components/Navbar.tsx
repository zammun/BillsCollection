import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import SearchBar from "./SearchBar";
import NavIcons from "./NavIcons";
import { useAuth } from "../hooks/useAuth";

// Separate UserMenu component
const UserMenu = () => {
  const { loginWithGoogle, loginWithApple } = useAuth();
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-md p-4 z-50">
      <button onClick={loginWithGoogle} className="block w-full text-left p-2 hover:bg-gray-100">
        Google
      </button>
      <button onClick={loginWithApple} className="block w-full text-left p-2 hover:bg-gray-100">
        Apple
      </button>
    </div>
  );
};

const Navbar = () => {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  // Ref for clicking outside
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setCategoriesOpen(false);
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative bg-slate-600 z-50" ref={menuRef}>
      {/* Mobile */}
      <div className="h-full flex items-center justify-between md:hidden">
        <Link to="/">
          <div className="text-2xl tracking-wide text-white">Bills Collection</div>
        </Link>
        <Menu />
      </div>

      {/* Bigger Screens */}
      <div className="hidden md:flex items-center justify-between gap-8 h-full">
        {/* Left */}
        <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" width={60} height={60} />
            <div className="text-2xl tracking-wide text-white">Bills Collection</div>
          </Link>
          <div className="hidden xl:flex gap-4 text-white">
            <Link to="/">Home</Link>
            <div className="relative">
              <button
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="focus:outline-none text-white"
              >
                Categories
              </button>
              {categoriesOpen && (
                <div className="absolute mt-2 w-48 bg-slate-500 shadow-lg rounded-md z-50">
                  <Link to="/categories/shirts" className="block px-4 py-2 text-white hover:bg-gray-400">Shirts</Link>
                  <Link to="/categories/pants" className="block px-4 py-2 text-white hover:bg-gray-400">Pants</Link>
                  <Link to="/categories/hoodies" className="block px-4 py-2 text-white hover:bg-gray-400">Hoodies</Link>
                  <Link to="/categories/accessories" className="block px-4 py-2 text-white hover:bg-gray-400">Accessories</Link>
                </div>
              )}
            </div>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        {/* Right */}
        <div className="flex-grow flex items-center justify-end gap-8">
          <div className="flex-grow max-w-sm">
            <SearchBar />
          </div>
          <div className="relative">
            <NavIcons onProfileClick={() => setUserMenuOpen(!userMenuOpen)} />
            {userMenuOpen && <UserMenu />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;