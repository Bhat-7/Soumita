import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const ReviewCarousel = ({ recommendations }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === recommendations.length - 1 ? 0 : prev + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? recommendations.length - 1 : prev - 1,
    );
  };

  // Optional: Auto-slide every 8 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [recommendations.length]);

  if (!recommendations || recommendations.length === 0) return null;

  return (
    <section
      id="recommendations"
      className="py-20 max-w-4xl mx-auto px-4 relative scroll-mt-24"
    >
      <h3 className="text-3xl font-light tracking-wider text-slate-800 dark:text-slate-200 mb-12 text-center">
        Recommendations
      </h3>

      <div className="relative p-8 md:p-12 rounded-3xl backdrop-blur-md bg-white/30 dark:bg-slate-800/20 shadow-[0_4px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-white/40 dark:border-slate-700/30 overflow-hidden min-h-[300px] grid items-center">
        <Quote className="absolute top-8 left-8 text-slate-200/50 dark:text-slate-700/30 w-24 h-24 -z-10" />

        {recommendations.map((rec, index) => (
          <div
            key={rec.id}
            className={`[grid-area:1/1] transition-opacity duration-1000 ease-in-out px-4 md:px-12 w-full text-center flex flex-col items-center justify-center ${
              index === currentIndex
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <p className="text-xl md:text-2xl font-serif italic text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
              "{rec.text}"
            </p>
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white tracking-wide">
              {rec.name}
            </h4>
            <span className="text-sm font-light text-slate-500 dark:text-slate-400">
              {rec.role}
            </span>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center items-center gap-6 mt-8">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-white/50 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50 shadow-sm"
          aria-label="Previous review"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-white/50 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50 shadow-sm"
          aria-label="Next review"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default ReviewCarousel;
