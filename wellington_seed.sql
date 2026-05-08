-- Grant permissies voor frontend
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO anon;

-- Voeg image_url toe als deze nog niet bestaat
ALTER TABLE locations ADD COLUMN IF NOT EXISTS image_url TEXT;

DO $$
DECLARE
    loc1_id UUID;
    loc2_id UUID;
    horse_id UUID;
    box_id UUID;
    i INT;
BEGIN
    -- 1. Maak Wellington Dressage aan
    INSERT INTO locations (name, type, address, capacity, image_url) 
    VALUES (
        'Wellington Dressage', 
        'Hoofdstal', 
        'Wellington, FL, USA', 
        11, 
        'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    )
    RETURNING id INTO loc1_id;

    -- 2. Maak Wellington Jumpers aan
    INSERT INTO locations (name, type, address, capacity, image_url) 
    VALUES (
        'Wellington Jumpers', 
        'Hoofdstal', 
        'Wellington, FL, USA', 
        22,
        'https://images.unsplash.com/photo-1534351659929-da76d1e43c68?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    )
    RETURNING id INTO loc2_id;

    -- 3. Voeg 11 Dressuurpaarden toe en zet in boxen
    FOR i IN 1..11 LOOP
        INSERT INTO horses (name, discipline) VALUES ('Dressage Star ' || i, 'Dressuurpaard') RETURNING id INTO horse_id;
        INSERT INTO boxes (location_id, horse_id, box_number, status) VALUES (loc1_id, horse_id, 'D' || i, 'occupied');
    END LOOP;

    -- 4. Voeg 22 Springpaarden toe en zet in boxen
    FOR i IN 1..22 LOOP
        INSERT INTO horses (name, discipline) VALUES ('Jumping Pro ' || i, 'Springpaard') RETURNING id INTO horse_id;
        INSERT INTO boxes (location_id, horse_id, box_number, status) VALUES (loc2_id, horse_id, 'J' || i, 'occupied');
    END LOOP;

END $$;
