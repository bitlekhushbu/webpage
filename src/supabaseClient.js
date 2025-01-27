import { createClient } from '@supabase/supabase-js';

// Replace these placeholders with your actual Supabase project details
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://sqglrcjxixwiewxngibj.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZ2xyY2p4aXh3aWV3eG5naWJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3OTQyMzIsImV4cCI6MjA1MzM3MDIzMn0.JrgYyPuO3VwOkZfZXNuwPKH2oInogSYllszUPKrluMo';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('supabaseUrl and supabaseKey are required.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
