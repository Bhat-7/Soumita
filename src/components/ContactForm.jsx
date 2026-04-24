import React, { useState } from "react";
import { Send, User, Mail, MessageSquare, CheckCircle } from "lucide-react";

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission for UI purposes
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    e.target.reset();
  };

  return (
    <section
      id="contact"
      className="py-20 max-w-3xl mx-auto px-4 relative scroll-mt-24"
    >
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-light tracking-tight text-slate-800 dark:text-slate-200 mb-4">
          Got a data mystery?{" "}
          <span className="font-medium italic text-slate-600 dark:text-slate-400">
            Let's solve it.
          </span>
        </h3>
        <p className="text-lg text-slate-500 dark:text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
          Whether you need a dashboard that doesn't put people to sleep, want to
          debate the magic of Power BI vs Tableau, or just want to send a
          friendly "hello", I'm all ears. No query is too complex (unless it's
          missing a JOIN condition).
        </p>
      </div>

      <div className="p-8 md:p-10 rounded-3xl backdrop-blur-md bg-white/40 dark:bg-slate-800/30 shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.15)] border border-white/60 dark:border-slate-700/40 relative overflow-hidden">
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6 text-green-500 dark:text-green-400">
              <CheckCircle size={32} strokeWidth={1.5} />
            </div>
            <h4 className="text-2xl font-light text-slate-800 dark:text-slate-200 mb-2">
              Message Sent!
            </h4>
            <p className="text-slate-500 dark:text-slate-400 font-light">
              Thanks for reaching out. I'll get back to you faster than a
              well-optimized SQL query!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-slate-600 dark:group-focus-within:text-slate-300 transition-colors">
                  <User size={18} strokeWidth={1.5} />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600 focus:bg-white/80 dark:focus:bg-slate-900/80 transition-all text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 font-light"
                />
              </div>

              {/* Email Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-slate-600 dark:group-focus-within:text-slate-300 transition-colors">
                  <Mail size={18} strokeWidth={1.5} />
                </div>
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600 focus:bg-white/80 dark:focus:bg-slate-900/80 transition-all text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 font-light"
                />
              </div>
            </div>

            {/* Message Textarea */}
            <div className="relative group">
              <div className="absolute top-4 left-0 pl-4 pointer-events-none text-slate-400 group-focus-within:text-slate-600 dark:group-focus-within:text-slate-300 transition-colors">
                <MessageSquare size={18} strokeWidth={1.5} />
              </div>
              <textarea
                required
                rows="5"
                placeholder="What's on your mind?"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600 focus:bg-white/80 dark:focus:bg-slate-900/80 transition-all text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 font-light resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 flex items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 dark:bg-slate-200 dark:hover:bg-white text-white dark:text-slate-900 font-medium tracking-wide transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 group ml-auto"
            >
              <span>Send Message</span>
              <Send
                size={16}
                strokeWidth={2}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
              />
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ContactForm;
