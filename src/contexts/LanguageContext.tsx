import {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from 'react';
import translations from '@/data/translations';

export type Language = 'pt' | 'en';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('pt');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const savedLanguage = localStorage.getItem('language') as Language | null;
      if (savedLanguage === 'en' || savedLanguage === 'pt') {
        setLanguageState(savedLanguage);
      }
    } catch {
      // Ignore if localStorage is disabled or inaccessible
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('language', lang);
    } catch {
      // Ignore if localStorage write fails
    }
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: unknown = translations[language];

    for (const k of keys) {
      if (value === undefined) return key;
      value = (value as Record<string, unknown>)[k];
    }

    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextProps {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
