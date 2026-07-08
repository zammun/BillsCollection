import { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const LoginModal = ({ onClose }: { onClose: () => void }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true); // Track initial mount
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Fixed Safety net: Only close if the route actually CHANGES after mounting
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    onClose();
  }, [location.pathname, onClose]);

  // 2. Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      // Prevent closing if clicking the profile icon toggle itself
      if (target.closest('#profile-icon')) return;
      
      if (modalRef.current && !modalRef.current.contains(target)) {
        onClose();
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // 3. Helper to handle navigation AND closing simultaneously
  const handleNavigate = (path: string) => {
    onClose(); 
    navigate(path); 
  };

  return (
    <div 
      ref={modalRef} 
      className="absolute p-6 rounded-md shadow-lg bg-white top-12 left-0 flex flex-col gap-6 z-[100] w-72"
    >
      <h1 className="font-semibold text-lg">Sign In</h1>
      
      {/* ... (Social Logins remain unchanged) ... */}
      
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Username" className="p-2 ring-1 ring-gray-300 rounded-md outline-none focus:ring-2 focus:ring-slate-500 text-sm" />
        <input type="password" placeholder="Password" className="p-2 ring-1 ring-gray-300 rounded-md outline-none focus:ring-2 focus:ring-slate-500 text-sm" />
        <button type="submit" className="bg-slate-600 text-white rounded-md p-2 hover:bg-slate-700 transition-colors cursor-pointer text-sm font-medium">
          Login
        </button>
      </form>

      <div className="flex flex-col gap-3 text-sm text-gray-500">
        <button 
          onClick={() => handleNavigate("/profile")} 
          className="text-left hover:text-slate-900 transition-colors cursor-pointer"
        >
          Account Settings
        </button>
        <button 
          onClick={() => handleNavigate("/orders")} 
          className="text-left hover:text-slate-900 transition-colors cursor-pointer"
        >
          Order History
        </button>
        <div className="pt-2">
          Don't have an account?{" "}
          <Link to="/login" className="underline font-medium text-slate-700" onClick={onClose}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;