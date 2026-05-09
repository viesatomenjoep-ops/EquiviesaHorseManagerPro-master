-- EQUIVIESA HORSE MANAGER: FEEDING & INVENTORY SCHEMA

-- 1. Tabel voor alle voerproducten en supplementen
CREATE TABLE IF NOT EXISTS feed_products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT,
  category TEXT DEFAULT 'feed', -- 'feed', 'supplement', 'roughage', 'mash'
  stock_quantity DECIMAL(10,2) DEFAULT 0,
  unit TEXT DEFAULT 'kg',
  min_stock_warning DECIMAL(10,2) DEFAULT 20,
  source_url TEXT, -- Bijvoorbeeld de Agradi link
  ingredients TEXT,
  price DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabel voor het voerschema per paard
CREATE TABLE IF NOT EXISTS horse_rations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  horse_id UUID REFERENCES horses(id) ON DELETE CASCADE,
  product_id UUID REFERENCES feed_products(id) ON DELETE CASCADE,
  quantity DECIMAL(10,2) NOT NULL,
  time_of_day TEXT, -- 'morning', 'afternoon', 'evening', 'continuous'
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Invoegen van test/basis producten
INSERT INTO feed_products (name, brand, category, stock_quantity, unit, min_stock_warning) VALUES
('SportsFit', 'Pavo', 'feed', 45, 'kg', 50),
('Draversbrok', 'Havens', 'feed', 120, 'kg', 50),
('Eerste Snee', 'Hooi', 'roughage', 800, 'kg', 200),
('Lucerne', 'Hartog', 'roughage', 15, 'kg', 20);
