-- EQUIVIESA HORSE MANAGER: MEDIA ASSETS SCHEMA

CREATE TABLE IF NOT EXISTS media_assets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  type TEXT DEFAULT 'document', -- 'image' of 'document' etc.
  category TEXT DEFAULT 'general',
  title TEXT,
  horse_id UUID REFERENCES horses(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
