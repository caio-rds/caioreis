'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import {
  FiGithub,
  FiLinkedin,
  FiArrowUp,
  FiTerminal,
  FiCode,
} from 'react-icons/fi';
import { personalInfo } from '@/components/PersonalInfos';

const Footer: React.FC = () => {
  const { language, mounted: langMounted } = useLanguage();
  const { mounted: themeMounted } = useTheme();
  const year = new Date().getFullYear();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

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
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!langMounted || !themeMounted) {
    return (
      <footer className="py-6 px-6 text-center text-zinc-600 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center space-x-6 mb-4"></div>
          <p className="font-medium">© {year} Caio Reis.</p>
        </div>
      </footer>
    );
  }

  return (
    <>
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 p-3 rounded-full z-50 shadow-lg cursor-pointer ${
              isDarkMode
                ? 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
                : 'bg-white text-zinc-800 hover:bg-zinc-100'
            }`}
            whileHover={{
              scale: 1.1,
              boxShadow: isDarkMode
                ? '0 0 12px 2px rgba(52, 211, 153, 0.2)'
                : '0 0 12px 2px rgba(5, 150, 105, 0.15)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <FiArrowUp
              className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}
              size={24}
            />
            <span className="sr-only">Back to top</span>
          </motion.button>
        )}
      </AnimatePresence>

      <motion.footer
        className={`py-8 px-6 border-t ${
          isDarkMode
            ? 'border-zinc-800 bg-zinc-900/90 backdrop-blur-md'
            : 'border-zinc-200 bg-white/90 backdrop-blur-md'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
            <motion.div
              className={`flex items-center mb-4 md:mb-0 px-3 py-2 rounded-md ${
                isDarkMode
                  ? 'bg-zinc-800 text-zinc-200'
                  : 'bg-zinc-100 text-zinc-800'
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <FiTerminal
                className={`mr-2 ${
                  isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                }`}
              />
              <span className="font-mono">caio_reis@portfolio:~$</span>
              <motion.span
                animate={{ opacity: [0, 1] }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                className={`ml-1 inline-block w-2 h-4 ${
                  isDarkMode ? 'bg-emerald-400' : 'bg-emerald-600'
                }`}
              />
            </motion.div>

            <div className="flex items-center space-x-3">
              <FiCode
                className={`mr-1 ${
                  isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
                }`}
              />
              <span className="font-mono text-sm">
                <span
                  className={isDarkMode ? 'text-purple-400' : 'text-purple-600'}
                >
                  with
                </span>
                <span
                  className={
                    isDarkMode
                      ? 'text-emerald-400 ml-2'
                      : 'text-emerald-600 ml-2'
                  }
                >
                  ❤️
                </span>
                <span
                  className={
                    isDarkMode ? 'text-blue-400 ml-2' : 'text-blue-600 ml-2'
                  }
                >
                  &&
                </span>
                <span
                  className={
                    isDarkMode ? 'text-yellow-400 ml-2' : 'text-yellow-600 ml-2'
                  }
                >
                  code
                </span>
              </span>
            </div>
          </div>

          <div className="flex justify-center space-x-6 mb-6">
            <motion.a
              href="https://github.com/caio-rds"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              whileHover={{
                scale: 1.1,
                y: -2,
                color: isDarkMode ? '#34d399' : '#059669',
              }}
              className={`p-2 rounded-lg ${
                isDarkMode
                  ? 'bg-zinc-800 text-zinc-300 hover:text-emerald-400'
                  : 'bg-zinc-100 text-zinc-700 hover:text-emerald-600'
              }`}
            >
              <FiGithub size={20} />
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/caio-reis-04224a20a/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              whileHover={{
                scale: 1.1,
                y: -2,
                color: isDarkMode ? '#34d399' : '#059669',
              }}
              className={`p-2 rounded-lg ${
                isDarkMode
                  ? 'bg-zinc-800 text-zinc-300 hover:text-emerald-400'
                  : 'bg-zinc-100 text-zinc-700 hover:text-emerald-600'
              }`}
            >
              <FiLinkedin size={20} />
            </motion.a>
          </div>

          <motion.div
            className="font-mono text-center text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div
              className={`inline-block px-4 py-2 rounded-lg ${
                isDarkMode
                  ? 'bg-zinc-800 text-zinc-300'
                  : 'bg-zinc-100 text-zinc-700'
              }`}
            >
              <span
                className={isDarkMode ? 'text-purple-400' : 'text-purple-600'}
              >
                const
              </span>
              <span className="mx-1">copyright</span>
              <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>
                =
              </span>
              <span
                className={`ml-1 ${
                  isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                }`}
              >
                `{personalInfo.footer[language as 'en' | 'pt']}`
              </span>
              <span className={isDarkMode ? 'text-zinc-500' : 'text-zinc-600'}>
                ;
              </span>
            </div>
          </motion.div>
        </div>
      </motion.footer>
    </>
  );
};

export default Footer;
