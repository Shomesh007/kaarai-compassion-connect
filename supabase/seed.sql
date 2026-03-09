-- ================================================================
-- Kaarai Karangal CMS – Seed Data
-- Run this AFTER schema.sql to populate initial content
-- ================================================================

-- ================================================================
-- 1. SITE SETTINGS
-- ================================================================
INSERT INTO site_settings (
  id, org_name, tagline_tamil, tagline_english, hero_description,
  registration_info, founder_name, founder_image_url, founder_quote,
  founder_message, about_intro, about_expanded, about_motto,
  logo_url, email, phone_display, phone_tel, address,
  instagram_url, facebook_url, blood_donation_url
) VALUES (
  1,
  'Kaarai Karangal',
  'யாதும் ஊரே யாவரும் கேளிர்',
  'All towns are our home, all people our kin',
  'Serving marginalized communities across Tamil Nadu and Puducherry through food, shelter, education, and blood donation drives. All towns are our home, all people our kin.',
  'Registered NGO (Reg. No. 31/2025 — Registered on fourth february 2025)',
  'Dr.E.Vishnuvarthan',
  '/img/founder.jpg',
  'When compassion becomes action, humanity blossoms.',
  '["Vanakkam and warm greetings to all!","The story of Kaarai Karangal Social Service Organization began with a heartfelt dream — a dream to build a community where kindness flows freely and every helping hand becomes a source of hope. From humble beginnings, we have grown into a family bound by compassion, selflessness, and an unwavering commitment to serve humanity.","The inspiration behind Karai Karangal came from witnessing the silent struggles of people around us — those who needed help, comfort, and a sense of belonging. I realized that change begins not with wealth or power, but with a single thought: \"How can I make someone''s life better today?\" That thought became our mission.","Over the years, we have worked passionately in areas such as blood donation, healthcare support, education assistance, environmental awareness, and community welfare. Each initiative reflects our belief that \"service to others is the purest form of love.\" We are not just an organization — we are a movement of hearts determined to make the world a kinder place.","Every drop of blood donated, every meal shared, and every smile restored reminds us why we started this journey. It''s not about recognition or rewards; it''s about humanity — about standing together when someone needs us the most.","As the founder, I feel deeply humbled and grateful for all our volunteers, supporters, and well-wishers who continue to strengthen this mission. You are the true pillars of Kaarai Karangal. Together, we can continue to light lives, spread hope, and prove that compassion still reigns in this world.","Let us join hands to keep this spirit alive — because when hearts unite in service, miracles happen."]'::jsonb,
  'Kaarai Karangal is a social service organization based at K7 Hall, No.36/6 Kennadiyar street, Karaikal 609 602, dedicated to serving marginalized communities across Tamil Nadu and Puducherry. Founded on the timeless Tamil principle of "யாதும் ஊரே யாவரும் கேளிர்" — meaning all towns are our home and all people our kin — we believe in the power of compassion to transform lives.',
  '["Our journey began with a simple idea: that every person deserves dignity, care, and opportunity regardless of their circumstances. What started as small community gatherings to provide meals has grown into a comprehensive social welfare initiative touching thousands of lives.","We are driven by the belief that real change happens when communities come together. Through our various programs — from hunger relief to education support, from emergency shelter to blood donation drives — we unite people from all walks of life in acts of service and compassion.","Registered NGO (Reg. No. 31/2025 — Registered on fourth february 2025), Kaarai Karangal operates with complete transparency and accountability. Every contribution goes directly toward serving those in need, building a society where compassion is visible and tangible."]'::jsonb,
  'Together, we make compassion visible.',
  '/img/logo.jpg',
  'kaaraikarangal@gmail.com',
  '+91 82205 73306',
  '+918220573306',
  'K7 Hall, No.36/6 Kennadiyar street, Karaikal 609 602.',
  'https://www.instagram.com/kaarai_karangal?igsh=YzY1OWkxdG5wemg1',
  'https://www.facebook.com/share/17KJ5ARhmN/',
  'https://kaaraikarangal.netlify.app/'
) ON CONFLICT (id) DO UPDATE SET
  org_name = EXCLUDED.org_name,
  updated_at = now();

-- ================================================================
-- 2. SERVICES
-- ================================================================
INSERT INTO services (title, description, icon_name, sort_order) VALUES
  ('Food & Hunger Relief', 'Daily meal distribution and emergency food support for those in need', 'Utensils', 1),
  ('Shelter & Emergency Support', 'Temporary housing and crisis intervention for vulnerable families', 'Home', 2),
  ('Blood Donation Drives', 'Regular blood donation camps saving lives in our communities', 'Droplet', 3),
  ('Education Support', 'Scholarships and learning materials for underprivileged students', 'BookOpen', 4),
  ('Community Welfare', 'Health camps, skills training, and community development programs', 'Users', 5);

-- ================================================================
-- 3. IMPACT CATEGORIES
-- ================================================================
INSERT INTO impact_categories (id, title, description, sort_order) VALUES
  (1, 'ID Cards for Government School Students', 'Empowering students with identity and dignity', 1),
  (2, 'School Bags for Children in Need', 'Providing school bags and supplies to help children attend school', 2),
  (3, 'Elderly Care & Support', 'Providing essentials and compassion to senior citizens', 3);

-- Reset sequence
SELECT setval('impact_categories_id_seq', (SELECT MAX(id) FROM impact_categories));

-- ================================================================
-- 4. IMPACT IMAGES
-- ================================================================
INSERT INTO impact_images (category_id, url, caption, sort_order) VALUES
  -- ID Cards
  (1, '/img/id1.jpg', 'ID card front example — student photo and details', 1),
  (1, '/img/id2.jpg', 'ID card back example — school & contact info', 2),
  (1, '/img/id3.jpg', 'Printed sample attached to lanyard', 3),
  (1, '/img/id4.jpg', 'Batch of ID cards ready for distribution', 4),
  -- School Bags
  (2, '/img/bag1.jpg', 'School bags ready for distribution', 1),
  (2, '/img/bag2.jpg', 'Volunteers packing school supplies', 2),
  (2, '/img/bag3.jpg', 'Children receiving school bags', 3),
  (2, '/img/bag5.jpg', 'Supplies and materials inside the bags', 4),
  -- Elderly Care
  (3, '/img/elder1.jpg', 'Home visit: health & companionship', 1),
  (3, '/img/elder2.jpg', 'Distribution of essential supplies to seniors', 2),
  (3, '/img/elder3.jpg', 'Community care activities for elderly', 3),
  (3, '/img/elder4.jpg', 'Wellness check-up program in progress', 4),
  (3, '/img/elder5.jpg', 'Volunteers assisting daily needs', 5);

-- ================================================================
-- 5. EVENTS
-- ================================================================
INSERT INTO events (title, date_display, event_date, location, description_html, sort_order) VALUES
  (
    'Where Strings Meet Souls — A New Chapter in the Art of Puppetry',
    '22nd February 2026, 6:00 PM',
    '2026-02-22T18:00:00+05:30',
    'Karaikal Beach',
    '<p>On <strong>22nd February 2026, at 6:00 PM</strong>, the serene shores of Karaikal Beach will transform into a living stage for an extraordinary artistic experience.</p><p><strong>Kaarai Karangal Social Service Organization</strong>, in its continued journey of nurturing art with purpose, proudly presents a unique puppetry performance by <strong>Kaarai Raman Creations</strong> — a show that gently breaks boundaries and redefines tradition.</p><p><em>This is not a usual puppetry show.</em> Here, puppets do not remain confined to strings or silence. They move with life, dance with human performers, and share the stage as equals.</p><div><strong>✨ The novelty of this puppetry art lies in its union:</strong><ul><li>Where wood and flesh dance in harmony</li><li>Where art transcends age, language, and form</li><li>Where imagination gently reminds us that life exists even in the smallest movements</li></ul></div><p>Set against the timeless rhythm of the sea, this performance is a celebration of creativity, sensitivity, and human connection.</p><p><strong>🌟 Come, witness puppetry not as you have seen before — but as you have never imagined.</strong></p>',
    1
  );

-- ================================================================
-- 6. SPONSORS
-- ================================================================
INSERT INTO sponsors (name, logo_url, sort_order) VALUES
  ('Sekar textiles', '/img/sekars_logo.png', 1),
  ('Thaai Interiors', '/img/Thaai_Interiors_Logo.jpg', 2),
  ('GL Hospital', '/img/gl_hospital_logo.jpg', 3),
  ('Fitness Zone Unisex Gym', '/img/fitness_zone_logo.jpg', 4),
  ('Zen Healthcare', '/img/zen.png', 5),
  ('Royal Cards', '/img/royal_cards.jpg', 6),
  ('Studie ''O 7', '/img/studio7.jpg', 7);

-- ================================================================
-- 7. TEAM MEMBERS
-- ================================================================
-- Leadership
INSERT INTO team_members (name, role, category, sort_order) VALUES
  ('GURU. Padmasree, Kalaimamani Mr.K.Kesavasamy', 'Hon''ble President', 'leadership', 1),
  ('Mrs.A.Jemuna', 'President', 'leadership', 2),
  ('Dr.E.Vishnuvarthan', 'Founder & Secretary', 'leadership', 3),
  ('Mrs.C.Brundha', 'Joint Secretary', 'leadership', 4),
  ('Hr.K.Parthiban', 'Deputy Secretary 1', 'leadership', 5),
  ('Mr.A. Manikandaprabhu', 'Deputy Secretary 2', 'leadership', 6),
  ('Mr.G. Surya', 'Treasurer', 'leadership', 7),
  ('Mrs.D. Nivetha', 'Joint Treasurer', 'leadership', 8),
  ('Lr. M.Muruganandham', 'Legal Advisor', 'leadership', 9),
  ('Mr.M.Mohamed Arif Maraicar', 'PROs', 'leadership', 10),
  ('Mr.S.Anbarasan', 'PROs', 'leadership', 11),
  ('Mr.A.Ramji', 'Membership Coordinator', 'leadership', 12),
  ('Mr.T.Udhayakumar', 'Event Coordinator', 'leadership', 13),
  ('Mr.M.Abdul Kareem', 'Event Coordinator', 'leadership', 14),
  ('Mr.J.Vigneshraj', 'Event Coordinator', 'leadership', 15);

-- Advisors
INSERT INTO team_members (name, role, category, sort_order) VALUES
  ('Dr.Uma Maheshwari', 'Advisor', 'advisor', 1),
  ('Dr.LSP. Sozhasingarayar', 'Advisor', 'advisor', 2),
  ('Mr.J. Krishnan', 'Advisor', 'advisor', 3),
  ('Mr.Parisravi', 'Advisor', 'advisor', 4),
  ('Dr.R. Ashokkumar', 'Advisor', 'advisor', 5),
  ('Mr.T. Balraj', 'Advisor', 'advisor', 6),
  ('Mr.S.John Kennady', 'Advisor', 'advisor', 7),
  ('Mr.KMS.Karthigeyan', 'Advisor', 'advisor', 8),
  ('Dr.A. Vinothkumar', 'Advisor', 'advisor', 9),
  ('Mr.R.Muthukumar', 'Advisor', 'advisor', 10);

-- EC Members
INSERT INTO team_members (name, role, category, sort_order) VALUES
  ('Er.B.Sugumar', 'EC Member', 'ec_member', 1),
  ('Dr.N.Harimathi', 'EC Member', 'ec_member', 2),
  ('Lr.P.Jananika', 'EC Member', 'ec_member', 3),
  ('Er.S.Thirumalaivasan', 'EC Member', 'ec_member', 4),
  ('Mr.M.Vijaykumar', 'EC Member', 'ec_member', 5),
  ('Er.B.Anbukumaran', 'EC Member', 'ec_member', 6),
  ('Mr.T.Ayyappan', 'EC Member', 'ec_member', 7),
  ('Mr.R.Ake bachienen', 'EC Member', 'ec_member', 8),
  ('Miss.S.Vigneswary', 'EC Member', 'ec_member', 9);

-- ================================================================
-- 8. CAMPAIGNS
-- ================================================================
INSERT INTO campaigns (title, description, raised, goal, supporters, sort_order) VALUES
  ('Emergency Food Relief', 'Providing meals to 500 families affected by recent floods', 125000, 200000, 89, 1),
  ('Education Scholarships 2025', 'Supporting 50 underprivileged students with books and fees', 75000, 150000, 45, 2),
  ('Community Health Camp', 'Free medical check-ups and medicines for rural areas', 40000, 80000, 32, 3);

-- ================================================================
-- 9. DONATION BREAKDOWN
-- ================================================================
INSERT INTO donation_breakdown (label, percent, color, sort_order) VALUES
  ('Relief & Support Programs', 60, 'primary', 1),
  ('Education & Skills Training', 20, 'accent', 2),
  ('Healthcare & Blood Drives', 15, 'primary', 3),
  ('Administrative & Operations', 5, 'muted', 4);
