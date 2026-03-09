import React from "react";
import { useTeamMembers, useSponsors } from "@/hooks/use-cms";

export default function TeamPage() {
  const { data: allMembers } = useTeamMembers();
  const { data: sponsors } = useSponsors();

  const team = (allMembers ?? []).filter((m) => m.category === "leadership");
  const advisors = (allMembers ?? []).filter((m) => m.category === "advisor");
  const ecMembers = (allMembers ?? []).filter((m) => m.category === "ec_member");

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-background to-secondary/20 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-primary mb-3 relative">
            Our Team & Advisors
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
          </h2>
        </div>
        <div className="glass-effect rounded-3xl p-8 md:p-12 shadow-[var(--shadow-soft)] space-y-10">
          {/* Hon'ble President */}
          {team.length > 0 && (
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-accent mb-2">{team[0].role}</h3>
              <p className="text-xl md:text-2xl font-semibold text-primary">{team[0].name}</p>
            </div>
          )}
          {/* Leadership */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {team.slice(1).map((member) => (
              <div key={member.id} className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-4 border-l-4 border-primary shadow">
                <span className="block text-lg font-bold text-primary">{member.role}</span>
                <span className="block text-base text-foreground">{member.name}</span>
              </div>
            ))}
          </div>
          {/* Advisors */}
          {advisors.length > 0 && (
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-accent mb-2">Advisors</h3>
              <div className="flex flex-wrap gap-3">
                {advisors.map((member) => (
                  <span key={member.id} className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium shadow">{member.name}</span>
                ))}
              </div>
            </div>
          )}
          {/* EC Members */}
          {ecMembers.length > 0 && (
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-accent mb-2">EC Members</h3>
              <div className="flex flex-wrap gap-3">
                {ecMembers.map((member) => (
                  <span key={member.id} className="bg-accent/10 text-accent px-4 py-2 rounded-full font-medium shadow">{member.name}</span>
                ))}
              </div>
            </div>
          )}
          {/* Supporting Sponsors */}
          {(sponsors ?? []).length > 0 && (
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">Supporting Sponsors</h3>
              <div className="flex flex-wrap gap-3">
                {(sponsors ?? []).map((sponsor) => (
                  <span key={sponsor.id} className="bg-secondary/10 text-secondary px-4 py-2 rounded-full font-medium shadow">{sponsor.name}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
