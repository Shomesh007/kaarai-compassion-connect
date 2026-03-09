import AdminCrudPage, { type FieldDef } from "@/components/admin/AdminCrudPage";

const fields: FieldDef[] = [
  { name: "name", label: "Full Name", type: "text", required: true, placeholder: "e.g. John Doe" },
  { name: "role", label: "Role / Title", type: "text", required: true, placeholder: "e.g. President" },
  {
    name: "category",
    label: "Category",
    type: "select",
    options: [
      { value: "leadership", label: "Leadership" },
      { value: "advisor", label: "Advisor" },
      { value: "ec_member", label: "EC Member" },
    ],
  },
  { name: "sort_order", label: "Sort Order", type: "number" },
  { name: "is_active", label: "Active", type: "toggle", defaultValue: true },
];

const listColumns = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  {
    key: "category",
    label: "Category",
    render: (val: unknown) => {
      const labels: Record<string, string> = {
        leadership: "🏆 Leadership",
        advisor: "📋 Advisor",
        ec_member: "👥 EC Member",
      };
      return <span className="text-sm">{labels[String(val)] ?? String(val)}</span>;
    },
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

export default function AdminTeam() {
  return (
    <AdminCrudPage
      title="Team Members"
      table="team_members"
      fields={fields}
      listColumns={listColumns}
      orderBy="sort_order"
    />
  );
}
