'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import TechCardsContainer from '@/components/TechCardsContainer';
import HeroSection from '@/components/HeroSection';

export default function Home() {
  const { t, mounted } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Watch for theme changes
  useEffect(() => {
    if (mounted) {
      // Initial theme state
      setIsDarkMode(document.documentElement.classList.contains('dark'));

      // Watch for theme changes
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

  // If not mounted yet, return a placeholder
  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-12 min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold">Caio Reis</h1>
          <h2 className="mt-4 text-2xl md:text-3xl">Backend Developer</h2>
          <p className="mt-6 text-xl max-w-2xl mx-auto">
            Building robust solutions for complex problems
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full min-h-screen px-4 py-12 transition-colors duration-300 ${
        isDarkMode ? 'bg-zinc-900' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <HeroSection isDarkMode={isDarkMode} />

        {/* Tech Cards Container */}
        <TechCardsContainer isDarkMode={isDarkMode} />

        {/* Statistics Section */}
        <motion.section
          className={`my-20 p-8 rounded-2xl ${
            isDarkMode ? 'bg-zinc-800' : 'bg-zinc-100'
          }`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <h3
            className={`text-2xl md:text-3xl font-bold text-center mb-12 ${
              isDarkMode ? 'text-zinc-200' : 'text-zinc-800'
            }`}
          >
            {t('stats.title') || 'By the Numbers'}
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '5+', label: 'Years Experience' },
              { value: '50+', label: 'Projects Completed' },
              { value: '20+', label: 'Happy Clients' },
              { value: '99%', label: 'Success Rate' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.1 }}
              >
                <motion.p
                  className={`text-4xl font-bold mb-2 bg-gradient-to-r text-transparent bg-clip-text ${
                    isDarkMode
                      ? 'from-emerald-400 to-blue-400'
                      : 'from-emerald-600 to-blue-600'
                  }`}
                  animate={{
                    backgroundPosition: ['0%', '100%'],
                    transition: {
                      duration: 3,
                      repeat: Infinity,
                      repeatType: 'mirror',
                    },
                  }}
                  style={{ backgroundSize: '200%' }}
                >
                  {stat.value}
                </motion.p>
                <p
                  className={`${
                    isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
                  }`}
                >
                  {t(`stats.${index}`) || stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
