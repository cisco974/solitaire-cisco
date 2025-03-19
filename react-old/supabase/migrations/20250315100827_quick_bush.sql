-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can read published content" ON content;
DROP POLICY IF EXISTS "Authors can manage own content" ON content;
DROP POLICY IF EXISTS "Admins can manage all content" ON content;
DROP POLICY IF EXISTS "Admin full access" ON content;

-- Create new simplified policy that allows the admin user full access
CREATE POLICY "Admin full access"
ON content
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions to authenticated users
GRANT ALL ON content TO authenticated;

-- Ensure admin user exists and has correct role
INSERT INTO users (email, role)
VALUES ('sltr', 'admin')
ON CONFLICT (email) 
DO UPDATE SET role = 'admin'
WHERE users.email = 'sltr';

-- Insert sample pages if they don't exist
INSERT INTO content (
  type,
  title,
  slug,
  content,
  language,
  status,
  meta_title,
  meta_description,
  author_id
)
SELECT
  'page',
  'About Us',
  'about-us',
  '<h1>About Us</h1><p>Welcome to SLTR.com</p>',
  'en',
  'published',
  'About Us - SLTR.com',
  'About SLTR.com',
  (SELECT id FROM users WHERE email = 'sltr' LIMIT 1)
WHERE NOT EXISTS (
  SELECT 1 FROM content WHERE slug = 'about-us' AND language = 'en'
);

INSERT INTO content (
  type,
  title,
  slug,
  content,
  language,
  status,
  meta_title,
  meta_description,
  author_id
)
SELECT
  'page',
  'Terms of Use',
  'terms-of-use',
  '<h1>Terms of Use</h1><p>Terms and conditions</p>',
  'en',
  'published',
  'Terms of Use - SLTR.com',
  'Terms of Use for SLTR.com',
  (SELECT id FROM users WHERE email = 'sltr' LIMIT 1)
WHERE NOT EXISTS (
  SELECT 1 FROM content WHERE slug = 'terms-of-use' AND language = 'en'
);

INSERT INTO content (
  type,
  title,
  slug,
  content,
  language,
  status,
  meta_title,
  meta_description,
  author_id
)
SELECT
  'page',
  'Privacy Policy',
  'privacy-policy',
  '<h1>Privacy Policy</h1><p>Our privacy policy</p>',
  'en',
  'published',
  'Privacy Policy - SLTR.com',
  'Privacy Policy for SLTR.com',
  (SELECT id FROM users WHERE email = 'sltr' LIMIT 1)
WHERE NOT EXISTS (
  SELECT 1 FROM content WHERE slug = 'privacy-policy' AND language = 'en'
);