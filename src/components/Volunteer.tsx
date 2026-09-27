import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Handshake, Mail, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useSiteSettings, useVolunteerSignup } from "@/hooks/use-cms";
import { EASE_OUT } from "@/components/motion/variants";
import { Reveal } from "@/components/motion/Reveal";

const interests = ["Food distribution", "Education", "Blood donation", "Elderly care", "Events"];

const fieldClass =
  "h-12 rounded-xl border-border/80 bg-background/60 px-4 text-base transition-shadow focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-0";

const Volunteer = () => {
  const { data: settings } = useSiteSettings();
  const volunteerMutation = useVolunteerSignup();

  const [formData, setFormData] = useState({ name: "", phone: "", email: "", interest: "" });
  const [successOpen, setSuccessOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit to Supabase (non-blocking)
    volunteerMutation.mutate(formData);
    // Open confirmation dialog and reset form
    setSuccessOpen(true);
    setFormData({ name: "", phone: "", email: "", interest: "" });
  };

  const toggleInterest = (tag: string) => {
    const current = formData.interest
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const next = current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag];
    setFormData({ ...formData, interest: next.join(", ") });
  };

  const email = settings?.email ?? "kaaraikarangal@gmail.com";
  const phoneTel = settings?.phone_tel ?? "+918220573306";
  const phoneDisplay = settings?.phone_display ?? "+91 82205 73306";

  return (
    <section id="volunteer" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-[var(--shadow-strong)] lg:grid-cols-12">
          {/* Left panel */}
          <div className="relative overflow-hidden bg-primary p-8 text-primary-foreground sm:p-12 lg:col-span-5">
            <div className="pointer-events-none absolute inset-0 bg-kolam-light opacity-60" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-saffron/40 blur-3xl" />
            <div className="relative flex h-full flex-col">
              <Reveal>
                <span className="eyebrow text-saffron">Join our mission</span>
                <h2 className="mt-4 font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
                  Lend a hand. <em className="text-saffron">Change a life.</em>
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-white/75">
                  Become a volunteer and help us make compassion visible in our communities.
                </p>
              </Reveal>

              <div className="mt-10 space-y-3">
                <a
                  href={`mailto:${email}`}
                  className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-4 transition-colors hover:bg-white/10"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/15">
                    <Mail className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-widest text-white/60">Email</span>
                    <span className="block truncate font-semibold">{email}</span>
                  </span>
                </a>
                <a
                  href={`tel:${phoneTel}`}
                  className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-4 transition-colors hover:bg-white/10"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/15">
                    <Phone className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-widest text-white/60">Phone</span>
                    <span className="block font-semibold">{phoneDisplay}</span>
                  </span>
                </a>
              </div>

              <div className="mt-auto pt-10">
                <div className="rounded-2xl bg-ink/40 p-5 backdrop-blur">
                  <p className="flex items-center gap-2 font-semibold">
                    <Handshake className="h-5 w-5 text-saffron" /> Partner with us
                  </p>
                  <p className="mt-1 text-sm text-white/70">Organizations interested in collaboration can reach out directly.</p>
                  <a
                    href={`mailto:${email}?subject=Partnership Inquiry`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-saffron hover:underline"
                  >
                    Partner inquiry <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 sm:p-12 lg:col-span-7">
            <Reveal>
              <h3 className="font-display text-3xl font-medium text-foreground">Quick signup</h3>
              <p className="mt-2 text-muted-foreground">Takes less than a minute. We’ll reach out with next steps.</p>
            </Reveal>
            <form onSubmit={handleSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="name">Full name *</Label>
                <Input
                  id="name"
                  required
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91"
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email address *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className={fieldClass}
                />
              </div>
              <div className="space-y-3 sm:col-span-2">
                <Label htmlFor="interest">Area of interest</Label>
                <div className="flex flex-wrap gap-2">
                  {interests.map((tag) => {
                    const on = formData.interest.split(",").map((s) => s.trim()).includes(tag);
                    return (
                      <button
                        type="button"
                        key={tag}
                        onClick={() => toggleInterest(tag)}
                        aria-pressed={on}
                        className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                          on
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
                <Textarea
                  id="interest"
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  placeholder="Tell us how you'd like to help"
                  className="min-h-24 rounded-xl border-border/80 bg-background/60 px-4 py-3 text-base focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-0"
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="btn-shine group inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-accent px-8 text-base font-semibold text-accent-foreground shadow-[0_18px_40px_-14px_hsl(var(--accent)/0.7)] transition-transform hover:-translate-y-0.5"
                >
                  Become a Volunteer
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success dialog shown after signup */}
      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent className="max-w-md overflow-hidden rounded-3xl border-0 p-0">
          <div className="relative bg-primary px-8 pb-8 pt-10 text-center text-primary-foreground">
            <div className="pointer-events-none absolute inset-0 bg-kolam-light opacity-60" />
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
              className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-white text-primary shadow-lg"
            >
              <CheckCircle2 className="h-10 w-10" />
            </motion.div>
            <DialogTitle className="relative mt-6 font-display text-3xl font-medium">Thank you for joining!</DialogTitle>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5, ease: EASE_OUT }}
            className="px-8 pb-8 pt-6 text-center"
          >
            <DialogDescription className="text-base text-foreground/80">
              Your registration as a volunteer is successful. We’ll reach out soon with next steps.
            </DialogDescription>
            <p className="mt-3 flex items-center justify-center gap-2 font-semibold text-accent">
              <Sparkles className="h-4 w-4" /> Together, we make compassion visible.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              For urgent queries, call{" "}
              <a className="font-semibold text-primary" href={`tel:${phoneTel}`}>
                {phoneDisplay}
              </a>
              .
            </p>
            <DialogClose asChild>
              <Button variant="donate" className="mt-6 rounded-full px-10">
                Close
              </Button>
            </DialogClose>
          </motion.div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Volunteer;
