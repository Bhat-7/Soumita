import React, { useEffect } from "react";
import { Outlet } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Volume2, VolumeX } from "lucide-react";
import { toggleAudio } from "../context/uiSlice";
import { useAudio } from "../utility/useAudio";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  const dispatch = useDispatch();
  const { isDarkMode, isAudioPlaying } = useSelector((state) => state.ui);

  // Using a highly reliable test audio URL to prevent CORS/403 blocks
  useAudio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");

  // Apply Tailwind's dark mode class to the HTML root
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-200 font-sans transition-colors duration-500 selection:bg-slate-200 dark:selection:bg-slate-700 overflow-x-hidden">
      <Header />

      {/* Main Content Area */}
      <main className="pt-24 pb-12 flex-grow flex flex-col">
        <Outlet />
      </main>

      <Footer />

      {/* Persistent Audio Control - Floating Ghost Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => dispatch(toggleAudio())}
          className="flex items-center justify-center p-4 rounded-full backdrop-blur-md bg-white/60 dark:bg-slate-800/60 shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/30 dark:border-slate-700/30 text-slate-600 dark:text-slate-300 hover:scale-105 transition-all duration-300 opacity-70 hover:opacity-100 focus:outline-none"
          aria-label="Toggle Background Audio"
        >
          {isAudioPlaying ? (
            <Volume2 size={22} strokeWidth={1.5} />
          ) : (
            <VolumeX size={22} strokeWidth={1.5} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Layout;
