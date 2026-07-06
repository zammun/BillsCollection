import { supabase } from '../supabase';

export const useAuth = () => {
  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) console.error("Google Login Error:", error.message);
  };

  const loginWithApple = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
    });
    if (error) console.error("Apple Login Error:", error.message);
  };

  return { loginWithGoogle, loginWithApple };
};