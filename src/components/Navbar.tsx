import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Menu from "./Menu";
import SearchBar from "./SearchBar";
import NavIcons from "./NavIcons";
import { useAuth } from "../hooks/useAuth";
import { useAuthContext } from "../context/AuthContext";

const UserMenu = ({ closeMenu }: { closeMenu: () => void }) => {
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
    } catch (err: any) {
      setError(err.message || "Failed to log in.");
    }
  };

  if (user) {
    const fullName = user.user_metadata?.full_name || "User";
    const authorizedEmails = ['moneyygdaman@gmail.com'];
    const isAdmin = authorizedEmails.includes(user.email || '');

    return (
      <div className="absolute right-0 mt-3 w-64 bg-white shadow-2xl border border-gray-100 rounded-xl p-2 z-50 text-sm">
        <div className="px-4 py-3 border-b border-gray-50">
          <p className="font-semibold text-gray-800 truncate">{fullName}</p>
          <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
        </div>

        {isAdmin && (
          <Link 
            to="/admin" 
            onClick={closeMenu}
            className="block px-4 py-2 mx-1 mt-1 text-center font-bold text-xs uppercase tracking-wide rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
          >
            Admin Dashboard
          </Link>
        )}

        <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-md transition-colors mt-1">
          Account Settings
        </Link>
        <Link to="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-md transition-colors">
          Order History
        </Link>

        <div className="border-t border-gray-100 my-1"></div>

        <button 
          onClick={logout} 
          className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 rounded-md font-medium transition-colors"
        >
          Sign out
        </button>
      </div>
    );
  }

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
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false); 

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
        setCartOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    if (userMenuOpen) {
      setUserMenuOpen(false);
      navigate("/profile");
    } else {
      setCartOpen(false);
      setUserMenuOpen(true);
    }
  };

  const handleCartClick = () => {
    if (cartOpen) {
      setCartOpen(false);
      navigate("/cart");
    } else {
      setUserMenuOpen(false);
      setCartOpen(true);
    }
  };

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
          {/* Swapped Category elements with a direct link to an About page route */}
          <div className="hidden xl:flex gap-4 text-white">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        <div className="flex-grow flex items-center justify-end gap-8">
          <div className="flex-grow max-w-sm">
            <SearchBar />
          </div>
          <div className="relative">
            <NavIcons 
              onProfileClick={handleProfileClick} 
              isProfileOpen={userMenuOpen}
              onCartClick={handleCartClick}
              isCartOpen={cartOpen}
              setIsCartOpen={setCartOpen}
            />
            {userMenuOpen && <UserMenu closeMenu={() => setUserMenuOpen(false)} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;