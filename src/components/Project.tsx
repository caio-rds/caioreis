'use client';

import { useState, useEffect } from 'react';
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
  index: number;
}

const ProjectSchema = ({
  project,
  language,
}: {
  project: ProjectProps['project'];
  language: string;
}) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');

      const projectSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        name: project.title,
        description: project.description[language as 'en' | 'pt'],
        codeRepository: project.links.github,
        programmingLanguage: project.technologies[0] || 'Multiple',
        author: {
          '@type': 'Person',
          name: 'Caio Reis',
        },
      };

      script.textContent = JSON.stringify(projectSchema);
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [project, language]);

  return null;
};

export default function Project({ project, isDarkMode, index }: ProjectProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { language } = useLanguage();

  const allTechnologies = [
    ...new Set([...(project.technologies || []), ...(project.topics || [])]),
  ].filter(Boolean);

  const getTechColor = (tech: string) => {
    const techColors: Record<string, { bg: string; text: string }> = {
      JavaScript: {
        bg: isDarkMode ? 'bg-yellow-900/40' : 'bg-yellow-100',
        text: isDarkMode ? 'text-yellow-300' : 'text-yellow-700',
      },
      TypeScript: {
        bg: isDarkMode ? 'bg-blue-900/40' : 'bg-blue-100',
        text: isDarkMode ? 'text-blue-300' : 'text-blue-700',
      },
      HTML: {
        bg: isDarkMode ? 'bg-orange-900/40' : 'bg-orange-100',
        text: isDarkMode ? 'text-orange-300' : 'text-orange-700',
      },
      CSS: {
        bg: isDarkMode ? 'bg-indigo-900/40' : 'bg-indigo-100',
        text: isDarkMode ? 'text-indigo-300' : 'text-indigo-700',
      },
      Python: {
        bg: isDarkMode ? 'bg-blue-900/40' : 'bg-blue-100',
        text: isDarkMode ? 'text-blue-300' : 'text-blue-700',
      },
      Java: {
        bg: isDarkMode ? 'bg-red-900/40' : 'bg-red-100',
        text: isDarkMode ? 'text-red-300' : 'text-red-700',
      },
      PHP: {
        bg: isDarkMode ? 'bg-purple-900/40' : 'bg-purple-100',
        text: isDarkMode ? 'text-purple-300' : 'text-purple-700',
      },
      Go: {
        bg: isDarkMode ? 'bg-cyan-900/40' : 'bg-cyan-100',
        text: isDarkMode ? 'text-cyan-300' : 'text-cyan-700',
      },
      Lua: {
        bg: isDarkMode ? 'bg-blue-900/40' : 'bg-blue-100',
        text: isDarkMode ? 'text-blue-300' : 'text-blue-700',
      },
      Ruby: {
        bg: isDarkMode ? 'bg-red-900/40' : 'bg-red-100',
        text: isDarkMode ? 'text-red-300' : 'text-red-700',
      },
      C: {
        bg: isDarkMode ? 'bg-gray-900/40' : 'bg-gray-100',
        text: isDarkMode ? 'text-gray-300' : 'text-gray-700',
      },
      'C++': {
        bg: isDarkMode ? 'bg-blue-900/40' : 'bg-blue-100',
        text: isDarkMode ? 'text-blue-300' : 'text-blue-700',
      },
      'C#': {
        bg: isDarkMode ? 'bg-green-900/40' : 'bg-green-100',
        text: isDarkMode ? 'text-green-300' : 'text-green-700',
      },
      Shell: {
        bg: isDarkMode ? 'bg-green-900/40' : 'bg-green-100',
        text: isDarkMode ? 'text-green-300' : 'text-green-700',
      },
      Vue: {
        bg: isDarkMode ? 'bg-green-900/40' : 'bg-green-100',
        text: isDarkMode ? 'text-green-300' : 'text-green-700',
      },
      react: {
        bg: isDarkMode ? 'bg-blue-900/40' : 'bg-blue-100',
        text: isDarkMode ? 'text-blue-300' : 'text-blue-700',
      },
      angular: {
        bg: isDarkMode ? 'bg-red-900/40' : 'bg-red-100',
        text: isDarkMode ? 'text-red-300' : 'text-red-700',
      },
      nextjs: {
        bg: isDarkMode ? 'bg-gray-900/40' : 'bg-gray-100',
        text: isDarkMode ? 'text-gray-300' : 'text-gray-700',
      },
    };

    const defaultColor = {
      bg: isDarkMode ? 'bg-gray-800' : 'bg-gray-200',
      text: isDarkMode ? 'text-gray-300' : 'text-gray-700',
    };

    const techLower = tech.toLowerCase();
    for (const [key, value] of Object.entries(techColors)) {
      if (key.toLowerCase() === techLower) {
        return value;
      }
    }

    return defaultColor;
  };

  return (
    <>
      <ProjectSchema project={project} language={language} />
      <motion.div
        className={`rounded-lg border overflow-hidden ${
          isDarkMode
            ? `border-zinc-700 bg-zinc-900/80 ${
                project.featured ? 'ring-1 ring-emerald-500/30' : ''
              }`
            : `border-zinc-200 bg-white ${
                project.featured ? 'ring-1 ring-emerald-500/20' : ''
              }`
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{
          scale: 1.02,
          boxShadow: isDarkMode
            ? '0 10px 25px -5px rgba(0, 0, 0, 0.6)'
            : '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Project Header - Terminal Style */}
        <div
          className={`flex justify-between items-center px-4 py-2 ${
            isDarkMode ? 'bg-zinc-800' : 'bg-zinc-100'
          }`}
        >
          <div className="flex items-center">
            <div className="flex space-x-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            </div>
            <div
              className={`ml-3 font-mono text-sm ${
                isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              {project.title.toLowerCase().replace(/\s+/g, '-')}.js
            </div>
          </div>
          {project.featured && (
            <div
              className={`flex items-center space-x-1 px-2 py-0.5 rounded text-xs ${
                isDarkMode
                  ? 'bg-zinc-700 text-yellow-300'
                  : 'bg-zinc-200 text-yellow-600'
              }`}
            >
              <FiStar size={12} />
              <span>Featured</span>
            </div>
          )}
        </div>

        {/* Project Content */}
        <div className="p-5">
          {/* Title with Code Icon */}
          <div className="flex items-center mb-3">
            <FiCode
              className={`mr-2 ${
                isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
              }`}
              size={18}
            />
            <h3
              className={`font-mono font-bold text-lg ${
                isDarkMode ? 'text-white' : 'text-zinc-800'
              }`}
            >
              {project.title}
            </h3>
          </div>

          {/* Description in a code-like block */}
          <div
            className={`p-3 mb-4 rounded-md font-mono text-sm ${
              isDarkMode
                ? 'bg-zinc-800 text-zinc-300'
                : 'bg-zinc-100 text-zinc-700'
            }`}
          >
            <span
              className={`block mb-1 ${
                isDarkMode ? 'text-zinc-500' : 'text-zinc-400'
              }`}
            >
              {/* Description */}
            </span>
            {project.description[language as 'en' | 'pt']}
          </div>

          {/* Technology Stack */}
          {allTechnologies.length > 0 && (
            <div className="mb-4">
              <div
                className={`text-xs mb-2 ${
                  isDarkMode ? 'text-zinc-500' : 'text-zinc-400'
                }`}
              >
                const techStack = [
              </div>
              <div className="flex flex-wrap gap-2 pl-4">
                {allTechnologies.map((tech, i) => {
                  const { bg, text } = getTechColor(tech);
                  return (
                    <span
                      key={i}
                      className={`inline-block rounded px-2 py-1 text-xs font-mono ${bg} ${text}`}
                    >
                      {i < allTechnologies.length - 1
                        ? `"${tech}",`
                        : `"${tech}"`}
                    </span>
                  );
                })}
              </div>
              <div
                className={`text-xs mt-1 ${
                  isDarkMode ? 'text-zinc-500' : 'text-zinc-400'
                }`}
              >
                ];
              </div>
            </div>
          )}

          {/* Links */}
          <div className="flex justify-between items-center">
            <div
              className={`text-xs ${
                isDarkMode ? 'text-zinc-500' : 'text-zinc-400'
              }`}
            >
              {project.featured
                ? 'export default Project;'
                : 'export const Project;'}
            </div>
            <div className="flex space-x-3">
              {project.links?.github && (
                <motion.a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-md ${
                    isDarkMode
                      ? 'bg-zinc-800 text-zinc-400 hover:text-emerald-400'
                      : 'bg-zinc-100 text-zinc-600 hover:text-emerald-600'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="View on GitHub"
                >
                  <FiGithub size={18} />
                </motion.a>
              )}
              {project.links?.demo && (
                <motion.a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-md ${
                    isDarkMode
                      ? 'bg-zinc-800 text-zinc-400 hover:text-emerald-400'
                      : 'bg-zinc-100 text-zinc-600 hover:text-emerald-600'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="View Live Demo"
                >
                  <FiExternalLink size={18} />
                </motion.a>
              )}
            </div>
          </div>
        </div>

        {/* Progress Bar Animation */}
        <motion.div
          className="h-1 w-full"
          initial={{ scaleX: 0 }}
          animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
          style={{
            originX: 0,
            background: `linear-gradient(to right, ${
              isDarkMode ? '#34d399, #60a5fa' : '#059669, #2563eb'
            })`,
          }}
        />
      </motion.div>
    </>
  );
}
