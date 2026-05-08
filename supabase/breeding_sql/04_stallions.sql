-- ==========================================
-- BREEDING MODULE 4: STALLION SELECTION & SPERM
-- ==========================================
-- Dit bestand bevat de geavanceerde database structuur voor dekhengsten,
-- sperma-winning (collections), kwaliteitsscores en logistiek.
-- ---------------------------------------------------------

-- 1. TABEL: STALLION COLLECTIONS (Sperma Winning)
CREATE TABLE IF NOT EXISTS breeding_stallion_collections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stallion_id UUID REFERENCES horses(id) ON DELETE CASCADE,
  collection_date TIMESTAMP WITH TIME ZONE NOT NULL,
  
  -- Kwaliteitscontrole
  volume_ml DECIMAL(5, 2),
  motility_percentage INTEGER,     -- Beweeglijkheid (%)
  concentration_mil_ml DECIMAL(8, 2), -- Concentratie in miljoenen/ml
  
  -- Resultaat
  straws_produced INTEGER,         -- Aantal rietjes gemaakt (indien diepvries)
  collection_type TEXT,            -- 'fresh', 'frozen'
  veterinarian_id UUID REFERENCES profiles(id),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. TABEL: SEMEN SHIPPING (Logistiek & Export Sperma)
CREATE TABLE IF NOT EXISTS breeding_semen_shipping (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  collection_id UUID REFERENCES breeding_stallion_collections(id) ON DELETE SET NULL,
  recipient_mare_owner TEXT NOT NULL, -- Klant
  destination_address TEXT NOT NULL,
  shipping_date DATE NOT NULL,
  courier_company TEXT,               -- FedEx, DHL, Hippoxpress
  tracking_number TEXT,
  shipping_status TEXT DEFAULT 'in_transit', -- 'in_transit', 'delivered', 'failed'
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TABEL: STUD FEES (Dekgelden & Gust regelingen)
CREATE TABLE IF NOT EXISTS breeding_stud_fees (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stallion_id UUID REFERENCES horses(id) ON DELETE CASCADE,
  season_year INTEGER NOT NULL,
  price_fresh DECIMAL(10, 2),
  price_frozen DECIMAL(10, 2),
  pregnancy_fee DECIMAL(10, 2),       -- Drachtigheidstoeslag
  gust_arrangement TEXT,              -- Wat gebeurt er als de merrie niet drachtig wordt?
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
