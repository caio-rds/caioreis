export interface Project {
  id: number;
  title: string;
  description: {
    en: string;
    pt: string;
  };
  image?: string;
  technologies: string[];
  links: {
    github?: string;
    demo?: string;
  };
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Personal Portfolio',
    description: {
      en: 'A personal portfolio website built with React, TypeScript, and Material UI.',
      pt: 'Um website de portfólio pessoal construído com React, TypeScript e Material UI.',
    },
    technologies: ['React', 'TypeScript', 'Material UI'],
    links: {
      github: 'https://github.com/username/portfolio',
      demo: 'https://portfolio.example.com',
    },
    featured: true,
  },
  {
    id: 2,
    title: 'E-commerce Platform',
    description: {
      en: 'A fully functional e-commerce platform with payment integration.',
      pt: 'Uma plataforma de e-commerce funcional com integração de pagamento.',
    },
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    links: {
      github: 'https://github.com/username/ecommerce',
    },
    featured: true,
  },
];

export const projectsLabels = {
  title: {
    en: 'Projects',
    pt: 'Projetos',
  },
  viewAll: {
    en: 'View All',
    pt: 'Ver Todos',
  },
  viewLess: {
    en: 'View Less',
    pt: 'Ver Menos',
  },
  visitDemo: {
    en: 'Visit Demo',
    pt: 'Visitar Demo',
  },
  viewCode: {
    en: 'View Code',
    pt: 'Ver Código',
  },
};
