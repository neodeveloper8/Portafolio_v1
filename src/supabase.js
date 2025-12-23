import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder'

// Simplemente exportamos el cliente. Si las variables no existen, no lanzará error crítico.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)