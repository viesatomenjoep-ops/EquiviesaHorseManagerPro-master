-- ==========================================
-- EQUIVIESA HORSE MANAGER: MASTER SQL SCHEMA (VOLLEDIGE ERP/SAAS VERSIE)
-- ==========================================
-- Kopieer deze volledige code en plak het in de 'SQL Editor' van Supabase om je gehele database structuur in één keer aan te maken!

-- ==========================================
-- ENUMS (Vaste categorieën voor dropdowns en strict rules)
-- ==========================================
CREATE TYPE care_category_type AS ENUM (
  'Clinical Agreements',
  'Parasite prevention',
  'Immunization',
  'Daily Well-being',
  'Medical Interventions',
  'Dental check-up',
  'Farrier & Shoeing'
);

CREATE TYPE task_status_type AS ENUM ('todo', 'in_progress', 'done');

CREATE TYPE competition_type AS ENUM (
  'National', 'International (CSI1*)', 'International (CSI2*)', 'International (CSI3*)', 
  'International (CSI4*)', 'International (CSI5*)', 'Grand Prix', 'Hunters', 'Jumpers', 'Equitation'
);

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

-- 2. TABEL: PROFILES (Equivest Base: Personeel, Eigenaren, Ruiters)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  role TEXT NOT NULL,         -- Bijv. Eigenaar, Ruiter, Groom, Admin, Manager
  employee_id TEXT,           -- Specifiek voor Equivest Base
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  hourly_rate DECIMAL(10, 2), -- Voor loonadministratie
  department TEXT,            -- Bijv. 'Stalpersoneel', 'Administratie', 'Sport'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TABEL: TASKS (Voor je Kanban Bord en algemene taken)
CREATE TABLE IF NOT EXISTS tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  horse_id UUID REFERENCES horses(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  status task_status_type DEFAULT 'todo',
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

-- 5. TABEL: DOCUMENTS & MEDIA (Cloudinary Uploads)
CREATE TABLE IF NOT EXISTS media_assets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  horse_id UUID REFERENCES horses(id) ON DELETE CASCADE,
  url TEXT NOT NULL,          -- Cloudinary URL
  file_name TEXT,
  file_type TEXT,             -- image/jpeg, video/mp4, application/pdf
  document_category TEXT,     -- Bijv. 'FEI Paspoort', 'HorseTelex', 'X-Ray', 'Video', 'Algemene Foto'
  description TEXT,
  uploaded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. TABEL: WEDSTRIJD (Wedstrijdresultaten en planning)
CREATE TABLE IF NOT EXISTS horse_competitions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  horse_id UUID REFERENCES horses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  date DATE NOT NULL,
  location TEXT,
  competition_category competition_type, -- FEI Stars, Hunters, Jumpers, etc.
  class_level TEXT,       -- Bijv. 1.40m, Grand Prix, Z2
  result INTEGER,         -- Plaatsing (bijv. 1e, 5e)
  faults INTEGER,         -- Strafpunten
  time DECIMAL(10, 2),    -- Tijd in seconden
  prize_money DECIMAL(10, 2),
  video_url TEXT,         -- Link naar rit op YouTube/Cloudinary
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6B. TABEL: ANALYTICS & STATS (HorseStats, FEI Punten, Winstsom)
CREATE TABLE IF NOT EXISTS analytics_horse_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  horse_id UUID REFERENCES horses(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  fei_points INTEGER DEFAULT 0,
  hunter_jumper_points INTEGER DEFAULT 0,
  total_prize_money DECIMAL(12, 2) DEFAULT 0,
  clear_rounds_percentage DECIMAL(5, 2) DEFAULT 0,
  ranking_national INTEGER,
  ranking_international INTEGER,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. TABEL: INVOICES & QUOTES (Facturen, Offertes en Orders)
CREATE TABLE IF NOT EXISTS invoices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES profiles(id),
  company_id UUID REFERENCES crm_companies(id), -- Kan ook aan een bedrijf gekoppeld zijn
  document_number TEXT UNIQUE NOT NULL, -- Factuur-, Offerte- of Ordernummer
  type TEXT DEFAULT 'invoice', -- 'quote' (offerte), 'order', 'invoice' (factuur)
  date DATE NOT NULL,
  due_date DATE,
  status TEXT DEFAULT 'concept', -- concept, sent, accepted, paid, overdue, cancelled
  subtotal DECIMAL(10, 2) DEFAULT 0,
  tax_amount DECIMAL(10, 2) DEFAULT 0,
  discount_amount DECIMAL(10, 2) DEFAULT 0,
  total_amount DECIMAL(10, 2) NOT NULL,
  notes TEXT,
  terms TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. TABEL: INVOICE ITEMS (Factuur/Offerte regels)
CREATE TABLE IF NOT EXISTS invoice_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
  product_id UUID, -- Optioneel gekoppeld aan de catalogus
  description TEXT NOT NULL,
  quantity DECIMAL(10, 2) NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  tax_rate DECIMAL(5, 2) DEFAULT 21.00, -- BTW percentage
  total_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8B. TABEL: DOCUMENT & INVOICE SHARES (Equiviesa Network & E-mail Log)
CREATE TABLE IF NOT EXISTS document_shares (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID,           -- Kan een invoice_id, horse_id, of media_id zijn
  document_type TEXT,         -- 'invoice', 'horse_profile', 'medical_record', 'xray'
  share_method TEXT NOT NULL, -- 'email', 'equiviesa_network', 'whatsapp'
  recipient_email TEXT,       -- Vul in bij email
  recipient_network_id TEXT,  -- Vul in bij Equiviesa Network (andere stal)
  status TEXT DEFAULT 'sent', -- 'sent', 'delivered', 'read', 'failed'
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. TABEL: PRODUCTS CATALOGUS (Handelspaarden, Diensten, Voer)
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- Bijv. 'Handelspaard', 'Voer', 'Dienst'
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER DEFAULT 0,
  
  -- Specifiek voor Paardenverkoop (Handelsstal)
  horse_id UUID REFERENCES horses(id) ON DELETE SET NULL, -- Koppel aan een specifiek paard
  breed TEXT,             -- Ras (bijv. KWPN, Zangersheide)
  origin_country TEXT,    -- Waar komt het paard vandaan?
  destination_country TEXT, -- Waar gaat het paard naartoe? (Export)
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9B. TABEL: HORSE SALES LOGISTICS (Export, Vluchten, X-Rays)
CREATE TABLE IF NOT EXISTS horse_sales_logistics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  
  -- Gezondheid & Documenten voor verkoop
  passport_number TEXT,
  xray_status TEXT,       -- Bijv. 'Goedgekeurd (Klasse 1)', 'Kleine opmerking'
  xray_document_url TEXT, -- Cloudinary link naar de röntgenfoto's
  vet_check_date DATE,
  vet_check_report TEXT,  -- Cloudinary link naar keuringsrapport
  
  -- Transport & Vluchtgegevens
  transport_company TEXT,
  flight_number TEXT,
  departure_date TIMESTAMP WITH TIME ZONE,
  arrival_date TIMESTAMP WITH TIME ZONE,
  export_papers_ready BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. TABEL: FOALS (Veulens / Fokkerij / Opfok)
CREATE TABLE IF NOT EXISTS foals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  mare_id UUID REFERENCES horses(id) ON DELETE CASCADE, -- Moeder
  sire_name TEXT NOT NULL, -- Vader
  name TEXT,
  date_of_birth DATE,
  sex TEXT,
  chip_number TEXT,
  registration_number TEXT, -- Stamboeknummer
  weaning_date DATE,        -- Geplande of daadwerkelijke speendatum
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
  record_type care_category_type NOT NULL,
  date DATE NOT NULL,
  veterinarian TEXT,
  cost DECIMAL(10, 2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 14. TABEL: VOEDINGSSCHEMA'S (Nutrition Plans)
CREATE TABLE IF NOT EXISTS horse_nutrition_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  horse_id UUID REFERENCES horses(id) ON DELETE CASCADE,
  feed_type TEXT NOT NULL,      -- Bijv. Ruwvoer, Krachtvoer, Supplementen
  amount_kg DECIMAL(5, 2),      -- Hoeveelheid per portie
  frequency TEXT NOT NULL,      -- Bijv. 3x per dag, Ochtend/Avond
  special_instructions TEXT,    -- Bijv. Nat maken voor het voeren
  start_date DATE NOT NULL,
  end_date DATE,                -- Kan leeg zijn als het doorlopend is
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 15. TABEL: UITGAVEN (Kosten per paard)
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
  insemination_type TEXT, -- 'fresh', 'frozen', 'natural', 'embryo_transfer'
  cycle_status TEXT,      -- 'in_heat', 'ovulated', 'pregnant', 'empty'
  scan_result TEXT,       -- Bijv. '18 dagen drachtig', 'Tweeling weggedrukt'
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

-- 19. TABEL: CARE EVENTS (Agenda / Zorgplanning)
CREATE TABLE IF NOT EXISTS care_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  horse_id UUID REFERENCES horses(id) ON DELETE CASCADE,
  category care_category_type NOT NULL, -- Gebruikt de vaste Care Enum
  title TEXT NOT NULL,    -- Bijv. 'Jaarlijkse Enting'
  date DATE NOT NULL,
  status TEXT DEFAULT 'gepland', -- gepland, voltooid, geannuleerd
  provider TEXT,          -- Naam van de smid of dierenarts
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- NIEUWE MODULES: ADMINISTRATIE & CRM
-- ==========================================

-- 20. TABEL: CRM COMPANIES (Bedrijven / Relaties)
CREATE TABLE IF NOT EXISTS crm_companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- Klant, Dierenarts, Hoefsmid, Leverancier, Sponsor
  vat_number TEXT,    -- BTW Nummer
  kvk_number TEXT,    -- KvK Nummer
  iban TEXT,          -- Bankrekeningnummer
  address TEXT,
  city TEXT,
  postal_code TEXT,
  country TEXT,
  billing_address TEXT,
  website TEXT,
  general_email TEXT,
  general_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 21. TABEL: CRM CONTACTS (Contactpersonen)
CREATE TABLE IF NOT EXISTS crm_contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES crm_companies(id) ON DELETE SET NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  mobile TEXT,
  role TEXT,          -- Bijv. Eigenaar, Groom, Accountmanager
  birthday DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- NIEUWE MODULES: FOKKERIJ (Uitbreiding)
-- ==========================================

-- 22. TABEL: EMBRYOS (Embryo Tracking)
CREATE TABLE IF NOT EXISTS breeding_embryos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  mare_id UUID REFERENCES horses(id) ON DELETE CASCADE, -- Biologische Moeder
  sire_name TEXT NOT NULL, -- Biologische Vader
  recipient_mare TEXT, -- Draagmoeder (indien van toepassing)
  flush_date DATE,
  transfer_date DATE,
  status TEXT DEFAULT 'frozen', -- frozen, transferred, lost, born
  storage_location TEXT, -- Waar is het embryo opgeslagen?
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- NIEUWE MODULES: STALLENBEHEER & B2B DATA SYNC
-- ==========================================

-- 23. TABEL: LOCATIONS (Stallen / Locaties)
CREATE TABLE IF NOT EXISTS locations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,         -- Hoofdstal, Pensionstal, Weide, Quarantainestal
  ownership_type TEXT DEFAULT 'internal', -- 'internal' (Eigen Stal) of 'external' (Stal van iemand anders)
  
  -- B2B SaaS Data Exchange (Equiviesa Network)
  equiviesa_network_id TEXT,  -- Unieke credentials/ID van de externe partij als zij ook Equiviesa Pro gebruiken
  sync_enabled BOOLEAN DEFAULT false, -- Mogen we medische/paspoort data delen met deze locatie?
  
  address TEXT,
  capacity INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 24. TABEL: BOXES (Boxen in een locatie)
CREATE TABLE IF NOT EXISTS boxes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
  horse_id UUID REFERENCES horses(id) ON DELETE SET NULL, -- Wie staat er nu in?
  box_number TEXT NOT NULL,
  status TEXT DEFAULT 'available', -- available, occupied, maintenance
  price_per_month DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- NIEUWE MODULES: EQUIVEST BASE (Personeel & HR)
-- ==========================================

-- 25. TABEL: EQUIVEST BASE SHIFTS (Inklokken / Uitklokken)
CREATE TABLE IF NOT EXISTS equivest_base_shifts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  staff_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  location_id UUID REFERENCES locations(id),
  clock_in TIMESTAMP WITH TIME ZONE NOT NULL,
  clock_out TIMESTAMP WITH TIME ZONE,
  break_minutes INTEGER DEFAULT 0,
  total_hours DECIMAL(5, 2),
  status TEXT DEFAULT 'active', -- 'active', 'completed', 'approved'
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 26. TABEL: EQUIVEST BASE TIME OFF (Vakanties & Ziekte)
CREATE TABLE IF NOT EXISTS equivest_base_time_off (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  staff_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,           -- 'vacation', 'sick_leave', 'unpaid_leave'
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  manager_id UUID REFERENCES profiles(id),
  reason TEXT,
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
