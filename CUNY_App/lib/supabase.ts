import { createClient } from "@supabase/supabase-js"
const supabaseURL = process.env.EXPO_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON!

export const supabase = createClient('https://njipyitavoocibsqvuhz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qaXB5aXRhdm9vY2lic3F2dWh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQyNTgzOTksImV4cCI6MjAzOTgzNDM5OX0.HVjMmJa19Ko7sMtj56iFLTtIGNLOEvC8ikzykvG-Bx4')