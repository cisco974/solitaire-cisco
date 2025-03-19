/*
  # Fix RLS Policies for Content Management

  1. Changes
    - Drop existing RLS policies
    - Create new simplified policies for admin access
    - Add policy for admin user by email
    - Update content table permissions

  2. Security
    - Enable RLS on content table
    - Add policies for admin management
    - Ensure admin user has full access
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can read published content" ON content;
DROP POLICY IF EXISTS "Authors can manage own content" ON content;
DROP POLICY IF EXISTS "Admins can manage all content" ON content;
DROP POLICY IF EXISTS "Admin full access" ON content;

-- Create new simplified policies
CREATE POLICY "Admin full access"
ON content
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM users 
    WHERE users.email = 'sltr' 
    AND users.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 
    FROM users 
    WHERE users.email = 'sltr' 
    AND users.role = 'admin'
  )
);

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