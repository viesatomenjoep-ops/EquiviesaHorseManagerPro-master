-- ==========================================
-- EQUIVIESA HORSE MANAGER: MASTER SQL SCHEMA
-- ==========================================
-- Kopieer deze volledige code en plak het in de 'SQL Editor' van Supabase om je gehele database structuur in één keer aan te maken!

-- 1. TABEL: HORSES (Inclusief stamboom en scouting info van je plaatje)
CREATE TABLE IF NOT EXISTS horses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
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

-- 2. TABEL: TASKS (Voor je Kanban Bord)
CREATE TABLE IF NOT EXISTS tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  status TEXT DEFAULT 'todo',
  assignee TEXT,
  time TEXT,
  priority TEXT DEFAULT 'medium',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TABEL: AI INSIGHTS (Voor je AI Feed)
CREATE TABLE IF NOT EXISTS ai_insights (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT,
  message TEXT NOT NULL,
  timestamp TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. TABEL: IOT DEVICES (Voor je Sensor Tracker)
CREATE TABLE IF NOT EXISTS iot_devices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  horse TEXT NOT NULL,
  device TEXT NOT NULL,
  activity TEXT,
  duration TEXT,
  status TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- TEST DATA (Gebaseerd op de 'Luna' scouting afbeelding!)
-- ==========================================
INSERT INTO horses (
  name, sex, age, date_of_birth, 
  sire, dam, sire_sire, sire_dam, dam_sire, dam_dam,
  scout_name, scout_address, scout_phone, scout_email, scout_website
) VALUES (
  'Luna - Levisto x Balou du Rouet', 
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
