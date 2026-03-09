import AdminCrudPage, { type FieldDef } from "@/components/admin/AdminCrudPage";

const fields: FieldDef[] = [
  { name: "title", label: "Event Title", type: "text", required: true, placeholder: "e.g. Annual Charity Gala" },
  { name: "date_display", label: "Display Date", type: "text", required: true, placeholder: "e.g. March 15, 2025" },
  { name: "event_date", label: "Event Date (YYYY-MM-DD)", type: "text", required: true, placeholder: "2025-03-15" },
  { name: "location", label: "Location", type: "text", required: true, placeholder: "e.g. Chennai Community Hall" },
  { name: "description_html", label: "Description (HTML)", type: "textarea", required: true, placeholder: "<p>Event details...</p>" },
  { name: "sort_order", label: "Sort Order", type: "number" },
  { name: "is_active", label: "Active", type: "toggle", defaultValue: true },
];

const listColumns = [
  { key: "title", label: "Title" },
  { key: "date_display", label: "Date" },
  { key: "location", label: "Location" },
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

export default function AdminEvents() {
  return (
    <AdminCrudPage
      title="Events"
      table="events"
      fields={fields}
      listColumns={listColumns}
      orderBy="sort_order"
    />
  );
}
