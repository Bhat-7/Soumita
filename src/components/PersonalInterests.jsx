import React from "react";
import { Plane, Flower2 } from "lucide-react";
import DestinationCarousel from "./DestinationCarousel";

const PersonalInterests = ({ interests }) => {
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

          <DestinationCarousel destinations={interests.travel_destinations} />
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
