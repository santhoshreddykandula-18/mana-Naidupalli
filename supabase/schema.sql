-- ============================================
-- MANA NAIDUPALLI - SUPABASE DATABASE SCHEMA
-- ============================================
-- Run this in Supabase SQL Editor to set up all tables, RLS policies, and storage buckets

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ANNOUNCEMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  category TEXT NOT NULL,
  author TEXT NOT NULL,
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for announcements
CREATE INDEX IF NOT EXISTS idx_announcements_status_date ON announcements(status, date DESC);
CREATE INDEX IF NOT EXISTS idx_announcements_category ON announcements(category);

-- RLS for announcements
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Public can read published announcements
CREATE POLICY "Public read published announcements" ON announcements
  FOR SELECT USING (status = 'published');

-- Admins can do everything (using a custom claim or service role)
CREATE POLICY "Admin full access announcements" ON announcements
  FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin' OR
    auth.jwt() ->> 'email' = 'admin@mana-naidupalli.in'
  );

-- ============================================
-- EVENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  organizer TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_status_date ON events(status, date DESC);
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published events" ON events
  FOR SELECT USING (status = 'published');

CREATE POLICY "Admin full access events" ON events
  FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin' OR
    auth.jwt() ->> 'email' = 'admin@mana-naidupalli.in'
  );

-- ============================================
-- TEMPLES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS temples (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  deity TEXT NOT NULL,
  description TEXT NOT NULL,
  timings TEXT NOT NULL,
  festival TEXT NOT NULL,
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_temples_status_name ON temples(status, name);

ALTER TABLE temples ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published temples" ON temples
  FOR SELECT USING (status = 'published');

CREATE POLICY "Admin full access temples" ON temples
  FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin' OR
    auth.jwt() ->> 'email' = 'admin@mana-naidupalli.in'
  );

-- ============================================
-- MATCHES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teams TEXT[] NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  ground TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'live', 'completed')),
  score TEXT,
  winner TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_matches_date ON matches(date DESC);
CREATE INDEX IF NOT EXISTS idx_matches_status ON matches(status);

ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read matches" ON matches
  FOR SELECT USING (true);

CREATE POLICY "Admin full access matches" ON matches
  FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin' OR
    auth.jwt() ->> 'email' = 'admin@mana-naidupalli.in'
  );

-- ============================================
-- CRICKET TEAMS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS cricket_teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  captain TEXT NOT NULL,
  players INTEGER NOT NULL DEFAULT 11,
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cricket_teams_name ON cricket_teams(name);

ALTER TABLE cricket_teams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read cricket teams" ON cricket_teams
  FOR SELECT USING (true);

CREATE POLICY "Admin full access cricket teams" ON cricket_teams
  FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin' OR
    auth.jwt() ->> 'email' = 'admin@mana-naidupalli.in'
  );

-- ============================================
-- AGRICULTURE POSTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS agriculture_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  season TEXT NOT NULL,
  water_requirement TEXT NOT NULL,
  common_diseases TEXT NOT NULL,
  tips TEXT NOT NULL,
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_agriculture_status_date ON agriculture_posts(status, created_at DESC);

ALTER TABLE agriculture_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published agriculture" ON agriculture_posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Admin full access agriculture" ON agriculture_posts
  FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin' OR
    auth.jwt() ->> 'email' = 'admin@mana-naidupalli.in'
  );

-- ============================================
-- GALLERY ITEMS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS gallery_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_gallery_status_date ON gallery_items(status, date DESC);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_items(category);

ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published gallery" ON gallery_items
  FOR SELECT USING (status = 'published');

CREATE POLICY "Admin full access gallery" ON gallery_items
  FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin' OR
    auth.jwt() ->> 'email' = 'admin@mana-naidupalli.in'
  );

-- ============================================
-- SRI RAM YOUTH TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS sri_ram_youth (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('photo', 'video', 'event', 'highlight')),
  media_url TEXT NOT NULL,
  thumbnail_url TEXT,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  category TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sri_ram_youth_status_date ON sri_ram_youth(status, date DESC);
CREATE INDEX IF NOT EXISTS idx_sri_ram_youth_type ON sri_ram_youth(type);

ALTER TABLE sri_ram_youth ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published sri_ram_youth" ON sri_ram_youth
  FOR SELECT USING (status = 'published');

CREATE POLICY "Admin full access sri_ram_youth" ON sri_ram_youth
  FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin' OR
    auth.jwt() ->> 'email' = 'admin@mana-naidupalli.in'
  );

-- ============================================
-- GOVERNMENT SERVICES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS government_services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_name TEXT NOT NULL,
  short_description TEXT NOT NULL,
  link TEXT NOT NULL,
  icon TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_gov_status_name ON government_services(status, service_name);

ALTER TABLE government_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read government services" ON government_services
  FOR SELECT USING (status = 'published');

CREATE POLICY "Admin full access government services" ON government_services
  FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin' OR
    auth.jwt() ->> 'email' = 'admin@mana-naidupalli.in'
  );

-- ============================================
-- NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('announcement', 'event', 'emergency', 'general')),
  target_audience TEXT NOT NULL DEFAULT 'all' CHECK (target_audience IN ('all', 'subscribers')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'scheduled')),
  scheduled_for TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_status_created ON notifications(status, created_at DESC);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin full access notifications" ON notifications
  FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin' OR
    auth.jwt() ->> 'email' = 'admin@mana-naidupalli.in'
  );

-- ============================================
-- STORAGE BUCKETS
-- ============================================
-- Create storage buckets for image uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('announcements', 'announcements', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('events', 'events', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('temples', 'temples', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('cricket', 'cricket', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('agriculture', 'agriculture', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('gallery', 'gallery', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('sri-ram-youth', 'sri-ram-youth', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm']),
  ('government', 'government', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
ON CONFLICT (id) DO NOTHING;

-- Storage policies - Public read access for all buckets
CREATE POLICY "Public read announcements" ON storage.objects
  FOR SELECT USING (bucket_id = 'announcements');

CREATE POLICY "Admin write announcements" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'announcements' AND
    (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'email' = 'admin@mana-naidupalli.in')
  );

CREATE POLICY "Admin update announcements" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'announcements' AND
    (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'email' = 'admin@mana-naidupalli.in')
  );

CREATE POLICY "Admin delete announcements" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'announcements' AND
    (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'email' = 'admin@mana-naidupalli.in')
  );

-- Repeat for other buckets (events, temples, cricket, agriculture, gallery, sri-ram-youth, government)
-- Note: In production, you'd create these policies for each bucket programmatically
-- For brevity, here's the pattern for events:
CREATE POLICY "Public read events" ON storage.objects
  FOR SELECT USING (bucket_id = 'events');

CREATE POLICY "Admin write events" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'events' AND
    (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'email' = 'admin@mana-naidupalli.in')
  );

-- Apply similar policies for: temples, cricket, agriculture, gallery, sri-ram-youth, government

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON announcements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_temples_updated_at BEFORE UPDATE ON temples
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_matches_updated_at BEFORE UPDATE ON matches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cricket_teams_updated_at BEFORE UPDATE ON cricket_teams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agriculture_posts_updated_at BEFORE UPDATE ON agriculture_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_items_updated_at BEFORE UPDATE ON gallery_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sri_ram_youth_updated_at BEFORE UPDATE ON sri_ram_youth
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_government_services_updated_at BEFORE UPDATE ON government_services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notifications_updated_at BEFORE UPDATE ON notifications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SEED DATA (Optional - run after tables created)
-- ============================================
-- INSERT INTO government_services (service_name, short_description, link, icon, status) VALUES
-- ('AP State Government', 'Official Andhra Pradesh Government information and services', 'https://ap.gov.in', 'landmark', 'published'),
-- ('SPSR Nellore District', 'District administration and public information', 'https://spsrnellore.nic.in', 'building-2', 'published'),
-- ('AP Seva', 'Citizen services and applications portal', 'https://www.aps.gov.in', 'id-card', 'published'),
-- ('Grama/Ward Sachivalayam', 'Village and ward secretariat services', 'https://gsws.ap.gov.in', 'building-2', 'published'),
-- ('Spandana', 'Public grievance redressal platform', 'https://spandana.ap.gov.in', 'file-text', 'published'),
-- ('AP Panchayat Services', 'Panchayat-related services including house tax, trade license, property valuation', 'https://panchayat.ap.gov.in', 'users', 'published'),
-- ('MeeBhoomi', 'Land and revenue records', 'https://meebhoomi.ap.gov.in', 'file-text', 'published'),
-- ('Agriculture Department', 'Agriculture department information and farmer schemes', 'https://agri.ap.gov.in', 'leaf', 'published'),
-- ('Health & Family Welfare', 'Health, Medical & Family Welfare Department services', 'https://hmfw.ap.gov.in', 'hospital', 'published'),
-- ('Birth/Death Certificates', 'Register and download certificates online', 'https://crsorgi.gov.in', 'file-check', 'published'),
-- ('RTI Online', 'Right to Information portal for Andhra Pradesh', 'https://rtionline.ap.gov.in', 'file-text', 'published');