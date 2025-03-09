'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { FiAlertCircle, FiArrowLeft, FiRefreshCw } from 'react-icons/fi';

export default function NotFound() {
  const { language, mounted } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(false);

  const errorLines = useMemo(
    () => [
      '> system.locate("/current-page")',
      'Scanning routes...',
      'Error: Route not found in application map',
      '> system.status()',
      '{',
      '  status: 404,',
      '  message: "Page not found",',
      '  timestamp: ' + new Date().toISOString(),
      '}',
      '> system.recommend()',
      'Generating recommendations...',
      language === 'en'
        ? 'Recommendation: Navigate back to a known location'
        : 'Recomendação: Volte para uma localização conhecida',
    ],
    [language],
  );

  useEffect(() => {
    if (mounted) {
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
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    if (currentLineIndex < errorLines.length) {
      const timer = setTimeout(
        () => {
          setTypedLines((prev) => [...prev, errorLines[currentLineIndex]]);
          setCurrentLineIndex((prev) => prev + 1);
        },
        currentLineIndex % 3 === 0 ? 800 : 200,
      );

      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setShowButtons(true), 500);
    }
  }, [currentLineIndex, errorLines, mounted]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl">404 - Page Not Found</h1>
      </div>
    );
  }

  return (
    <div
      className={`w-full min-h-screen px-4 py-12 flex items-center justify-center ${
        isDarkMode ? 'bg-zinc-900' : 'bg-white'
      }`}
    >
      <div className="max-w-3xl w-full">
        {/* 404 Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1
            className={`text-7xl md:text-9xl font-mono font-bold bg-gradient-to-r text-transparent bg-clip-text ${
              isDarkMode
                ? 'from-red-400 to-purple-500'
                : 'from-red-600 to-purple-700'
            }`}
          >
            404
          </h1>
          <div
            className={`h-1 w-32 mx-auto my-6 ${
              isDarkMode ? 'bg-zinc-700' : 'bg-zinc-300'
            }`}
          ></div>
          <p
            className={`text-xl ${
              isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
            }`}
          >
            {language === 'en' ? 'Page not found' : 'Página não encontrada'}
          </p>
        </motion.div>

        {/* Terminal Window */}
        <motion.div
          className={`w-full rounded-lg overflow-hidden border mb-8 ${
            isDarkMode
              ? 'border-zinc-700 bg-zinc-900 shadow-xl'
              : 'border-zinc-200 bg-white shadow-md'
          }`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {/* Terminal header */}
          <div
            className={`flex items-center px-4 py-2 ${
              isDarkMode ? 'bg-zinc-800' : 'bg-zinc-100'
            }`}
          >
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div
              className={`ml-4 text-xs font-mono ${
                isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              error-404.sh ~ /system/diagnostics
            </div>
            <div
              className={`ml-auto flex items-center ${
                isDarkMode ? 'text-red-400' : 'text-red-500'
              }`}
            >
              <FiAlertCircle size={14} className="mr-2" />
              <span className="text-xs font-mono">
                {language === 'en' ? 'ERROR' : 'ERRO'}
              </span>
            </div>
          </div>

          {/* Terminal content */}
          <div
            className={`p-6 font-mono text-sm ${
              isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
            }`}
          >
            {typedLines.map((line, index) => (
              <motion.div
                key={index}
                className={
                  line.startsWith('>')
                    ? isDarkMode
                      ? 'text-emerald-400'
                      : 'text-emerald-600'
                    : line.includes('Error:')
                    ? isDarkMode
                      ? 'text-red-400'
                      : 'text-red-600'
                    : line.includes('{') || line.includes('}')
                    ? isDarkMode
                      ? 'text-zinc-500'
                      : 'text-zinc-400'
                    : line.includes('Recommendation:') ||
                      line.includes('Recomendação:')
                    ? isDarkMode
                      ? 'text-blue-400'
                      : 'text-blue-600'
                    : ''
                }
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {line.startsWith('  ') &&
                !line.includes('{') &&
                !line.includes('}') ? (
                  <div>
                    <span
                      className={
                        isDarkMode ? 'text-purple-400' : 'text-purple-600'
                      }
                    >
                      {line.split(':')[0]}:
                    </span>
                    <span
                      className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}
                    >
                      {line.split(':').slice(1).join(':')}
                    </span>
                  </div>
                ) : (
                  line
                )}
              </motion.div>
            ))}
            {typedLines.length < errorLines.length && (
              <motion.span
                className={`inline-block w-2 h-5 ${
                  isDarkMode ? 'bg-zinc-300' : 'bg-zinc-700'
                }`}
                animate={{ opacity: [0, 1] }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
            )}
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <AnimatePresence>
          {showButtons && (
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link href="/" passHref>
                <motion.button
                  className={`flex items-center px-6 py-3 rounded-md text-sm font-medium transition-all ${
                    isDarkMode
                      ? 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
                      : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200'
                  } cursor-pointer`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <FiArrowLeft
                    className={`mr-2 ${
                      isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                    }`}
                  />
                  {language === 'en' ? 'Back to Home' : 'Voltar para o Início'}
                </motion.button>
              </Link>

              <motion.button
                className={`flex items-center px-6 py-3 rounded-md text-sm font-medium transition-all ${
                  isDarkMode
                    ? 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
                    : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200'
                } cursor-pointer`}
                onClick={() => window.location.reload()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <FiRefreshCw
                  className={`mr-2 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}
                />
                {language === 'en' ? 'Reload Page' : 'Recarregar Página'}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={i}
              className={`absolute text-xs font-mono opacity-20 ${
                isDarkMode ? 'text-red-400' : 'text-red-600'
              }`}
              initial={{ opacity: 0, x: -10, y: -10 }}
              animate={{
                opacity: [0, 0.2, 0],
                x: ['0%', `${Math.random() * 100}%`],
                y: ['0%', `${Math.random() * 100}%`],
              }}
              transition={{
                delay: Math.random() * 5,
                repeat: Infinity,
                repeatType: 'loop',
              }}
            >
              404
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
