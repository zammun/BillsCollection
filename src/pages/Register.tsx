import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [strength, setStrength] = useState(0);
  
  const { registerWithEmail, loginWithGoogle } = useAuth();

  useEffect(() => {
    let score = 0;
    if (!password) {
      setStrength(0);
      return;
    }
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    setStrength(score);
  }, [password]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    setLoading(true);
    try {
      await registerWithEmail(email, password, username);
      
      // Email confirm is OFF, so they are logged in automatically. 
      // Force refresh to update the Navbar context.
      window.location.href = "/"; 
    } catch (err: any) {
      if (err.message?.includes("already registered")) {
        setError("This email is already in use.");
      } else {
        setError(err.message || "Failed to create an account.");
      }
      setLoading(false);
    }
  };

  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["bg-gray-200", "bg-red-500", "bg-orange-400", "bg-yellow-400", "bg-green-500"];

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-2xl shadow-indigo-100/50 rounded-2xl border border-gray-100">
        
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Join the club</h2>
          <p className="mt-2 text-sm text-gray-500">Create your Bills Collection account</p>
        </div>
        
        {error && (
          <div className="p-3 text-sm font-medium text-red-600 bg-red-50 border border-red-100 rounded-lg text-center animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Username</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all" 
            />
            
            {password.length > 0 && (
              <div className="mt-3">
                <div className="flex gap-1 h-1.5 w-full rounded-full overflow-hidden bg-gray-100">
                  {[...Array(4)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-full flex-1 transition-colors duration-500 ease-out ${
                        i < strength ? strengthColors[strength] : 'bg-transparent'
                      }`}
                    />
                  ))}
                </div>
                <p className={`text-xs mt-1.5 font-medium transition-colors duration-300 ${strength < 2 ? 'text-red-500' : 'text-gray-500'}`}>
                  {strengthLabels[strength]}
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
            <input 
              type="password" 
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full p-3 bg-gray-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                confirmPassword && password !== confirmPassword 
                  ? "border-red-300 focus:ring-red-500/50 focus:border-red-500" 
                  : "border-gray-200 focus:ring-indigo-500/50 focus:border-indigo-500"
              }`} 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 text-white bg-slate-800 rounded-xl hover:bg-slate-900 font-semibold shadow-lg shadow-slate-200 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
          >
            {loading ? "Setting up account..." : "Create Account"}
          </button>
        </form>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink-0 mx-4 text-xs text-gray-400 font-medium uppercase tracking-wider">Or continue with</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <button 
          onClick={loginWithGoogle}
          type="button"
          className="w-full flex items-center justify-center gap-3 py-3 border-2 border-gray-100 rounded-xl hover:bg-gray-50 text-gray-700 font-medium transition-colors active:scale-[0.98]"
        >
          <img src="/google.svg" alt="Google" className="w-5 h-5" />
          Google
        </button>

        <p className="text-center text-sm text-gray-500 pt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline decoration-2 underline-offset-4 transition-all">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;