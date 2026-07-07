import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import SearchBar from "./SearchBar";
import NavIcons from "./NavIcons";
import { useAuth } from "../hooks/useAuth";
import { useAuthContext } from "../context/AuthContext";

const UserMenu = () => {
  const { loginWithGoogle, loginWithEmail } = useAuth();
  const { user, logout } = useAuthContext();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await loginWithEmail(email, password);
      // Supabase context will auto-update the UI on success
    } catch (err: any) {
      setError(err.message || "Failed to log in.");
    }
  };

  // If user is logged in, show the polished profile menu
  if (user) {
    const fullName = user.user_metadata?.full_name || "User";

    return (
      <div className="absolute right-0 mt-3 w-64 bg-white shadow-2xl border border-gray-100 rounded-xl p-2 z-50 text-sm">
        
        {/* Text-only User Info Header */}
        <div className="px-4 py-3 border-b border-gray-50">
          <p className="font-semibold text-gray-800 truncate">{fullName}</p>
          <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
        </div>

        {/* Action Links */}
        <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-md transition-colors">
          Account Settings
        </Link>
        <Link to="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-md transition-colors">
          Order History
        </Link>

        <div className="border-t border-gray-100 my-1"></div>

        {/* Logout Button */}
        <button 
          onClick={logout} 
          className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 rounded-md font-medium transition-colors"
        >
          Sign out
        </button>
      </div>
    );
  }

  // Otherwise, show the Login Form (Google Only)
  return (
    <div className="absolute right-0 mt-2 w-[90vw] md:w-72 bg-white shadow-xl rounded-md p-6 z-50 text-sm border border-gray-100">
      <div className="flex flex-col gap-2 mb-4">
        <button 
          onClick={loginWithGoogle} 
          className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md hover:bg-gray-50 min-h-[40px] text-gray-700 font-medium transition-colors"
        >
          <img src="/google.svg" alt="Google" className="w-5 h-5 mr-2" />
          Sign in with Google
        </button>
      </div>

      <div className="border-t border-gray-200 my-4"></div>

      {error && <div className="mb-3 p-2 text-xs text-red-600 bg-red-50 rounded-md text-center">{error}</div>}

      <form className="space-y-3" onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-800" 
        />
        <input 
          type="password" 
          placeholder="Password" 
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-800" 
        />
        <button type="submit" className="w-full py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 font-medium transition-colors">
          Login
        </button>
      </form>

      <p className="text-center mt-4 text-gray-500">
        Don't have an account?{" "}
        <Link to="/register" className="text-indigo-500 hover:underline font-semibold">
          Sign up
        </Link>
      </p>
    </div>
  );
};

const Navbar = () => {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
      {/* Mobile Header */}
      <div className="h-full flex items-center justify-between md:hidden">
        <Link to="/">
          <div className="text-2xl tracking-wide text-white">Bills Collection</div>
        </Link>
        <Menu />
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between gap-8 h-full">
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

        <div className="flex-grow flex items-center justify-end gap-8">
          <div className="flex-grow max-w-sm">
            <SearchBar />
          </div>
          <div className="relative">
            <NavIcons 
              onProfileClick={() => setUserMenuOpen(!userMenuOpen)} 
              isProfileOpen={userMenuOpen} 
            />
            {userMenuOpen && <UserMenu />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;