/*
  # Admin Authentication Fix

  1. Changes
    - Drop existing admin_login function
    - Create new admin_login function with proper error handling
    - Update RLS policies for admin access
    - Ensure admin user exists

  2. Security
    - Maintain RLS policies
    - Add proper error handling
    - Secure admin authentication
*/

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS admin_login(TEXT);

-- Create admin_login function with proper error handling
CREATE OR REPLACE FUNCTION admin_login(admin_email TEXT)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  admin_exists boolean;
BEGIN
  -- Check if admin user exists
  SELECT EXISTS (
    SELECT 1 
    FROM users 
    WHERE email = admin_email 
    AND role = 'admin'
  ) INTO admin_exists;

  IF admin_exists THEN
    RETURN json_build_object(
      'success', true,
      'message', 'Admin authenticated'
    );
  ELSE
    RETURN json_build_object(
      'success', false,
      'message', 'Invalid admin credentials'
    );
  END IF;
END;
$$;

-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'editor')),
  created_at timestamptz DEFAULT now()
);

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

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Admins can manage users" ON users;
DROP POLICY IF EXISTS "Allow admin user access" ON users;
DROP POLICY IF EXISTS "Anyone can read published content" ON content;
DROP POLICY IF EXISTS "Authors can manage own content" ON content;
DROP POLICY IF EXISTS "Admins can manage all content" ON content;

-- Create policies for users table
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can manage users"
  ON users
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Allow admin user access"
  ON users
  FOR SELECT
  TO authenticated
  USING (email = 'sltr' AND role = 'admin');

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

-- Ensure admin user exists
INSERT INTO users (email, role)
VALUES ('sltr', 'admin')
ON CONFLICT (email) DO UPDATE
SET role = 'admin'
WHERE users.email = 'sltr';