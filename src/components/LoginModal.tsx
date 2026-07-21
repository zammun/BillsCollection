import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LoginModal = ({ onClose }: { onClose: () => void }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true); 
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { loginWithEmail, loginWithGoogle } = useAuth();

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    onClose();
  }, [location.pathname, onClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (target.closest('#profile-icon')) return;
      
      if (modalRef.current && !modalRef.current.contains(target)) {
        onClose();
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginWithEmail(email, password);
      onClose();
    } catch (err: any) {
      setError("Invalid email or password.");
      setLoading(false);
    }
  };

  const handleGoogleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle();
      onClose();
    } catch (err: any) {
      setError(err.message || "Google sign in failed.");
      setLoading(false);
    }
  };

  const handleNavigate = (path: string) => {
    onClose(); 
    navigate(path); 
  };

  return (
    <div 
      ref={modalRef} 
      className="absolute p-6 rounded-md shadow-lg bg-white top-full mt-3 right-0 md:right-auto md:left-0 flex flex-col gap-5 z-[100] w-[calc(100vw-32px)] sm:w-72 pointer-events-auto border border-gray-100"
    >
      <div>
        <h1 className="font-semibold text-lg text-gray-900">Sign In</h1>
      </div>

      {error && (
        <div className="p-2.5 text-xs text-red-600 bg-red-50 rounded-lg text-center font-medium animate-fadeIn">
          {error}
        </div>
      )}
      
      <button 
        onClick={handleGoogleSubmit}
        disabled={loading}
        className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 font-medium text-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-h-[38px]"
      >
        <img src="/google.svg" alt="Google" className="w-4 h-4 mr-2" /> Sign in with Google
      </button>

      <div className="relative flex py-1 items-center">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="flex-shrink mx-3 text-gray-400 text-xs font-medium uppercase tracking-wider">or</span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>
      
      <form className="flex flex-col gap-3.5" onSubmit={handleLoginSubmit}>
        <input 
          type="email" 
          placeholder="Email address" 
          required
          disabled={loading}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2.5 ring-1 ring-gray-300 rounded-md outline-none focus:ring-2 focus:ring-slate-500 text-sm disabled:bg-gray-50 disabled:text-gray-400" 
        />
        <input 
          type="password" 
          placeholder="Password" 
          required
          disabled={loading}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2.5 ring-1 ring-gray-300 rounded-md outline-none focus:ring-2 focus:ring-slate-500 text-sm disabled:bg-gray-50 disabled:text-gray-400" 
        />
        <button 
          type="submit" 
          disabled={loading}
          className="bg-slate-600 text-white rounded-md p-2.5 hover:bg-slate-700 transition-colors cursor-pointer text-sm font-medium disabled:bg-slate-500 disabled:cursor-not-allowed mt-1 shadow-xs"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>

      <div className="flex flex-col gap-3 text-xs text-gray-500 border-t border-gray-100 pt-4 mt-1">
        <button 
          onClick={() => handleNavigate("/profile")} 
          disabled={loading}
          className="text-left hover:text-slate-900 transition-colors cursor-pointer font-medium disabled:opacity-50"
        >
          Account Settings
        </button>
        <button 
          onClick={() => handleNavigate("/orders")} 
          disabled={loading}
          className="text-left hover:text-slate-900 transition-colors cursor-pointer font-medium disabled:opacity-50"
        >
          Order History
        </button>
        <div className="pt-1 text-gray-400">
          Don't have an account?{" "}
          <Link to="/login" className="underline font-semibold text-slate-700 hover:text-indigo-600 transition-colors" onClick={onClose}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;