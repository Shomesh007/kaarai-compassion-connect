import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="grain relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--gradient-hero)] px-5">
      <div className="pointer-events-none absolute inset-0 bg-kolam [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000,transparent)]" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative text-center"
      >
        <p className="font-display text-[8rem] font-medium leading-none text-primary sm:text-[12rem]">404</p>
        <p className="mt-2 font-display text-2xl italic text-foreground/80">This path doesn’t lead anywhere — yet.</p>
        <p className="mt-2 font-tamil text-lg text-accent">யாதும் ஊரே யாவரும் கேளிர்</p>
        <Link
          to="/"
          className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
        >
          <ArrowLeft className="h-4 w-4" /> Return home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
