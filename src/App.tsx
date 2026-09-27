import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "framer-motion";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AdminAuthProvider } from "@/lib/admin-auth";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Credits from "./pages/Credits";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./pages/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminSiteSettings from "./pages/admin/AdminSiteSettings";
import AdminServices from "./pages/admin/AdminServices";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminLatestUpdates from "./pages/admin/AdminLatestUpdates";
import AdminMediaGallery from "./pages/admin/AdminMediaGallery";
import AdminImpactGallery from "./pages/admin/AdminImpactGallery";
import AdminSponsors from "./pages/admin/AdminSponsors";
import AdminTeam from "./pages/admin/AdminTeam";
import AdminCampaigns from "./pages/admin/AdminCampaigns";
import AdminDonations from "./pages/admin/AdminDonations";
import AdminVolunteers from "./pages/admin/AdminVolunteers";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Deep links with a hash (e.g. /#donate) are scrolled by the page itself
    if (!hash) window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Also scroll on initial mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

const App = () => (
  <ErrorBoundary>
    <MotionConfig reducedMotion="user">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <AdminAuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/credits" element={<Credits />} />

              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="site-settings" element={<AdminSiteSettings />} />
                <Route path="services" element={<AdminServices />} />
                <Route path="events" element={<AdminEvents />} />
                <Route path="latest-updates" element={<AdminLatestUpdates />} />
                <Route path="media-gallery" element={<AdminMediaGallery />} />
                <Route path="impact-gallery" element={<AdminImpactGallery />} />
                <Route path="sponsors" element={<AdminSponsors />} />
                <Route path="team" element={<AdminTeam />} />
                <Route path="campaigns" element={<AdminCampaigns />} />
                <Route path="donations" element={<AdminDonations />} />
                <Route path="volunteers" element={<AdminVolunteers />} />
              </Route>

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AdminAuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
    </MotionConfig>
  </ErrorBoundary>
);

export default App;
