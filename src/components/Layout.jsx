import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Moon, Sun, Volume2, VolumeX, Menu, X, Download } from "lucide-react";
import { toggleTheme, toggleAudio } from "../assets/uiSlice";
import { useAudio } from "../assets/useAudio";
import Footer from "./Footer";
import portfolioData from "../assets/portfolioData.json";

const Layout = () => {
  const dispatch = useDispatch();
  const { isDarkMode, isAudioPlaying } = useSelector((state) => state.ui);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const navLinks = [
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Reviews", href: "#recommendations" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-200 font-sans transition-colors duration-500 selection:bg-slate-200 dark:selection:bg-slate-700 overflow-x-hidden">
      {/* Fixed Translucent Navigation - Floating Ghost Aesthetic */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-white/40 dark:bg-slate-900/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.1)] border-b border-white/20 dark:border-slate-700/30">
        <div className="text-xl font-light tracking-wider">
          <span className="font-medium">S</span>BS.
        </div>
        <nav className="flex items-center gap-6">
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 mr-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-light tracking-wide text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Download Resume Button (Desktop) */}
          <a
            href={portfolioData.personal.downloadPDF}
            download="Soumita_Bhattacharya_Sen_CV.pdf"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 text-sm font-medium tracking-wide text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
          >
            <Download size={16} strokeWidth={1.5} />
            <span>Resume</span>
          </a>

          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors opacity-80 hover:opacity-100"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? (
              <Sun size={20} strokeWidth={1.5} />
            ) : (
              <Moon size={20} strokeWidth={1.5} />
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors opacity-80 hover:opacity-100"
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? (
              <X size={20} strokeWidth={1.5} />
            ) : (
              <Menu size={20} strokeWidth={1.5} />
            )}
          </button>
        </nav>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-lg md:hidden flex flex-col py-6 px-6 gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl font-light tracking-wide text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}

            {/* Download Resume Button (Mobile) */}
            <a
              href={portfolioData.personal.downloadPDF}
              download="Soumita_Bhattacharya_Sen_CV.pdf"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 mt-2 px-6 py-3.5 rounded-xl bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 font-medium tracking-wide transition-all shadow-md"
            >
              <Download size={18} strokeWidth={2} />
              <span>Download Resume</span>
            </a>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="pt-24 pb-12 px-6 max-w-5xl mx-auto flex-grow flex flex-col">
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
