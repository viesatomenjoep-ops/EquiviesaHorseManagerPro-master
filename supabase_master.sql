-- ==========================================
-- EQUIVIESA HORSE MANAGER: MASTER SQL SCHEMA (VOLLEDIGE ERP/SAAS VERSIE)
-- ==========================================
-- Kopieer deze volledige code en plak het in de 'SQL Editor' van Supabase om je gehele database structuur in één keer aan te maken!

-- 1. TABEL: HORSES (Inclusief stamboom, scouting info, discipline en foto)
CREATE TABLE IF NOT EXISTS horses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  discipline TEXT, -- Bijv. Springpaard, Dressuurpaard
  image_url TEXT,
  sex TEXT,
  age INTEGER,
  date_of_birth DATE,
  
  -- Pedigree (Stamboom)
  sire TEXT,
  dam TEXT,
  sire_sire TEXT, 
  sire_dam TEXT,  
  dam_sire TEXT,  
  dam_dam TEXT,   
  
  -- Scouting/Eigenaar Info
  scout_name TEXT,
  scout_address TEXT,
  scout_phone TEXT,
  scout_email TEXT,
  scout_website TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. TABEL: PROFILES (Profielen: Eigenaren, ruiters, medewerkers)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  role TEXT NOT NULL, -- Bijv. Eigenaar, Ruiter, Groom, Admin
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TABEL: TASKS (Voor je Kanban Bord en algemene taken)
CREATE TABLE IF NOT EXISTS tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  horse_id UUID REFERENCES horses(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  status TEXT DEFAULT 'todo',
  time TEXT,
  priority TEXT DEFAULT 'medium',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. TABEL: DIARY (Dagboek)
CREATE TABLE IF NOT EXISTS diary_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  horse_id UUID REFERENCES horses(id) ON DELETE CASCADE,
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. TABEL: MEDIA (Foto's en video's via Cloudinary)
CREATE TABLE IF NOT EXISTS media_assets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  horse_id UUID REFERENCES horses(id) ON DELETE CASCADE,
  url TEXT NOT NULL, -- Cloudinary URL
  type TEXT, -- image of video
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. TABEL: WEDSTRIJD (Wedstrijdresultaten en planning)
CREATE TABLE IF NOT EXISTS horse_competitions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  horse_id UUID REFERENCES horses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  date DATE NOT NULL,
  location TEXT,
  result TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. TABEL: INVOICES (Facturatie)
CREATE TABLE IF NOT EXISTS invoices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES profiles(id),
  invoice_number TEXT UNIQUE NOT NULL,
  date DATE NOT NULL,
  due_date DATE NOT NULL,
  status TEXT DEFAULT 'concept', -- concept, sent, paid, overdue
  total_amount DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. TABEL: INVOICE ITEMS (Factuurregels)
CREATE TABLE IF NOT EXISTS invoice_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity DECIMAL(10, 2) NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. TABEL: PRODUCTS (Producten)
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- Voer, Supplementen, Diensten
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. TABEL: FOALS (Veulens / Fokkerij / Welpoosten)
CREATE TABLE IF NOT EXISTS foals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  mare_id UUID REFERENCES horses(id) ON DELETE CASCADE, -- Moeder
  sire_name TEXT NOT NULL, -- Vader
  name TEXT,
  date_of_birth DATE,
  sex TEXT,
  image_url TEXT, -- Cloudinary upload voor veulen
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. TABEL: SETTINGS (Instellingen)
CREATE TABLE IF NOT EXISTS settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. TABEL: TRAINING (Voor trainingslogboeken)
CREATE TABLE IF NOT EXISTS horse_training (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  horse_id UUID REFERENCES horses(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  date DATE NOT NULL,
  duration INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 13. TABEL: GEZONDHEID (Dierenarts, vaccinaties, smid)
CREATE TABLE IF NOT EXISTS horse_health (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  horse_id UUID REFERENCES horses(id) ON DELETE CASCADE,
  record_type TEXT NOT NULL,
  date DATE NOT NULL,
  veterinarian TEXT,
  cost DECIMAL(10, 2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 14. TABEL: UITGAVEN (Kosten per paard)
CREATE TABLE IF NOT EXISTS horse_expenses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  horse_id UUID REFERENCES horses(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  date DATE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 15. TABEL: HENGST (Dekkingsinformatie)
CREATE TABLE IF NOT EXISTS breeding_stallion (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  horse_id UUID REFERENCES horses(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  mare_name TEXT NOT NULL,
  location TEXT,
  status TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 16. TABEL: MERRIE (Cyclus en drachtinformatie)
CREATE TABLE IF NOT EXISTS breeding_mare (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  horse_id UUID REFERENCES horses(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  stallion_name TEXT NOT NULL,
  scan_result TEXT,
  due_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 17. TABEL: AI INSIGHTS (Voor je AI Feed)
CREATE TABLE IF NOT EXISTS ai_insights (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT,
  message TEXT NOT NULL,
  timestamp TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 18. TABEL: IOT DEVICES (Voor je Sensor Tracker)
CREATE TABLE IF NOT EXISTS iot_devices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  horse_id UUID REFERENCES horses(id) ON DELETE CASCADE,
  device TEXT NOT NULL,
  activity TEXT,
  duration TEXT,
  status TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- TEST DATA
-- ==========================================
INSERT INTO horses (
  name, discipline, sex, age, date_of_birth, 
  sire, dam, sire_sire, sire_dam, dam_sire, dam_dam,
  scout_name, scout_address, scout_phone, scout_email, scout_website
) VALUES (
  'Luna - Levisto x Balou du Rouet', 
  'Springpaard',
  'Mare', 
  5, 
  '2021-06-30',
  'Levisto', 'Balou N', 'Leandro', 'Hirtin', 'Balou du Rouet', 'F',
  'Horse Scouting by Patrick Döller', 
  'Endel 61, 49429 Visbek, Germany', 
  '+491705453841', 
  'expose@horsescouting.com', 
  'https://horsescouting.com/'
);
