/**
 * Legacy impactData module – now re-exports from CMS fallback data
 * so existing imports continue to work.
 * Components should migrate to use-cms hooks for live data.
 */

import { defaultImpactCategories, defaultSiteSettings } from "./cms-fallback";

export const impactCategories = defaultImpactCategories;

// utility to flatten all image urls (used for preloading in Hero)
export const allImpactImageUrls = defaultImpactCategories.flatMap((c) =>
  c.images.map((i) => i.url),
);

// Contact, social links and donors
export const contact = {
  display: defaultSiteSettings.phone_display,
  tel: defaultSiteSettings.phone_tel,
};

export const socialLinks = {
  instagram: defaultSiteSettings.instagram_url,
  facebook: defaultSiteSettings.facebook_url,
};

// Owner info
export const owner = {
  name: defaultSiteSettings.org_name,
  ownerName: "Vishnu Varathan",
  contact: contact,
  social: socialLinks,
  note: "Owner contact and social pages for the NGO",
};
