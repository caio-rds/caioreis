'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { FiUser, FiCalendar, FiMapPin, FiBookOpen } from 'react-icons/fi';

interface PersonalInfosProps {
  isDarkMode: boolean;
}

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
    en: 'Made with Love ❤️ and NextJS and Tailwind - © Caio Reis - 2025',
    pt: 'Feito com Amor ❤️ e NextJS e Tailwind - © Caio Reis - 2025',
  },
};

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
    if (currentLineIndex < terminalLines.length) {
      const timer = setTimeout(
        () => {
          setTypedLines((prev) => [...prev, terminalLines[currentLineIndex]]);
          setCurrentLineIndex((prev) => prev + 1);
        },
        currentLineIndex % 4 === 0 ? 800 : 250,
      );

      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [currentLineIndex, terminalLines]);

  return (
    <motion.section
      className="my-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.h3
        className={`text-2xl md:text-3xl font-bold text-center mb-12 ${
          isDarkMode ? 'text-zinc-200' : 'text-zinc-800'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {language === 'en' ? 'About Me' : 'Sobre Mim'}
      </motion.h3>

      <div className="flex flex-col lg:flex-row gap-8 items-center">
        {/* Terminal Card */}
        <motion.div
          className={`w-full lg:w-3/5 rounded-lg overflow-hidden border ${
            isDarkMode
              ? 'border-zinc-700 bg-zinc-900 shadow-xl'
              : 'border-zinc-200 bg-white shadow-md'
          }`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {/* Terminal header */}
          <div
            className={`flex items-center px-4 py-2 ${
              isDarkMode ? 'bg-zinc-800' : 'bg-zinc-100'
            }`}
          >
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div
              className={`ml-4 text-xs font-mono ${
                isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              personal-info.sh ~ /caio-reis
            </div>
          </div>

          {/* Terminal content */}
          <div
            className={`p-6 font-mono text-sm ${
              isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
            } min-h-[300px]`}
          >
            {typedLines.map((line, index) => (
              <motion.div
                key={index}
                className={`mb-1 ${
                  line.startsWith('>')
                    ? isDarkMode
                      ? 'text-emerald-400'
                      : 'text-emerald-600'
                    : line.includes('{') || line.includes('}')
                    ? isDarkMode
                      ? 'text-zinc-500'
                      : 'text-zinc-400'
                    : ''
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {line.startsWith('  ') &&
                !line.includes('{') &&
                !line.includes('}') ? (
                  <div>
                    <span
                      className={
                        isDarkMode ? 'text-purple-400' : 'text-purple-600'
                      }
                    >
                      {line.split(':')[0]}:
                    </span>
                    <span
                      className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}
                    >
                      {line.split(':')[1]}
                    </span>
                  </div>
                ) : (
                  line
                )}
              </motion.div>
            ))}

            {isTyping && (
              <motion.span
                className={`inline-block w-2 h-5 ${
                  isDarkMode ? 'bg-zinc-300' : 'bg-zinc-700'
                }`}
                animate={{ opacity: [0, 1] }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
            )}
          </div>
        </motion.div>

        {/* Cards with icons */}
        <div className="w-full lg:w-2/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoCard
            icon={<FiUser />}
            title={language === 'en' ? 'Name' : 'Nome'}
            value={personalInfo.name}
            isDarkMode={isDarkMode}
            delay={0.6}
          />
          <InfoCard
            icon={<FiCalendar />}
            title={language === 'en' ? 'Age' : 'Idade'}
            value={`${age} ${language === 'en' ? 'years' : 'anos'}`}
            isDarkMode={isDarkMode}
            delay={0.7}
          />
          <InfoCard
            icon={<FiMapPin />}
            title={language === 'en' ? 'Location' : 'Localização'}
            value={personalInfo.location}
            isDarkMode={isDarkMode}
            delay={0.8}
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
            delay={0.9}
          />
        </div>
      </div>
    </motion.section>
  );
}

function InfoCard({
  icon,
  title,
  value,
  isDarkMode,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  isDarkMode: boolean;
  delay: number;
}) {
  return (
    <motion.div
      className={`p-4 rounded-lg border ${
        isDarkMode
          ? 'border-zinc-700 bg-zinc-800/60 hover:bg-zinc-800'
          : 'border-zinc-200 bg-zinc-50 hover:bg-white'
      }`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center mb-2">
        <div
          className={`p-2 rounded-md mr-3 ${
            isDarkMode ? 'bg-zinc-700' : 'bg-zinc-200'
          }`}
        >
          <span
            className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}
          >
            {icon}
          </span>
        </div>
        <h4
          className={`text-sm font-mono ${
            isDarkMode ? 'text-zinc-400' : 'text-zinc-500'
          }`}
        >
          {title}
        </h4>
      </div>
      <p
        className={`text-lg font-medium ml-11 ${
          isDarkMode ? 'text-zinc-200' : 'text-zinc-800'
        }`}
      >
        {value}
      </p>
    </motion.div>
  );
}
