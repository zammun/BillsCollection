import { useState } from "react";
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
          <h2 className="text-3xl font-extrabold text-gray-900">{isResetView ? "Reset Password" : "Welcome back"}</h2>
        </div>
        
        {error && <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 rounded-lg text-center">{error}</div>}
        {message && <div className="p-3 mb-4 text-sm text-green-700 bg-green-50 rounded-lg text-center">{message}</div>}

        <form onSubmit={isResetView ? handlePasswordReset : handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border rounded-xl" placeholder="you@example.com" />
          </div>

          {!isResetView && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border rounded-xl" placeholder="••••••••" />
              <div className="mt-2 text-right">
                <button type="button" onClick={() => setIsResetView(true)} className="text-xs font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </button>
              </div>
            </div>
          )}

          <button type="submit" disabled={loading} className="w-full py-3 text-white bg-slate-800 rounded-xl font-semibold hover:bg-slate-900">
            {loading ? "Processing..." : (isResetView ? "Send Reset Link" : "Sign in")}
          </button>
        </form>

        {isResetView ? (
          <button onClick={() => setIsResetView(false)} className="w-full mt-4 text-sm text-gray-600">Back to login</button>
        ) : (
          <div className="mt-6">
            <button onClick={loginWithGoogle} className="w-full py-3 border rounded-xl font-medium flex items-center justify-center gap-2">
              <img src="/google.svg" alt="Google" className="w-5 h-5" /> Google
            </button>
            <p className="text-center text-sm mt-4 text-gray-500">
              Don't have an account? <Link to="/register" className="text-indigo-600 font-semibold">Sign up</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;