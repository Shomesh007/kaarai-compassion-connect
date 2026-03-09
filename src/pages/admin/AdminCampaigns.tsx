import AdminCrudPage, { type FieldDef } from "@/components/admin/AdminCrudPage";

const fields: FieldDef[] = [
  { name: "title", label: "Campaign Title", type: "text", required: true, placeholder: "e.g. Build a Community Kitchen" },
  { name: "description", label: "Description", type: "textarea", required: true, placeholder: "Describe the campaign..." },
  { name: "raised", label: "Amount Raised (₹)", type: "number" },
  { name: "goal", label: "Goal Amount (₹)", type: "number" },
  { name: "supporters", label: "Number of Supporters", type: "number" },
  { name: "sort_order", label: "Sort Order", type: "number" },
  { name: "is_active", label: "Active", type: "toggle", defaultValue: true },
];

const listColumns = [
  { key: "title", label: "Title" },
  {
    key: "raised",
    label: "Raised",
    render: (val: unknown) => <span className="font-medium">₹{Number(val).toLocaleString("en-IN")}</span>,
  },
  {
    key: "goal",
    label: "Goal",
    render: (val: unknown) => <span>₹{Number(val).toLocaleString("en-IN")}</span>,
  },
  {
    key: "supporters",
    label: "Supporters",
    render: (val: unknown) => <span>{Number(val).toLocaleString()}</span>,
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

export default function AdminCampaigns() {
  return (
    <AdminCrudPage
      title="Fundraising Campaigns"
      table="fundraising_campaigns"
      fields={fields}
      listColumns={listColumns}
      orderBy="sort_order"
    />
  );
}
