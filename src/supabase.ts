import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eyptnhfyvlewgpuzdcuj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5cHRuaGZ5dmxld2dwdXpkY3VqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMzNzEzMTYsImV4cCI6MjA5ODk0NzMxNn0.EIOg7nKmW5TpNvpeqibWhl_nGZStslSUEWJXgYnGSn4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)