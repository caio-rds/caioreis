export const calculateAge = (birthdate: string): number => {
  return Math.floor(
    (new Date().getTime() - new Date(birthdate).getTime()) /
      (1000 * 60 * 60 * 24 * 365.25),
  );
};

export const calculateSemester = (startDate: string): number => {
  return Math.round(
    Math.floor(
      (new Date().getTime() - new Date(startDate).getTime()) /
        (1000 * 60 * 60 * 24),
    ) /
      30 /
      6,
  );
};

export const personalInfo = {
  name: 'Caio Reis',
  birthdate: '1996-06-14',
  location: 'Rio de Janeiro, RJ',
  education: {
    course: {
      en: 'Software Engineer',
      pt: 'Engenheiro de Software',
    },
    startDate: '2023-01-01',
  },
  footer: {
    en: 'Made with Love ❤️ and ReactTS and MaterialUI - © Caio Reis - 2025',
    pt: 'Feito com Amor ❤️ e ReactTS e MaterialUI - © Caio Reis - 2025',
  },
};
