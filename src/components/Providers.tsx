'use client';

import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Script to prevent flash of incorrect theme and ensure theme changes propagate
const ThemeInitializer = () => {
  const [themeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    // This script runs on the client-side after hydration
    const applyStoredTheme = () => {
      try {
        // Ensure smooth transitions by adding a class to the HTML element
        document.documentElement.classList.add('theme-transition');

        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else if (storedTheme === 'light') {
          document.documentElement.classList.remove('dark');
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }

        // Create a custom event that components can listen for
        window.dispatchEvent(
          new CustomEvent('themechange', {
            detail: {
              isDark: document.documentElement.classList.contains('dark'),
            },
          }),
        );

        setThemeLoaded(true);
      } catch (e) {
        console.error('Error accessing localStorage for theme:', e);
        setThemeLoaded(true);
      }
    };

    applyStoredTheme();

    // Set up a mutation observer to dispatch events when the theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.attributeName === 'class' &&
          mutation.target === document.documentElement
        ) {
          window.dispatchEvent(
            new CustomEvent('themechange', {
              detail: {
                isDark: document.documentElement.classList.contains('dark'),
              },
            }),
          );
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return <div className={themeLoaded ? 'theme-ready' : ''} />;
};

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ThemeInitializer />
        <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-900 transition-colors duration-250">
          <Header />
          <main className="flex-grow transition-colors duration-250">
            {children}
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
