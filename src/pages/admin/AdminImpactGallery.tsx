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
import { Plus, Pencil, Trash2, Upload, X, Save, Image as ImageIcon, FolderOpen } from "lucide-react";

interface Category {
  id: number;
  title: string;
  description: string;
  sort_order: number;
  is_active: boolean;
}

interface ImpactImage {
  id: number;
  category_id: number;
  url: string;
  caption: string;
  sort_order: number;
}

export default function AdminImpactGallery() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [images, setImages] = useState<ImpactImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState<number | null>(null);

  // Category dialog
  const [catDialogOpen, setCatDialogOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<Category | null>(null);
  const [catForm, setCatForm] = useState({ title: "", description: "", sort_order: 0, is_active: true });
  const [savingCat, setSavingCat] = useState(false);
  const [deleteCatConfirm, setDeleteCatConfirm] = useState<number | null>(null);

  // Image dialog
  const [imgDialogOpen, setImgDialogOpen] = useState(false);
  const [editingImg, setEditingImg] = useState<ImpactImage | null>(null);
  const [imgForm, setImgForm] = useState({ url: "", caption: "", sort_order: 0 });
  const [savingImg, setSavingImg] = useState(false);
  const [deleteImgConfirm, setDeleteImgConfirm] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [catRes, imgRes] = await Promise.all([
      supabase.from("impact_categories").select("*").order("sort_order"),
      supabase.from("impact_images").select("*").order("sort_order"),
    ]);
    setCategories((catRes.data as Category[]) ?? []);
    setImages((imgRes.data as ImpactImage[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const catImages = (catId: number) => images.filter((i) => i.category_id === catId);

  // ---- Category CRUD ----
  const openNewCat = () => {
    setCatForm({ title: "", description: "", sort_order: categories.length + 1, is_active: true });
    setEditingCat(null);
    setCatDialogOpen(true);
  };

  const openEditCat = (cat: Category) => {
    setCatForm({ title: cat.title, description: cat.description, sort_order: cat.sort_order, is_active: cat.is_active });
    setEditingCat(cat);
    setCatDialogOpen(true);
  };

  const saveCat = async () => {
    setSavingCat(true);
    if (editingCat) {
      await supabase.from("impact_categories").update(catForm).eq("id", editingCat.id);
    } else {
      await supabase.from("impact_categories").insert([catForm]);
    }
    setSavingCat(false);
    setCatDialogOpen(false);
    fetchData();
  };

  const deleteCat = async (id: number) => {
    await supabase.from("impact_images").delete().eq("category_id", id);
    await supabase.from("impact_categories").delete().eq("id", id);
    setDeleteCatConfirm(null);
    if (selectedCat === id) setSelectedCat(null);
    fetchData();
  };

  // ---- Image CRUD ----
  const openNewImg = () => {
    if (!selectedCat) return;
    setImgForm({ url: "", caption: "", sort_order: catImages(selectedCat).length + 1 });
    setEditingImg(null);
    setImgDialogOpen(true);
  };

  const openEditImg = (img: ImpactImage) => {
    setImgForm({ url: img.url, caption: img.caption, sort_order: img.sort_order });
    setEditingImg(img);
    setImgDialogOpen(true);
  };

  const saveImg = async () => {
    setSavingImg(true);
    if (editingImg) {
      await supabase.from("impact_images").update(imgForm).eq("id", editingImg.id);
    } else {
      await supabase.from("impact_images").insert([{ ...imgForm, category_id: selectedCat }]);
    }
    setSavingImg(false);
    setImgDialogOpen(false);
    fetchData();
  };

  const deleteImg = async (id: number) => {
    await supabase.from("impact_images").delete().eq("id", id);
    setDeleteImgConfirm(null);
    fetchData();
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    const { url } = await uploadMedia(file, "impact");
    setUploading(false);
    if (url) setImgForm((prev) => ({ ...prev, url }));
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleUpload(f);
          e.target.value = "";
        }}
      />

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground">Impact Gallery</h1>
          <p className="text-sm text-muted-foreground">{categories.length} categories, {images.length} images</p>
        </div>
        <Button onClick={openNewCat} className="gap-2">
          <Plus className="w-4 h-4" /> Add Category
        </Button>
      </div>

      {/* Two-panel layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Categories panel */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Categories</h2>
          {categories.map((cat) => (
            <Card
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`p-4 cursor-pointer transition-all duration-200 border-2 ${
                selectedCat === cat.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FolderOpen className={`w-5 h-5 ${selectedCat === cat.id ? "text-primary" : "text-muted-foreground"}`} />
                  <div>
                    <p className="font-medium text-foreground">{cat.title}</p>
                    <p className="text-xs text-muted-foreground">{catImages(cat.id).length} images</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); openEditCat(cat); }} className="h-7 w-7 p-0">
                    <Pencil className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => { e.stopPropagation(); setDeleteCatConfirm(cat.id); }}
                    className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          {categories.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">No categories yet</p>
          )}
        </div>

        {/* Images panel */}
        <div className="lg:col-span-2">
          {selectedCat ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Images — {categories.find((c) => c.id === selectedCat)?.title}
                </h2>
                <Button onClick={openNewImg} size="sm" className="gap-2">
                  <Plus className="w-3 h-3" /> Add Image
                </Button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {catImages(selectedCat).map((img) => (
                  <Card key={img.id} className="overflow-hidden border-2 border-border group relative">
                    <img
                      src={img.url}
                      alt={img.caption}
                      className="w-full h-32 object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                    />
                    <div className="p-2">
                      <p className="text-xs text-foreground line-clamp-1">{img.caption || "No caption"}</p>
                    </div>
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => openEditImg(img)}
                        className="h-7 w-7 p-0 bg-white/90 hover:bg-white shadow"
                      >
                        <Pencil className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setDeleteImgConfirm(img.id)}
                        className="h-7 w-7 p-0 bg-white/90 hover:bg-white shadow text-destructive"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </Card>
                ))}
                {catImages(selectedCat).length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <ImageIcon className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">No images in this category</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <FolderOpen className="w-16 h-16 text-muted-foreground/20 mb-4" />
              <p className="text-muted-foreground">Select a category to manage its images</p>
            </div>
          )}
        </div>
      </div>

      {/* Category Dialog */}
      <Dialog open={catDialogOpen} onOpenChange={setCatDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingCat ? "Edit Category" : "New Category"}</DialogTitle>
            <DialogDescription>Manage impact gallery categories</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={catForm.title} onChange={(e) => setCatForm((p) => ({ ...p, title: e.target.value }))} placeholder="e.g. Elder Care" />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={catForm.description} onChange={(e) => setCatForm((p) => ({ ...p, description: e.target.value }))} placeholder="Category description..." />
            </div>
            <div className="space-y-2">
              <Label>Sort Order</Label>
              <Input type="number" value={catForm.sort_order} onChange={(e) => setCatForm((p) => ({ ...p, sort_order: Number(e.target.value) }))} />
            </div>
            <div className="flex items-center gap-3">
              <Label>Active</Label>
              <button
                type="button"
                onClick={() => setCatForm((p) => ({ ...p, is_active: !p.is_active }))}
                className={`relative w-12 h-6 rounded-full transition-colors ${catForm.is_active ? "bg-primary" : "bg-muted"}`}
              >
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${catForm.is_active ? "translate-x-6" : "translate-x-0.5"}`} />
              </button>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button onClick={saveCat} disabled={savingCat} className="gap-2">
              {savingCat ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
              {editingCat ? "Update" : "Create"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Dialog */}
      <Dialog open={imgDialogOpen} onOpenChange={setImgDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingImg ? "Edit Image" : "Add Image"}</DialogTitle>
            <DialogDescription>Upload or link an image</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Image</Label>
              {imgForm.url && (
                <div className="relative inline-block">
                  <img src={imgForm.url} alt="Preview" className="w-full h-40 rounded-xl object-cover border-2 border-border" />
                  <button
                    type="button"
                    onClick={() => setImgForm((p) => ({ ...p, url: "" }))}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-white flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              <div className="flex gap-2">
                <Input
                  value={imgForm.url}
                  onChange={(e) => setImgForm((p) => ({ ...p, url: e.target.value }))}
                  placeholder="Image URL or upload..."
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="gap-1"
                >
                  {uploading ? <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" /> : <Upload className="w-4 h-4" />}
                  Upload
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Caption</Label>
              <Input value={imgForm.caption} onChange={(e) => setImgForm((p) => ({ ...p, caption: e.target.value }))} placeholder="Image caption..." />
            </div>
            <div className="space-y-2">
              <Label>Sort Order</Label>
              <Input type="number" value={imgForm.sort_order} onChange={(e) => setImgForm((p) => ({ ...p, sort_order: Number(e.target.value) }))} />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button onClick={saveImg} disabled={savingImg} className="gap-2">
              {savingImg ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
              {editingImg ? "Update" : "Add"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Category Confirm */}
      <Dialog open={deleteCatConfirm !== null} onOpenChange={() => setDeleteCatConfirm(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Category?</DialogTitle>
            <DialogDescription>This will also delete all images in this category. This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setDeleteCatConfirm(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => deleteCatConfirm !== null && deleteCat(deleteCatConfirm)}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Image Confirm */}
      <Dialog open={deleteImgConfirm !== null} onOpenChange={() => setDeleteImgConfirm(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Image?</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setDeleteImgConfirm(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => deleteImgConfirm !== null && deleteImg(deleteImgConfirm)}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
