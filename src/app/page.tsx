'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import HeroSection from '@/components/HeroSection';
import TechCardsContainer from '@/components/TechCardsContainer';
import StatisticsSection from '@/components/StatisticsSection';
import Projects from '@/components/Projects';
import PersonalInfos from '@/components/PersonalInfos';

export default function Home() {
  const { mounted } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(false);

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

        {/* Personal Info Section */}
        <PersonalInfos isDarkMode={isDarkMode} />

        {/* Tech Cards Container */}
        <TechCardsContainer isDarkMode={isDarkMode} />

        {/* Projects Section */}
        <Projects isDarkMode={isDarkMode} />

        {/* Statistics Section */}
        <StatisticsSection isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}
