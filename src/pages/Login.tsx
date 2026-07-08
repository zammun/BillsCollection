import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../supabase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isResetView, setIsResetView] = useState(false);
  
  const { loginWithEmail, loginWithGoogle } = useAuth();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await loginWithEmail(email, password);
      window.location.href = "/";
    } catch (err: any) {
      setError("Invalid email or password.");
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    
    if (!email) {
      return setError("Please enter your email address.");
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/update-password',
      });
      if (error) throw error;
      setMessage("Check your email for the reset link.");
      setIsResetView(false);
    } catch (err: any) {
      setError(err.message || "Failed to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50/50 py-12 px-4">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl shadow-indigo-100/50 rounded-2xl border border-gray-100">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {isResetView ? "Reset Password" : "Welcome back"}
          </h2>
        </div>
        
        {error && <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 rounded-lg text-center">{error}</div>}
        {message && <div className="p-3 mb-4 text-sm text-green-700 bg-green-50 rounded-lg text-center">{message}</div>}

        <form onSubmit={isResetView ? handlePasswordReset : handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input 
              type="email" 
              required 
              disabled={loading}
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-slate-500 disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200 transition-all text-sm" 
              placeholder="you@example.com" 
            />
          </div>

          {!isResetView && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                required 
                disabled={loading}
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-slate-500 disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200 transition-all text-sm" 
                placeholder="••••••••" 
              />
              <div className="mt-2 text-right">
                <button 
                  type="button" 
                  disabled={loading}
                  onClick={() => setIsResetView(true)} 
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Forgot password?
                </button>
              </div>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full py-3 text-white bg-slate-800 rounded-xl font-semibold hover:bg-slate-900 transition-colors cursor-pointer disabled:bg-slate-700 disabled:cursor-not-allowed text-sm"
          >
            {loading ? "Processing..." : (isResetView ? "Send Reset Link" : "Sign in")}
          </button>
        </form>

        {isResetView ? (
          <button 
            disabled={loading}
            onClick={() => setIsResetView(false)} 
            className="w-full mt-4 text-sm text-gray-600 hover:text-gray-900 font-medium cursor-pointer disabled:opacity-50"
          >
            Back to login
          </button>
        ) : (
          <div className="mt-6">
            <button 
              onClick={loginWithGoogle} 
              disabled={loading}
              className="w-full py-3 border border-gray-200 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              <img src="/google.svg" alt="Google" className="w-5 h-5" /> Google
            </button>
            <p className="text-center text-sm mt-4 text-gray-500">
              Don't have an account?{" "}
              <Link to="/register" className="text-indigo-600 font-semibold hover:text-indigo-500">Sign up</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;