'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  FiTerminal,
  FiDownload,
  FiCode,
  FiMenu,
  FiX,
  FiMoon,
  FiSun,
} from 'react-icons/fi';

function Header() {
  const { toggleTheme, mounted: themeMounted } = useTheme();
  const { language, setLanguage, mounted: langMounted } = useLanguage();
  const [showCursor, setShowCursor] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isMounted = themeMounted && langMounted;

  useEffect(() => {
    if (themeMounted) {
      setIsDarkMode(document.documentElement.classList.contains('dark'));

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

  useEffect(() => {
    if (!isMounted) return;

    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, [isMounted]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleCVDownload = () => {
    const cvFileName = language === 'pt' ? 'cv.pdf' : 'cv_en.pdf';
    const link = document.createElement('a');
    link.href = `/${cvFileName}`;
    link.setAttribute('download', cvFileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 10,
      },
    },
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };

  const menuItemVariants = {
    closed: { opacity: 0, y: -10 },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  if (!isMounted) {
    return (
      <header className="sticky top-0 z-50 py-4 px-6 flex justify-between items-center border-b border-zinc-200 bg-white dark:bg-zinc-900 dark:border-zinc-800">
        <div className="w-full h-16"></div>
      </header>
    );
  }

  return (
    <motion.header
      className={`sticky top-0 z-50 py-3 px-4 md:px-6 flex justify-between items-center border-b backdrop-blur-md transition-all duration-250 ${
        isDarkMode
          ? 'bg-zinc-900/90 border-zinc-800/70'
          : 'bg-white/90 border-zinc-200/70'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center">
        <motion.div
          className={`px-3 py-2 rounded-md transition-all duration-250 ${
            isDarkMode
              ? 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700'
              : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200'
          }`}
          whileTap={{ scale: 0.97 }}
        >
          <div className="flex items-center">
            <FiTerminal
              className={`mr-2 transition-colors duration-250 ${
                isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
              }`}
            />

            <motion.div
              className="font-mono font-medium"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {['C', 'a', 'i', 'o', '_', 'R', 'e', 'i', 's'].map((char, i) => (
                <motion.span
                  key={i}
                  variants={itemVariants}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
              <AnimatePresence>
                {showCursor && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`inline-block w-1.5 h-4 ml-0.5 ${
                      isDarkMode ? 'bg-zinc-300' : 'bg-zinc-700'
                    }`}
                  ></motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="hidden md:flex items-center space-x-3">
        <motion.button
          className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-250 ${
            isDarkMode
              ? 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
              : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200'
          } cursor-pointer`}
          onClick={handleCVDownload}
          whileTap={{ scale: 0.97 }}
        >
          <FiDownload
            className={`mr-1.5 ${
              isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
            }`}
          />
          {language === 'pt' ? 'Download CV' : 'Download Resume'}
        </motion.button>

        <motion.button
          onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
          className={`px-3 py-2 rounded-md text-sm font-mono font-medium transition-all duration-250 ${
            isDarkMode
              ? 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
              : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200'
          } cursor-pointer`}
          whileTap={{ scale: 0.97 }}
        >
          <FiCode className="inline mr-1" />
          {language.toUpperCase()}
        </motion.button>

        <motion.button
          onClick={toggleTheme}
          className={`p-2 rounded-md transition-all duration-250 ${
            isDarkMode
              ? 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
              : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200'
          } cursor-pointer`}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              initial={{ rotate: -45 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </motion.svg>
          ) : (
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              initial={{ rotate: 45 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </motion.svg>
          )}
        </motion.button>
      </div>

      {/* Mobile burger menu button */}
      <motion.button
        className={`md:hidden p-2 rounded-md ${
          isDarkMode
            ? 'text-zinc-200 hover:bg-zinc-800'
            : 'text-zinc-800 hover:bg-zinc-100'
        }`}
        whileTap={{ scale: 0.95 }}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Menu"
      >
        {mobileMenuOpen ? (
          <FiX
            size={24}
            className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}
          />
        ) : (
          <FiMenu
            size={24}
            className={isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}
          />
        )}
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={`absolute top-full left-0 right-0 p-4 mt-0.5 shadow-lg z-50 ${
              isDarkMode
                ? 'bg-zinc-900 border-b border-zinc-800'
                : 'bg-white border-b border-zinc-200'
            }`}
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="flex flex-col space-y-3">
              {/* CV Download Button */}
              <motion.button
                className={`flex items-center justify-center px-4 py-3 rounded-md text-sm font-medium transition-all duration-250 ${
                  isDarkMode
                    ? 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
                    : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200'
                }`}
                onClick={() => {
                  handleCVDownload();
                  setMobileMenuOpen(false);
                }}
                variants={menuItemVariants}
                whileTap={{ scale: 0.97 }}
              >
                <FiDownload
                  className={`mr-2 ${
                    isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                  }`}
                  size={18}
                />
                {language === 'pt' ? 'Download CV' : 'Download Resume'}
              </motion.button>

              {/* Language Toggle */}
              <motion.button
                onClick={() => {
                  setLanguage(language === 'pt' ? 'en' : 'pt');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-center px-4 py-3 rounded-md text-sm font-mono font-medium transition-all duration-250 ${
                  isDarkMode
                    ? 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
                    : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200'
                }`}
                variants={menuItemVariants}
                whileTap={{ scale: 0.97 }}
              >
                <FiCode className="mr-2" size={18} />
                {language === 'pt'
                  ? 'Mudar para inglês'
                  : 'Switch to Portuguese'}
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                onClick={() => {
                  toggleTheme();
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-center px-4 py-3 rounded-md text-sm font-medium transition-all duration-250 ${
                  isDarkMode
                    ? 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
                    : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200'
                }`}
                variants={menuItemVariants}
                whileTap={{ scale: 0.97 }}
              >
                {isDarkMode ? (
                  <>
                    <FiSun className="mr-2 text-yellow-300" size={18} />
                    {language === 'pt' ? 'Modo claro' : 'Light mode'}
                  </>
                ) : (
                  <>
                    <FiMoon className="mr-2 text-blue-600" size={18} />
                    {language === 'pt' ? 'Modo escuro' : 'Dark mode'}
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;
