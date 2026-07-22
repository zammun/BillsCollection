import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import NavIcons from "./NavIcons";
import { useAuth } from "../hooks/useAuth";
import { useAuthContext } from "../context/AuthContext";
import { useCartStore } from "../store/useCartStore";

const UserMenu = ({ closeMenu }: { closeMenu: () => void }) => {
  const { loginWithGoogle, loginWithEmail } = useAuth();
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setError] = useState("");

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      const target = event.target as Element;
      if (target.closest('#profile-icon')) return;
      
      if (menuRef.current && !menuRef.current.contains(target)) {
        closeMenu();
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
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
      <div ref={menuRef} className="absolute top-full right-0 mt-3 w-72 bg-[#D9D7D0] shadow-2xl border border-slate-200/90 rounded-xl p-2 z-[100] pointer-events-auto text-base animate-fadeIn">
        <div className="px-4 py-4 border-b border-slate-400/30">
          <p className="font-bold text-slate-800 truncate text-lg">{fullName}</p>
          <p className="text-sm text-slate-600 truncate mt-0.5">{user.email}</p>
        </div>

        {isAdmin && (
          <Link to="/admin" onClick={closeMenu} className="block px-4 py-2.5 mx-1 mt-2 text-center font-bold text-sm uppercase tracking-wide rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors">
            Admin Dashboard
          </Link>
        )}

        <div className="mt-2 space-y-1">
          <Link to="/profile" onClick={closeMenu} className="block px-4 py-2.5 text-slate-800 hover:bg-[#E6E4DC] hover:text-slate-900 rounded-md transition-colors font-medium">
            Account Settings
          </Link>
          <Link to="/orders" onClick={closeMenu} className="block px-4 py-2.5 text-slate-800 hover:bg-[#E6E4DC] hover:text-slate-900 rounded-md transition-colors font-medium">
            Order History
          </Link>
        </div>

        <div className="border-t border-slate-400/30 my-2"></div>

        <button 
          onClick={async () => { 
            await logout(); 
            closeMenu(); 
            window.location.href = "/"; 
          }} 
          className="w-full text-left px-4 py-2.5 hover:bg-rose-100 text-rose-700 rounded-md font-semibold transition-colors cursor-pointer"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div ref={menuRef} className="absolute top-full right-0 mt-3 w-[calc(100vw-32px)] sm:w-80 bg-[#D9D7D0] shadow-xl rounded-2xl p-6 z-[100] pointer-events-auto text-base border border-slate-200/60 animate-fadeIn">
      <button onClick={loginWithGoogle} className="flex items-center justify-center w-full py-3 border border-slate-300 rounded-xl hover:bg-[#E6E4DC] min-h-[48px] text-slate-800 font-semibold transition-colors cursor-pointer shadow-sm">
        <img src="/google.svg" alt="Google" className="w-5 h-5 mr-3" /> Sign in with Google
      </button>
      
      <div className="flex items-center my-5 text-slate-500">
        <div className="flex-1 border-t border-slate-400/40"></div>
        <span className="px-3 text-sm font-medium">or</span>
        <div className="flex-1 border-t border-slate-400/40"></div>
      </div>

      <form className="space-y-4" onSubmit={handleLogin}>
        <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3.5 border border-slate-300 rounded-xl bg-[#E6E4DC] focus:outline-none focus:border-slate-500 focus:bg-[#f4f3ef] text-slate-900 text-sm transition-colors placeholder-slate-500" />
        <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3.5 border border-slate-300 rounded-xl bg-[#E6E4DC] focus:outline-none focus:border-slate-500 focus:bg-[#f4f3ef] text-slate-900 text-sm transition-colors placeholder-slate-500" />
        <button type="submit" className="w-full py-3.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 font-bold transition-colors cursor-pointer text-sm uppercase tracking-wider shadow-md mt-2">Login</button>
      </form>

      <div className="mt-4 text-center text-xs text-slate-700 pt-2 border-t border-slate-400/30">
        Don't have an account?{" "}
        <button 
          onClick={() => {
            closeMenu();
            navigate("/register");
          }} 
          className="font-bold text-slate-900 hover:underline cursor-pointer ml-1"
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false); 
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItems = useCartStore((state) => state.cartItems);
  const totalItemsInCart = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (userMenuOpen) {
        setUserMenuOpen(false);
    } else {
        setCartOpen(false);
        setNotificationOpen(false);
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
        setNotificationOpen(false);
        setMobileMenuOpen(false);
        setCartOpen(true);
    }
  };

  const handleNotificationClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUserMenuOpen(false);
    setCartOpen(false);
    setMobileMenuOpen(false);
    setNotificationOpen(!notificationOpen);
  };

  return (
    <>
      <div 
        className="fixed top-0 left-0 w-full h-20 md:h-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 z-50 flex items-center justify-between gap-4 transition-all duration-300 bg-[#E6E4DC]/40 backdrop-blur-md shadow-sm transform-gpu"
      >
        
        {/* Brand Identity Bundle + Left Mobile Burger */}
        <div className="flex items-center gap-3 md:gap-12 shrink-0">
          
          {/* Left Mobile Burger Button */}
          <button 
            onClick={() => { setMobileMenuOpen(!mobileMenuOpen); setCartOpen(false); setUserMenuOpen(false); setNotificationOpen(false); }}
            className="focus:outline-none md:hidden flex items-center justify-center shrink-0 cursor-pointer text-slate-900 h-6 w-6 mr-1"
            aria-label="Toggle navigation menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300">
              {mobileMenuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <Link to="/" className="flex items-center gap-2 md:gap-4 shrink-0" onClick={() => { setCartOpen(false); setUserMenuOpen(false); setNotificationOpen(false); setMobileMenuOpen(false); }}>
            <img 
                src="/logo.png" 
                alt="Logo" 
                className="w-14 h-14 md:w-[70px] md:h-[70px] shrink-0" 
            />
            <div className="text-xl md:text-3xl font-black tracking-tight text-slate-900 font-heading">Bills Collection</div>
          </Link>

          {/* Desktop Global Navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-lg font-semibold">
            <NavLink 
              to="/" 
              end 
              className={({ isActive }) => `transition-colors duration-300 ${isActive ? 'text-slate-900 font-bold underline underline-offset-8 decoration-2' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Home
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => `transition-colors duration-300 ${isActive ? 'text-slate-900 font-bold underline underline-offset-8 decoration-2' : 'text-slate-600 hover:text-slate-900'}`}
            >
              About
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => `transition-colors duration-300 ${isActive ? 'text-slate-900 font-bold underline underline-offset-8 decoration-2' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Contact
            </NavLink>
          </nav>
        </div>

        {/* Primary Actions Deck */}
        <div className="flex-grow flex items-center justify-end gap-4 md:gap-6">
          
          <div className="hidden md:flex flex-1 max-w-[280px] justify-end">
            <SearchBar />
          </div>
          
          <div className="relative shrink-0 flex items-center gap-4 text-slate-800">
            <NavIcons 
              onProfileClick={handleProfileClick} 
              isProfileOpen={userMenuOpen}
              onCartClick={handleCartClick}
              isCartOpen={cartOpen}
              setIsCartOpen={setCartOpen}
              isNotificationOpen={notificationOpen}
              onNotificationClick={handleNotificationClick}
              setIsNotificationOpen={setNotificationOpen}
            />

            {userMenuOpen && <UserMenu closeMenu={() => setUserMenuOpen(false)} />}
          </div>
        </div>

        {/* Mobile Drawer Panel with Smooth Transition */}
        <div 
          className={`absolute top-20 left-0 w-full bg-[#D9D7D0] backdrop-blur-xl p-6 border-b border-slate-300/60 shadow-2xl flex flex-col gap-6 md:hidden z-50 transition-all duration-300 ease-in-out transform-gpu origin-top ${
            mobileMenuOpen 
              ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto" 
              : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
          }`}
        >
          
          {/* Full-width Search Container */}
          <div className="w-full flex justify-start">
            <div className="w-full">
              <SearchBar onSearch={() => setMobileMenuOpen(false)} />
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-1.5 pt-2 border-t border-slate-400/30">
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)} 
              className="flex items-center justify-between py-3 px-4 rounded-xl text-slate-800 hover:bg-[#e6e4dc]/60 transition-all font-bold text-base"
            >
              <span>Home</span>
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </Link>

            <Link 
              to="/about" 
              onClick={() => setMobileMenuOpen(false)} 
              className="flex items-center justify-between py-3 px-4 rounded-xl text-slate-800 hover:bg-[#e6e4dc]/60 transition-all font-bold text-base"
            >
              <span>About</span>
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </Link>

            <Link 
              to="/contact" 
              onClick={() => setMobileMenuOpen(false)} 
              className="flex items-center justify-between py-3 px-4 rounded-xl text-slate-800 hover:bg-[#e6e4dc]/60 transition-all font-bold text-base"
            >
              <span>Contact</span>
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </Link>

            {/* Track Order Button */}
            <Link 
              to="/track-order" 
              onClick={() => setMobileMenuOpen(false)} 
              className="mt-3 flex items-center justify-between py-3.5 px-4 rounded-xl bg-slate-900 text-white font-bold text-sm tracking-wide uppercase shadow-md active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>Track Order</span>
              </div>
              <span className="text-[10px] bg-slate-800 border border-slate-700 px-2.5 py-0.5 rounded-md text-slate-300 font-semibold tracking-wider">
                LOOKUP
              </span>
            </Link>
          </nav>

        </div>
      </div>

      {/* Dark Backdrop Overlay with Smooth Fade */}
      <div 
        onClick={() => setMobileMenuOpen(false)}
        className={`fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`} 
      />
    </>
  );
};

export default Navbar;