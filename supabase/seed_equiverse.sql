-- 1. Verwijder Jumping Pro en Dressage Star paarden (reeds gedaan via script, maar voor de zekerheid)
DELETE FROM horses WHERE name ILIKE '%Jumping Pro%' OR name ILIKE '%Dressage Star%';

-- 2. Voeg EquiVerse Stable toe met 11 paarden en 11 boxen
DO $$
DECLARE
    loc_id UUID;
    h_id UUID;
    i INT;
BEGIN
    -- Verwijder eventuele oude EquiVerse Stable om dubbelingen te voorkomen
    DELETE FROM locations WHERE name = 'EquiVerse Stable';

    -- Maak de nieuwe stal aan
    INSERT INTO locations (name, type, address, capacity, image_url) 
    VALUES ('EquiVerse Stable', 'Hoofdstal', 'Wellington, FL', 20, 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')
    RETURNING id INTO loc_id;

    -- Voeg 11 paarden en 11 boxen toe
    FOR i IN 1..11 LOOP
        INSERT INTO horses (name, discipline, sex, age) 
        VALUES ('EquiVerse Star ' || i, 'Springpaard', 'Mare', 7) 
        RETURNING id INTO h_id;

        INSERT INTO boxes (location_id, horse_id, box_number, status) 
        VALUES (loc_id, h_id, 'B' || i, 'occupied');
    END LOOP;
END $$;
