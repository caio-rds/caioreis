export interface NavigationItem {
  id: string;
  label: {
    en: string;
    pt: string;
  };
  path: string;
}

export const navigationItems: NavigationItem[] = [
  {
    id: 'home',
    label: {
      en: 'Home',
      pt: 'Início',
    },
    path: '#home',
  },
  {
    id: 'about',
    label: {
      en: 'About',
      pt: 'Sobre',
    },
    path: '#about',
  },
  {
    id: 'experience',
    label: {
      en: 'Experience',
      pt: 'Experiência',
    },
    path: '#experience',
  },
  {
    id: 'projects',
    label: {
      en: 'Projects',
      pt: 'Projetos',
    },
    path: '#projects',
  },
  {
    id: 'contact',
    label: {
      en: 'Contact',
      pt: 'Contato',
    },
    path: '#contact',
  },
];

export const themeLabels = {
  darkMode: {
    en: 'Dark Mode',
    pt: 'Modo Escuro',
  },
  lightMode: {
    en: 'Light Mode',
    pt: 'Modo Claro',
  },
};

export const languageLabels = {
  en: {
    en: 'English',
    pt: 'Inglês',
  },
  pt: {
    en: 'Portuguese',
    pt: 'Português',
  },
};
