import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://qegprbrgcgholhhoqehs.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlZ3ByYnJnY2dob2xoaG9xZWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEyMDQ2NTAsImV4cCI6MjAzNjc4MDY1MH0.IL6--NanmcFtBHgv1_CsCeGd2pf10rpT1gYO4CS5y_Q";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
