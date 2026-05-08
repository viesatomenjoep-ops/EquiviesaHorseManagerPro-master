-- ==========================================
-- BREEDING MODULE 3: FOAL REARING
-- ==========================================
-- Dit bestand bevat de geavanceerde database structuur voor veulen-opfok,
-- gezondheidsprotocollen (entingen, ontwormen) en registratie (chip/DNA).
-- ---------------------------------------------------------

-- 1. TABEL: FOAL REGISTRATION (Documenten & ID)
CREATE TABLE IF NOT EXISTS breeding_foal_registration (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  horse_id UUID REFERENCES horses(id) ON DELETE CASCADE, -- Het veulen
  chip_number TEXT,
  dna_kit_sent_date DATE,
  dna_result_received BOOLEAN DEFAULT false,
  studbook_registration_number TEXT,
  studbook TEXT, -- KWPN, Zangersheide, AES, etc.
  passport_received BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. TABEL: FOAL HEALTH PROTOCOLS (Opfok Gezondheid)
CREATE TABLE IF NOT EXISTS breeding_foal_protocols (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  horse_id UUID REFERENCES horses(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL, -- 'deworming', 'rhino_vaccine', 'tetanus_vaccine', 'farrier_first_check'
  scheduled_date DATE NOT NULL,
  completed_date DATE,
  administered_by TEXT,     -- Dierenarts of personeel
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TABEL: FOAL TRAINING LOGS (Opvoeding)
CREATE TABLE IF NOT EXISTS breeding_foal_training (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  horse_id UUID REFERENCES horses(id) ON DELETE CASCADE,
  training_type TEXT NOT NULL, -- 'halter_training', 'picking_up_feet', 'trailer_loading'
  status TEXT DEFAULT 'planned', -- 'planned', 'in_progress', 'completed'
  trainer_id UUID REFERENCES profiles(id),
  progress_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
