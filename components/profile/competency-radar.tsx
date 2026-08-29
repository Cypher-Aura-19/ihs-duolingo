"use client";

import { BookOpen, Headphones, Mic, PenTool, Sparkles, SpellCheck } from "lucide-react";

interface CompetencyRadarProps {
  competencies: {
    speaking: number;
    vocabulary: number;
    grammar: number;
    listening: number;
    reading: number;
    writing: number;
  };
}

export const CompetencyRadar = ({ competencies }: CompetencyRadarProps) => {
  const skills = [
    {
      name: "Speaking & Pronunciation",
      score: competencies.speaking,
      icon: Mic,
      desc: "Azure Speech phonetic accuracy, fluency & cadence",
      color: "from-amber-400 to-[#6e5e06]",
      tag: "Speech-to-Text & Fluency Lab",
    },
    {
      name: "Vocabulary Mastery",
      score: competencies.vocabulary,
      icon: SpellCheck,
      desc: "Active lexical recall, flashcards & term matching",
      color: "from-yellow-400 to-amber-600",
      tag: "Deterministic Lexicon",
    },
    {
      name: "Grammar & Syntax",
      score: competencies.grammar,
      icon: Sparkles,
      desc: "Sentence structuring, tenses & morphological rules",
      color: "from-[#77583a] to-[#5d4124]",
      tag: "Rule-Engine Validated",
    },
    {
      name: "Listening Comprehension",
      score: competencies.listening,
      icon: Headphones,
      desc: "Audio passage interpretation & dictation accuracy",
      color: "from-[#565e74] to-[#3f465c]",
      tag: "Native Audio Assets",
    },
    {
      name: "Reading & Text Analysis",
      score: competencies.reading,
      icon: BookOpen,
      desc: "Passage context comprehension & glossary retention",
      color: "from-amber-600 to-[#77583a]",
      tag: "Academic Literature",
    },
    {
      name: "Writing & Composition",
      score: competencies.writing,
      icon: PenTool,
      desc: "Open-ended essay synthesis & AI rubric evaluation",
      color: "from-[#6e5e06] to-[#382613]",
      tag: "LLM Evaluated",
    },
  ];

  const overallAverage = Math.round(
    Object.values(competencies).reduce((a, b) => a + b, 0) / 6
  );

  return (
    <div className="rounded-2xl border-2 border-[#e8e2d7] bg-white p-6 shadow-md border-t-4 border-t-[#77583a]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <div>
          <h3 className="text-xl font-bold font-heading text-[#1d1b15]">
            Scholarly Competency Matrix
          </h3>
          <p className="text-sm text-[#4b4738]">
            Multi-dimensional evaluation breakdown per the activity engine specifications
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto rounded-xl border border-[#cdc6b3] bg-[#fff9ee] px-3.5 py-1.5">
          <span className="text-xs font-semibold text-[#7c7766]">Overall Proficiency:</span>
          <span className="text-base font-extrabold font-heading text-[#6e5e06]">
            {overallAverage}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill) => {
          const Icon = skill.icon;
          return (
            <div
              key={skill.name}
              className="group rounded-xl border border-[#e8e2d7] bg-[#fdfbf7] p-4 transition-all duration-200 hover:bg-[#fff9ee] hover:border-[#6e5e06] hover:shadow-xs"
            >
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#cdc6b3] bg-white text-[#6e5e06] shadow-2xs group-hover:bg-[#6e5e06] group-hover:text-white transition-colors">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold font-heading text-[#1d1b15]">
                      {skill.name}
                    </h4>
                    <span className="text-[11px] font-semibold text-[#7c7766]">
                      {skill.tag}
                    </span>
                  </div>
                </div>

                <span className="text-base font-extrabold font-heading text-[#6e5e06]">
                  {skill.score}%
                </span>
              </div>

              <p className="text-xs text-[#4b4738] mb-3">{skill.desc}</p>

              {/* Progress bar */}
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#eee7dd] border border-[#cdc6b3]/50">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${skill.color} transition-all duration-500`}
                  style={{ width: `${skill.score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
