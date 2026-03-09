-- ================================================================
-- Kaarai Karangal CMS – Supabase Database Schema
-- Run this in the Supabase SQL Editor to create all tables
-- ================================================================

-- Enable UUID extension (usually already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================================================
-- 1. SITE SETTINGS (single-row config table)
-- ================================================================
CREATE TABLE IF NOT EXISTS site_settings (
  id            INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  org_name      TEXT NOT NULL DEFAULT 'Kaarai Karangal',
  tagline_tamil TEXT NOT NULL DEFAULT 'யாதும் ஊரே யாவரும் கேளிர்',
  tagline_english TEXT NOT NULL DEFAULT 'All towns are our home, all people our kin',
  hero_description TEXT NOT NULL DEFAULT '',
  registration_info TEXT NOT NULL DEFAULT '',
  founder_name  TEXT NOT NULL DEFAULT '',
  founder_image_url TEXT NOT NULL DEFAULT '/img/founder.jpg',
  founder_quote TEXT NOT NULL DEFAULT '',
  founder_message JSONB NOT NULL DEFAULT '[]'::jsonb,
  about_intro   TEXT NOT NULL DEFAULT '',
  about_expanded JSONB NOT NULL DEFAULT '[]'::jsonb,
  about_motto   TEXT NOT NULL DEFAULT 'Together, we make compassion visible.',
  logo_url      TEXT NOT NULL DEFAULT '/img/logo.jpg',
  email         TEXT NOT NULL DEFAULT '',
  phone_display TEXT NOT NULL DEFAULT '',
  phone_tel     TEXT NOT NULL DEFAULT '',
  address       TEXT NOT NULL DEFAULT '',
  instagram_url TEXT NOT NULL DEFAULT '',
  facebook_url  TEXT NOT NULL DEFAULT '',
  blood_donation_url TEXT NOT NULL DEFAULT '',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ================================================================
-- 2. SERVICES
-- ================================================================
CREATE TABLE IF NOT EXISTS services (
  id          SERIAL PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name   TEXT NOT NULL DEFAULT 'Heart',
  sort_order  INTEGER NOT NULL DEFAULT 0,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ================================================================
-- 3. IMPACT CATEGORIES (Gallery)
-- ================================================================
CREATE TABLE IF NOT EXISTS impact_categories (
  id          SERIAL PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  sort_order  INTEGER NOT NULL DEFAULT 0,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ================================================================
-- 4. IMPACT IMAGES
-- ================================================================
CREATE TABLE IF NOT EXISTS impact_images (
  id          SERIAL PRIMARY KEY,
  category_id INTEGER NOT NULL REFERENCES impact_categories(id) ON DELETE CASCADE,
  url         TEXT NOT NULL,
  caption     TEXT NOT NULL DEFAULT '',
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_impact_images_category ON impact_images(category_id);

-- ================================================================
-- 5. EVENTS
-- ================================================================
CREATE TABLE IF NOT EXISTS events (
  id               SERIAL PRIMARY KEY,
  title            TEXT NOT NULL,
  date_display     TEXT NOT NULL DEFAULT '',
  event_date       TIMESTAMPTZ,
  location         TEXT NOT NULL DEFAULT '',
  description_html TEXT NOT NULL DEFAULT '',
  is_active        BOOLEAN NOT NULL DEFAULT true,
  sort_order       INTEGER NOT NULL DEFAULT 0,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ================================================================
-- 6. SPONSORS
-- ================================================================
CREATE TABLE IF NOT EXISTS sponsors (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  logo_url    TEXT NOT NULL DEFAULT '',
  website_url TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ================================================================
-- 7. TEAM MEMBERS
-- ================================================================
CREATE TABLE IF NOT EXISTS team_members (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  role        TEXT NOT NULL DEFAULT '',
  category    TEXT NOT NULL DEFAULT 'leadership' CHECK (category IN ('leadership', 'advisor', 'ec_member')),
  sort_order  INTEGER NOT NULL DEFAULT 0,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ================================================================
-- 8. FUNDRAISING CAMPAIGNS
-- ================================================================
CREATE TABLE IF NOT EXISTS campaigns (
  id          SERIAL PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  raised      NUMERIC(12,2) NOT NULL DEFAULT 0,
  goal        NUMERIC(12,2) NOT NULL DEFAULT 0,
  supporters  INTEGER NOT NULL DEFAULT 0,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ================================================================
-- 9. DONATION BREAKDOWN
-- ================================================================
CREATE TABLE IF NOT EXISTS donation_breakdown (
  id          SERIAL PRIMARY KEY,
  label       TEXT NOT NULL,
  percent     INTEGER NOT NULL DEFAULT 0,
  color       TEXT NOT NULL DEFAULT 'primary',
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ================================================================
-- 10. VOLUNTEER SIGNUPS
-- ================================================================
CREATE TABLE IF NOT EXISTS volunteer_signups (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  phone       TEXT NOT NULL DEFAULT '',
  email       TEXT NOT NULL DEFAULT '',
  interest    TEXT NOT NULL DEFAULT '',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ================================================================
-- ROW LEVEL SECURITY (RLS)
-- ================================================================
-- Enable RLS on all tables
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE impact_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE impact_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE donation_breakdown ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_signups ENABLE ROW LEVEL SECURITY;

-- Public read access for content tables (anon key can read)
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read impact_categories" ON impact_categories FOR SELECT USING (true);
CREATE POLICY "Public read impact_images" ON impact_images FOR SELECT USING (true);
CREATE POLICY "Public read events" ON events FOR SELECT USING (true);
CREATE POLICY "Public read sponsors" ON sponsors FOR SELECT USING (true);
CREATE POLICY "Public read team_members" ON team_members FOR SELECT USING (true);
CREATE POLICY "Public read campaigns" ON campaigns FOR SELECT USING (true);
CREATE POLICY "Public read donation_breakdown" ON donation_breakdown FOR SELECT USING (true);

-- Volunteer signups: public can insert, only authenticated can read
CREATE POLICY "Public insert volunteer_signups" ON volunteer_signups FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated read volunteer_signups" ON volunteer_signups FOR SELECT USING (auth.role() = 'authenticated');
