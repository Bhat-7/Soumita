import React from "react";
import { useSelector } from "react-redux";

// Custom SVGs to replace Lucide brand icons
const GithubIcon = ({ size = 20, strokeWidth = 1.5 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.2 5.2 0 0 0-1.39-3.5 5 5 0 0 0-.14-3.46s-1.13-.36-3.54 1.23a12 12 0 0 0-6.44 0C6.13 2.36 5 2.72 5 2.72a5 5 0 0 0-.14 3.46A5.2 5.2 0 0 0 3.5 9.74c0 5.23 3 6.42 6 6.76a4.8 4.8 0 0 0-1 3.24v4"></path>
    <path d="M8 19.5c-3 1-4-1-4-1"></path>
  </svg>
);

const LinkedinIcon = ({ size = 20, strokeWidth = 1.5 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const portfolioData = useSelector((state) => state.ui.portfolioData);
  const { contact, name, built_by, tagline } = portfolioData.personal;

  return (
    <footer className="w-full py-12 mt-12 border-t border-slate-200/50 dark:border-slate-800/50 relative z-10">
      <div className="max-w-5xl mx-auto px-6 flex-row flex items-center justify-between">
        <a
          href={`mailto:${contact.email}`}
          className="text-lg font-light tracking-wide text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-300 border-b border-transparent hover:border-slate-400 dark:hover:border-slate-500 pb-1"
        >
          {contact.email} | {contact.phone}
        </a>

        {/* Social Links */}
        <div className="flex items-center gap-6">
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-200 transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.05)] dark:shadow-none hover:-translate-y-1"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={20} strokeWidth={1.5} />
          </a>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-200 transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.05)] dark:shadow-none hover:-translate-y-1"
            aria-label="GitHub"
          >
            <GithubIcon size={20} strokeWidth={1.5} />
          </a>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-2 mt-4 text-center">
        <p className="text-sm font-light text-slate-400 dark:text-slate-500 tracking-wider">
          &copy; {currentYear} {name}. All rights reserved. {built_by}
        </p>
        <p className="text-xs text-slate-300 dark:text-slate-600 mt-2">
          {tagline}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
