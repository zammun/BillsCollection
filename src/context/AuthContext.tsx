import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '../supabase'; 
import { useCartStore } from '../store/useCartStore'; // 1. Import cart store

interface AuthContextType {
  user: any | null;
  login: (userData: any) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  
  // 2. Access clearCart action
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    // 1. Check if there is an active session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 2. Listen for Google/Apple redirects or logouts
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);

      // Clear cart if user signs out via external session change
      if (event === 'SIGNED_OUT') {
        clearCart();
      }
    });

    return () => subscription.unsubscribe();
  }, [clearCart]);

  const login = (userData: any) => setUser(userData);
  
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      
      // 3. Wipe cart state on explicit logout
      clearCart();
      
      // Clear localStorage key directly if Zustand uses persist middleware
      localStorage.removeItem("cart-storage"); 
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within an AuthProvider');
  return context;
};