import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

// Get Supabase URL and anon key from environment variables
const supabaseUrl = 'https://xaphbjtylhoivdrupokz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhcGhianR5bGhvaXZkcnVwb2t6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NDkxNzIsImV4cCI6MjA2MjQyNTE3Mn0.RWoCAuE3-4ZWpTibw0BAyhzaoAILk59JfQumCBGarYk';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);