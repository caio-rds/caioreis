'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { FiCpu, FiActivity, FiAward, FiCheck } from 'react-icons/fi';

interface StatisticsSectionProps {
  isDarkMode: boolean;
}

const statisticsData = [
  {
    value: '5+',
    label: 'Years Experience',
    icon: <FiCpu size={24} />,
    color: 'from-emerald-400 to-emerald-600',
    darkColor: 'from-emerald-300 to-emerald-500',
  },
  {
    value: '50+',
    label: 'Projects Delivered',
    icon: <FiActivity size={24} />,
    color: 'from-blue-400 to-blue-600',
    darkColor: 'from-blue-300 to-blue-500',
  },
  {
    value: '20+',
    label: 'Happy Clients',
    icon: <FiAward size={24} />,
    color: 'from-purple-400 to-purple-600',
    darkColor: 'from-purple-300 to-purple-500',
  },
  {
    value: '99%',
    label: 'Success Rate',
    icon: <FiCheck size={24} />,
    color: 'from-cyan-400 to-cyan-600',
    darkColor: 'from-cyan-300 to-cyan-500',
  },
];

export default function StatisticsSection({
  isDarkMode,
}: StatisticsSectionProps) {
  const { t } = useLanguage();
  const [counters, setCounters] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    const targetValues = [5, 50, 20, 99];
    const duration = 2000;
    const frameRate = 60;
    const totalFrames = (duration / 1000) * frameRate;

    let frame = 0;
    const interval = setInterval(() => {
      if (frame >= totalFrames) {
        clearInterval(interval);
        setCounters(targetValues);
        return;
      }

      const progress = 1 - Math.pow(2, -10 * (frame / totalFrames));

      setCounters(targetValues.map((target) => Math.floor(target * progress)));

      frame++;
    }, 1000 / frameRate);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      className={`relative my-20 p-8 rounded-2xl overflow-hidden ${
        isDarkMode ? 'bg-zinc-800' : 'bg-zinc-100'
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Background grid decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-px h-px ${
              isDarkMode ? 'bg-emerald-400' : 'bg-emerald-600'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
            }}
          />
        ))}
      </div>

      {/* Terminal-style header */}
      <div
        className={`flex items-center justify-center mb-8 p-2 rounded-md mx-auto max-w-md ${
          isDarkMode ? 'bg-zinc-900' : 'bg-zinc-200'
        }`}
      >
        <div className="flex space-x-2 absolute left-4">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
        </div>

        <motion.h3
          className={`text-2xl md:text-3xl font-bold text-center font-mono ${
            isDarkMode ? 'text-zinc-200' : 'text-zinc-800'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span
            className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}
          >
            $
          </span>{' '}
          {t('stats.title') || 'By the Numbers'}
        </motion.h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {statisticsData.map((stat, index) => (
          <motion.div
            key={index}
            className={`p-6 rounded-lg border backdrop-blur-sm transition-all ${
              isDarkMode
                ? 'border-zinc-700 bg-zinc-900/20 hover:bg-zinc-900/40'
                : 'border-zinc-200 bg-white/60 hover:bg-white/80'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
              scale: 1.05,
            }}
          >
            <div className="flex flex-col items-center text-center">
              {/* Icon with gradient background */}
              <div
                className={`w-16 h-16 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-br ${
                  isDarkMode ? stat.darkColor : stat.color
                }`}
              >
                <motion.div
                  className={isDarkMode ? 'text-zinc-900' : 'text-white'}
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                >
                  {stat.icon}
                </motion.div>
              </div>

              {/* Number counter with code font */}
              <motion.div
                className="font-mono text-3xl md:text-4xl font-bold relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + 0.1 * index }}
              >
                <motion.span
                  className={`bg-gradient-to-r text-transparent bg-clip-text ${
                    isDarkMode
                      ? 'from-emerald-400 to-blue-400'
                      : 'from-emerald-600 to-blue-600'
                  }`}
                  animate={{
                    backgroundPosition: ['0%', '100%'],
                    transition: {
                      repeat: Infinity,
                      repeatType: 'mirror',
                    },
                  }}
                  style={{ backgroundSize: '200%' }}
                >
                  {stat.value.includes('+')
                    ? `${counters[index]}+`
                    : stat.value.includes('%')
                    ? `${counters[index]}%`
                    : counters[index]}
                </motion.span>

                <motion.span
                  className={`absolute -right-3 -top-1 text-xs ${
                    isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                  }`}
                  animate={{
                    opacity: [0, 1, 0],
                    transition: {
                      repeat: Infinity,
                    },
                  }}
                >
                  _
                </motion.span>
              </motion.div>

              {/* Label with code-like decorations */}
              <div className="mt-3 flex items-center justify-center">
                <motion.span
                  className={`text-xs mr-1 ${
                    isDarkMode ? 'text-zinc-500' : 'text-zinc-400'
                  }`}
                >
                  {/* // */}
                </motion.span>
                <p
                  className={`font-mono text-sm ${
                    isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
                  }`}
                >
                  {t(`stats.${index}`) || stat.label}
                </p>
              </div>

              {/* Bottom animated bar */}
              <motion.div
                className="w-full h-0.5 mt-4 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + 0.1 * index }}
              >
                <motion.div
                  className={`h-full w-full bg-gradient-to-r ${
                    isDarkMode ? stat.darkColor : stat.color
                  }`}
                  animate={{
                    x: ['-100%', '0%', '0%', '100%'],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: 'loop',
                    times: [0, 0.3, 0.7, 1],
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Code-style footer */}
      <motion.div
        className={`mt-12 text-center font-mono text-xs ${
          isDarkMode ? 'text-zinc-500' : 'text-zinc-400'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span className={isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}>
          {'/* '}
        </span>
        <span>Data updated: {new Date().toLocaleDateString()}</span>
        <span className={isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}>
          {' */'}
        </span>
      </motion.div>
    </motion.section>
  );
}
