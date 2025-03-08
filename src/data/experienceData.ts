export interface Experience {
  id: number;
  role: {
    en: string;
    pt: string;
  };
  company: string;
  period: {
    start: string;
    end: string | null; // null significa "até o presente"
  };
  description: {
    en: string[];
    pt: string[];
  };
  skills: string[];
}

export const experiences: Experience[] = [
  {
    id: 1,
    role: {
      en: 'Software Engineer',
      pt: 'Engenheiro de Software',
    },
    company: 'Company XYZ',
    period: {
      start: '2023-01-01',
      end: null,
    },
    description: {
      en: [
        'Developed and maintained web applications using React and TypeScript',
        'Implemented responsive user interfaces with Material UI',
        'Collaborated with design team to improve user experience',
      ],
      pt: [
        'Desenvolvi e mantive aplicações web utilizando React e TypeScript',
        'Implementei interfaces de usuário responsivas com Material UI',
        'Colaborei com a equipe de design para melhorar a experiência do usuário',
      ],
    },
    skills: ['React', 'TypeScript', 'Material UI', 'Git'],
  },
  // Adicione mais experiências conforme necessário
];

export const getFormattedPeriod = (
  start: string,
  end: string | null,
  language: 'en' | 'pt' = 'en',
): string => {
  const startDate = new Date(start);
  const formattedStart = new Intl.DateTimeFormat(
    language === 'en' ? 'en-US' : 'pt-BR',
    {
      year: 'numeric',
      month: 'short',
    },
  ).format(startDate);

  if (!end) {
    return `${formattedStart} - ${language === 'en' ? 'Present' : 'Atual'}`;
  }

  const endDate = new Date(end);
  const formattedEnd = new Intl.DateTimeFormat(
    language === 'en' ? 'en-US' : 'pt-BR',
    {
      year: 'numeric',
      month: 'short',
    },
  ).format(endDate);

  return `${formattedStart} - ${formattedEnd}`;
};
