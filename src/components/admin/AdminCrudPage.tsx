import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { uploadMedia } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Upload, X, GripVertical, Save } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Field definition for the form                                     */
/* ------------------------------------------------------------------ */
export interface FieldDef {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "select" | "image" | "toggle" | "json-array";
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  /** Folder name for image uploads */
  uploadFolder?: string;
  /** Default value for new records */
  defaultValue?: unknown;
}

interface AdminCrudPageProps {
  title: string;
  table: string;
  fields: FieldDef[];
  orderBy?: string;
  /** Columns to show in the list view */
  listColumns: { key: string; label: string; render?: (val: unknown, row: Record<string, unknown>) => React.ReactNode }[];
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export default function AdminCrudPage({ title, table, fields, orderBy = "sort_order", listColumns }: AdminCrudPageProps) {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<Record<string, unknown> | null>(null);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeFileField, setActiveFileField] = useState<string>("");

  const fetchRows = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from(table)
      .select("*")
      .order(orderBy, { ascending: true });
    setRows((data as Record<string, unknown>[]) ?? []);
    setLoading(false);
  }, [table, orderBy]);

  useEffect(() => {
    fetchRows();
  }, [fetchRows]);

  const openNew = () => {
    const defaults: Record<string, unknown> = {};
    fields.forEach((f) => {
      if (f.defaultValue !== undefined) defaults[f.name] = f.defaultValue;
      else if (f.type === "number") defaults[f.name] = 0;
      else if (f.type === "toggle") defaults[f.name] = true;
      else if (f.type === "json-array") defaults[f.name] = [];
      else defaults[f.name] = "";
    });
    defaults.sort_order = rows.length + 1;
    setFormData(defaults);
    setEditingRow(null);
    setDialogOpen(true);
  };

  const openEdit = (row: Record<string, unknown>) => {
    setFormData({ ...row });
    setEditingRow(row);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const payload = { ...formData };
    delete payload.id;
    delete payload.created_at;

    if (editingRow) {
      await supabase.from(table).update(payload).eq("id", editingRow.id);
    } else {
      await supabase.from(table).insert([payload]);
    }

    setSaving(false);
    setDialogOpen(false);
    fetchRows();
  };

  const handleDelete = async (id: number) => {
    await supabase.from(table).delete().eq("id", id);
    setDeleteConfirm(null);
    fetchRows();
  };

  const handleImageUpload = async (field: FieldDef, file: File) => {
    setUploadingField(field.name);
    const { url, error } = await uploadMedia(file, field.uploadFolder ?? "uploads");
    setUploadingField(null);
    if (url) {
      setFormData((prev) => ({ ...prev, [field.name]: url }));
    } else {
      alert("Upload failed: " + (error ?? "Unknown error"));
    }
  };

  const triggerFileInput = (fieldName: string) => {
    setActiveFileField(fieldName);
    setTimeout(() => fileInputRef.current?.click(), 50);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const field = fields.find((f) => f.name === activeFileField);
    if (field) handleImageUpload(field, file);
    e.target.value = "";
  };

  const updateField = (name: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // JSON array helper
  const addJsonArrayItem = (name: string) => {
    const arr = Array.isArray(formData[name]) ? [...(formData[name] as string[])] : [];
    arr.push("");
    updateField(name, arr);
  };

  const updateJsonArrayItem = (name: string, idx: number, value: string) => {
    const arr = [...((formData[name] as string[]) ?? [])];
    arr[idx] = value;
    updateField(name, arr);
  };

  const removeJsonArrayItem = (name: string, idx: number) => {
    const arr = [...((formData[name] as string[]) ?? [])];
    arr.splice(idx, 1);
    updateField(name, arr);
  };

  return (
    <div>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground">{rows.length} items</p>
        </div>
        <Button onClick={openNew} className="gap-2">
          <Plus className="w-4 h-4" /> Add New
        </Button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : rows.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No items yet. Click "Add New" to create one.</p>
        </Card>
      ) : (
        <div className="border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b">
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground w-10">#</th>
                  {listColumns.map((col) => (
                    <th key={col.key} className="px-4 py-3 text-left font-semibold text-muted-foreground">
                      {col.label}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-right font-semibold text-muted-foreground w-28">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr key={row.id as number} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 text-muted-foreground">{idx + 1}</td>
                    {listColumns.map((col) => (
                      <td key={col.key} className="px-4 py-3 text-foreground">
                        {col.render ? col.render(row[col.key], row) : (
                          col.key.includes("url") && row[col.key] ? (
                            <img
                              src={String(row[col.key])}
                              alt=""
                              className="w-10 h-10 rounded-lg object-cover border"
                            />
                          ) : (
                            <span className="line-clamp-2">{String(row[col.key] ?? "")}</span>
                          )
                        )}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm" onClick={() => openEdit(row)} className="h-8 w-8 p-0">
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteConfirm(row.id as number)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingRow ? "Edit Item" : "Add New Item"}</DialogTitle>
            <DialogDescription>Fill in the details below</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label className="text-sm font-medium">{field.label}</Label>

                {field.type === "text" && (
                  <Input
                    value={String(formData[field.name] ?? "")}
                    onChange={(e) => updateField(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                )}

                {field.type === "textarea" && (
                  <Textarea
                    value={String(formData[field.name] ?? "")}
                    onChange={(e) => updateField(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="min-h-[100px]"
                  />
                )}

                {field.type === "number" && (
                  <Input
                    type="number"
                    value={String(formData[field.name] ?? 0)}
                    onChange={(e) => updateField(field.name, Number(e.target.value))}
                    placeholder={field.placeholder}
                  />
                )}

                {field.type === "select" && (
                  <select
                    value={String(formData[field.name] ?? "")}
                    onChange={(e) => updateField(field.name, e.target.value)}
                    className="w-full rounded-xl border-2 border-input bg-background px-3 py-2 text-sm"
                  >
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                )}

                {field.type === "toggle" && (
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => updateField(field.name, !formData[field.name])}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        formData[field.name] ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                          formData[field.name] ? "translate-x-6" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                    <span className="text-sm text-muted-foreground">
                      {formData[field.name] ? "Active" : "Inactive"}
                    </span>
                  </div>
                )}

                {field.type === "image" && (
                  <div className="space-y-2">
                    {formData[field.name] && String(formData[field.name]).length > 0 && (
                      <div className="relative inline-block">
                        <img
                          src={String(formData[field.name])}
                          alt="Preview"
                          className="w-32 h-24 rounded-xl object-cover border-2 border-border"
                        />
                        <button
                          type="button"
                          onClick={() => updateField(field.name, "")}
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-white flex items-center justify-center"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Input
                        value={String(formData[field.name] ?? "")}
                        onChange={(e) => updateField(field.name, e.target.value)}
                        placeholder="Image URL or upload..."
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => triggerFileInput(field.name)}
                        disabled={uploadingField === field.name}
                        className="gap-1"
                      >
                        {uploadingField === field.name ? (
                          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Upload className="w-4 h-4" />
                        )}
                        Upload
                      </Button>
                    </div>
                  </div>
                )}

                {field.type === "json-array" && (
                  <div className="space-y-2">
                    {(Array.isArray(formData[field.name]) ? (formData[field.name] as string[]) : []).map(
                      (item, idx) => (
                        <div key={idx} className="flex gap-2 items-start">
                          <GripVertical className="w-4 h-4 text-muted-foreground mt-2.5 flex-shrink-0" />
                          <Textarea
                            value={item}
                            onChange={(e) => updateJsonArrayItem(field.name, idx, e.target.value)}
                            className="flex-1 min-h-[60px]"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeJsonArrayItem(field.name, idx)}
                            className="text-destructive h-8 w-8 p-0 flex-shrink-0"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ),
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addJsonArrayItem(field.name)}
                      className="gap-1"
                    >
                      <Plus className="w-3 h-3" /> Add Paragraph
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSave} disabled={saving} className="gap-2">
              {saving ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {editingRow ? "Update" : "Create"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <Dialog open={deleteConfirm !== null} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Item?</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirm !== null && handleDelete(deleteConfirm)}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
