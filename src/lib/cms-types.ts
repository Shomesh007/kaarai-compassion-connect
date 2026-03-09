/* ------------------------------------------------------------------ */
/*  CMS TypeScript types – mirrors the Supabase database schema       */
/* ------------------------------------------------------------------ */

/** site_settings – single-row table for global config */
export interface SiteSettings {
  id: number;
  org_name: string;
  tagline_tamil: string;
  tagline_english: string;
  hero_description: string;
  registration_info: string;
  founder_name: string;
  founder_image_url: string;
  founder_quote: string;
  founder_message: string[];
  about_intro: string;
  about_expanded: string[];
  about_motto: string;
  logo_url: string;
  email: string;
  phone_display: string;
  phone_tel: string;
  address: string;
  instagram_url: string;
  facebook_url: string;
  blood_donation_url: string;
  created_at: string;
  updated_at: string;
}

/** services */
export interface Service {
  id: number;
  title: string;
  description: string;
  icon_name: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

/** impact_categories (gallery) */
export interface ImpactCategory {
  id: number;
  title: string;
  description: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  images: ImpactImage[];
}

/** impact_images */
export interface ImpactImage {
  id: number;
  category_id: number;
  url: string;
  caption: string;
  sort_order: number;
  created_at: string;
}

/** events */
export interface CMSEvent {
  id: number;
  title: string;
  date_display: string;
  event_date: string;
  location: string;
  description_html: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

/** sponsors */
export interface Sponsor {
  id: number;
  name: string;
  logo_url: string;
  website_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

/** team_members */
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  category: "leadership" | "advisor" | "ec_member";
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

/** fundraising_campaigns */
export interface Campaign {
  id: number;
  title: string;
  description: string;
  raised: number;
  goal: number;
  supporters: number;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

/** donation_breakdown */
export interface DonationBreakdown {
  id: number;
  label: string;
  percent: number;
  color: string;
  sort_order: number;
  created_at: string;
}

/** volunteer_signups – for storing form submissions */
export interface VolunteerSignup {
  id: number;
  name: string;
  phone: string;
  email: string;
  interest: string;
  created_at: string;
}

/** latest_updates – news/announcements */
export interface LatestUpdate {
  id: number;
  title: string;
  summary: string;
  category: string;
  badge_text: string;
  badge_color: string;
  image_url: string | null;
  link_url: string | null;
  published_at: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

/** media_gallery – images and videos */
export interface MediaItem {
  id: number;
  title: string;
  description: string;
  media_type: "image" | "video";
  url: string;
  thumbnail_url: string | null;
  video_embed_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}
