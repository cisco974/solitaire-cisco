-- Insert About Us page
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
VALUES (
  'page',
  'About Us',
  'about',
  '<h1>About Us</h1>
<p>Welcome to SLTR.com, your ultimate destination for enjoying the timeless card game of Solitaire and its many variations. Play your favorite game online for free, with no downloads required!</p>

<h2>Our Mission</h2>
<p>Our mission is to provide a convenient and enjoyable platform for card game enthusiasts around the world. We understand the lasting appeal of Solitaire and are committed to delivering an exceptional online experience for those who love this classic game.</p>

<h2>Quality First</h2>
<p>At SLTR.com, we prioritize creating a high-quality product that shines through every aspect of our platform—from the seamless gameplay mechanics to the captivating visual design. We''ve worked hard to make our site not just a place to play, but an inviting, visually stunning, and intuitively designed environment.</p>

<h2>Global Accessibility</h2>
<p>Recognizing Solitaire''s global popularity, we wanted to make the game accessible to everyone. That''s why SLTR.com supports multiple languages, enabling players from around the world to enjoy their favorite game. Alongside the classic version, you''ll find popular variations like Spider Solitaire and FreeCell.</p>

<h2>Cross-Platform Experience</h2>
<p>One of the standout features of SLTR.com is its adaptability across devices. Whether you''re playing on a desktop computer, tablet, or smartphone, you''ll enjoy the same smooth, responsive experience. Our adaptive design ensures that the game looks and plays beautifully on any screen size.</p>',
  'en',
  'published',
  'About Us - SLTR.com',
  'Learn about SLTR.com, your premier destination for online Solitaire games. Discover our mission, values, and commitment to providing the best card game experience.',
  (SELECT id FROM users WHERE email = 'sltr' LIMIT 1)
)
ON CONFLICT (slug, language) 
DO UPDATE SET 
  content = EXCLUDED.content,
  meta_title = EXCLUDED.meta_title,
  meta_description = EXCLUDED.meta_description,
  updated_at = CURRENT_TIMESTAMP;

-- Insert Terms of Use page
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
VALUES (
  'page',
  'Terms of Use',
  'terms',
  '<h1>Terms of Use</h1>
<p>Welcome to SLTR.com. By accessing and using our website, you agree to comply with and be bound by the following terms and conditions of use.</p>

<h2>1. Acceptance of Terms</h2>
<p>By accessing and using SLTR.com, you accept and agree to be bound by the terms and provision of this agreement. Additionally, when using our website''s specific services, you shall be subject to any posted guidelines or rules applicable to such services.</p>

<h2>2. User Account</h2>
<p>Some features of our website may require registration. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</p>

<h2>3. Fair Usage</h2>
<p>You agree to use SLTR.com only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else''s use and enjoyment of the website.</p>

<h2>4. Intellectual Property</h2>
<p>The content, organization, graphics, design, compilation, magnetic translation, digital conversion, and other matters related to the Site are protected under applicable copyrights, trademarks, and other proprietary rights.</p>

<h2>5. Limitation of Liability</h2>
<p>SLTR.com shall not be liable for any damages arising out of or in connection with the use or inability to use our services. This includes but is not limited to direct, indirect, incidental, consequential, and punitive damages.</p>',
  'en',
  'published',
  'Terms of Use - SLTR.com',
  'Read our Terms of Use to understand the rules and conditions for using SLTR.com. Learn about user accounts, fair usage, intellectual property, and liability limitations.',
  (SELECT id FROM users WHERE email = 'sltr' LIMIT 1)
)
ON CONFLICT (slug, language) 
DO UPDATE SET 
  content = EXCLUDED.content,
  meta_title = EXCLUDED.meta_title,
  meta_description = EXCLUDED.meta_description,
  updated_at = CURRENT_TIMESTAMP;

-- Insert Privacy Policy page
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
VALUES (
  'page',
  'Privacy Policy',
  'privacy',
  '<h1>Privacy Policy</h1>
<p>At SLTR.com, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>

<h2>Information We Collect</h2>
<p>We collect information that you voluntarily provide to us when you:</p>
<ul>
  <li>Register an account</li>
  <li>Sign up for our newsletter</li>
  <li>Contact us through our support channels</li>
  <li>Participate in our community features</li>
</ul>

<h2>How We Use Your Information</h2>
<p>The information we collect is used to:</p>
<ul>
  <li>Provide and maintain our service</li>
  <li>Notify you about changes to our service</li>
  <li>Allow you to participate in interactive features</li>
  <li>Provide customer support</li>
  <li>Monitor the usage of our service</li>
</ul>

<h2>Cookies and Tracking</h2>
<p>We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier.</p>

<h2>Data Security</h2>
<p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>

<h2>Your Privacy Rights</h2>
<p>You have the right to:</p>
<ul>
  <li>Access your personal data</li>
  <li>Correct inaccurate personal data</li>
  <li>Request deletion of your personal data</li>
  <li>Object to our processing of your personal data</li>
  <li>Request restriction of processing your personal data</li>
</ul>',
  'en',
  'published',
  'Privacy Policy - SLTR.com',
  'Read our Privacy Policy to understand how we collect, use, and protect your personal information at SLTR.com. Learn about your privacy rights and our data security measures.',
  (SELECT id FROM users WHERE email = 'sltr' LIMIT 1)
)
ON CONFLICT (slug, language) 
DO UPDATE SET 
  content = EXCLUDED.content,
  meta_title = EXCLUDED.meta_title,
  meta_description = EXCLUDED.meta_description,
  updated_at = CURRENT_TIMESTAMP;

-- Insert Klondike page
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
VALUES (
  'page',
  'Klondike Solitaire',
  'klondike',
  '<h1>Klondike Solitaire</h1>
<p>Klondike is the most popular version of Solitaire. Learn how to play this classic card game and master its strategies.</p>

<h2>How to Play</h2>
<p>The goal is to build four foundation piles from Ace to King in each suit. Cards in the tableau must be built in descending order with alternating colors.</p>

<h2>Game Rules</h2>
<ul>
  <li>Build foundation piles up from Ace to King in each suit</li>
  <li>Build tableau piles down with alternating colors</li>
  <li>Move any face-up card to another tableau pile</li>
  <li>Empty spaces can only be filled with Kings</li>
</ul>

<h2>Strategies</h2>
<ul>
  <li>Focus on revealing face-down cards</li>
  <li>Create empty columns when possible</li>
  <li>Don''t rush to build foundation piles</li>
  <li>Keep Kings in reserve for empty spaces</li>
</ul>',
  'en',
  'published',
  'Klondike Solitaire - Play Free Online | SLTR.com',
  'Play Klondike Solitaire online for free. Learn the rules, strategies, and tips to master this classic card game.',
  (SELECT id FROM users WHERE email = 'sltr' LIMIT 1)
)
ON CONFLICT (slug, language) 
DO UPDATE SET 
  content = EXCLUDED.content,
  meta_title = EXCLUDED.meta_title,
  meta_description = EXCLUDED.meta_description,
  updated_at = CURRENT_TIMESTAMP;

-- Insert Spider page
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
VALUES (
  'page',
  'Spider Solitaire',
  'spider',
  '<h1>Spider Solitaire</h1>
<p>Spider Solitaire is a challenging variant of solitaire played with multiple decks. Choose from one, two, or four suit variations.</p>

<h2>Game Modes</h2>
<ul>
  <li>One Suit - Easiest version, perfect for beginners</li>
  <li>Two Suits - Intermediate difficulty with more strategy</li>
  <li>Four Suits - Ultimate challenge for expert players</li>
</ul>

<h2>How to Play</h2>
<p>Build descending sequences of cards in the same suit. When a sequence from King to Ace is completed, it''s removed from play.</p>

<h2>Strategies</h2>
<ul>
  <li>Keep empty columns available</li>
  <li>Focus on building same-suit sequences</li>
  <li>Plan moves before dealing new cards</li>
  <li>Use empty columns strategically</li>
</ul>',
  'en',
  'published',
  'Spider Solitaire - Play Free Online | SLTR.com',
  'Play Spider Solitaire online with 1, 2, or 4 suits. Learn strategies and tips for this challenging solitaire variant.',
  (SELECT id FROM users WHERE email = 'sltr' LIMIT 1)
)
ON CONFLICT (slug, language) 
DO UPDATE SET 
  content = EXCLUDED.content,
  meta_title = EXCLUDED.meta_title,
  meta_description = EXCLUDED.meta_description,
  updated_at = CURRENT_TIMESTAMP;

-- Insert FreeCell page
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
VALUES (
  'page',
  'FreeCell',
  'freecell',
  '<h1>FreeCell Solitaire</h1>
<p>FreeCell is a unique solitaire variant where all cards are face-up from the start. Almost every game is solvable with the right strategy.</p>

<h2>Game Features</h2>
<ul>
  <li>All cards visible from the start</li>
  <li>Four free cells for temporary storage</li>
  <li>Build foundation piles from Ace to King</li>
  <li>Move cards between tableau piles</li>
</ul>

<h2>How to Play</h2>
<p>Use the four free cells to temporarily store cards while building foundation piles in ascending order by suit. In the tableau, build descending sequences with alternating colors.</p>

<h2>Strategies</h2>
<ul>
  <li>Plan several moves ahead</li>
  <li>Keep free cells available</li>
  <li>Build foundations evenly</li>
  <li>Use empty columns wisely</li>
</ul>',
  'en',
  'published',
  'FreeCell Solitaire - Play Free Online | SLTR.com',
  'Play FreeCell Solitaire online for free. Master this strategic card game where almost every deal is solvable.',
  (SELECT id FROM users WHERE email = 'sltr' LIMIT 1)
)
ON CONFLICT (slug, language) 
DO UPDATE SET 
  content = EXCLUDED.content,
  meta_title = EXCLUDED.meta_title,
  meta_description = EXCLUDED.meta_description,
  updated_at = CURRENT_TIMESTAMP;