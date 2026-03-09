/* ------------------------------------------------------------------ */
/*  React Query hooks for fetching CMS data from Supabase.            */
/*  Each hook falls back to local default data when Supabase is not   */
/*  configured or when a query fails.                                 */
/* ------------------------------------------------------------------ */

import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type {
  SiteSettings,
  Service,
  ImpactCategory,
  ImpactImage,
  CMSEvent,
  Sponsor,
  TeamMember,
  Campaign,
  DonationBreakdown,
  LatestUpdate,
  MediaItem,
} from "@/lib/cms-types";
import {
  defaultSiteSettings,
  defaultServices,
  defaultImpactCategories,
  defaultEvents,
  defaultSponsors,
  defaultTeamMembers,
  defaultCampaigns,
  defaultDonationBreakdown,
  defaultLatestUpdates,
  defaultMediaGallery,
} from "@/lib/cms-fallback";

/** Stale time: 30 minutes – CMS content rarely changes; reduces API calls on free tier */
const STALE_TIME = 30 * 60 * 1000;

/* ================================================================== */
/*  Site Settings                                                     */
/* ================================================================== */
export function useSiteSettings() {
  return useQuery<SiteSettings>({
    queryKey: ["cms", "site_settings"],
    queryFn: async () => {
      if (!isSupabaseConfigured()) return defaultSiteSettings;

      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .limit(1)
        .single();

      if (error || !data) {
        console.warn("CMS: site_settings fetch failed, using fallback", error);
        return defaultSiteSettings;
      }
      return data as SiteSettings;
    },
    staleTime: STALE_TIME,
    placeholderData: defaultSiteSettings,
  });
}

/* ================================================================== */
/*  Services                                                          */
/* ================================================================== */
export function useServices() {
  return useQuery<Service[]>({
    queryKey: ["cms", "services"],
    queryFn: async () => {
      if (!isSupabaseConfigured()) return defaultServices;

      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (error || !data?.length) {
        console.warn("CMS: services fetch failed, using fallback", error);
        return defaultServices;
      }
      return data as Service[];
    },
    staleTime: STALE_TIME,
    placeholderData: defaultServices,
  });
}

/* ================================================================== */
/*  Impact Categories (Gallery) with nested images                    */
/* ================================================================== */
export function useImpactCategories() {
  return useQuery<ImpactCategory[]>({
    queryKey: ["cms", "impact_categories"],
    queryFn: async () => {
      if (!isSupabaseConfigured()) return defaultImpactCategories;

      // Fetch categories
      const { data: categories, error: catError } = await supabase
        .from("impact_categories")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (catError || !categories?.length) {
        console.warn("CMS: impact_categories fetch failed, using fallback", catError);
        return defaultImpactCategories;
      }

      // Fetch all images
      const { data: images, error: imgError } = await supabase
        .from("impact_images")
        .select("*")
        .order("sort_order", { ascending: true });

      if (imgError) {
        console.warn("CMS: impact_images fetch failed", imgError);
      }

      // Nest images into categories
      const imagesByCategory = (images ?? []).reduce<Record<number, ImpactImage[]>>(
        (acc, img) => {
          const catId = (img as ImpactImage).category_id;
          if (!acc[catId]) acc[catId] = [];
          acc[catId].push(img as ImpactImage);
          return acc;
        },
        {},
      );

      return categories.map((cat) => ({
        ...(cat as Omit<ImpactCategory, "images">),
        images: imagesByCategory[cat.id] ?? [],
      })) as ImpactCategory[];
    },
    staleTime: STALE_TIME,
    placeholderData: defaultImpactCategories,
  });
}

/* ================================================================== */
/*  Events                                                            */
/* ================================================================== */
export function useEvents() {
  return useQuery<CMSEvent[]>({
    queryKey: ["cms", "events"],
    queryFn: async () => {
      if (!isSupabaseConfigured()) return defaultEvents;

      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (error || !data?.length) {
        console.warn("CMS: events fetch failed, using fallback", error);
        return defaultEvents;
      }
      return data as CMSEvent[];
    },
    staleTime: STALE_TIME,
    placeholderData: defaultEvents,
  });
}

/* ================================================================== */
/*  Sponsors                                                          */
/* ================================================================== */
export function useSponsors() {
  return useQuery<Sponsor[]>({
    queryKey: ["cms", "sponsors"],
    queryFn: async () => {
      if (!isSupabaseConfigured()) return defaultSponsors;

      const { data, error } = await supabase
        .from("sponsors")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (error || !data?.length) {
        console.warn("CMS: sponsors fetch failed, using fallback", error);
        return defaultSponsors;
      }
      return data as Sponsor[];
    },
    staleTime: STALE_TIME,
    placeholderData: defaultSponsors,
  });
}

/* ================================================================== */
/*  Team Members                                                      */
/* ================================================================== */
export function useTeamMembers() {
  return useQuery<TeamMember[]>({
    queryKey: ["cms", "team_members"],
    queryFn: async () => {
      if (!isSupabaseConfigured()) return defaultTeamMembers;

      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (error || !data?.length) {
        console.warn("CMS: team_members fetch failed, using fallback", error);
        return defaultTeamMembers;
      }
      return data as TeamMember[];
    },
    staleTime: STALE_TIME,
    placeholderData: defaultTeamMembers,
  });
}

/* ================================================================== */
/*  Campaigns                                                         */
/* ================================================================== */
export function useCampaigns() {
  return useQuery<Campaign[]>({
    queryKey: ["cms", "campaigns"],
    queryFn: async () => {
      if (!isSupabaseConfigured()) return defaultCampaigns;

      const { data, error } = await supabase
        .from("campaigns")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (error || !data?.length) {
        console.warn("CMS: campaigns fetch failed, using fallback", error);
        return defaultCampaigns;
      }
      return data as Campaign[];
    },
    staleTime: STALE_TIME,
    placeholderData: defaultCampaigns,
  });
}

/* ================================================================== */
/*  Donation Breakdown                                                */
/* ================================================================== */
export function useDonationBreakdown() {
  return useQuery<DonationBreakdown[]>({
    queryKey: ["cms", "donation_breakdown"],
    queryFn: async () => {
      if (!isSupabaseConfigured()) return defaultDonationBreakdown;

      const { data, error } = await supabase
        .from("donation_breakdown")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error || !data?.length) {
        console.warn("CMS: donation_breakdown fetch failed, using fallback", error);
        return defaultDonationBreakdown;
      }
      return data as DonationBreakdown[];
    },
    staleTime: STALE_TIME,
    placeholderData: defaultDonationBreakdown,
  });
}

/* ================================================================== */
/*  Volunteer Signup (mutation – writes to Supabase)                  */
/* ================================================================== */
export function useVolunteerSignup() {
  return useMutation({
    mutationFn: async (formData: {
      name: string;
      phone: string;
      email: string;
      interest: string;
    }) => {
      if (!isSupabaseConfigured()) {
        // If Supabase is not configured, just resolve successfully
        // (the form still shows the success dialog)
        return { success: true };
      }

      const { error } = await supabase
        .from("volunteer_signups")
        .insert([formData]);

      if (error) {
        console.warn("CMS: volunteer signup insert failed", error);
        // Still resolve – we don't want to block the user experience
        return { success: true, warning: error.message };
      }

      return { success: true };
    },
  });
}

/* ================================================================== */
/*  Latest Updates                                                    */
/* ================================================================== */
export function useLatestUpdates() {
  return useQuery<LatestUpdate[]>({
    queryKey: ["cms", "latest_updates"],
    queryFn: async () => {
      if (!isSupabaseConfigured()) return defaultLatestUpdates;

      const { data, error } = await supabase
        .from("latest_updates")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (error || !data?.length) {
        console.warn("CMS: latest_updates fetch failed, using fallback", error);
        return defaultLatestUpdates;
      }
      return data as LatestUpdate[];
    },
    staleTime: STALE_TIME,
    placeholderData: defaultLatestUpdates,
  });
}

/* ================================================================== */
/*  Media Gallery                                                     */
/* ================================================================== */
export function useMediaGallery() {
  return useQuery<MediaItem[]>({
    queryKey: ["cms", "media_gallery"],
    queryFn: async () => {
      if (!isSupabaseConfigured()) return defaultMediaGallery;

      const { data, error } = await supabase
        .from("media_gallery")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (error || !data?.length) {
        console.warn("CMS: media_gallery fetch failed, using fallback", error);
        return defaultMediaGallery;
      }
      return data as MediaItem[];
    },
    staleTime: STALE_TIME,
    placeholderData: defaultMediaGallery,
  });
}
