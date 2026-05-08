-- ==========================================
-- BREEDING MODULE 2: EMBRYO TRACKING
-- ==========================================
-- Dit bestand bevat de geavanceerde database structuur voor embryo spoelingen,
-- vriesopslag (ICSI), en transfers naar draagmerries (Recipient Mares).
-- ---------------------------------------------------------

CREATE TYPE embryo_status AS ENUM ('frozen', 'transferred', 'lost', 'born', 'sold');
CREATE TYPE embryo_quality AS ENUM ('Grade 1', 'Grade 2', 'Grade 3', 'Grade 4');

-- 1. TABEL: EMBRYO FLUSHES (Spoelingen)
CREATE TABLE IF NOT EXISTS breeding_embryo_flushes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  mare_id UUID REFERENCES horses(id) ON DELETE CASCADE, -- Biologische Moeder
  sire_name TEXT NOT NULL,                              -- Biologische Vader
  flush_date DATE NOT NULL,
  veterinarian_id UUID REFERENCES profiles(id),
  embryos_recovered INTEGER DEFAULT 0,
  flush_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. TABEL: EMBRYOS & STORAGE (Het daadwerkelijke embryo)
CREATE TABLE IF NOT EXISTS breeding_embryos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  flush_id UUID REFERENCES breeding_embryo_flushes(id) ON DELETE SET NULL,
  mare_id UUID REFERENCES horses(id), -- Moeder (voor ICSI direct gekoppeld)
  sire_name TEXT NOT NULL,            -- Vader
  creation_method TEXT DEFAULT 'ET',  -- 'ET' of 'ICSI'
  quality embryo_quality,
  status embryo_status DEFAULT 'frozen',
  
  -- Storage Data (Vrieskist)
  storage_facility TEXT,    -- Waar staat de vrieskist?
  nitrogen_tank TEXT,       -- Vat nummer
  canister_number TEXT,     -- Canister
  straw_color TEXT,         -- Rietjes kleur
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TABEL: EMBRYO TRANSFERS (Inplanten)
CREATE TABLE IF NOT EXISTS breeding_embryo_transfers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  embryo_id UUID REFERENCES breeding_embryos(id) ON DELETE CASCADE,
  recipient_mare_name TEXT NOT NULL, -- Naam of chip van draagmerrie
  transfer_date DATE NOT NULL,
  veterinarian_id UUID REFERENCES profiles(id),
  
  -- Scans van de draagmerrie
  scan_18_days_pregnant BOOLEAN,
  scan_40_days_pregnant BOOLEAN,
  expected_due_date DATE,
  
  -- Magic Link Functie: Update-link voor het opfokbedrijf
  magic_link_token UUID DEFAULT gen_random_uuid() UNIQUE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
