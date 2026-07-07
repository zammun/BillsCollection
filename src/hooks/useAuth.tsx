import { supabase } from '../supabase';

export const useAuth = () => {
  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) console.error("Google Login Error:", error.message);
  };

  // Upgraded to accept a username
  const registerWithEmail = async (email: string, password: string, username: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: username, // We save it as full_name so your Navbar instantly picks it up
        }
      }
    });
    if (error) throw error;
    return data;
  };

  const loginWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  return { loginWithGoogle, registerWithEmail, loginWithEmail };
};