import React from "react";

const Hero = ({ personal }) => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[70vh] text-center pt-20 pb-16 overflow-hidden">
      {/* Abstract floating ghost shapes */}
      <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-slate-300/30 dark:bg-slate-700/20 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-70 animate-pulse duration-1000 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-slate-200/30 dark:bg-slate-600/10 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-50 animate-pulse duration-700 delay-500 -translate-y-1/2 pointer-events-none"></div>

      {/* Foreground Content */}
      <div className="relative z-10 space-y-6 px-4">
        <h1 className="text-5xl md:text-7xl font-extralight tracking-tight text-slate-800 dark:text-slate-100">
          {personal.name}
        </h1>
        <h2 className="text-xl md:text-3xl font-light tracking-wide text-slate-500 dark:text-slate-400">
          {personal.title}
        </h2>

        <div className="w-16 h-[1px] bg-slate-300 dark:bg-slate-700 mx-auto my-8"></div>

        <p className="max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed text-slate-600 dark:text-slate-300/80">
          {personal.summary}
        </p>
      </div>
    </section>
  );
};

export default Hero;
