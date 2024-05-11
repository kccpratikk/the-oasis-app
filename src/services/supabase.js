import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://fyyonqwhaellnyufhjhy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5eW9ucXdoYWVsbG55dWZoamh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM2OTYzMzEsImV4cCI6MjAyOTI3MjMzMX0.qfSfgOc9K9SGqtPURiHjQEJgERK_5j04Yil84I_wF8g";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
