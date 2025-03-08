'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

function Header() {
  const { theme, toggleTheme, mounted: themeMounted } = useTheme();
  const { language, setLanguage, t, mounted: langMounted } = useLanguage();
  const [showCursor, setShowCursor] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const isMounted = themeMounted && langMounted;

  // Watch for theme changes
  useEffect(() => {
    if (themeMounted) {
      // Initial state
      setIsDarkMode(document.documentElement.classList.contains('dark'));

      // Watch for changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.attributeName === 'class' &&
            mutation.target === document.documentElement
          ) {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
          }
        });
      });

      observer.observe(document.documentElement, { attributes: true });

      return () => observer.disconnect();
    }
  }, [themeMounted]);

  // Cursor blink effect
  useEffect(() => {
    if (!isMounted) return;

    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, [isMounted]);

  const nameText = 'Caio Reis';

  const terminalVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0 },
  };

  if (!isMounted) {
    return (
      <header className="sticky top-0 z-50 py-4 px-6 flex justify-between items-center border-b border-zinc-200 bg-white dark:bg-zinc-900 dark:border-zinc-800">
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-md p-0.5">
            <div className="bg-white dark:bg-zinc-900 px-3 py-1 rounded-sm">
              <div className="font-mono text-lg font-bold text-zinc-800 dark:text-zinc-100 flex items-center">
                <span className="text-emerald-600 dark:text-emerald-400 mr-1">
                  &gt;
                </span>
                <span>Caio Reis</span>
              </div>
            </div>
          </div>
        </div>
        <nav className="hidden md:flex space-x-6"></nav>
        <div className="flex items-center space-x-4"></div>
      </header>
    );
  }

  // Use isDarkMode for explicit theme control
  return (
    <motion.header
      className={`sticky top-0 z-50 py-4 px-6 flex justify-between items-center border-b transition-all duration-300 ${
        isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center">
        <div
          className={`rounded-md p-0.5 transition-all duration-300 bg-gradient-to-r ${
            isDarkMode
              ? 'from-emerald-400 to-blue-400'
              : 'from-emerald-600 to-blue-600'
          }`}
        >
          <div
            className={`px-3 py-1 pr-5 rounded-sm transition-all duration-300 ${
              isDarkMode ? 'bg-zinc-900' : 'bg-white'
            }`}
          >
            <motion.div
              variants={terminalVariants}
              initial="hidden"
              animate="visible"
              className={`font-mono text-lg font-bold flex items-center ${
                isDarkMode ? 'text-zinc-100' : 'text-zinc-800'
              }`}
            >
              <span
                className={`mr-1 transition-colors duration-300 ${
                  isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                }`}
              >
                &gt;
              </span>
              {nameText.split('').map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="transition-colors duration-300"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
              <div className="relative inline-flex items-center h-full">
                <AnimatePresence>
                  {showCursor && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`absolute inset-y-0 my-auto h-5 w-2 transition-colors duration-300 ${
                        isDarkMode ? 'bg-zinc-100' : 'bg-zinc-800'
                      }`}
                      style={{
                        top: '50%',
                        left: '4px',
                        transform: 'translateY(0%)',
                      }}
                    ></motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <nav className="hidden md:flex space-x-6">
        {['home', 'about', 'projects', 'contact'].map((item) => (
          <a
            key={item}
            href={`#${item}`}
            className={`font-medium transition-colors duration-300 ${
              isDarkMode
                ? 'text-zinc-300 hover:text-zinc-50'
                : 'text-zinc-700 hover:text-zinc-900'
            }`}
          >
            {t(`header.${item}`)}
          </a>
        ))}
      </nav>

      <div className="flex items-center space-x-4">
        <button
          onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
          className={`px-2 py-1 rounded-md text-sm font-medium transition-all duration-300 cursor-pointer ${
            isDarkMode
              ? 'text-zinc-300 hover:text-zinc-50 hover:bg-zinc-800'
              : 'text-zinc-700 hover:text-zinc-900 hover:bg-zinc-200'
          }`}
        >
          {language.toUpperCase()}
        </button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-all duration-300 cursor-pointer ${
            isDarkMode
              ? 'bg-zinc-700 text-zinc-200 hover:bg-zinc-600'
              : 'bg-zinc-200 text-zinc-800 hover:bg-zinc-300'
          }`}
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </motion.button>
      </div>
    </motion.header>
  );
}

export default Header;
