import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const LoginModal = ({ onClose }: { onClose: () => void }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;

      // If the click is on the profile icon, ignore it so NavIcons can handle the toggle
      if (target.closest('#profile-icon')) {
        return;
      }

      if (modalRef.current && !modalRef.current.contains(target)) {
        onClose();
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div 
      ref={modalRef} 
      className="absolute p-6 rounded-md shadow-lg bg-white top-12 left-0 flex flex-col gap-6 z-[100] w-72"
    >
      <h1 className="font-semibold text-lg">Sign In</h1>
      
      <div className="flex flex-col gap-3">
        <button className="flex items-center justify-center gap-3 p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
          <img src="/google.svg" alt="Google" width={20} height={20} />
          <span className="text-sm font-medium">Continue with Google</span>
        </button>
        <button className="flex items-center justify-center gap-3 p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
          <img src="/apple.svg" alt="Apple" width={20} height={20} />
          <span className="text-sm font-medium">Continue with Apple</span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <hr className="flex-grow border-gray-200" />
        <span className="text-xs text-gray-400 uppercase">Or</span>
        <hr className="flex-grow border-gray-200" />
      </div>

      <form className="flex flex-col gap-4">
        <input 
          type="text" 
          placeholder="Username" 
          className="p-2 ring-1 ring-gray-300 rounded-md outline-none focus:ring-2 focus:ring-slate-500" 
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="p-2 ring-1 ring-gray-300 rounded-md outline-none focus:ring-2 focus:ring-slate-500" 
        />
        <button 
          type="submit" 
          className="bg-slate-600 text-white rounded-md p-2 hover:bg-slate-700 transition-colors"
        >
          Login
        </button>
      </form>

      <div className="text-sm text-gray-500">
        Don't have an account?{" "}
        <Link to="/login" className="underline font-medium text-slate-700" onClick={onClose}>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LoginModal;