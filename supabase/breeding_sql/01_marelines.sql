-- ==========================================
-- BREEDING MODULE 1: MARE LINES & CYCLES
-- ==========================================
-- Dit bestand bevat de geavanceerde database structuur voor het monitoren van de cyclus,
-- dierenarts scans, en hormoonbehandelingen van fokmerries.
-- ---------------------------------------------------------

-- 1. ENUMS voor strikte data-integriteit
CREATE TYPE mare_cycle_status AS ENUM ('in_heat', 'ovulating', 'pregnant', 'empty', 'reabsorbing');
CREATE TYPE treatment_type AS ENUM ('oxytocin', 'pg', 'antibiotics', 'flush', 'other');

-- 2. TABEL: MARE CYCLES (Cyclus Monitoring)
CREATE TABLE IF NOT EXISTS breeding_mare_cycles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  horse_id UUID REFERENCES horses(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  status mare_cycle_status DEFAULT 'in_heat',
  behavior_notes TEXT, -- Bijv. "Hengstigheid duidelijk zichtbaar"
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TABEL: MARE SCANS (Dierenarts Scans & Follikel metingen)
CREATE TABLE IF NOT EXISTS breeding_mare_scans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cycle_id UUID REFERENCES breeding_mare_cycles(id) ON DELETE CASCADE,
  scan_date TIMESTAMP WITH TIME ZONE NOT NULL,
  veterinarian_id UUID REFERENCES profiles(id), -- De dierenarts die scant
  follicle_size_left_mm DECIMAL(5,2),  -- Follikelgrootte linker eierstok
  follicle_size_right_mm DECIMAL(5,2), -- Follikelgrootte rechter eierstok
  uterus_fluid BOOLEAN DEFAULT false,  -- Is er vocht in de baarmoeder?
  uterine_edema_score INTEGER,         -- Bijv. score 0 t/m 3
  vet_notes TEXT,
  next_scan_due TIMESTAMP WITH TIME ZONE, -- Wanneer moet de dierenarts terugkomen?
  
  -- Magic Link Functie: Geheime URL voor de dierenarts
  magic_link_token UUID DEFAULT gen_random_uuid() UNIQUE,
  magic_link_expires_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. TABEL: MARE TREATMENTS (Hormoonbehandelingen)
CREATE TABLE IF NOT EXISTS breeding_mare_treatments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cycle_id UUID REFERENCES breeding_mare_cycles(id) ON DELETE CASCADE,
  treatment treatment_type NOT NULL,
  dosage TEXT,
  administered_by UUID REFERENCES profiles(id),
  administration_date TIMESTAMP WITH TIME ZONE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
