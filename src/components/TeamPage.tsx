import React from "react";

const team = [
  { role: "Hon’ble President", name: "GURU. Padmasree, Kalaimamani Mr.K.Kesavasamy" },
  { role: "President", name: "Mrs.A.Jemuna" },
  { role: "Founder & Secretary", name: "Dr.E.Vishnuvarthan" },
  { role: "Joint Secretary", name: "Mrs.C.Brundha" },
  { role: "Deputy Secretary 1", name: "Hr.K.Parthiban" },
  { role: "Deputy Secretary 2", name: "Mr.A. Manikandaprabhu" },
  { role: "Treasurer", name: "Mr.G. Surya" },
  { role: "Joint Treasurer", name: "Mrs.D. Nivetha" },
  { role: "Legal Advisor", name: "Lr. M.Muruganandham" },
  { role: "PROs", name: "Mr.M.Mohamed Arif Maraicar" },
  { role: "PROs", name: "Mr.S.Anbarasan" },
  { role: "Membership Coordinator", name: "Mr.A.Ramji" },
  { role: "Event Coordinator", name: "Mr.T.Udhayakumar" },
  { role: "Event Coordinator", name: "Mr.M.Abdul Kareem" },
  { role: "Event Coordinator", name: "Mr.J.Vigneshraj" },
];

const advisors = [
  "Dr.Uma Maheshwari",
  "Dr.LSP. Sozhasingarayar",
  "Mr.J. Krishnan",
  "Mr.Parisravi",
  "Dr.R. Ashokkumar",
  "Mr.T. Balraj",
  "Mr.S.John Kennady",
  "Mr.KMS.Karthigeyan",
  "Dr.A. Vinothkumar",
  "Mr.R.Muthukumar",
];

const ecMembers = [
  "Er.B.Sugumar",
  "Dr.N.Harimathi",
  "Lr.P.Jananika",
  "Er.S.Thirumalaivasan",
  "Mr.M.Vijaykumar",
  "Er.B.Anbukumaran",
  "Mr.T.Ayyappan",
  "Mr.R.Ake bachienen",
  "Miss.S.Vigneswary",
];

const sponsors = [
  "Sekar textiles",
  "Fittness zone unisex gym",
  "Zen health care clinic",
  "Kaarai raman creations",
  "NGV fabrication",
  "Thaai decors",
];

export default function TeamPage() {
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
          {/* Hon’ble President */}
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-accent mb-2">Hon’ble President</h3>
            <p className="text-xl md:text-2xl font-semibold text-primary">{team[0].name}</p>
          </div>
          {/* Leadership */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {team.slice(1).map((member, idx) => (
              <div key={idx} className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-4 border-l-4 border-primary shadow">
                <span className="block text-lg font-bold text-primary">{member.role}</span>
                <span className="block text-base text-foreground">{member.name}</span>
              </div>
            ))}
          </div>
          {/* Advisors */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-accent mb-2">Advisors</h3>
            <div className="flex flex-wrap gap-3">
              {advisors.map((name, idx) => (
                <span key={idx} className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium shadow">{name}</span>
              ))}
            </div>
          </div>
          {/* EC Members */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-accent mb-2">EC Members</h3>
            <div className="flex flex-wrap gap-3">
              {ecMembers.map((name, idx) => (
                <span key={idx} className="bg-accent/10 text-accent px-4 py-2 rounded-full font-medium shadow">{name}</span>
              ))}
            </div>
          </div>
          {/* Supporting Sponsors */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">Supporting Sponsors</h3>
            <div className="flex flex-wrap gap-3">
              {sponsors.map((name, idx) => (
                <span key={idx} className="bg-secondary/10 text-secondary px-4 py-2 rounded-full font-medium shadow">{name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}