import AdminCrudPage, { type FieldDef } from "@/components/admin/AdminCrudPage";

const fields: FieldDef[] = [
  { name: "title", label: "Title", type: "text", required: true, placeholder: "e.g. Elder Care" },
  { name: "description", label: "Description", type: "textarea", required: true, placeholder: "Describe the service..." },
  {
    name: "icon_name",
    label: "Icon",
    type: "select",
    options: [
      { value: "Heart", label: "Heart" },
      { value: "Users", label: "Users" },
      { value: "Home", label: "Home" },
      { value: "BookOpen", label: "Book Open" },
      { value: "Stethoscope", label: "Stethoscope" },
      { value: "HandHeart", label: "Hand Heart" },
      { value: "GraduationCap", label: "Graduation Cap" },
      { value: "Utensils", label: "Utensils" },
      { value: "ShieldCheck", label: "Shield Check" },
      { value: "Sparkles", label: "Sparkles" },
    ],
  },
  { name: "sort_order", label: "Sort Order", type: "number" },
  { name: "is_active", label: "Active", type: "toggle", defaultValue: true },
];

const listColumns = [
  { key: "title", label: "Title" },
  { key: "icon_name", label: "Icon" },
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

export default function AdminServices() {
  return (
    <AdminCrudPage
      title="Services"
      table="services"
      fields={fields}
      listColumns={listColumns}
      orderBy="sort_order"
    />
  );
}
