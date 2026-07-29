import { create } from 'zustand';
import { supabase } from '../lib/supabase';

const useAuthStore = create((set) => ({
  session: null,
  user: null,
  isLoading: true,
  
  initialize: () => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      set({ session, user: session?.user ?? null, isLoading: false });
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      set({ session, user: session?.user ?? null });
    });

    return () => subscription.unsubscribe();
  },

  updateProfilePicture: async (url) => {
    const { data, error } = await supabase.auth.updateUser({
      data: { avatar_url: url }
    });
    
    if (!error && data?.user) {
      set({ user: data.user });
    }
    
    return { data, error };
  }
}));

export default useAuthStore;
