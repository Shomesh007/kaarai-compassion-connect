import { Crown } from "lucide-react";
import { useTeamMembers } from "@/hooks/use-cms";
import SectionHeading from "@/components/motion/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

/** Monogram from the most significant word of a name (skips titles/initials). */
const monogram = (name: string) => {
  const words = name.split(/[\s.,]+/).filter((w) => w.length > 2 && !/^(mrs?|miss|guru)$/i.test(w));
  return (words[words.length - 1] ?? name).charAt(0).toUpperCase();
};

const gradients = [
  "from-primary to-primary-glow",
  "from-accent to-saffron",
  "from-ink to-primary",
  "from-saffron to-accent",
];

const Team = () => {
  const { data: members } = useTeamMembers();
  const all = members ?? [];
  const leadership = all.filter((m) => m.category === "leadership");
  const advisors = all.filter((m) => m.category === "advisor");
  const ecMembers = all.filter((m) => m.category === "ec_member");
  const [head, ...leaders] = leadership;

  if (all.length === 0) return null;

  return (
    <section id="team" className="relative overflow-hidden bg-secondary/40 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-kolam opacity-30" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Our people"
          title={
            <>
              The hands behind <em className="text-primary">the work</em>.
            </>
          }
          description="Office bearers, advisors and executive committee members who give their time to serve."
        />

        {head && (
          <Reveal className="mx-auto mt-14 max-w-3xl">
            <div className="relative overflow-hidden rounded-3xl bg-primary p-8 text-center text-primary-foreground shadow-[var(--shadow-strong)] sm:p-10">
              <div className="pointer-events-none absolute inset-0 bg-kolam-light opacity-60" />
              <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-saffron/40 blur-3xl" />
              <span className="relative mx-auto grid h-14 w-14 place-items-center rounded-full bg-white/15 text-saffron">
                <Crown className="h-6 w-6" />
              </span>
              <p className="relative mt-5 text-xs font-bold uppercase tracking-[0.25em] text-white/70">{head.role}</p>
              <p className="relative mt-3 font-display text-2xl font-medium leading-snug sm:text-3xl">{head.name}</p>
            </div>
          </Reveal>
        )}

        <Stagger stagger={0.05} className="mt-8 flex flex-wrap justify-center gap-4">
          {leaders.map((m, i) => (
            <StaggerItem key={m.id} className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)] xl:w-[calc(25%-0.75rem)]">
              <div className="surface group flex h-full items-center gap-4 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]">
                <span
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br font-display text-xl font-semibold text-white transition-transform duration-500 group-hover:rotate-6 ${gradients[i % gradients.length]}`}
                >
                  {monogram(m.name)}
                </span>
                <div className="min-w-0">
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-accent">{m.role}</p>
                  <p className="mt-1 font-semibold leading-snug text-foreground">{m.name}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {[
            { title: "Advisors", list: advisors, tone: "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground" },
            { title: "EC Members", list: ecMembers, tone: "bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground" },
          ]
            .filter((g) => g.list.length > 0)
            .map((group, gi) => (
              <Reveal key={group.title} delay={gi * 0.1} className="surface p-7 sm:p-8">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-2xl font-medium text-foreground">{group.title}</h3>
                  <span className="font-mono text-sm text-muted-foreground">{String(group.list.length).padStart(2, "0")}</span>
                </div>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {group.list.map((m) => (
                    <li key={m.id} className={`cursor-default rounded-full px-4 py-2 text-sm font-medium transition-colors ${group.tone}`}>
                      {m.name}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
