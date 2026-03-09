import AdminCrudPage, { type FieldDef } from "@/components/admin/AdminCrudPage";

const fields: FieldDef[] = [
  { name: "title", label: "Title", type: "text", required: true, placeholder: "e.g. Community Event 2025" },
  { name: "description", label: "Description", type: "textarea", placeholder: "Brief description..." },
  {
    name: "media_type",
    label: "Media Type",
    type: "select",
    options: [
      { value: "image", label: "Image" },
      { value: "video", label: "Video" },
    ],
  },
  { name: "url", label: "Media File", type: "image", required: true, uploadFolder: "media-gallery" },
  { name: "thumbnail_url", label: "Thumbnail (for videos)", type: "image", uploadFolder: "media-gallery/thumbs" },
  { name: "video_embed_url", label: "Video Embed URL (YouTube/Vimeo)", type: "text", placeholder: "https://www.youtube.com/embed/..." },
  { name: "sort_order", label: "Sort Order", type: "number" },
  { name: "is_active", label: "Active", type: "toggle", defaultValue: true },
];

const listColumns = [
  {
    key: "url",
    label: "Preview",
    render: (val: unknown, row: Record<string, unknown>) => {
      if (row.media_type === "video" && row.thumbnail_url) {
        return <img src={String(row.thumbnail_url)} alt="" className="w-12 h-9 rounded-lg object-cover border" />;
      }
      return val ? (
        <img src={String(val)} alt="" className="w-12 h-9 rounded-lg object-cover border" />
      ) : (
        <span className="text-muted-foreground text-xs">—</span>
      );
    },
  },
  { key: "title", label: "Title" },
  {
    key: "media_type",
    label: "Type",
    render: (val: unknown) => (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${val === "video" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>
        {val === "video" ? "🎬 Video" : "🖼️ Image"}
      </span>
    ),
  },
  {
    key: "is_active",
    label: "Status",
    render: (val: unknown) => (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${val ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
        {val ? "Active" : "Inactive"}
      </span>
    ),
  },
];

export default function AdminMediaGallery() {
  return (
    <AdminCrudPage
      title="Media Gallery"
      table="media_gallery"
      fields={fields}
      listColumns={listColumns}
      orderBy="sort_order"
    />
  );
}
