import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCode, FiFilter, FiGithub, FiSearch } from 'react-icons/fi';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.github.com/users/caio-rds/repos');

        if (!response.ok) {
          throw new Error(`GitHub API responded with status ${response.status}`);
        }

        let data = await response.json();

        data = data
          .filter((repo: GitHubRepo) => !repo.fork)
          .sort(
            (a: GitHubRepo, b: GitHubRepo) => b.stargazers_count - a.stargazers_count,
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

  // Handle both filters and search queries
  const filteredRepos = repos.filter((repo) => {
    const matchesLanguage = filter ? repo.language === filter : true;
    const matchesSearch = searchQuery
      ? repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        repo.topics?.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;
    return matchesLanguage && matchesSearch;
  });

  const command = "fetch.repos --user='caio-rds'";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <section id="projects-section" className="scroll-mt-24 pt-4">
      <div className="mb-10 text-left">
        <h3
          className={`text-2xl md:text-3xl font-bold text-center mb-12 ${
            isDarkMode ? 'text-zinc-200' : 'text-zinc-800'
          }`}
        >
          {language === 'en' ? 'Projects & Repositories' : 'Projetos & Repositórios'}
        </h3>

        <motion.div
          className={`relative mx-auto max-w-2xl mb-8 rounded-md overflow-hidden ${
            isDarkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
          } border shadow-xl`}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          {/* Mock Console Header */}
          <div
            className={`flex items-center px-4 py-3 border-b ${
              isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-150 border-zinc-250'
            }`}
          >
            <div className="flex space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            </div>
            <div
              className={`flex-grow text-center text-xs font-mono select-none ${
                isDarkMode ? 'text-zinc-400' : 'text-zinc-500'
              }`}
            >
              github-api.sh ~ /caio-rds
            </div>
          </div>

          <div className="p-5 space-y-4">
            <div className="flex items-center">
              <span
                className={`mr-2 font-bold select-none ${
                  isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                }`}
              >
                $
              </span>
              <span
                className={`font-mono text-sm ${
                  isDarkMode ? 'text-zinc-200' : 'text-zinc-700'
                }`}
              >
                {command}
              </span>
            </div>

            <div
              className={`font-mono text-xs ${
                isDarkMode ? 'text-zinc-500' : 'text-zinc-400'
              }`}
            >
              {loading
                ? '// Fetching live repositories from GitHub API...'
                : error
                ? `// Error loading API: ${error}`
                : `// Found ${repos.length} repositories. Displaying ${filteredRepos.length} matches.`}
            </div>

            {/* Live Search & Filter Bar */}
            {!loading && !error && (
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {/* Search Input */}
                <div className="relative flex-grow">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={language === 'pt' ? 'Buscar por nome, descrição...' : 'Search by name, description...'}
                    className={`w-full pl-9 pr-4 py-2 font-mono text-xs rounded border outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-zinc-950 border-zinc-800 text-zinc-200 placeholder-zinc-650 focus:border-zinc-700'
                        : 'bg-white border-zinc-200 text-zinc-700 placeholder-zinc-400 focus:border-zinc-300'
                    }`}
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Filter Badges */}
        {!loading && !error && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <div
              className={`p-1.5 rounded-md mr-1 ${
                isDarkMode ? 'bg-zinc-900 text-zinc-500' : 'bg-zinc-100 text-zinc-400'
              }`}
            >
              <FiFilter size={12} />
            </div>

            <button
              onClick={() => setFilter(null)}
              className={`px-3 py-1 text-xs font-mono rounded-md border transition-all cursor-pointer ${
                filter === null
                  ? isDarkMode
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30'
                  : isDarkMode
                  ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                  : 'bg-white border-zinc-200 text-zinc-500 hover:bg-zinc-50'
              }`}
            >
              All
            </button>

            {allLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => setFilter(lang)}
                className={`px-3 py-1 text-xs font-mono rounded-md border transition-all cursor-pointer ${
                  filter === lang
                    ? isDarkMode
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30'
                    : isDarkMode
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                    : 'bg-white border-zinc-200 text-zinc-500 hover:bg-zinc-50'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Loading Skeletons */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`h-64 rounded-lg border overflow-hidden flex flex-col ${
                isDarkMode ? 'border-zinc-850 bg-zinc-900/40' : 'border-zinc-150 bg-white/40'
              }`}
            >
              <div className={`h-9 px-4 py-2 border-b flex items-center justify-between ${
                isDarkMode ? 'bg-zinc-900 border-zinc-850' : 'bg-zinc-100 border-zinc-150'
              }`}>
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700 animate-pulse" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700 animate-pulse" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700 animate-pulse" />
                </div>
                <div className="w-20 h-3 bg-zinc-700 rounded animate-pulse" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="w-1/3 h-5 bg-zinc-700 rounded animate-pulse" />
                  <div className="w-full h-12 bg-zinc-700 rounded animate-pulse" />
                </div>
                <div className="w-2/3 h-4 bg-zinc-700 rounded animate-pulse" />
                <div className="flex justify-between items-center pt-2">
                  <div className="w-24 h-3 bg-zinc-700 rounded animate-pulse" />
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 bg-zinc-700 rounded animate-pulse" />
                    <div className="w-8 h-8 bg-zinc-700 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error Fallback */}
      {error && (
        <div
          className={`text-center py-12 rounded-lg border ${
            isDarkMode ? 'bg-zinc-900/60 border-zinc-800 text-zinc-400' : 'bg-zinc-50 border-zinc-200 text-zinc-650'
          }`}
        >
          <FiCode size={36} className="mx-auto mb-4 text-red-500" />
          <p className="font-mono font-semibold">
            {language === 'en'
              ? 'Failed to fetch GitHub repositories'
              : 'Falha ao obter repositórios do GitHub'}
          </p>
          <p className="mt-2 font-mono text-xs text-red-500">{error}</p>
        </div>
      )}

      {/* Repos Grid */}
      {!loading && !error && filteredRepos.length > 0 && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <AnimatePresence>
            {filteredRepos.map((repo) => (
              <Project
                key={repo.id}
                project={{
                  id: repo.id,
                  title: repo.name.replace(/-/g, ' '),
                  description: {
                    en: repo.description || 'No description provided on GitHub.',
                    pt: repo.description || 'Nenhuma descrição providenciada no GitHub.',
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
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* No Matches Found */}
      {!loading && !error && filteredRepos.length === 0 && (
        <div
          className={`text-center py-16 rounded-lg border ${
            isDarkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
          }`}
        >
          <FiCode size={36} className="mx-auto mb-4 text-zinc-500 animate-pulse" />
          <p className="font-mono text-zinc-500 text-sm">
            {language === 'en'
              ? 'No repositories match your criteria.'
              : 'Nenhum repositório corresponde aos critérios.'}
          </p>
          <button
            onClick={() => {
              setFilter(null);
              setSearchQuery('');
            }}
            className="mt-5 px-4 py-2 font-mono text-xs rounded border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 cursor-pointer transition-colors"
          >
            {language === 'en' ? 'Reset Filters' : 'Resetar Filtros'}
          </button>
        </div>
      )}

      {/* Bottom Profile Link */}
      {!loading && !error && (
        <div className="mt-12 text-center">
          <a
            href="https://github.com/caio-rds"
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center px-5 py-3 rounded-lg border font-mono text-xs transition-all ${
              isDarkMode
                ? 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-emerald-400 shadow-md'
                : 'bg-zinc-100/60 border-zinc-200 text-zinc-700 hover:border-zinc-300 hover:text-emerald-600 shadow-sm'
            }`}
          >
            <FiGithub className="mr-2" size={14} />
            {language === 'en' ? 'View Profile on GitHub' : 'Ver Perfil no GitHub'}
          </a>
        </div>
      )}
    </section>
  );
}
