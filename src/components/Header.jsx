import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Moon, Sun, Menu, X, Download } from "lucide-react";
import { toggleTheme } from "../context/uiSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { isDarkMode, portfolioData } = useSelector((state) => state.ui);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Reviews", href: "#recommendations" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-white/40 dark:bg-slate-900/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.1)] border-b border-white/20 dark:border-slate-700/30">
      <div className="text-xl font-light tracking-wider">
        <span className="font-medium">Soumita</span> Bhattacharya Sen
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
  );
};

export default Header;
