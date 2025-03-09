'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiFilter, FiGithub, FiLoader } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';
import Project from '@/components/Project';

interface ProjectsProps {
  isDarkMode: boolean;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  stargazers_count: number;
  language: string;
  fork: boolean;
}

export default function Projects({ isDarkMode }: ProjectsProps) {
  const { language } = useLanguage();
  const [filter, setFilter] = useState<string | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://api.github.com/users/caio-rds/repos',
        );

        if (!response.ok) {
          throw new Error(
            `GitHub API responded with status ${response.status}`,
          );
        }

        let data = await response.json();

        data = data
          .filter((repo: GitHubRepo) => !repo.fork)
          .sort(
            (a: GitHubRepo, b: GitHubRepo) =>
              b.stargazers_count - a.stargazers_count,
          );

        setRepos(data);
      } catch (err) {
        console.error('Error fetching GitHub repos:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch repos');
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const allLanguages = Array.from(
    new Set(repos.map((repo) => repo.language).filter(Boolean)),
  ).sort();

  const filteredRepos = filter
    ? repos.filter((repo) => repo.language === filter)
    : repos;

  const command = "fetch.repos --user='caio-rds'";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section className="my-20">
      <div className="mb-10">
        {/* Terminal header with title */}
        <motion.div
          className={`relative mx-auto max-w-2xl mb-6 rounded-t-md overflow-hidden ${
            isDarkMode ? 'bg-zinc-800' : 'bg-zinc-100'
          } border ${isDarkMode ? 'border-zinc-700' : 'border-zinc-200'}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Terminal header */}
          <div
            className={`flex items-center px-4 py-3 ${
              isDarkMode ? 'bg-zinc-900' : 'bg-zinc-200'
            }`}
          >
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div
              className={`flex-grow text-center text-sm font-mono ${
                isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              github-api.js ~ /caio-rds
            </div>
          </div>

          {/* Terminal content */}
          <div className="p-4">
            <div className="flex items-center">
              <span
                className={`mr-2 ${
                  isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                }`}
              >
                $
              </span>
              <span
                className={`font-mono ${
                  isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
                }`}
                id="command-output"
              >
                {command}
              </span>
              <motion.span
                className={`w-2 h-5 ml-1 ${
                  isDarkMode ? 'bg-zinc-300' : 'bg-zinc-700'
                }`}
                animate={{ opacity: [0, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.8,
                  repeatType: 'reverse',
                }}
                style={{ display: true || loading ? 'block' : 'none' }}
              />
            </div>

            <div
              className={`mt-2 font-mono text-sm ${
                isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              {loading ? (
                '// Fetching repositories from GitHub...'
              ) : error ? (
                `// Error: ${error}`
              ) : (
                <>
                  {`// Found ${filteredRepos.length} repositories ${
                    filter ? `with language ${filter}` : ''
                  }`}
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Language Filters */}
        {!loading && !error && (
          <motion.div
            className="flex flex-wrap items-center justify-center gap-2 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div
              className={`p-1 rounded-md mr-2 ${
                isDarkMode
                  ? 'bg-zinc-800 text-zinc-400'
                  : 'bg-zinc-100 text-zinc-600'
              }`}
            >
              <FiFilter size={14} />
            </div>

            <motion.button
              onClick={() => setFilter(null)}
              className={`px-3 py-1 text-xs font-mono rounded-md transition-colors ${
                filter === null
                  ? isDarkMode
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/30'
                  : isDarkMode
                  ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              All
            </motion.button>

            {allLanguages.map((lang) => (
              <motion.button
                key={lang}
                onClick={() => setFilter(lang)}
                className={`px-3 py-1 text-xs font-mono rounded-md transition-colors ${
                  filter === lang
                    ? isDarkMode
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/30'
                    : isDarkMode
                    ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {lang}
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}
          >
            <FiLoader size={40} />
          </motion.div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <motion.div
          className={`text-center py-12 rounded-lg ${
            isDarkMode ? 'bg-zinc-800/50' : 'bg-zinc-100'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <FiCode
            size={36}
            className={`mx-auto mb-4 ${
              isDarkMode ? 'text-red-400' : 'text-red-500'
            }`}
          />
          <p
            className={`font-mono ${
              isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
            }`}
          >
            {language === 'en'
              ? 'Failed to fetch GitHub repositories'
              : 'Falha ao buscar repositórios do GitHub'}
          </p>
          <p
            className={`mt-2 font-mono text-sm ${
              isDarkMode ? 'text-red-400' : 'text-red-500'
            }`}
          >
            {error}
          </p>
        </motion.div>
      )}

      {/* Projects grid */}
      {!loading && !error && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredRepos.map((repo, index) => (
            <Project
              key={repo.id}
              project={{
                id: repo.id,
                title: repo.name.replace(/-/g, ' '),
                description: {
                  en: repo.description || 'No description provided',
                  pt: repo.description || 'Sem descrição disponível',
                },
                technologies: [repo.language].filter(Boolean),
                links: {
                  github: repo.html_url,
                  demo: repo.homepage || undefined,
                },
                featured: repo.stargazers_count > 0,
                topics: repo.topics,
              }}
              isDarkMode={isDarkMode}
              index={index}
            />
          ))}
        </motion.div>
      )}

      {/* Empty state */}
      {!loading && !error && filteredRepos.length === 0 && (
        <motion.div
          className={`text-center py-12 rounded-lg ${
            isDarkMode ? 'bg-zinc-800/50' : 'bg-zinc-100'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <FiCode
            size={36}
            className={`mx-auto mb-4 ${
              isDarkMode ? 'text-zinc-600' : 'text-zinc-400'
            }`}
          />
          <p
            className={`font-mono ${
              isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
            }`}
          >
            {language === 'en'
              ? 'No repositories found with this filter'
              : 'Nenhum repositório encontrado com este filtro'}
          </p>
          <button
            onClick={() => setFilter(null)}
            className={`mt-4 px-4 py-2 rounded-md font-mono text-sm ${
              isDarkMode
                ? 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                : 'bg-zinc-200 text-zinc-700 hover:bg-zinc-300'
            }`}
          >
            {language === 'en' ? 'Clear filter' : 'Limpar filtro'}
          </button>
        </motion.div>
      )}

      {/* GitHub profile link */}
      {!loading && !error && (
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <a
            href="https://github.com/caio-rds"
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center px-4 py-2 rounded-md font-mono text-sm ${
              isDarkMode
                ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
            } transition-colors`}
          >
            <FiGithub className="mr-2" />
            {language === 'en' ? 'View GitHub Profile' : 'Ver Perfil no GitHub'}
          </a>
        </motion.div>
      )}
    </section>
  );
}
