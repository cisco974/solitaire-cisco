/*
  # Content Management System Setup

  1. New Tables
    - `content`
      - `id` (uuid, primary key)
      - `type` (text, enum: guide, article, page)
      - `title` (text)
      - `slug` (text)
      - `content` (text)
      - `language` (text)
      - `status` (text, enum: draft, published)
      - `meta_title` (text, nullable)
      - `meta_description` (text, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `author_id` (uuid, references users)

  2. Security
    - Enable RLS on all tables
    - Add policies for content management
    - Add policies for user management

  3. Changes
    - Add unique constraint on slug and language combination
    - Add automatic updated_at timestamp update
*/

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create content table if it doesn't exist
CREATE TABLE IF NOT EXISTS content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('guide', 'article', 'page')),
  title text NOT NULL,
  slug text NOT NULL,
  content text NOT NULL,
  language text NOT NULL,
  status text NOT NULL CHECK (status IN ('draft', 'published')),
  meta_title text,
  meta_description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  author_id uuid REFERENCES users(id),
  UNIQUE(slug, language)
);

-- Create updated_at trigger
DROP TRIGGER IF EXISTS set_updated_at ON content;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can read published content" ON content;
DROP POLICY IF EXISTS "Authors can manage own content" ON content;
DROP POLICY IF EXISTS "Admins can manage all content" ON content;

-- Create policies for content table
CREATE POLICY "Anyone can read published content"
  ON content
  FOR SELECT
  TO authenticated
  USING (status = 'published');

CREATE POLICY "Authors can manage own content"
  ON content
  FOR ALL
  TO authenticated
  USING (author_id = auth.uid());

CREATE POLICY "Admins can manage all content"
  ON content
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Insert initial pages
INSERT INTO content (type, title, slug, content, language, status, author_id)
SELECT
  'page',
  'About Us',
  'about',
  '<h1>About Us</h1><p>Welcome to SLTR.com, your ultimate destination for solitaire games.</p>',
  lang.code,
  'published',
  (SELECT id FROM users WHERE email = 'sltr' LIMIT 1)
FROM (VALUES 
  ('en'),
  ('fr'),
  ('es'),
  ('de')
) AS lang(code)
ON CONFLICT (slug, language) DO NOTHING;

INSERT INTO content (type, title, slug, content, language, status, author_id)
SELECT
  'page',
  'Terms of Use',
  'terms',
  '<h1>Terms of Use</h1><p>Please read these terms carefully before using our service.</p>',
  lang.code,
  'published',
  (SELECT id FROM users WHERE email = 'sltr' LIMIT 1)
FROM (VALUES 
  ('en'),
  ('fr'),
  ('es'),
  ('de')
) AS lang(code)
ON CONFLICT (slug, language) DO NOTHING;

INSERT INTO content (type, title, slug, content, language, status, author_id)
SELECT
  'page',
  'Privacy Policy',
  'privacy',
  '<h1>Privacy Policy</h1><p>Your privacy is important to us.</p>',
  lang.code,
  'published',
  (SELECT id FROM users WHERE email = 'sltr' LIMIT 1)
FROM (VALUES 
  ('en'),
  ('fr'),
  ('es'),
  ('de')
) AS lang(code)
ON CONFLICT (slug, language) DO NOTHING;

-- Insert initial articles
INSERT INTO content (type, title, slug, content, language, status, author_id)
SELECT
  'article',
  'How to Play Solitaire',
  'how-to-play-solitaire',
  '<h1>How to Play Solitaire</h1><p>Learn the basics of this classic card game.</p>',
  lang.code,
  'published',
  (SELECT id FROM users WHERE email = 'sltr' LIMIT 1)
FROM (VALUES 
  ('en'),
  ('fr'),
  ('es'),
  ('de')
) AS lang(code)
ON CONFLICT (slug, language) DO NOTHING;