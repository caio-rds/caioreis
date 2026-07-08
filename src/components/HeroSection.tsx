import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import InteractiveTerminal from './InteractiveTerminal';
import { FiCode, FiArrowRight, FiUser } from 'react-icons/fi';

interface HeroSectionProps {
  isDarkMode: boolean;
}

export default function HeroSection({ isDarkMode }: HeroSectionProps) {
  const { t, language } = useLanguage();

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative py-16 md:py-24 overflow-hidden">
      {/* Background glowing gradients */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <motion.div
          className={`absolute top-12 left-1/4 w-72 h-72 rounded-full filter blur-[80px] opacity-25 ${
            isDarkMode ? 'bg-emerald-500' : 'bg-emerald-300'
          }`}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className={`absolute bottom-12 right-1/4 w-80 h-80 rounded-full filter blur-[100px] opacity-20 ${
            isDarkMode ? 'bg-indigo-500' : 'bg-indigo-300'
          }`}
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 30, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Bio & Info */}
        <motion.div
          className="lg:col-span-5 flex flex-col items-start text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Status Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-6 select-none">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>{language === 'pt' ? 'Disponível para Projetos' : 'Available for Projects'}</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
            {language === 'pt' ? 'Olá, eu sou ' : 'Hi, I am '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-indigo-500 dark:from-emerald-400 dark:to-indigo-400">
              Caio Reis
            </span>
          </h1>

          <h2 className="text-xl md:text-2xl font-mono font-bold text-zinc-700 dark:text-zinc-300 mb-6 flex items-center">
            <FiCode className="mr-2 text-indigo-500 dark:text-indigo-400" />
            {t('home.title')}
          </h2>

          <p className="text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed mb-8 max-w-lg">
            {t('home.subtitle')}. {language === 'pt' 
              ? 'Estudante de Engenharia de Software no 7º período, focado em backend, microsserviços, modelagem de banco de dados e arquitetura moderna de aplicações.' 
              : 'Software Engineering student in the 7th semester, focusing on backend, microservices, database modeling, and modern application architecture.'}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <motion.button
              onClick={() => handleScrollToSection('projects-section')}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-emerald-500 to-indigo-500 hover:from-emerald-600 hover:to-indigo-600 shadow-lg shadow-indigo-500/20 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{language === 'pt' ? 'Ver Projetos' : 'View Projects'}</span>
              <FiArrowRight className="ml-2" />
            </motion.button>

            <motion.button
              onClick={() => handleScrollToSection('about-section')}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{language === 'pt' ? 'Sobre Mim' : 'About Me'}</span>
              <FiUser className="ml-2" />
            </motion.button>
          </div>
        </motion.div>

        {/* Right Side: Interactive Terminal */}
        <motion.div
          className="lg:col-span-7 flex justify-center w-full"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          <InteractiveTerminal />
        </motion.div>
      </div>
    </div>
  );
}
