import AdminCrudPage, { type FieldDef } from "@/components/admin/AdminCrudPage";

const fields: FieldDef[] = [
  { name: "label", label: "Label", type: "text", required: true, placeholder: "e.g. Elder Care Programs" },
  { name: "percent", label: "Percentage (%)", type: "number", required: true },
  {
    name: "color",
    label: "Color",
    type: "select",
    options: [
      { value: "hsl(178, 60%, 35%)", label: "Teal (Primary)" },
      { value: "hsl(25, 80%, 55%)", label: "Orange (Accent)" },
      { value: "hsl(178, 40%, 50%)", label: "Light Teal" },
      { value: "hsl(25, 60%, 70%)", label: "Light Orange" },
      { value: "hsl(142, 60%, 40%)", label: "Green" },
      { value: "hsl(262, 60%, 50%)", label: "Purple" },
      { value: "hsl(340, 60%, 50%)", label: "Pink" },
      { value: "hsl(210, 60%, 50%)", label: "Blue" },
    ],
  },
  { name: "sort_order", label: "Sort Order", type: "number" },
];

const listColumns = [
  {
    key: "color",
    label: "Color",
    render: (val: unknown) => (
      <div className="w-6 h-6 rounded-full border-2 border-border" style={{ backgroundColor: String(val) }} />
    ),
  },
  { key: "label", label: "Label" },
  {
    key: "percent",
    label: "Percentage",
    render: (val: unknown) => <span className="font-medium">{String(val)}%</span>,
  },
];

export default function AdminDonations() {
  return (
    <AdminCrudPage
      title="Donation Breakdown"
      table="donation_breakdown"
      fields={fields}
      listColumns={listColumns}
      orderBy="sort_order"
    />
  );
}
