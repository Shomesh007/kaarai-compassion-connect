import AdminCrudPage, { type FieldDef } from "@/components/admin/AdminCrudPage";

const fields: FieldDef[] = [
  { name: "name", label: "Sponsor Name", type: "text", required: true, placeholder: "e.g. ABC Foundation" },
  { name: "logo_url", label: "Logo", type: "image", required: true, uploadFolder: "sponsors" },
  { name: "website_url", label: "Website URL (optional)", type: "text", placeholder: "https://..." },
  { name: "sort_order", label: "Sort Order", type: "number" },
  { name: "is_active", label: "Active", type: "toggle", defaultValue: true },
];

const listColumns = [
  {
    key: "logo_url",
    label: "Logo",
    render: (val: unknown) =>
      val ? (
        <img src={String(val)} alt="" className="w-12 h-12 rounded-lg object-contain border bg-white p-1" />
      ) : (
        <span className="text-muted-foreground text-xs">—</span>
      ),
  },
  { key: "name", label: "Name" },
  { key: "website_url", label: "Website" },
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

export default function AdminSponsors() {
  return (
    <AdminCrudPage
      title="Sponsors"
      table="sponsors"
      fields={fields}
      listColumns={listColumns}
      orderBy="sort_order"
    />
  );
}
