-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can read published content" ON content;
DROP POLICY IF EXISTS "Authors can manage own content" ON content;
DROP POLICY IF EXISTS "Admins can manage all content" ON content;
DROP POLICY IF EXISTS "Admin full access" ON content;

-- Create new simplified policy that allows full access
CREATE POLICY "Enable full access"
ON content
FOR ALL 
TO authenticated
USING (true)
WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT ALL ON content TO authenticated;

-- Ensure admin user exists
INSERT INTO users (email, role)
VALUES ('sltr', 'admin')
ON CONFLICT (email) 
DO UPDATE SET role = 'admin'
WHERE users.email = 'sltr';