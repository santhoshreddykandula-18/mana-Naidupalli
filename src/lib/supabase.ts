import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to handle Supabase errors
export const handleSupabaseError = (error: Error | null): string => {
  if (!error) return '';
  console.error('Supabase error:', error);
  return error.message || 'An unexpected error occurred';
};