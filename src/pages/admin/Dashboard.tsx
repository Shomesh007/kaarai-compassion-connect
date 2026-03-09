import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import {
  Award, Calendar, Newspaper, Film, Image, HandCoins, Users, BarChart3, Megaphone, Settings, UserCheck,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface TableCount {
  label: string;
  table: string;
  count: number;
  icon: typeof Award;
  to: string;
  color: string;
}

const tableConfigs: Omit<TableCount, "count">[] = [
  { label: "Services", table: "services", icon: Award, to: "/admin/services", color: "text-primary" },
  { label: "Events", table: "events", icon: Calendar, to: "/admin/events", color: "text-accent" },
  { label: "Latest Updates", table: "latest_updates", icon: Newspaper, to: "/admin/latest-updates", color: "text-primary" },
  { label: "Media Gallery", table: "media_gallery", icon: Film, to: "/admin/media-gallery", color: "text-accent" },
  { label: "Impact Categories", table: "impact_categories", icon: Image, to: "/admin/impact-gallery", color: "text-primary" },
  { label: "Sponsors", table: "sponsors", icon: HandCoins, to: "/admin/sponsors", color: "text-accent" },
  { label: "Team Members", table: "team_members", icon: Users, to: "/admin/team", color: "text-primary" },
  { label: "Campaigns", table: "campaigns", icon: BarChart3, to: "/admin/campaigns", color: "text-accent" },
  { label: "Donation Breakdown", table: "donation_breakdown", icon: Megaphone, to: "/admin/donations", color: "text-primary" },
  { label: "Volunteer Signups", table: "volunteer_signups", icon: UserCheck, to: "/admin/volunteers", color: "text-accent" },
];

export default function Dashboard() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchCounts = async () => {
      const results: Record<string, number> = {};
      for (const cfg of tableConfigs) {
        const { count } = await supabase.from(cfg.table).select("*", { count: "exact", head: true });
        results[cfg.table] = count ?? 0;
      }
      setCounts(results);
    };
    fetchCounts();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage your website content</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tableConfigs.map((cfg) => (
          <NavLink key={cfg.table} to={cfg.to}>
            <Card className="p-5 hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:-translate-y-1 border-2 border-border hover:border-primary/30 cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center`}>
                  <cfg.icon className={`w-5 h-5 ${cfg.color}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{counts[cfg.table] ?? "—"}</p>
              <p className="text-sm text-muted-foreground">{cfg.label}</p>
            </Card>
          </NavLink>
        ))}
      </div>

      <div className="mt-8">
        <NavLink to="/admin/site-settings">
          <Card className="p-6 hover:shadow-[var(--shadow-hover)] transition-all duration-300 border-2 border-border hover:border-primary/30 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Settings className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Site Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Edit organization name, contact info, about text, founder message, and more
                </p>
              </div>
            </div>
          </Card>
        </NavLink>
      </div>
    </div>
  );
}
