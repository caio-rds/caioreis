import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCode, FiStar } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProjectProps {
  project: {
    id: number;
    title: string;
    description: {
      en: string;
      pt: string;
    };
    technologies: string[];
    links: {
      github?: string;
      demo?: string;
    };
    featured: boolean;
    topics?: string[];
  };
  isDarkMode: boolean;
}

const TECH_COLORS: Record<string, { bg: string; text: string; hex: string }> = {
  javascript: { bg: 'bg-yellow-100/80 dark:bg-yellow-950/30', text: 'text-yellow-750 dark:text-yellow-400', hex: '#f7df1e' },
  typescript: { bg: 'bg-blue-105/80 dark:bg-blue-950/30', text: 'text-blue-750 dark:text-blue-400', hex: '#3178c6' },
  html: { bg: 'bg-orange-100/80 dark:bg-orange-950/30', text: 'text-orange-750 dark:text-orange-400', hex: '#e34c26' },
  css: { bg: 'bg-indigo-100/80 dark:bg-indigo-950/30', text: 'text-indigo-750 dark:text-indigo-400', hex: '#563d7c' },
  python: { bg: 'bg-blue-100/80 dark:bg-blue-950/30', text: 'text-blue-750 dark:text-blue-450', hex: '#3572a5' },
  go: { bg: 'bg-cyan-100/80 dark:bg-cyan-950/30', text: 'text-cyan-750 dark:text-cyan-400', hex: '#00add8' },
  lua: { bg: 'bg-blue-100/80 dark:bg-blue-950/30', text: 'text-blue-750 dark:text-blue-400', hex: '#000080' },
  shell: { bg: 'bg-green-100/80 dark:bg-green-950/30', text: 'text-green-750 dark:text-green-400', hex: '#89e051' },
  react: { bg: 'bg-cyan-50/80 dark:bg-cyan-950/20', text: 'text-cyan-700 dark:text-cyan-400', hex: '#61dafb' },
  nextjs: { bg: 'bg-gray-100/80 dark:bg-gray-900/30', text: 'text-gray-750 dark:text-gray-400', hex: '#ffffff' },
};

const DEFAULT_TECH_COLOR = {
  bg: 'bg-zinc-100 dark:bg-zinc-800/80',
  text: 'text-zinc-650 dark:text-zinc-350',
  hex: '#10b981',
};

function getTechColor(tech: string) {
  return TECH_COLORS[tech.toLowerCase()] || DEFAULT_TECH_COLOR;
}

function useProjectSchema(project: ProjectProps['project'], language: string) {
  useEffect(() => {
    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareSourceCode',
      name: project.title,
      description: project.description[language as 'en' | 'pt'],
      codeRepository: project.links.github,
      programmingLanguage: project.technologies[0] || 'Multiple',
      author: { '@type': 'Person', name: 'Caio Reis' },
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [project, language]);
}

export default function Project({ project, isDarkMode }: ProjectProps) {
  const { language } = useLanguage();
  useProjectSchema(project, language);

  const allTechnologies = [
    ...new Set([...(project.technologies || []), ...(project.topics || [])]),
  ].filter(Boolean);

  const primaryLang = project.technologies[0] || 'default';
  const colorMeta = getTechColor(primaryLang);

  return (
    <motion.div
      className={`group h-full flex flex-col rounded-lg border overflow-hidden transition-all duration-300 ${
        isDarkMode
          ? `border-zinc-800 bg-zinc-900/40 glassmorphism ${
              project.featured ? 'ring-1 ring-emerald-500/20' : ''
            }`
          : `border-zinc-200 bg-white/40 glassmorphism ${
              project.featured ? 'ring-1 ring-emerald-500/10' : ''
            }`
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{
        y: -6,
        borderColor: `${colorMeta.hex}60`,
        boxShadow: isDarkMode 
          ? `0 12px 30px -10px ${colorMeta.hex}25`
          : `0 12px 30px -10px ${colorMeta.hex}15`,
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      {/* Mock Editor Window Bar */}
      <div
        className={`flex justify-between items-center px-4 py-2 border-b select-none ${
          isDarkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-100/60 border-zinc-200'
        }`}
      >
        <div className="flex items-center">
          <div className="flex space-x-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/80" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
            <div className="w-2 h-2 rounded-full bg-green-500/80" />
          </div>
          <div
            className={`ml-3 font-mono text-xs ${
              isDarkMode ? 'text-zinc-500' : 'text-zinc-400'
            }`}
          >
            {project.title.toLowerCase().replace(/\s+/g, '-')}.js
          </div>
        </div>
        {project.featured && (
          <div
            className={`flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-mono ${
              isDarkMode
                ? 'bg-zinc-800/80 text-yellow-400 border border-yellow-500/10'
                : 'bg-zinc-150 text-yellow-700 border border-yellow-500/20'
            }`}
          >
            <FiStar size={10} className="fill-current" />
            <span>Featured</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col text-left">
        <div className="flex items-center mb-3 select-none">
          <FiCode
            className={`mr-2 transition-colors ${
              isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
            }`}
            size={16}
          />
          <h3
            className={`font-mono font-bold text-base ${
              isDarkMode ? 'text-zinc-100' : 'text-zinc-850'
            }`}
          >
            {project.title}
          </h3>
        </div>

        <div
          className={`p-3.5 mb-4 rounded-md font-mono text-xs leading-relaxed border ${
            isDarkMode 
              ? 'bg-zinc-950/70 text-zinc-400 border-zinc-900' 
              : 'bg-zinc-50 text-zinc-650 border-zinc-150'
          }`}
        >
          {project.description[language as 'en' | 'pt']}
        </div>

        {allTechnologies.length > 0 && (
          <div className="mb-5 select-none">
            <div
              className={`text-[10px] font-mono mb-1.5 ${
                isDarkMode ? 'text-zinc-600' : 'text-zinc-400'
              }`}
            >
              const techStack = [
            </div>
            <div className="flex flex-wrap gap-1.5 pl-4">
              {allTechnologies.slice(0, 5).map((tech, i) => {
                const { bg, text } = getTechColor(tech);
                const limit = Math.min(allTechnologies.length, 5);
                const isLast = i === limit - 1;
                return (
                  <span
                    key={i}
                    className={`inline-block rounded px-2 py-0.5 text-[10px] font-mono ${bg} ${text}`}
                  >
                    {isLast ? `"${tech}"` : `"${tech}",`}
                  </span>
                );
              })}
              {allTechnologies.length > 5 && (
                <span className="text-[10px] font-mono text-zinc-500">
                  {`// +${allTechnologies.length - 5} more`}
                </span>
              )}
            </div>
            <div
              className={`text-[10px] font-mono mt-1 ${
                isDarkMode ? 'text-zinc-600' : 'text-zinc-400'
              }`}
            >
              ];
            </div>
          </div>
        )}

        {/* Card Footer Links */}
        <div className="mt-auto pt-2 flex justify-between items-center select-none">
          <div
            className={`font-mono text-[10px] ${isDarkMode ? 'text-zinc-600' : 'text-zinc-455'}`}
          >
            {project.featured ? 'export default Project;' : 'export const Project;'}
          </div>
          <div className="flex space-x-2">
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded transition-all border ${
                  isDarkMode
                    ? 'bg-zinc-800/60 border-zinc-800 text-zinc-450 hover:text-emerald-400 hover:border-zinc-700'
                    : 'bg-zinc-50 border-zinc-150 text-zinc-600 hover:text-emerald-655 hover:border-zinc-250'
                }`}
                aria-label="View on GitHub"
              >
                <FiGithub size={15} />
              </a>
            )}
            {project.links?.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded transition-all border ${
                  isDarkMode
                    ? 'bg-zinc-800/60 border-zinc-800 text-zinc-450 hover:text-emerald-400 hover:border-zinc-700'
                    : 'bg-zinc-50 border-zinc-150 text-zinc-600 hover:text-emerald-655 hover:border-zinc-250'
                }`}
                aria-label="View Live Demo"
              >
                <FiExternalLink size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
