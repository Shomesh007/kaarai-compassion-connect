import { supabase } from "./supabase";

/* ------------------------------------------------------------------ */
/*  Image compression — reduces storage & bandwidth on free tier       */
/* ------------------------------------------------------------------ */

const MAX_WIDTH = 800;
const MAX_HEIGHT = 800;
const QUALITY = 0.75; // WebP quality (0-1)
const MAX_FILE_SIZE = 50 * 1024; // 50 KB target for aggressive compression

/**
 * Compress an image file client-side before uploading.
 * - Resizes to max 800×800 (keeps aspect ratio)
 * - Converts to WebP format (70-90% smaller than PNG/JPEG)
 * - Falls back to original if not an image
 */
async function compressImage(file: File): Promise<File> {
  // Only compress image files (not videos)
  if (!file.type.startsWith("image/") || file.type === "image/gif") {
    return file;
  }

  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      let { width, height } = img;

      // Calculate new dimensions maintaining aspect ratio
      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(file);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      // Try WebP first, then JPEG as fallback
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(file);
            return;
          }

          // If still too large, try more aggressive compression
          if (blob.size > MAX_FILE_SIZE) {
            canvas.toBlob(
              (aggressiveBlob) => {
                if (aggressiveBlob && aggressiveBlob.size < file.size) {
                  const name = file.name.replace(/\.[^.]+$/, ".webp");
                  resolve(new File([aggressiveBlob], name, { type: "image/webp" }));
                } else if (blob.size < file.size) {
                  const name = file.name.replace(/\.[^.]+$/, ".webp");
                  resolve(new File([blob], name, { type: "image/webp" }));
                } else {
                  resolve(file);
                }
              },
              "image/webp",
              0.5, // More aggressive quality
            );
            return;
          }

          // Use compressed version if smaller
          if (blob.size < file.size) {
            const name = file.name.replace(/\.[^.]+$/, ".webp");
            resolve(new File([blob], name, { type: "image/webp" }));
          } else {
            resolve(file);
          }
        },
        "image/webp",
        QUALITY,
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(file); // Fall back to original
    };

    img.src = url;
  });
}

/* ------------------------------------------------------------------ */
/*  Upload                                                             */
/* ------------------------------------------------------------------ */

/**
 * Upload a file to Supabase Storage and return the public URL.
 * Images are automatically compressed before upload.
 */
export async function uploadMedia(
  file: File,
  folder: string = "uploads",
): Promise<{ url: string | null; error: string | null }> {
  // Compress images before upload
  const processedFile = await compressImage(file);

  const ext = processedFile.name.split(".").pop() ?? "webp";
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage
    .from("media")
    .upload(fileName, processedFile, {
      cacheControl: "31536000", // 1 year cache (reduces bandwidth)
      upsert: false,
    });

  if (error) {
    return { url: null, error: error.message };
  }

  const { data } = supabase.storage.from("media").getPublicUrl(fileName);
  return { url: data.publicUrl, error: null };
}

/**
 * Delete a file from Supabase Storage by its full URL.
 */
export async function deleteMedia(publicUrl: string): Promise<{ error: string | null }> {
  // Extract path from URL: https://xxx.supabase.co/storage/v1/object/public/media/uploads/file.jpg
  const match = publicUrl.match(/\/storage\/v1\/object\/public\/media\/(.+)$/);
  if (!match) return { error: "Invalid URL" };

  const { error } = await supabase.storage.from("media").remove([match[1]]);
  if (error) return { error: error.message };
  return { error: null };
}
