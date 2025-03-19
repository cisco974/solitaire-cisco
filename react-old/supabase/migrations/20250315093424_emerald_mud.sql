/*
  # Fix Content RLS Policies

  1. Changes
    - Drop existing RLS policies
    - Create new simplified policy for admin access
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

-- Create new simplified policy
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

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create updated_at trigger if it doesn't exist
DROP TRIGGER IF EXISTS set_updated_at ON content;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();