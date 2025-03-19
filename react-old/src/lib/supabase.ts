import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

// Use environment variables for Supabase connection
const supabaseUrl = 'https://jktrsmhifpytyeqgtxhp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprdHJzbWhpZnB5dHllcWd0eGhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwMjc3OTcsImV4cCI6MjA1NzYwMzc5N30.Il3RRm3JagTwlT6o_8p2SbWSZUVgJD_ZVJBsbBEzN0Y';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);