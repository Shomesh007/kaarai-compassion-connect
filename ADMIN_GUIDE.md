# 🛡️ Kaarai Karangal — Admin Panel Guide

## 📋 Table of Contents

1. [Getting Started](#getting-started)
2. [Dashboard Overview](#dashboard-overview)
3. [Managing Content](#managing-content)
4. [Image & Media Uploads](#image--media-uploads)
5. [Section-by-Section Guide](#section-by-section-guide)
6. [Supabase Free Tier Limits](#supabase-free-tier-limits)
7. [Tips for Staying Within Limits](#tips-for-staying-within-limits)
8. [Troubleshooting](#troubleshooting)

---

## Getting Started

### Login

1. Go to **`yoursite.com/admin/login`**
2. Enter your admin credentials:
   - **Email:** `admin@kaaraikarangal.com`
   - **Password:** *(your admin password)*
3. Click **Sign In**

### Navigation

After logging in, you'll see a **sidebar** on the left with all content sections. Click any section to manage it.

- **View Site** — Opens the public website in a new context
- **Sign Out** — Logs you out of the admin panel

---

## Dashboard Overview

The dashboard shows a **card for each content section** with the number of items. Click any card to jump directly to that section.

At the bottom, there's a **Site Settings** card for editing global configuration.

---

## Managing Content

### Adding New Items

1. Navigate to the section (e.g., Services, Events)
2. Click the **"+ Add New"** button (top right)
3. Fill in the form fields
4. Click **"Create"**

### Editing Items

1. Find the item in the table
2. Click the **✏️ pencil icon** on the right
3. Modify the fields
4. Click **"Update"**

### Deleting Items

1. Click the **🗑️ trash icon** on the item
2. Confirm deletion in the popup
3. ⚠️ **This cannot be undone!**

### Sorting

Most sections have a **Sort Order** field. Lower numbers appear first. Use this to control the display order on the website.

### Active/Inactive Toggle

Many items have an **Active** toggle. Set to **Inactive** to hide an item from the website without deleting it.

---

## Image & Media Uploads

### How to Upload

1. In any image field, click the **"Upload"** button
2. Select an image from your computer
3. The image is automatically:
   - **Compressed** to max 800×800px (keeps aspect ratio)
   - **Converted to WebP** format (70% smaller than JPEG)
   - **Uploaded** to Supabase Storage
4. A preview appears after upload

### Using External URLs

Instead of uploading, you can paste an image URL directly into the text field. This is useful for:
- Images already hosted elsewhere (e.g., Google Drive, social media)
- Saving storage space on Supabase

### Removing Images

Click the **red ✕ button** on the image preview to remove it.

### Supported Formats

- **Images:** JPG, PNG, WebP, GIF
- **Videos:** MP4, WebM (for Media Gallery)

### ⚠️ Image Size Tips

| Action | Recommended |
|--------|-------------|
| Sponsor logos | Under 100 KB each |
| Gallery images | Under 200 KB each |
| Media showcase | Under 300 KB each |
| Latest updates | Under 150 KB each |
| Use external URLs | For large/many images |

---

## Section-by-Section Guide

### 🏢 Site Settings (`/admin/site-settings`)

This is a **single form** (not a list) that controls global website content:

| Field | What it controls |
|-------|-----------------|
| Organization Name | Header, footer, everywhere the org name appears |
| Tagline Tamil/English | Hero section taglines |
| Hero Description | Text below taglines on homepage |
| Registration Info | Registration number shown on site |
| Logo | Organization logo (header, footer) |
| About Intro | First paragraph of About section |
| About Expanded | Additional paragraphs (click "Add Paragraph" for more) |
| About Motto | Motto text in About section |
| Founder Name | Founder's name |
| Founder Image | Founder's photo |
| Founder Quote | Quote displayed in About section |
| Founder Message | Expandable message paragraphs |
| Email, Phone, Address | Contact information (footer, volunteer section) |
| Instagram/Facebook URL | Social media links |
| Blood Donation URL | Link for blood donation button |

**Click "Save Changes"** after editing. A green "Saved!" confirmation appears.

### ⭐ Services (`/admin/services`)

Each service has:
- **Title** — Service name (e.g., "Elder Care")
- **Description** — What the service does
- **Icon** — Choose from dropdown (Heart, Users, Home, etc.)
- **Sort Order** — Display order
- **Active** — Show/hide on website

### 📅 Events (`/admin/events`)

- **Title** — Event name
- **Display Date** — Human-readable date (e.g., "March 15, 2025")
- **Event Date** — Machine date format (YYYY-MM-DD)
- **Location** — Where the event takes place
- **Description HTML** — Supports HTML tags for rich formatting:
  ```html
  <p>Join us for our <strong>annual gala</strong>!</p>
  <ul>
    <li>Free entry</li>
    <li>Food provided</li>
  </ul>
  ```

### 📰 Latest Updates (`/admin/latest-updates`)

- **Title** — Update headline
- **Summary** — Brief description
- **Category** — milestone, event, announcement, impact, partnership, campaign
- **Badge Text** — Shown as a tag (e.g., "🎉 Milestone")
- **Badge Color** — Choose from preset colors
- **Image** — Optional photo (upload or URL)
- **Link URL** — Optional link for "Read More"
- **Published Date** — When the update was published

### 🎬 Media Gallery (`/admin/media-gallery`)

Supports both **images** and **videos**:

**For Images:**
1. Set Media Type to **"Image"**
2. Upload the image or paste URL

**For Videos:**
1. Set Media Type to **"Video"**
2. Upload a thumbnail image
3. Paste the **YouTube/Vimeo embed URL** in the "Video Embed URL" field
   - YouTube: `https://www.youtube.com/embed/VIDEO_ID`
   - Vimeo: `https://player.vimeo.com/video/VIDEO_ID`

### 🖼️ Impact Gallery (`/admin/impact-gallery`)

This has a **two-panel layout**:

**Left Panel — Categories:**
1. Click **"+ Add Category"** to create a new category
2. Click a category to select it
3. Edit/delete categories with the pencil/trash icons

**Right Panel — Images:**
1. Select a category first
2. Click **"+ Add Image"** to upload images
3. Hover over images to see edit/delete buttons
4. Each image can have a caption

### 🤝 Sponsors (`/admin/sponsors`)

- **Name** — Sponsor/partner name
- **Logo** — Upload logo image (keep under 100 KB!)
- **Website URL** — Optional link to sponsor's website

### 👥 Team Members (`/admin/team`)

- **Name** — Full name
- **Role** — Title/position
- **Category** — Leadership, Advisor, or EC Member
- **Sort Order** — Display order within category

### 💰 Campaigns (`/admin/campaigns`)

- **Title** — Campaign name
- **Description** — What the campaign is for
- **Raised** — Amount raised so far (in ₹)
- **Goal** — Target amount (in ₹)
- **Supporters** — Number of supporters

### 📊 Donation Breakdown (`/admin/donations`)

Controls the pie chart showing how donations are used:
- **Label** — Category name (e.g., "Elder Care Programs")
- **Percentage** — Must add up to 100% across all items
- **Color** — Choose from preset colors

### 📋 Volunteer Signups (`/admin/volunteers`)

This is a **read-only** view of form submissions:
- View all volunteer signups with name, phone, email, interest
- Click phone/email to call or email directly
- **Export CSV** — Download all signups as a spreadsheet
- Delete individual entries if needed

---

## Supabase Free Tier Limits

Your website runs on Supabase's **Free Plan**. Here are the key limits:

| Resource | Free Tier Limit | Current Usage | Status |
|----------|----------------|---------------|--------|
| **Database** | 500 MB | ~11 MB | ✅ Plenty of room |
| **Storage** | 1 GB | ~0 MB | ✅ Fresh |
| **Bandwidth** | 5 GB/month | Varies | ⚠️ Monitor monthly |
| **Auth Users** | 50,000 MAU | 1 | ✅ Fine |
| **Edge Functions** | 500K invocations | 0 | ✅ Not used |
| **Realtime** | 200 concurrent | 0 | ✅ Not used |

### What counts toward limits:

- **Database (500 MB):** All your text content, settings, team members, etc. Text data is tiny — you could have thousands of records and barely use 1% of this.
- **Storage (1 GB):** Uploaded images and videos. **This is the main limit to watch.** Each compressed image is ~30-100 KB, so you can store roughly **3,000-10,000 images**.
- **Bandwidth (5 GB/month):** Every time someone visits your site and loads images from Supabase Storage. A single page visit might use 1-5 MB.

---

## Tips for Staying Within Limits

### 🖼️ Images (Most Important)

1. **Images are auto-compressed** — The admin panel automatically compresses images to WebP format at max 800×800px before uploading. This reduces file sizes by 70-90%.

2. **Use external image URLs when possible** — Instead of uploading to Supabase, host images on:
   - **Google Drive** (make link public)
   - **Imgur** (free image hosting)
   - **Your existing website hosting**
   - Just paste the URL in the image field instead of clicking Upload

3. **Keep images small** — Before uploading:
   - Resize to max 1200px wide
   - Use JPG/WebP format
   - Aim for under 200 KB per image

4. **Use local images** — Images in the `/public/img/` folder are served from your web hosting (not Supabase), so they don't count toward storage limits. The existing sponsor logos and gallery images use this approach.

### 📊 Database

- Text content uses almost no space — don't worry about this
- Volunteer signups accumulate over time — export and delete old ones periodically

### 🌐 Bandwidth

- Images served from Supabase Storage count toward bandwidth
- If you get high traffic, consider moving frequently-accessed images to your web hosting's `/public/img/` folder
- The auto-compression helps reduce bandwidth per image load

### 📈 When to Upgrade

Consider upgrading to the **Pro Plan ($25/month)** if:
- Storage exceeds 800 MB
- Monthly bandwidth consistently exceeds 4 GB
- You need more than 1 project

---

## Troubleshooting

### "Cannot sign in"
- Check email and password are correct
- Make sure you're at `/admin/login` (not `/admin`)
- Clear browser cache and try again

### "Upload failed"
- Check file size (max 50 MB per file)
- Ensure the file is an image (JPG, PNG, WebP, GIF)
- Check your internet connection

### "Changes not showing on website"
- The website caches data for 5 minutes
- Hard refresh the page: `Ctrl + Shift + R`
- Wait 5 minutes and refresh again

### "Database read-only error"
- This means you've hit the 500 MB database limit
- Go to Supabase Dashboard → delete unused data
- Or upgrade to Pro Plan

### Need Help?
Contact the developer who set up this system.
