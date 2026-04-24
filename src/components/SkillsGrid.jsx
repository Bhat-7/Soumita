import React from "react";
import { BarChart2, Database, Users } from "lucide-react";

const SkillsGrid = ({ skills }) => {
  // Map the JSON keys to specific Lucide icons for visual variety
  const iconMap = {
    BI_Tools: <BarChart2 size={24} strokeWidth={1.5} />,
    Languages_and_Databases: <Database size={24} strokeWidth={1.5} />,
    Soft_Skills: <Users size={24} strokeWidth={1.5} />,
  };

  return (
    <section id="skills" className="py-16 max-w-5xl mx-auto px-4 scroll-mt-24">
      <h3 className="text-3xl font-light tracking-wider text-slate-800 dark:text-slate-200 mb-12 text-center">
        Technical Expertise
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(skills).map(([category, items]) => {
          // Format category name (e.g., "BI_Tools" -> "BI Tools")
          const formattedCategory = category.replace(/_/g, " ");

          return (
            <div
              key={category}
              className="flex flex-col p-8 rounded-2xl backdrop-blur-md bg-white/40 dark:bg-slate-800/30 shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-white/40 dark:border-slate-700/30 transition-all duration-500 hover:-translate-y-1 hover:bg-white/60 dark:hover:bg-slate-800/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] group"
            >
              <div className="flex items-center gap-4 mb-6 text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                <span className="p-3 rounded-full bg-slate-100/50 dark:bg-slate-700/50">
                  {iconMap[category] || (
                    <Database size={24} strokeWidth={1.5} />
                  )}
                </span>
                <h4 className="text-xl font-medium tracking-wide">
                  {formattedCategory}
                </h4>
              </div>

              <ul className="space-y-3 flex-grow">
                {items.map((skill, index) => (
                  <li
                    key={index}
                    className="text-slate-600 dark:text-slate-300 font-light tracking-wide flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-slate-300 dark:before:bg-slate-600 before:rounded-full before:mr-3"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SkillsGrid;
