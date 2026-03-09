import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { uploadMedia } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Save, Upload, X, Plus, GripVertical, Check } from "lucide-react";

interface SiteSettingsData {
  id: number;
  org_name: string;
  tagline_tamil: string;
  tagline_english: string;
  hero_description: string;
  registration_info: string;
  founder_name: string;
  founder_image_url: string;
  founder_quote: string;
  founder_message: string[];
  about_intro: string;
  about_expanded: string[];
  about_motto: string;
  logo_url: string;
  email: string;
  phone_display: string;
  phone_tel: string;
  address: string;
  instagram_url: string;
  facebook_url: string;
  blood_donation_url: string;
}

export default function AdminSiteSettings() {
  const [data, setData] = useState<SiteSettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [activeUploadField, setActiveUploadField] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const { data: rows } = await supabase.from("site_settings").select("*").limit(1);
      if (rows && rows.length > 0) {
        setData(rows[0] as SiteSettingsData);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const update = (field: string, value: unknown) => {
    setData((prev) => prev ? { ...prev, [field]: value } : prev);
    setSaved(false);
  };

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    const { id, ...payload } = data;
    await supabase.from("site_settings").update(payload).eq("id", id);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleUpload = async (field: string, file: File) => {
    setUploadingField(field);
    const { url } = await uploadMedia(file, "site");
    setUploadingField(null);
    if (url) update(field, url);
  };

  const triggerUpload = (field: string) => {
    setActiveUploadField(field);
    setTimeout(() => fileRef.current?.click(), 50);
  };

  // JSON array helpers
  const addArrayItem = (field: string) => {
    const arr = Array.isArray(data?.[field as keyof SiteSettingsData]) ? [...(data![field as keyof SiteSettingsData] as string[])] : [];
    arr.push("");
    update(field, arr);
  };

  const updateArrayItem = (field: string, idx: number, value: string) => {
    const arr = [...((data?.[field as keyof SiteSettingsData] as string[]) ?? [])];
    arr[idx] = value;
    update(field, arr);
  };

  const removeArrayItem = (field: string, idx: number) => {
    const arr = [...((data?.[field as keyof SiteSettingsData] as string[]) ?? [])];
    arr.splice(idx, 1);
    update(field, arr);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <Card className="p-12 text-center">
        <p className="text-muted-foreground">No site settings found. Please seed the database first.</p>
      </Card>
    );
  }

  const ImageField = ({ field, label }: { field: string; label: string }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      {data[field as keyof SiteSettingsData] && String(data[field as keyof SiteSettingsData]).length > 0 && (
        <div className="relative inline-block">
          <img
            src={String(data[field as keyof SiteSettingsData])}
            alt="Preview"
            className="w-32 h-24 rounded-xl object-cover border-2 border-border"
          />
          <button
            type="button"
            onClick={() => update(field, "")}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-white flex items-center justify-center"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
      <div className="flex gap-2">
        <Input
          value={String(data[field as keyof SiteSettingsData] ?? "")}
          onChange={(e) => update(field, e.target.value)}
          placeholder="Image URL or upload..."
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => triggerUpload(field)}
          disabled={uploadingField === field}
          className="gap-1"
        >
          {uploadingField === field ? (
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
          Upload
        </Button>
      </div>
    </div>
  );

  const ArrayField = ({ field, label }: { field: string; label: string }) => {
    const arr = Array.isArray(data[field as keyof SiteSettingsData]) ? (data[field as keyof SiteSettingsData] as string[]) : [];
    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium">{label}</Label>
        {arr.map((item, idx) => (
          <div key={idx} className="flex gap-2 items-start">
            <GripVertical className="w-4 h-4 text-muted-foreground mt-2.5 flex-shrink-0" />
            <Textarea
              value={item}
              onChange={(e) => updateArrayItem(field, idx, e.target.value)}
              className="flex-1 min-h-[60px]"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeArrayItem(field, idx)}
              className="text-destructive h-8 w-8 p-0 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem(field)} className="gap-1">
          <Plus className="w-3 h-3" /> Add Paragraph
        </Button>
      </div>
    );
  };

  return (
    <div>
      {/* Hidden file input */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f && activeUploadField) handleUpload(activeUploadField, f);
          e.target.value = "";
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground">Site Settings</h1>
          <p className="text-sm text-muted-foreground">Global configuration for the website</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="gap-2">
          {saving ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : saved ? (
            <Check className="w-4 h-4" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>

      <div className="space-y-8">
        {/* Organization */}
        <Card className="p-6 border-2 border-border">
          <h2 className="text-lg font-bold text-foreground mb-4 pb-3 border-b border-border">🏢 Organization</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Organization Name</Label>
              <Input value={data.org_name} onChange={(e) => update("org_name", e.target.value)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tagline (Tamil)</Label>
                <Input value={data.tagline_tamil} onChange={(e) => update("tagline_tamil", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Tagline (English)</Label>
                <Input value={data.tagline_english} onChange={(e) => update("tagline_english", e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Hero Description</Label>
              <Textarea value={data.hero_description} onChange={(e) => update("hero_description", e.target.value)} className="min-h-[80px]" />
            </div>
            <div className="space-y-2">
              <Label>Registration Info</Label>
              <Input value={data.registration_info} onChange={(e) => update("registration_info", e.target.value)} />
            </div>
            <ImageField field="logo_url" label="Logo" />
          </div>
        </Card>

        {/* About Section */}
        <Card className="p-6 border-2 border-border">
          <h2 className="text-lg font-bold text-foreground mb-4 pb-3 border-b border-border">📖 About Section</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>About Intro</Label>
              <Textarea value={data.about_intro} onChange={(e) => update("about_intro", e.target.value)} className="min-h-[80px]" />
            </div>
            <ArrayField field="about_expanded" label="About Expanded Paragraphs" />
            <div className="space-y-2">
              <Label>About Motto</Label>
              <Input value={data.about_motto} onChange={(e) => update("about_motto", e.target.value)} />
            </div>
          </div>
        </Card>

        {/* Founder */}
        <Card className="p-6 border-2 border-border">
          <h2 className="text-lg font-bold text-foreground mb-4 pb-3 border-b border-border">👤 Founder</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Founder Name</Label>
              <Input value={data.founder_name} onChange={(e) => update("founder_name", e.target.value)} />
            </div>
            <ImageField field="founder_image_url" label="Founder Image" />
            <div className="space-y-2">
              <Label>Founder Quote</Label>
              <Textarea value={data.founder_quote} onChange={(e) => update("founder_quote", e.target.value)} />
            </div>
            <ArrayField field="founder_message" label="Founder Message Paragraphs" />
          </div>
        </Card>

        {/* Contact */}
        <Card className="p-6 border-2 border-border">
          <h2 className="text-lg font-bold text-foreground mb-4 pb-3 border-b border-border">📞 Contact Information</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={data.email} onChange={(e) => update("email", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Phone (Display)</Label>
                <Input value={data.phone_display} onChange={(e) => update("phone_display", e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Phone (Tel link)</Label>
              <Input value={data.phone_tel} onChange={(e) => update("phone_tel", e.target.value)} placeholder="+91XXXXXXXXXX" />
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Textarea value={data.address} onChange={(e) => update("address", e.target.value)} />
            </div>
          </div>
        </Card>

        {/* Social & Links */}
        <Card className="p-6 border-2 border-border">
          <h2 className="text-lg font-bold text-foreground mb-4 pb-3 border-b border-border">🔗 Social & Links</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Instagram URL</Label>
              <Input value={data.instagram_url} onChange={(e) => update("instagram_url", e.target.value)} placeholder="https://instagram.com/..." />
            </div>
            <div className="space-y-2">
              <Label>Facebook URL</Label>
              <Input value={data.facebook_url} onChange={(e) => update("facebook_url", e.target.value)} placeholder="https://facebook.com/..." />
            </div>
            <div className="space-y-2">
              <Label>Blood Donation URL</Label>
              <Input value={data.blood_donation_url} onChange={(e) => update("blood_donation_url", e.target.value)} placeholder="https://..." />
            </div>
          </div>
        </Card>

        {/* Save button at bottom */}
        <div className="flex justify-end pb-8">
          <Button onClick={handleSave} disabled={saving} size="lg" className="gap-2">
            {saving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : saved ? (
              <Check className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? "Saving..." : saved ? "Saved!" : "Save All Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
