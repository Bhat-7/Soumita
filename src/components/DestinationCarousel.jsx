import React, { useState, useEffect } from "react";
import { Plane, ChevronLeft, ChevronRight } from "lucide-react";

const DestinationCarousel = ({ destinations }) => {
  const [currentPlaceIdx, setCurrentPlaceIdx] = useState(0);

  useEffect(() => {
    if (!destinations || destinations.length === 0) return;
    const timer = setInterval(() => {
      setCurrentPlaceIdx((prev) => (prev + 1) % destinations.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [destinations]);

  if (!destinations || destinations.length === 0) return null;

  return (
    <div className="relative w-[70vw] md:w-[70%] mx-auto overflow-hidden rounded-2xl aspect-[4/3] bg-slate-100 dark:bg-slate-800/50 shadow-sm border border-slate-200/50 dark:border-slate-700/50 group">
      {destinations.map((dest, idx) => (
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
              (prev) => (prev - 1 + destinations.length) % destinations.length,
            )
          }
          className="p-1.5 rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm transition-all"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() =>
            setCurrentPlaceIdx((prev) => (prev + 1) % destinations.length)
          }
          className="p-1.5 rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm transition-all"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default DestinationCarousel;
