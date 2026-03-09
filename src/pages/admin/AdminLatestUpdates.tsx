import AdminCrudPage, { type FieldDef } from "@/components/admin/AdminCrudPage";

const fields: FieldDef[] = [
  { name: "title", label: "Title", type: "text", required: true, placeholder: "e.g. New Community Center Opens" },
  { name: "summary", label: "Summary", type: "textarea", required: true, placeholder: "Brief description of the update..." },
  {
    name: "category",
    label: "Category",
    type: "select",
    options: [
      { value: "milestone", label: "Milestone" },
      { value: "event", label: "Event" },
      { value: "announcement", label: "Announcement" },
      { value: "impact", label: "Impact" },
      { value: "partnership", label: "Partnership" },
      { value: "campaign", label: "Campaign" },
    ],
  },
  { name: "badge_text", label: "Badge Text", type: "text", placeholder: "e.g. 🎉 Milestone" },
  {
    name: "badge_color",
    label: "Badge Color",
    type: "select",
    options: [
      { value: "bg-primary/10 text-primary", label: "Primary" },
      { value: "bg-accent/10 text-accent", label: "Accent" },
      { value: "bg-green-100 text-green-700", label: "Green" },
      { value: "bg-blue-100 text-blue-700", label: "Blue" },
      { value: "bg-purple-100 text-purple-700", label: "Purple" },
      { value: "bg-orange-100 text-orange-700", label: "Orange" },
      { value: "bg-red-100 text-red-700", label: "Red" },
    ],
  },
  { name: "image_url", label: "Image", type: "image", uploadFolder: "updates" },
  { name: "link_url", label: "Link URL (optional)", type: "text", placeholder: "https://..." },
  { name: "published_at", label: "Published Date (YYYY-MM-DD)", type: "text", required: true, placeholder: "2025-01-15" },
  { name: "sort_order", label: "Sort Order", type: "number" },
  { name: "is_active", label: "Active", type: "toggle", defaultValue: true },
];

const listColumns = [
  {
    key: "image_url",
    label: "Image",
    render: (val: unknown) =>
      val ? (
        <img src={String(val)} alt="" className="w-10 h-10 rounded-lg object-cover border" />
      ) : (
        <span className="text-muted-foreground text-xs">No image</span>
      ),
  },
  { key: "title", label: "Title" },
  { key: "badge_text", label: "Badge" },
  { key: "published_at", label: "Published" },
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

export default function AdminLatestUpdates() {
  return (
    <AdminCrudPage
      title="Latest Updates"
      table="latest_updates"
      fields={fields}
      listColumns={listColumns}
      orderBy="sort_order"
    />
  );
}
