/*
  # Admin Panel Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `role` (text)
      - `created_at` (timestamptz)
    
    - `content`
      - `id` (uuid, primary key)
      - `type` (text)
      - `title` (text)
      - `slug` (text)
      - `content` (text)
      - `language` (text)
      - `status` (text)
      - `meta_title` (text)
      - `meta_description` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `author_id` (uuid, references users)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users based on role
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'editor')),
  created_at timestamptz DEFAULT now()
);

-- Create content table
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

-- Policies for users table
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can manage users"
  ON users
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Policies for content table
CREATE POLICY "Anyone can read published content"
  ON content
  FOR SELECT
  TO authenticated
  USING (status = 'published');

CREATE POLICY "Authors can manage own content"
  ON content
  TO authenticated
  USING (author_id = auth.uid());

CREATE POLICY "Admins can manage all content"
  ON content
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Create initial admin user
INSERT INTO users (email, role)
VALUES ('sltr', 'admin')
ON CONFLICT DO NOTHING;