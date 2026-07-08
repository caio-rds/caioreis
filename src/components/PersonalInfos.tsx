import { useState, useEffect, useMemo, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { FiUser, FiCalendar, FiMapPin, FiBookOpen } from 'react-icons/fi';
import { personalInfo, calculateAge, calculateSemester } from '@/data/personalInfo';

interface PersonalInfosProps {
  isDarkMode: boolean;
}

export default function PersonalInfos({ isDarkMode }: PersonalInfosProps) {
  const { language } = useLanguage();
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const age = calculateAge(personalInfo.birthdate);
  const currentSemester = calculateSemester(personalInfo.education.startDate);

  const terminalLines = useMemo(
    () => [
      '> whoami',
      `${personalInfo.name}`,
      '> get user.info',
      `{`,
      `  name: "${personalInfo.name}",`,
      `  age: ${age},`,
      `  location: "${personalInfo.location}"`,
      `}`,
      '> get user.education',
      `{`,
      `  course: "${personalInfo.education.course[language as 'en' | 'pt']}",`,
      `  semester: ${currentSemester}`,
      `}`,
    ],
    [age, currentSemester, language],
  );

  useEffect(() => {
    setTypedLines([]);
    setCurrentLineIndex(0);
    setIsTyping(true);
  }, [terminalLines]);

  useEffect(() => {
    if (currentLineIndex < terminalLines.length) {
      const timer = setTimeout(
        () => {
          setTypedLines((prev) => [...prev, terminalLines[currentLineIndex]]);
          setCurrentLineIndex((prev) => prev + 1);
        },
        currentLineIndex % 4 === 0 ? 600 : 150,
      );

      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [currentLineIndex, terminalLines]);

  return (
    <motion.section
      id="about-section"
      className="scroll-mt-24 pt-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-150px' }}
    >
      <h3
        className={`text-2xl md:text-3xl font-bold text-center mb-12 ${
          isDarkMode ? 'text-zinc-200' : 'text-zinc-800'
        }`}
      >
        {language === 'en' ? 'About Me' : 'Sobre Mim'}
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-10">
        {/* Left Column: Premium bio details */}
        <motion.div
          className={`lg:col-span-6 p-6 md:p-8 rounded-lg border flex flex-col justify-between ${
            isDarkMode
              ? 'border-zinc-800 bg-zinc-900/40 glassmorphism'
              : 'border-zinc-200 bg-white/40 glassmorphism'
          }`}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h4 className="text-xl font-bold mb-4 text-emerald-500 dark:text-emerald-400">
              {language === 'pt' ? 'Minha Trajetória' : 'My Journey'}
            </h4>
            <p className="text-zinc-600 dark:text-zinc-400 font-light leading-relaxed mb-4 text-sm md:text-base">
              {language === 'pt'
                ? 'Sou um desenvolvedor backend apaixonado por construir a estrutura invisível que faz os sistemas funcionarem de forma robusta e otimizada. Foco na criação de APIs escaláveis, integração eficiente de dados e boas práticas de código.'
                : 'I am a backend developer passionate about building the invisible infrastructure that keeps systems running robustly and optimally. I focus on creating scalable APIs, efficient data integration, and clean code practices.'}
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 font-light leading-relaxed text-sm md:text-base">
              {language === 'pt'
                ? 'Atualmente curso Engenharia de Software e busco sempre expandir meus conhecimentos teóricos e práticos na modelagem de microsserviços, arquitetura limpa e testes automatizados. Acredito que um software excelente é feito com simplicidade e atenção aos detalhes.'
                : 'Currently pursuing Software Engineering, I am always seeking to expand my theoretical and practical knowledge in microservices modeling, clean architecture, and automated testing. I believe great software is built on simplicity and attention to details.'}
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center text-xs font-mono text-zinc-500">
            <span>{language === 'pt' ? 'Status: Estudando & Criando' : 'Status: Learning & Building'}</span>
            <span className="text-indigo-400">#BackendDev</span>
          </div>
        </motion.div>

        {/* Right Column: Terminal Visualizer */}
        <motion.div
          className={`lg:col-span-6 rounded-lg overflow-hidden border flex flex-col ${
            isDarkMode
              ? 'border-zinc-800 bg-zinc-950/80 shadow-2xl shadow-zinc-950/40'
              : 'border-zinc-200 bg-zinc-900 shadow-xl'
          }`}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div
            className={`flex items-center px-4 py-2 bg-zinc-900 border-b border-zinc-800`}
          >
            <div className="flex space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            </div>
            <div className="ml-4 text-xs font-mono text-zinc-400">
              whoami.sh ~ /caioreis
            </div>
          </div>

          <div className="p-6 font-mono text-xs md:text-sm text-zinc-300 min-h-[220px] flex-grow bg-zinc-950/90">
            {typedLines.map((line, index) => {
              const isCommand = line.startsWith('>');
              const isBracket = line.includes('{') || line.includes('}');
              
              let lineStyle = 'mb-1.5 whitespace-pre';
              if (isCommand) lineStyle += ' text-emerald-400 font-semibold';
              else if (isBracket) lineStyle += ' text-zinc-600';
              
              if (line.startsWith('  ') && !isBracket) {
                const parts = line.split(':');
                return (
                  <div key={index} className={lineStyle}>
                    <span className="text-indigo-400">{parts[0]}:</span>
                    <span className="text-zinc-200">{parts[1]}</span>
                  </div>
                );
              }

              return (
                <div key={index} className={lineStyle}>
                  {line}
                </div>
              );
            })}

            {isTyping && (
              <motion.span
                className="inline-block w-1.5 h-4 ml-0.5 bg-zinc-300"
                animate={{ opacity: [0, 1] }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 0.5
                }}
              />
            )}
          </div>
        </motion.div>
      </div>

      {/* 4 Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <InfoCard
          icon={<FiUser />}
          title={language === 'en' ? 'Name' : 'Nome'}
          value={personalInfo.name}
          isDarkMode={isDarkMode}
        />
        <InfoCard
          icon={<FiCalendar />}
          title={language === 'en' ? 'Age' : 'Idade'}
          value={`${age} ${language === 'en' ? 'years' : 'anos'}`}
          isDarkMode={isDarkMode}
        />
        <InfoCard
          icon={<FiMapPin />}
          title={language === 'en' ? 'Location' : 'Localização'}
          value={personalInfo.location}
          isDarkMode={isDarkMode}
        />
        <InfoCard
          icon={<FiBookOpen />}
          title={language === 'en' ? 'Education' : 'Formação'}
          value={`${
            personalInfo.education.course[language as 'en' | 'pt']
          } - ${currentSemester}° ${
            language === 'en' ? 'semester' : 'semestre'
          }`}
          isDarkMode={isDarkMode}
        />
      </div>
    </motion.section>
  );
}

function InfoCard({
  icon,
  title,
  value,
  isDarkMode,
}: {
  icon: ReactNode;
  title: string;
  value: string;
  isDarkMode: boolean;
}) {
  return (
    <motion.div
      className={`p-5 rounded-lg border flex flex-col transition-all duration-300 ${
        isDarkMode
          ? 'border-zinc-800 bg-zinc-900/30 hover:bg-zinc-800/40 hover:border-zinc-700'
          : 'border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300'
      }`}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -3 }}
    >
      <div
        className={`w-9 h-9 flex items-center justify-center rounded-md mb-4 ${
          isDarkMode ? 'bg-zinc-800 text-emerald-400' : 'bg-zinc-100 text-emerald-600'
        }`}
      >
        {icon}
      </div>
      <h4
        className={`text-xs font-mono mb-1 ${
          isDarkMode ? 'text-zinc-500' : 'text-zinc-400'
        }`}
      >
        {title}
      </h4>
      <p
        className={`text-base font-semibold tracking-tight ${
          isDarkMode ? 'text-zinc-200' : 'text-zinc-800'
        }`}
      >
        {value}
      </p>
    </motion.div>
  );
}
