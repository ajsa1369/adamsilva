import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://bogmboxekgfufesegdar.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvZ21ib3hla2dmdWZlc2VnZGFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MjQ4NDUsImV4cCI6MjA2NzUwMDg0NX0.vtRFssTRLsMQRIDgJrbq6BlbJtVJSCYq7KNL8mQDWxQ";

// Create Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);