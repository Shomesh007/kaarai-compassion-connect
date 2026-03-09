import { useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/lib/admin-auth";
import {
  Heart, LayoutDashboard, Settings, Image, Newspaper, Calendar,
  Users, Award, HandCoins, BarChart3, Megaphone, Film, LogOut, Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/admin/site-settings", icon: Settings, label: "Site Settings" },
  { to: "/admin/services", icon: Award, label: "Services" },
  { to: "/admin/events", icon: Calendar, label: "Events" },
  { to: "/admin/latest-updates", icon: Newspaper, label: "Latest Updates" },
  { to: "/admin/media-gallery", icon: Film, label: "Media Gallery" },
  { to: "/admin/impact-gallery", icon: Image, label: "Impact Gallery" },
  { to: "/admin/sponsors", icon: HandCoins, label: "Sponsors" },
  { to: "/admin/team", icon: Users, label: "Team Members" },
  { to: "/admin/campaigns", icon: BarChart3, label: "Campaigns" },
  { to: "/admin/donations", icon: Megaphone, label: "Donation Breakdown" },
  { to: "/admin/volunteers", icon: Users, label: "Volunteer Signups" },
];

export default function AdminLayout() {
  const { user, loading, signOut } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/admin/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r-2 border-border flex flex-col fixed h-full z-30 overflow-y-auto">
        {/* Logo */}
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/30">
              <Heart className="w-5 h-5 text-primary" fill="currentColor" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-foreground">Kaarai Karangal</h2>
              <p className="text-[10px] text-muted-foreground">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`
              }
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-border space-y-2">
          <NavLink
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
          >
            <Home className="w-4 h-4" />
            View Site
          </NavLink>
          <Button
            variant="ghost"
            size="sm"
            onClick={signOut}
            className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
          <p className="text-[10px] text-muted-foreground text-center px-2">
            {user.email}
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 p-6 md:p-8 overflow-y-auto min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
