import React from "react";
import { Briefcase } from "lucide-react";

const ExperienceTimeline = ({ experiences }) => {
  return (
    <section
      id="experience"
      className="py-16 max-w-4xl mx-auto px-4 scroll-mt-24"
    >
      <h3 className="text-3xl font-light tracking-wider text-slate-800 dark:text-slate-200 mb-16 text-center">
        Experience
      </h3>

      {/* Timeline Container */}
      <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 md:ml-0">
        {experiences.map((exp, index) => (
          <div key={exp.id || index} className="mb-14 ml-8 relative group">
            {/* Node Marker */}
            <span className="absolute -left-[49px] flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 shadow-sm group-hover:scale-110 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-all duration-300 z-10">
              <Briefcase size={14} strokeWidth={1.5} />
            </span>

            {/* Header details: Logo, Company Name, Role, and Duration */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5 pl-2 gap-3 md:gap-0">
              <div className="flex items-center gap-3 flex-wrap">
                {exp.logo && (
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-white/90 dark:bg-white/95 rounded-md p-1.5 shadow-sm border border-slate-200/50">
                    <img
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-lg md:text-xl font-medium text-slate-700 dark:text-slate-200">
                    {exp.company}
                  </h4>
                  <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">
                    |
                  </span>
                  <h5 className="text-md md:text-lg font-normal text-slate-500 dark:text-slate-400">
                    {exp.role}
                  </h5>
                </div>
              </div>
              <span className="text-sm font-light tracking-wide text-slate-400 dark:text-slate-500">
                {exp.duration}
              </span>
            </div>

            {/* Glassy Translucent Card */}
            <div className="p-6 md:p-8 rounded-2xl backdrop-blur-md bg-white/40 dark:bg-slate-800/30 shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-white/40 dark:border-slate-700/30 transition-all duration-500 hover:bg-white/60 dark:hover:bg-slate-800/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]">
              <p className="text-slate-600 dark:text-slate-300 font-light leading-relaxed mb-4">
                {exp.description}
              </p>

              {exp.highlights && exp.highlights.length > 0 && (
                <ul className="list-disc list-outside text-sm text-slate-500 dark:text-slate-400 font-light space-y-2 ml-4">
                  {exp.highlights.map((item, idx) => (
                    <li key={idx} className="pl-2">
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {/* Technologies / Tools Highlight Badges */}
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2 pl-2">
                  {exp.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs tracking-wide font-medium rounded-full bg-slate-200/50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 border border-slate-300/50 dark:border-slate-600/50 backdrop-blur-sm transition-colors hover:bg-slate-300/80 dark:hover:bg-slate-600/80 shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceTimeline;
