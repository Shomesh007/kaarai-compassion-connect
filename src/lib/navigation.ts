import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "services", label: "Programs" },
  { id: "gallery", label: "Impact" },
  { id: "upcoming-events", label: "Events" },
  { id: "team", label: "Team" },
  { id: "volunteer", label: "Volunteer" },
] as const;

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Returns a function that scrolls to a home-page section, navigating back
 * to "/" first when called from another route (e.g. /credits).
 */
export function useGoToSection() {
  const location = useLocation();
  const navigate = useNavigate();

  return useCallback(
    (id: string) => {
      if (location.pathname === "/") {
        scrollToId(id);
      } else {
        navigate(`/#${id}`);
      }
    },
    [location.pathname, navigate],
  );
}
