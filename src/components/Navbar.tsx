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

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
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
      <div ref={menuRef} className="absolute top-full right-0 mt-3 w-72 bg-white shadow-2xl border border-slate-200/60 rounded-xl p-2 z-[100] pointer-events-auto text-base">
        <div className="px-4 py-4 border-b border-slate-100/50">
          <p className="font-bold text-slate-800 truncate text-lg">{fullName}</p>
          <p className="text-sm text-slate-500 truncate mt-0.5">{user.email}</p>
        </div>

        {isAdmin && (
          <Link to="/admin" onClick={closeMenu} className="block px-4 py-2.5 mx-1 mt-2 text-center font-bold text-sm uppercase tracking-wide rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
            Admin Dashboard
          </Link>
        )}

        <div className="mt-2 space-y-1">
          <Link to="/profile" onClick={closeMenu} className="block px-4 py-2.5 text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-md transition-colors font-medium">
            Account Settings
          </Link>
          <Link to="/orders" onClick={closeMenu} className="block px-4 py-2.5 text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-md transition-colors font-medium">
            Order History
          </Link>
        </div>

        <div className="border-t border-slate-200/40 my-2"></div>

        <button 
          onClick={async () => { 
            await logout(); 
            closeMenu(); 
            window.location.href = "/"; 
          }} 
          className="w-full text-left px-4 py-2.5 hover:bg-rose-50 text-rose-600 rounded-md font-semibold transition-colors cursor-pointer"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div ref={menuRef} className="absolute top-full right-0 mt-3 w-[calc(100vw-32px)] sm:w-80 bg-white shadow-xl rounded-2xl p-6 z-[100] pointer-events-auto text-base border border-slate-200/60">
      <button onClick={loginWithGoogle} className="flex items-center justify-center w-full py-3 border border-slate-200 rounded-xl hover:bg-slate-50 min-h-[48px] text-slate-800 font-semibold transition-colors cursor-pointer shadow-sm">
        <img src="/google.svg" alt="Google" className="w-5 h-5 mr-3" /> Sign in with Google
      </button>
      
      <div className="flex items-center my-5 text-slate-400">
        <div className="flex-1 border-t border-slate-200/60"></div>
        <span className="px-3 text-sm font-medium">or</span>
        <div className="flex-1 border-t border-slate-200/60"></div>
      </div>

      <form className="space-y-4" onSubmit={handleLogin}>
        <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-slate-400 focus:bg-white text-slate-800 text-sm transition-colors" />
        <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-slate-400 focus:bg-white text-slate-800 text-sm transition-colors" />
        <button type="submit" className="w-full py-3.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 font-bold transition-colors cursor-pointer text-sm uppercase tracking-wider shadow-md mt-2">Login</button>
      </form>
    </div>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false); 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItems = useCartStore((state) => state.cartItems);
  const totalItemsInCart = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (userMenuOpen) {
        setUserMenuOpen(false);
        navigate("/profile");
    } else {
        setCartOpen(false);
        setMobileMenuOpen(false);
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
        setMobileMenuOpen(false);
        setCartOpen(true);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-20 md:h-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-[#f4f3ef]/80 backdrop-blur-md border-b border-slate-200/60 z-50 flex items-center justify-between gap-4 shadow-xs">
      
      {/* Brand Identity Bundle */}
      <div className="flex items-center gap-6 md:gap-12 shrink-0">
        <Link to="/" className="flex items-center gap-2 md:gap-4 shrink-0" onClick={() => { setCartOpen(false); setUserMenuOpen(false); setMobileMenuOpen(false); }}>
          <img 
              src="/logo.png" 
              alt="Logo" 
              className="w-14 h-14 md:w-[70px] md:h-[70px] shrink-0" 
          />
          {/* Bigger, tighter, bolder logo text */}
          <div className="text-xl md:text-3xl font-extrabold tracking-tight text-slate-900">Bills Collection</div>
        </Link>

        {/* Global Navigation links */}
        {/* Increased to text-lg for a more premium, legible feel */}
        <nav className="hidden lg:flex items-center gap-8 text-lg font-semibold text-slate-600">
          <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <Link to="/about" className="hover:text-slate-900 transition-colors">About</Link>
          <Link to="/contact" className="hover:text-slate-900 transition-colors">Contact</Link>
        </nav>
      </div>

      {/* Primary Actions Deck */}
      <div className="flex-grow flex items-center justify-end gap-4 md:gap-6">
        
        {/* Desktop Search Wrapper */}
        <div className="hidden md:flex flex-1 max-w-[280px] justify-end">
          <SearchBar />
        </div>
        
        {/* Interaction Triggers Anchor node */}
        <div className="relative shrink-0 flex items-center gap-5">
          <NavIcons 
            onProfileClick={handleProfileClick} 
            isProfileOpen={userMenuOpen}
            onCartClick={handleCartClick}
            isCartOpen={cartOpen}
            setIsCartOpen={setCartOpen}
          />
          
          {/* Mobile Hamburg Toggle Button */}
          <button 
            onClick={() => { setMobileMenuOpen(!mobileMenuOpen); setCartOpen(false); setUserMenuOpen(false); }}
            className="text-slate-800 p-1 focus:outline-none md:hidden block shrink-0 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {mobileMenuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M4 12h16M4 6h16M4 18h16" />
              )}
            </svg>
          </button>

          {userMenuOpen && <UserMenu closeMenu={() => setUserMenuOpen(false)} />}
        </div>
      </div>

      {/* Mobile Menu Panel Overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-[#f4f3ef]/95 backdrop-blur-lg p-5 border-t border-slate-200/60 shadow-2xl flex flex-col gap-5 md:hidden z-40 animate-fadeIn">
          <div className="w-full" onClick={() => setMobileMenuOpen(false)}>
            <SearchBar />
          </div>
          {/* Increased mobile text to text-lg and added more vertical padding for easier tapping */}
          <div className="flex flex-col gap-2 text-slate-800 font-bold text-lg pt-4 border-t border-slate-200/60">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-slate-500 py-3 px-2 rounded-lg hover:bg-slate-200/50 transition-colors">Home</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-slate-500 py-3 px-2 rounded-lg hover:bg-slate-200/50 transition-colors">About</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-slate-500 py-3 px-2 rounded-lg hover:bg-slate-200/50 transition-colors">Contact</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;