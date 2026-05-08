import React, { useState, useEffect } from "react";
import { Plane, Flower2, ChevronLeft, ChevronRight } from "lucide-react";

const PersonalInterests = ({ interests }) => {
  const [currentPlaceIdx, setCurrentPlaceIdx] = useState(0);

  useEffect(() => {
    if (
      !interests.travel_destinations ||
      interests.travel_destinations.length === 0
    )
      return;
    const timer = setInterval(() => {
      setCurrentPlaceIdx(
        (prev) => (prev + 1) % interests.travel_destinations.length,
      );
    }, 3500);
    return () => clearInterval(timer);
  }, [interests.travel_destinations]);

  return (
    <section className="py-16 max-w-4xl mx-auto px-4 border-t border-slate-200/50 dark:border-slate-800/50 mt-12">
      <div className="flex flex-col gap-16">
        {/* Travel Interests */}
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="p-4 rounded-full bg-indigo-50 dark:bg-slate-800/50 text-indigo-400 dark:text-indigo-300">
            <Plane size={28} strokeWidth={1.5} />
          </div>

          <h4 className="text-xl font-light tracking-widest text-slate-700 dark:text-slate-200 uppercase text-sm">
            Wanderlust
          </h4>

          <div className="relative w-full max-w-[280px] mx-auto overflow-hidden rounded-2xl aspect-[4/3] bg-slate-100 dark:bg-slate-800/50 shadow-sm border border-slate-200/50 dark:border-slate-700/50 group">
            {interests.travel_destinations.map((dest, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  idx === currentPlaceIdx ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                {dest.images && dest.images.length > 0 ? (
                  <img
                    src={dest.images[0]}
                    alt={dest.place}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-indigo-50 dark:bg-slate-800/80 text-indigo-300 dark:text-slate-500">
                    <Plane size={40} strokeWidth={1} className="opacity-50" />
                  </div>
                )}
                {/* Gradient overlay for text */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex items-end justify-center h-1/2">
                  <span className="text-white text-sm font-medium tracking-wide">
                    {dest.place}
                  </span>
                </div>
              </div>
            ))}

            {/* Navigation Controls */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() =>
                  setCurrentPlaceIdx(
                    (prev) =>
                      (prev - 1 + interests.travel_destinations.length) %
                      interests.travel_destinations.length,
                  )
                }
                className="p-1.5 rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm transition-all"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() =>
                  setCurrentPlaceIdx(
                    (prev) => (prev + 1) % interests.travel_destinations.length,
                  )
                }
                className="p-1.5 rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm transition-all"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Flora Interests */}
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="p-4 rounded-full bg-rose-50 dark:bg-slate-800/50 text-rose-400 dark:text-rose-300">
            <Flower2 size={28} strokeWidth={1.5} />
          </div>
          <h4 className="text-xl font-light tracking-widest text-slate-700 dark:text-slate-200 uppercase text-sm">
            Botanical Favorites
          </h4>
          <div className="flex flex-wrap justify-center gap-3">
            {interests.favorite_flowers.map((flower, idx) => (
              <span
                key={idx}
                className="px-4 py-2 text-sm font-light text-slate-500 dark:text-slate-400 bg-white/60 dark:bg-slate-800/40 rounded-full border border-slate-100 dark:border-slate-700/50 shadow-sm"
              >
                {flower}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalInterests;
