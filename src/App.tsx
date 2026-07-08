import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import PersonalInfos from '@/components/PersonalInfos';
import TechCardsContainer from '@/components/TechCardsContainer';
import Projects from '@/components/Projects';
import StatisticsSection from '@/components/StatisticsSection';
import ContactGooeyMenu from '@/components/ContactGooeyMenu';
import { useStructuredData } from '@/hooks/useStructuredData';

function Page() {
  const { mounted } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(false);
  useStructuredData();

  useEffect(() => {
    if (!mounted) return;

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
    <div className={`w-full min-h-screen px-4 pb-12 ${isDarkMode ? 'bg-zinc-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">
        <HeroSection isDarkMode={isDarkMode} />
        <PersonalInfos isDarkMode={isDarkMode} />
        <TechCardsContainer isDarkMode={isDarkMode} />
        <Projects isDarkMode={isDarkMode} />
        <StatisticsSection isDarkMode={isDarkMode} />
      </div>
      <ContactGooeyMenu isDarkMode={isDarkMode} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-900 transition-colors">
          <Header />
          <main className="flex-grow transition-colors">
            <Page />
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
