import { supabase } from './supabase';

export interface AuthError {
  message: string;
}

// ... existing code ...
export async function signUp(email: string, password: string): Promise<{ data: { user: User | null }, error: AuthError | null }> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
  
    return { data: { user: data?.user ?? null }, error: error ? { message: error.message } : null };
  }
  
  export async function signIn(email: string, password: string): Promise<{ data: { user: User | null }, error: AuthError | null }> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  
    return { data: { user: data?.user ?? null }, error: error ? { message: error.message } : null };
  }
  // ... existing code ...

export async function signOut(): Promise<{ error: AuthError | null }> {
  const { error } = await supabase.auth.signOut();
  return { error: error ? { message: error.message } : null };
}

export async function resetPassword(email: string): Promise<{ error: AuthError | null }> {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  return { error: error ? { message: error.message } : null };
}

export const getCurrentUser = async (): Promise<{ data: { user: User | null }, error: Error | null }> => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { data: { user }, error };
  } catch (error) {
    return { data: { user: null }, error: error as Error };
  }
};