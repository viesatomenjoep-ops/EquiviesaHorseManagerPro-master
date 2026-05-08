-- Zorg dat de tabellen de juiste kolommen hebben
ALTER TABLE locations ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE locations ADD COLUMN IF NOT EXISTS capacity INTEGER;

ALTER TABLE horses 
  ADD COLUMN IF NOT EXISTS discipline TEXT,
  ADD COLUMN IF NOT EXISTS image_url TEXT,
  ADD COLUMN IF NOT EXISTS sex TEXT,
  ADD COLUMN IF NOT EXISTS age INTEGER,
  ADD COLUMN IF NOT EXISTS date_of_birth DATE,
  ADD COLUMN IF NOT EXISTS sire TEXT,
  ADD COLUMN IF NOT EXISTS dam TEXT,
  ADD COLUMN IF NOT EXISTS sire_sire TEXT, 
  ADD COLUMN IF NOT EXISTS sire_dam TEXT,  
  ADD COLUMN IF NOT EXISTS dam_sire TEXT,  
  ADD COLUMN IF NOT EXISTS dam_dam TEXT,   
  ADD COLUMN IF NOT EXISTS scout_name TEXT,
  ADD COLUMN IF NOT EXISTS scout_address TEXT,
  ADD COLUMN IF NOT EXISTS scout_phone TEXT,
  ADD COLUMN IF NOT EXISTS scout_email TEXT,
  ADD COLUMN IF NOT EXISTS scout_website TEXT;

-- Data invoegen
DO $$
DECLARE
    loc1_id UUID;
    loc2_id UUID;
    h_id UUID;
    i INT;
BEGIN
    INSERT INTO locations (name, type, address, capacity, image_url) 
    VALUES ('Wellington Dressage', 'Hoofdstal', 'Wellington, FL, USA', 11, 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')
    RETURNING id INTO loc1_id;

    INSERT INTO locations (name, type, address, capacity, image_url) 
    VALUES ('Wellington Jumpers', 'Hoofdstal', 'Wellington, FL, USA', 22, 'https://images.unsplash.com/photo-1534351659929-da76d1e43c68?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')
    RETURNING id INTO loc2_id;

    FOR i IN 1..11 LOOP
        INSERT INTO horses (name, discipline) VALUES ('Dressage Star ' || i, 'Dressuurpaard') RETURNING id INTO h_id;
        INSERT INTO boxes (location_id, horse_id, box_number, status) VALUES (loc1_id, h_id, 'D' || i, 'occupied');
    END LOOP;

    FOR i IN 1..22 LOOP
        INSERT INTO horses (name, discipline) VALUES ('Jumping Pro ' || i, 'Springpaard') RETURNING id INTO h_id;
        INSERT INTO boxes (location_id, horse_id, box_number, status) VALUES (loc2_id, h_id, 'J' || i, 'occupied');
    END LOOP;
END $$;
