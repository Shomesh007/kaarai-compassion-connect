/* ------------------------------------------------------------------ */
/*  Fallback / default data used when Supabase is not configured or   */
/*  when a query fails. This preserves the original hardcoded content. */
/* ------------------------------------------------------------------ */

import type {
  SiteSettings,
  Service,
  ImpactCategory,
  CMSEvent,
  LatestUpdate,
  MediaItem,
  Sponsor,
  TeamMember,
  Campaign,
  DonationBreakdown,
} from "./cms-types";

/* ---- Site Settings ---- */
export const defaultSiteSettings: SiteSettings = {
  id: 1,
  org_name: "Kaarai Karangal",
  tagline_tamil: "யாதும் ஊரே யாவரும் கேளிர்",
  tagline_english: "All towns are our home, all people our kin",
  hero_description:
    "Serving marginalized communities across Tamil Nadu and Puducherry through food, shelter, education, and blood donation drives. All towns are our home, all people our kin.",
  registration_info:
    "Registered NGO (Reg. No. 31/2025 — Registered on fourth february 2025)",
  founder_name: "Dr.E.Vishnuvarthan",
  founder_image_url: "/img/founder.jpg",
  founder_quote:
    "When compassion becomes action, humanity blossoms.",
  founder_message: [
    "Vanakkam and warm greetings to all!",
    "The story of Kaarai Karangal Social Service Organization began with a heartfelt dream — a dream to build a community where kindness flows freely and every helping hand becomes a source of hope. From humble beginnings, we have grown into a family bound by compassion, selflessness, and an unwavering commitment to serve humanity.",
    'The inspiration behind Karai Karangal came from witnessing the silent struggles of people around us — those who needed help, comfort, and a sense of belonging. I realized that change begins not with wealth or power, but with a single thought: "How can I make someone\'s life better today?" That thought became our mission.',
    'Over the years, we have worked passionately in areas such as blood donation, healthcare support, education assistance, environmental awareness, and community welfare. Each initiative reflects our belief that "service to others is the purest form of love." We are not just an organization — we are a movement of hearts determined to make the world a kinder place.',
    "Every drop of blood donated, every meal shared, and every smile restored reminds us why we started this journey. It's not about recognition or rewards; it's about humanity — about standing together when someone needs us the most.",
    "As the founder, I feel deeply humbled and grateful for all our volunteers, supporters, and well-wishers who continue to strengthen this mission. You are the true pillars of Kaarai Karangal. Together, we can continue to light lives, spread hope, and prove that compassion still reigns in this world.",
    "Let us join hands to keep this spirit alive — because when hearts unite in service, miracles happen.",
  ],
  about_intro:
    'Kaarai Karangal is a social service organization based at K7 Hall, No.36/6 Kennadiyar street, Karaikal 609 602, dedicated to serving marginalized communities across Tamil Nadu and Puducherry. Founded on the timeless Tamil principle of "யாதும் ஊரே யாவரும் கேளிர்" — meaning all towns are our home and all people our kin — we believe in the power of compassion to transform lives.',
  about_expanded: [
    "Our journey began with a simple idea: that every person deserves dignity, care, and opportunity regardless of their circumstances. What started as small community gatherings to provide meals has grown into a comprehensive social welfare initiative touching thousands of lives.",
    "We are driven by the belief that real change happens when communities come together. Through our various programs — from hunger relief to education support, from emergency shelter to blood donation drives — we unite people from all walks of life in acts of service and compassion.",
    "Registered NGO (Reg. No. 31/2025 — Registered on fourth february 2025), Kaarai Karangal operates with complete transparency and accountability. Every contribution goes directly toward serving those in need, building a society where compassion is visible and tangible.",
  ],
  about_motto: "Together, we make compassion visible.",
  logo_url: "/img/logo.jpg",
  email: "kaaraikarangal@gmail.com",
  phone_display: "+91 82205 73306",
  phone_tel: "+918220573306",
  address: "K7 Hall, No.36/6 Kennadiyar street, Karaikal 609 602.",
  instagram_url:
    "https://www.instagram.com/kaarai_karangal?igsh=YzY1OWkxdG5wemg1",
  facebook_url: "https://www.facebook.com/share/17KJ5ARhmN/",
  blood_donation_url: "https://kaaraikarangal.netlify.app/",
  created_at: "",
  updated_at: "",
};

/* ---- Services ---- */
export const defaultServices: Service[] = [
  {
    id: 1,
    title: "Food & Hunger Relief",
    description:
      "Daily meal distribution and emergency food support for those in need",
    icon_name: "Utensils",
    sort_order: 1,
    is_active: true,
    created_at: "",
  },
  {
    id: 2,
    title: "Shelter & Emergency Support",
    description:
      "Temporary housing and crisis intervention for vulnerable families",
    icon_name: "Home",
    sort_order: 2,
    is_active: true,
    created_at: "",
  },
  {
    id: 3,
    title: "Blood Donation Drives",
    description:
      "Regular blood donation camps saving lives in our communities",
    icon_name: "Droplet",
    sort_order: 3,
    is_active: true,
    created_at: "",
  },
  {
    id: 4,
    title: "Education Support",
    description:
      "Scholarships and learning materials for underprivileged students",
    icon_name: "BookOpen",
    sort_order: 4,
    is_active: true,
    created_at: "",
  },
  {
    id: 5,
    title: "Community Welfare",
    description:
      "Health camps, skills training, and community development programs",
    icon_name: "Users",
    sort_order: 5,
    is_active: true,
    created_at: "",
  },
];

/* ---- Impact / Gallery ---- */
export const defaultImpactCategories: ImpactCategory[] = [
  {
    id: 1,
    title: "ID Cards for Government School Students",
    description: "Empowering students with identity and dignity",
    sort_order: 1,
    is_active: true,
    created_at: "",
    images: [
      { id: 1, category_id: 1, url: "/img/id1.jpg", caption: "ID card front example — student photo and details", sort_order: 1, created_at: "" },
      { id: 2, category_id: 1, url: "/img/id2.jpg", caption: "ID card back example — school & contact info", sort_order: 2, created_at: "" },
      { id: 3, category_id: 1, url: "/img/id3.jpg", caption: "Printed sample attached to lanyard", sort_order: 3, created_at: "" },
      { id: 4, category_id: 1, url: "/img/id4.jpg", caption: "Batch of ID cards ready for distribution", sort_order: 4, created_at: "" },
    ],
  },
  {
    id: 2,
    title: "School Bags for Children in Need",
    description: "Providing school bags and supplies to help children attend school",
    sort_order: 2,
    is_active: true,
    created_at: "",
    images: [
      { id: 5, category_id: 2, url: "/img/bag1.jpg", caption: "School bags ready for distribution", sort_order: 1, created_at: "" },
      { id: 6, category_id: 2, url: "/img/bag2.jpg", caption: "Volunteers packing school supplies", sort_order: 2, created_at: "" },
      { id: 7, category_id: 2, url: "/img/bag3.jpg", caption: "Children receiving school bags", sort_order: 3, created_at: "" },
      { id: 8, category_id: 2, url: "/img/bag5.jpg", caption: "Supplies and materials inside the bags", sort_order: 4, created_at: "" },
    ],
  },
  {
    id: 3,
    title: "Elderly Care & Support",
    description: "Providing essentials and compassion to senior citizens",
    sort_order: 3,
    is_active: true,
    created_at: "",
    images: [
      { id: 9, category_id: 3, url: "/img/elder1.jpg", caption: "Home visit: health & companionship", sort_order: 1, created_at: "" },
      { id: 10, category_id: 3, url: "/img/elder2.jpg", caption: "Distribution of essential supplies to seniors", sort_order: 2, created_at: "" },
      { id: 11, category_id: 3, url: "/img/elder3.jpg", caption: "Community care activities for elderly", sort_order: 3, created_at: "" },
      { id: 12, category_id: 3, url: "/img/elder4.jpg", caption: "Wellness check-up program in progress", sort_order: 4, created_at: "" },
      { id: 13, category_id: 3, url: "/img/elder5.jpg", caption: "Volunteers assisting daily needs", sort_order: 5, created_at: "" },
    ],
  },
];

/* ---- Events ---- */
export const defaultEvents: CMSEvent[] = [
  {
    id: 1,
    title: "Where Strings Meet Souls — A New Chapter in the Art of Puppetry",
    date_display: "22nd February 2026, 6:00 PM",
    event_date: "2026-02-22T18:00:00",
    location: "Karaikal Beach",
    description_html: `<p>On <strong>22nd February 2026, at 6:00 PM</strong>, the serene shores of Karaikal Beach will transform into a living stage for an extraordinary artistic experience.</p>
<p><strong>Kaarai Karangal Social Service Organization</strong>, in its continued journey of nurturing art with purpose, proudly presents a unique puppetry performance by <strong>Kaarai Raman Creations</strong> — a show that gently breaks boundaries and redefines tradition.</p>
<p><em>This is not a usual puppetry show.</em> Here, puppets do not remain confined to strings or silence. They move with life, dance with human performers, and share the stage as equals. Humans and puppets respond to each other — not as controller and controlled — but as co-artists, breathing emotion, rhythm, and storytelling together.</p>
<div><strong>✨ The novelty of this puppetry art lies in its union:</strong>
<ul><li>Where wood and flesh dance in harmony</li><li>Where art transcends age, language, and form</li><li>Where imagination gently reminds us that life exists even in the smallest movements</li></ul></div>
<p>Set against the timeless rhythm of the sea, this performance is a celebration of creativity, sensitivity, and human connection.</p>
<p>Through this presentation, Kaarai Karangal continues its mission of bringing meaningful art to the community — art that touches hearts, inspires minds, and preserves cultural roots while allowing them to grow in new directions.</p>
<p><strong>🌟 Come, witness puppetry not as you have seen before — but as you have never imagined.</strong></p>`,
    is_active: true,
    sort_order: 1,
    created_at: "",
  },
];

/* ---- Sponsors ---- */
export const defaultSponsors: Sponsor[] = [
  { id: 1, name: "Sekar textiles", logo_url: "/img/sekars_logo.png", website_url: null, sort_order: 1, is_active: true, created_at: "" },
  { id: 2, name: "Thaai Interiors", logo_url: "/img/Thaai_Interiors_Logo.jpg", website_url: null, sort_order: 2, is_active: true, created_at: "" },
  { id: 3, name: "GL Hospital", logo_url: "/img/gl_hospital_logo.jpg", website_url: null, sort_order: 3, is_active: true, created_at: "" },
  { id: 4, name: "Fitness Zone Unisex Gym", logo_url: "/img/fitness_zone_logo.jpg", website_url: null, sort_order: 4, is_active: true, created_at: "" },
  { id: 5, name: "Zen Healthcare", logo_url: "/img/zen.png", website_url: null, sort_order: 5, is_active: true, created_at: "" },
  { id: 6, name: "Royal Cards", logo_url: "/img/royal_cards.jpg", website_url: null, sort_order: 6, is_active: true, created_at: "" },
  { id: 7, name: "Studie 'O 7", logo_url: "/img/studio7.jpg", website_url: null, sort_order: 7, is_active: true, created_at: "" },
];

/* ---- Team ---- */
export const defaultTeamMembers: TeamMember[] = [
  { id: 1, name: "GURU. Padmasree, Kalaimamani Mr.K.Kesavasamy", role: "Hon'ble President", category: "leadership", sort_order: 1, is_active: true, created_at: "" },
  { id: 2, name: "Mrs.A.Jemuna", role: "President", category: "leadership", sort_order: 2, is_active: true, created_at: "" },
  { id: 3, name: "Dr.E.Vishnuvarthan", role: "Founder & Secretary", category: "leadership", sort_order: 3, is_active: true, created_at: "" },
  { id: 4, name: "Mrs.C.Brundha", role: "Joint Secretary", category: "leadership", sort_order: 4, is_active: true, created_at: "" },
  { id: 5, name: "Hr.K.Parthiban", role: "Deputy Secretary 1", category: "leadership", sort_order: 5, is_active: true, created_at: "" },
  { id: 6, name: "Mr.A. Manikandaprabhu", role: "Deputy Secretary 2", category: "leadership", sort_order: 6, is_active: true, created_at: "" },
  { id: 7, name: "Mr.G. Surya", role: "Treasurer", category: "leadership", sort_order: 7, is_active: true, created_at: "" },
  { id: 8, name: "Mrs.D. Nivetha", role: "Joint Treasurer", category: "leadership", sort_order: 8, is_active: true, created_at: "" },
  { id: 9, name: "Lr. M.Muruganandham", role: "Legal Advisor", category: "leadership", sort_order: 9, is_active: true, created_at: "" },
  { id: 10, name: "Mr.M.Mohamed Arif Maraicar", role: "PROs", category: "leadership", sort_order: 10, is_active: true, created_at: "" },
  { id: 11, name: "Mr.S.Anbarasan", role: "PROs", category: "leadership", sort_order: 11, is_active: true, created_at: "" },
  { id: 12, name: "Mr.A.Ramji", role: "Membership Coordinator", category: "leadership", sort_order: 12, is_active: true, created_at: "" },
  { id: 13, name: "Mr.T.Udhayakumar", role: "Event Coordinator", category: "leadership", sort_order: 13, is_active: true, created_at: "" },
  { id: 14, name: "Mr.M.Abdul Kareem", role: "Event Coordinator", category: "leadership", sort_order: 14, is_active: true, created_at: "" },
  { id: 15, name: "Mr.J.Vigneshraj", role: "Event Coordinator", category: "leadership", sort_order: 15, is_active: true, created_at: "" },
  // Advisors
  { id: 16, name: "Dr.Uma Maheshwari", role: "Advisor", category: "advisor", sort_order: 1, is_active: true, created_at: "" },
  { id: 17, name: "Dr.LSP. Sozhasingarayar", role: "Advisor", category: "advisor", sort_order: 2, is_active: true, created_at: "" },
  { id: 18, name: "Mr.J. Krishnan", role: "Advisor", category: "advisor", sort_order: 3, is_active: true, created_at: "" },
  { id: 19, name: "Mr.Parisravi", role: "Advisor", category: "advisor", sort_order: 4, is_active: true, created_at: "" },
  { id: 20, name: "Dr.R. Ashokkumar", role: "Advisor", category: "advisor", sort_order: 5, is_active: true, created_at: "" },
  { id: 21, name: "Mr.T. Balraj", role: "Advisor", category: "advisor", sort_order: 6, is_active: true, created_at: "" },
  { id: 22, name: "Mr.S.John Kennady", role: "Advisor", category: "advisor", sort_order: 7, is_active: true, created_at: "" },
  { id: 23, name: "Mr.KMS.Karthigeyan", role: "Advisor", category: "advisor", sort_order: 8, is_active: true, created_at: "" },
  { id: 24, name: "Dr.A. Vinothkumar", role: "Advisor", category: "advisor", sort_order: 9, is_active: true, created_at: "" },
  { id: 25, name: "Mr.R.Muthukumar", role: "Advisor", category: "advisor", sort_order: 10, is_active: true, created_at: "" },
  // EC Members
  { id: 26, name: "Er.B.Sugumar", role: "EC Member", category: "ec_member", sort_order: 1, is_active: true, created_at: "" },
  { id: 27, name: "Dr.N.Harimathi", role: "EC Member", category: "ec_member", sort_order: 2, is_active: true, created_at: "" },
  { id: 28, name: "Lr.P.Jananika", role: "EC Member", category: "ec_member", sort_order: 3, is_active: true, created_at: "" },
  { id: 29, name: "Er.S.Thirumalaivasan", role: "EC Member", category: "ec_member", sort_order: 4, is_active: true, created_at: "" },
  { id: 30, name: "Mr.M.Vijaykumar", role: "EC Member", category: "ec_member", sort_order: 5, is_active: true, created_at: "" },
  { id: 31, name: "Er.B.Anbukumaran", role: "EC Member", category: "ec_member", sort_order: 6, is_active: true, created_at: "" },
  { id: 32, name: "Mr.T.Ayyappan", role: "EC Member", category: "ec_member", sort_order: 7, is_active: true, created_at: "" },
  { id: 33, name: "Mr.R.Ake bachienen", role: "EC Member", category: "ec_member", sort_order: 8, is_active: true, created_at: "" },
  { id: 34, name: "Miss.S.Vigneswary", role: "EC Member", category: "ec_member", sort_order: 9, is_active: true, created_at: "" },
];

/* ---- Campaigns ---- */
export const defaultCampaigns: Campaign[] = [
  {
    id: 1,
    title: "Emergency Food Relief",
    description: "Providing meals to 500 families affected by recent floods",
    raised: 125000,
    goal: 200000,
    supporters: 89,
    is_active: true,
    sort_order: 1,
    created_at: "",
  },
  {
    id: 2,
    title: "Education Scholarships 2025",
    description: "Supporting 50 underprivileged students with books and fees",
    raised: 75000,
    goal: 150000,
    supporters: 45,
    is_active: true,
    sort_order: 2,
    created_at: "",
  },
  {
    id: 3,
    title: "Community Health Camp",
    description: "Free medical check-ups and medicines for rural areas",
    raised: 40000,
    goal: 80000,
    supporters: 32,
    is_active: true,
    sort_order: 3,
    created_at: "",
  },
];

/* ---- Donation Breakdown ---- */
export const defaultDonationBreakdown: DonationBreakdown[] = [
  { id: 1, label: "Relief & Support Programs", percent: 60, color: "primary", sort_order: 1, created_at: "" },
  { id: 2, label: "Education & Skills Training", percent: 20, color: "accent", sort_order: 2, created_at: "" },
  { id: 3, label: "Healthcare & Blood Drives", percent: 15, color: "primary", sort_order: 3, created_at: "" },
  { id: 4, label: "Administrative & Operations", percent: 5, color: "muted", sort_order: 4, created_at: "" },
];

/* ---- Latest Updates ---- */
export const defaultLatestUpdates: LatestUpdate[] = [
  { id: 1, title: "Puppetry Performance at Karaikal Beach", summary: "A unique puppetry show by Kaarai Raman Creations — where strings meet souls. Join us on 22nd Feb 2026!", category: "event", badge_text: "🎭 Event", badge_color: "accent", image_url: null, link_url: null, published_at: "2026-02-15T10:00:00+05:30", is_active: true, sort_order: 1, created_at: "" },
  { id: 2, title: "Blood Donation Camp — 200+ Units Collected", summary: "Our latest blood donation drive was a massive success with over 200 units collected, saving hundreds of lives.", category: "achievement", badge_text: "🩸 Achievement", badge_color: "primary", image_url: null, link_url: null, published_at: "2026-01-20T10:00:00+05:30", is_active: true, sort_order: 2, created_at: "" },
  { id: 3, title: "School Bags Distributed to 500+ Students", summary: "Kaarai Karangal distributed school bags and supplies to over 500 government school students across Karaikal.", category: "milestone", badge_text: "🎒 Milestone", badge_color: "primary", image_url: null, link_url: null, published_at: "2025-12-10T10:00:00+05:30", is_active: true, sort_order: 3, created_at: "" },
  { id: 4, title: "New Partnership with GL Hospital", summary: "We are proud to announce our partnership with GL Hospital for free health camps in rural communities.", category: "news", badge_text: "🏥 Partnership", badge_color: "accent", image_url: null, link_url: null, published_at: "2025-11-05T10:00:00+05:30", is_active: true, sort_order: 4, created_at: "" },
  { id: 5, title: "Elder Care Program Expanded", summary: "Our elderly care initiative now covers 3 additional villages, providing daily essentials and companionship to senior citizens.", category: "milestone", badge_text: "🤝 Expansion", badge_color: "primary", image_url: null, link_url: null, published_at: "2025-10-15T10:00:00+05:30", is_active: true, sort_order: 5, created_at: "" },
  { id: 6, title: "Volunteer Registration Open for 2026", summary: "Join our growing family of volunteers! Registration is now open for all upcoming programs in 2026.", category: "news", badge_text: "📢 Open Now", badge_color: "accent", image_url: null, link_url: null, published_at: "2026-01-01T10:00:00+05:30", is_active: true, sort_order: 6, created_at: "" },
];

/* ---- Media Gallery ---- */
export const defaultMediaGallery: MediaItem[] = [
  { id: 1, title: "Blood Donation Camp 2025", description: "Volunteers and donors at our annual blood donation drive", media_type: "image", url: "/img/elder1.jpg", thumbnail_url: null, video_embed_url: null, sort_order: 1, is_active: true, created_at: "" },
  { id: 2, title: "School Bag Distribution", description: "Children receiving school bags at the distribution event", media_type: "image", url: "/img/bag1.jpg", thumbnail_url: null, video_embed_url: null, sort_order: 2, is_active: true, created_at: "" },
  { id: 3, title: "ID Card Program", description: "Students proudly showing their new ID cards", media_type: "image", url: "/img/id1.jpg", thumbnail_url: null, video_embed_url: null, sort_order: 3, is_active: true, created_at: "" },
  { id: 4, title: "Elder Care Visit", description: "Our team visiting senior citizens with essential supplies", media_type: "image", url: "/img/elder2.jpg", thumbnail_url: null, video_embed_url: null, sort_order: 4, is_active: true, created_at: "" },
  { id: 5, title: "Community Gathering", description: "Volunteers and community members coming together", media_type: "image", url: "/img/bag2.jpg", thumbnail_url: null, video_embed_url: null, sort_order: 5, is_active: true, created_at: "" },
  { id: 6, title: "Kaarai Karangal Introduction", description: "Watch our story — how compassion becomes action", media_type: "video", url: "", thumbnail_url: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg", video_embed_url: "https://www.youtube.com/embed/dQw4w9WgXcQ", sort_order: 6, is_active: true, created_at: "" },
];
