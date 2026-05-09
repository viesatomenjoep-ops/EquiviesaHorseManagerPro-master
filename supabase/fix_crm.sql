-- 1. Controleer of de tabellen bestaan en zet Row Level Security (RLS) uit
-- Zodat de applicatie (via de anonieme client) data kan wegschrijven en lezen.

ALTER TABLE IF EXISTS crm_companies DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS crm_contacts DISABLE ROW LEVEL SECURITY;

-- 2. Zorg dat de API rollen de juiste permissies hebben
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
