import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jksbulqdrvksjvzdsign.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprc2J1bHFkcnZrc2p2emRzaWduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU2Nzg5MTgsImV4cCI6MjA1MTI1NDkxOH0.0GOsYqmEF5wAFJmYKVsKW0T9lxEDkIMTFyLF-_FBHYQ'

export const supabase = createClient(supabaseUrl, supabaseKey)
