import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Menu from "./Menu";
import SearchBar from "./SearchBar";
import NavIcons from "./NavIcons";
import { useAuth } from "../hooks/useAuth";
import { useAuthContext } from "../context/AuthContext";
import { useCartStore } from "../store/useCartStore";

const UserMenu = ({ closeMenu }: { closeMenu: () => void }) => {
  const { loginWithGoogle, loginWithEmail } = useAuth();
  const { user, logout } = useAuthContext();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 1. ADD THIS REF AND EFFECT TO HANDLE CLICK OUTSIDE
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      // Safeguard: Ignore clicks on the profile icon button itself to avoid toggle conflicts
      if (target.closest('#profile-icon')) return;
      
      if (menuRef.current && !menuRef.current.contains(target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeMenu]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await loginWithEmail(email, password);
      closeMenu();
    } catch (err: any) {
      setError(err.message || "Failed to log in.");
    }
  };

  if (user) {
    const fullName = user.user_metadata?.full_name || "User";
    const authorizedEmails = ['moneyygdaman@gmail.com'];
    const isAdmin = authorizedEmails.includes(user.email || '');

    return (
      // 2. ATTACH THE REF TO THE LOGGED-IN DIV
      <div ref={menuRef} className="absolute right-0 mt-3 w-64 bg-white shadow-2xl border border-gray-100 rounded-xl p-2 z-50 text-sm">
        <div className="px-4 py-3 border-b border-gray-50">
          <p className="font-semibold text-gray-800 truncate">{fullName}</p>
          <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
        </div>

        {isAdmin && (
          <Link to="/admin" onClick={closeMenu} className="block px-4 py-2 mx-1 mt-1 text-center font-bold text-xs uppercase tracking-wide rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
            Admin Dashboard
          </Link>
        )}

        <Link to="/profile" onClick={closeMenu} className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-md transition-colors mt-1">
          Account Settings
        </Link>
        <Link to="/orders" onClick={closeMenu} className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-md transition-colors">
          Order History
        </Link>

        <div className="border-t border-gray-100 my-1"></div>

        <button 
          onClick={async () => { 
            await logout(); 
            closeMenu(); 
            window.location.href = "/"; 
          }} 
          className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 rounded-md font-medium transition-colors cursor-pointer"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    // 3. ATTACH THE REF TO THE LOGGED-OUT DIV AS WELL
    <div ref={menuRef} className="absolute right-0 mt-2 w-[90vw] md:w-72 bg-white shadow-xl rounded-md p-6 z-50 text-sm border border-gray-100">
      <button onClick={loginWithGoogle} className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md hover:bg-gray-50 min-h-[40px] text-gray-700 font-medium transition-colors cursor-pointer">
        <img src="/google.svg" alt="Google" className="w-5 h-5 mr-2" /> Sign in with Google
      </button>
      <div className="border-t border-gray-200 my-4"></div>
      <form className="space-y-3" onSubmit={handleLogin}>
        <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-800" />
        <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-800" />
        <button type="submit" className="w-full py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 font-medium transition-colors cursor-pointer">Login</button>
      </form>
    </div>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false); 

  const cartItems = useCartStore((state) => state.cartItems);
  const totalItemsInCart = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (userMenuOpen) {
        setUserMenuOpen(false);
        navigate("/profile");
    } else {
        setCartOpen(false);
        setUserMenuOpen(true);
    }
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartOpen) {
        setCartOpen(false);
        if (totalItemsInCart > 0) {
            navigate("/cart");
        }
    } else {
        setUserMenuOpen(false);
        setCartOpen(true);
    }
  };

  return (
    <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative bg-slate-600 z-50">
      <div className="hidden md:flex items-center justify-between gap-8 h-full">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" width={60} height={60} />
          <div className="text-2xl tracking-wide text-white">Bills Collection</div>
        </Link>
        <div className="flex-grow flex items-center justify-end gap-8">
          <div className="flex-1 max-w-[350px] flex justify-end">
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