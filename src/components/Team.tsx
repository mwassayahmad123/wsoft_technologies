import { team } from "@/data/content";
import TeamMemberCard from "./TeamMemberCard";

export default function Team() {
  return (
    <section id="team" className="bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-sky-400">
            Our Team
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            The People Behind Wsoft
          </h2>
          <p className="mt-4 text-slate-400">
            A dedicated team of engineers, strategists, and specialists
            passionate about technology.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 xl:grid-cols-4">
          {team.map((member) => (
            <TeamMemberCard
              key={member.name}
              name={member.name}
              role={member.role}
              image={member.image}
              linkedin={"linkedin" in member ? member.linkedin : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
