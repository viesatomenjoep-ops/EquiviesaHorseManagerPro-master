-- EQUIVIESA HORSE MANAGER: SCHEDULES SCHEMA

-- 1. Tabel voor dagelijkse activiteiten / schema's per paard
CREATE TABLE IF NOT EXISTS horse_schedules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  horse_id UUID REFERENCES horses(id) ON DELETE CASCADE,
  location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
  activity_type TEXT NOT NULL, -- 'Weidegang', 'Rijden', 'Springen', 'Africhten', 'Stappenmolen', 'Lunchen'
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  notes TEXT,
  days_of_week TEXT[] DEFAULT '{"Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Mock data voor de EquiFirst stable of andere weide
-- Dit kan pas worden ingevuld nadat er horses zijn, of je voegt het in via de frontend.
