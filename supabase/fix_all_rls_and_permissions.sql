-- ==========================================
-- EQUIVIESA HORSE MANAGER: FIX ALL RLS EN PERMISSIONS
-- ==========================================
-- Kopieer deze volledige code en plak het in de 'SQL Editor' van Supabase.
-- Dit script zal:
-- 1. Row Level Security (RLS) uitschakelen voor ALLE tabellen in de database.
-- 2. Volledige lees/schrijf rechten geven aan de 'anon' (anonieme) rol.
-- Hierdoor kan de frontend app zonder inloggen alle data benaderen en aanpassen.

DO $$
DECLARE
    r RECORD;
BEGIN
    -- Loop door alle tabellen in het public schema
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        -- Schakel RLS uit voor elke tabel
        EXECUTE 'ALTER TABLE public.' || quote_ident(r.tablename) || ' DISABLE ROW LEVEL SECURITY';
    END LOOP;
END $$;

-- Geef alle rollen volledige permissies in het public schema
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;

GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO service_role;
