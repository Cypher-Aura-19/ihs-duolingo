import {
  BookOpen,
  Headphones,
  Mic,
  PenTool,
  Puzzle,
  SpellCheck,
} from "lucide-react";

interface ProfileSkillsProps {
  competencies: {
    speaking: number;
    vocabulary: number;
    grammar: number;
    listening: number;
    reading: number;
    writing: number;
  };
}

export const ProfileSkills = ({ competencies }: ProfileSkillsProps) => {
  const skills = [
    {
      name: "Speaking and pronunciation",
      score: competencies.speaking,
      tier: "C1 Advanced",
      icon: Mic,
    },
    {
      name: "Vocabulary recall",
      score: competencies.vocabulary,
      tier: "C2 Mastery",
      icon: SpellCheck,
    },
    {
      name: "Grammar and syntax",
      score: competencies.grammar,
      tier: "C1 Proficient",
      icon: Puzzle,
    },
    {
      name: "Listening comprehension",
      score: competencies.listening,
      tier: "B2 Advanced",
      icon: Headphones,
    },
    {
      name: "Reading and analysis",
      score: competencies.reading,
      tier: "C2 Mastery",
      icon: BookOpen,
    },
    {
      name: "Writing and composition",
      score: competencies.writing,
      tier: "C1 Advanced",
      icon: PenTool,
    },
  ];

  const overall = Math.round(
    Object.values(competencies).reduce((total, score) => total + score, 0) / 6
  );

  return (
    <section className="rounded-2xl border border-[#e3ded2] bg-white p-5 shadow-[0_12px_32px_rgba(76,67,40,0.05)] sm:p-7">
      <div className="flex items-start justify-between gap-5">
        <div>
          <h2 className="font-heading text-xl font-extrabold tracking-[-0.02em] text-[#1d1b15] sm:text-2xl">
            Language skills
          </h2>
          <p className="mt-1 text-sm text-[#686354]">
            Your current proficiency across six core skills.
          </p>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-xs font-semibold text-[#7c7766]">Overall</p>
          <p className="font-heading text-2xl font-extrabold text-[#594c05]">
            {overall}%
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-x-8 md:grid-cols-2">
        {skills.map((skill) => {
          const Icon = skill.icon;
          const filledSegments = Math.round(skill.score / 10);

          return (
            <div
              key={skill.name}
              className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 border-t border-[#ebe7dd] py-4"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5edbd] text-[#594c05]">
                <Icon className="h-5 w-5" />
              </span>

              <div className="min-w-0">
                <h3 className="truncate text-sm font-bold text-[#1d1b15]">
                  {skill.name}
                </h3>
                <p className="mt-0.5 text-xs font-medium text-[#7c7766]">
                  {skill.tier}
                </p>
              </div>

              <span className="font-heading text-base font-extrabold tabular-nums text-[#2c2a23]">
                {skill.score}%
              </span>

              <div
                className="col-start-2 col-end-4 grid grid-cols-10 gap-1.5"
                aria-hidden="true"
              >
                {Array.from({ length: 10 }, (_, index) => (
                  <span
                    key={index}
                    className={`h-1.5 rounded-sm ${
                      index < filledSegments ? "bg-[#6e5e06]" : "bg-[#e8e3d8]"
                    }`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
