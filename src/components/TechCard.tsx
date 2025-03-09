'use client';

import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { SiNodedotjs, SiPython, SiGo, SiDocker, SiReact } from 'react-icons/si';
import { BiData } from 'react-icons/bi';
import { VscTerminalBash } from 'react-icons/vsc';
import { TbBuildingBank, TbTestPipe } from 'react-icons/tb';

interface TechCardProps {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  darkColor: string;
  percentage: number;
  isDarkMode: boolean;
  index: number;
}

const iconComponents: Record<string, React.ReactNode> = {
  nodejs: <SiNodedotjs size={36} />,
  python: <SiPython size={36} />,
  golang: <SiGo size={36} />,
  database: <BiData size={36} />,
  lua: <VscTerminalBash size={36} />,
  docker: <SiDocker size={36} />,
  architecture: <TbBuildingBank size={36} />,
  testing: <TbTestPipe size={36} />,
  react: <SiReact size={36} />,
};

export default function TechCard({
  id,
  title,
  description,
  color,
  darkColor,
  percentage,
  isDarkMode,
  index,
}: TechCardProps) {
  const [displayPercentage, setDisplayPercentage] = useState(0);
  const progressControls = useAnimation();

  useEffect(() => {
    const end = percentage;
    const duration = 1500;
    const startTime = Date.now();

    const animatePercentage = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      const currentValue = Math.round(easeOut(progress) * end);

      setDisplayPercentage(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animatePercentage);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(animatePercentage);
      progressControls.start({
        width: `${percentage}%`,
        transition: { ease: 'easeOut' },
      });
    }, 500 + index * 100);

    return () => clearTimeout(timer);
  }, [percentage, progressControls, index]);

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  const lightColorValue = color.replace('from-', 'text-').split(' ')[0];
  const darkColorValue = darkColor.replace('from-', 'text-').split(' ')[0];

  const getHexColor = () => {
    const colorMap: Record<string, string> = {
      'text-green-500': '#10b981',
      'text-green-400': '#34d399',
      'text-blue-500': '#3b82f6',
      'text-blue-400': '#60a5fa',
      'text-cyan-500': '#06b6d4',
      'text-cyan-400': '#22d3ee',
      'text-yellow-500': '#eab308',
      'text-yellow-400': '#facc15',
      'text-indigo-500': '#6366f1',
      'text-indigo-400': '#818cf8',
      'text-purple-500': '#a855f7',
      'text-purple-400': '#c084fc',
      'text-teal-500': '#14b8a6',
      'text-teal-400': '#2dd4bf',
    };

    return colorMap[isDarkMode ? darkColorValue : lightColorValue] || '#10b981';
  };

  return (
    <motion.div
      className={`p-6 rounded-lg border ${
        isDarkMode
          ? `border-zinc-700 bg-zinc-900 bg-opacity-60`
          : `border-zinc-200 bg-white`
      } shadow-lg backdrop-blur-sm`}
      variants={cardVariants}
      whileHover={{
        scale: 1.02,
        boxShadow: isDarkMode
          ? `0 0 15px 2px ${darkColor.split(' ')[1].replace('to-', '')}40`
          : `0 0 15px 2px ${color.split(' ')[1].replace('to-', '')}20`,
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Card header */}
      <div className="flex justify-between items-start mb-4">
        <div
          className={`flex items-center p-2 rounded-md ${
            isDarkMode ? 'bg-zinc-800' : 'bg-zinc-100'
          }`}
        >
          {/* Use inline style with transition instead of classes for icon color */}
          <span
            className="text-xl transition-colors"
            style={{ color: getHexColor() }}
          >
            {iconComponents[id] || '⚡'}
          </span>
        </div>

        <div className="flex space-x-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full ${
                isDarkMode
                  ? i === 0
                    ? 'bg-red-500'
                    : i === 1
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                  : i === 0
                  ? 'bg-red-400'
                  : i === 1
                  ? 'bg-yellow-400'
                  : 'bg-green-400'
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Card content */}
      <div className="mt-2">
        <div className="font-mono mb-3 flex items-center">
          <span
            className={`mr-2 ${
              isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
            }`}
          >
            $
          </span>
          <motion.h4
            className={`text-lg font-bold ${
              isDarkMode ? 'text-white' : 'text-zinc-800'
            }`}
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            {title}
          </motion.h4>
        </div>

        <div
          className={`${
            isDarkMode ? 'bg-zinc-800' : 'bg-zinc-100'
          } p-3 rounded-md font-mono text-sm`}
        >
          <motion.p
            className={`${
              isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
            } leading-relaxed`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {description}
          </motion.p>
        </div>

        {/* Progress bar with animated percentage */}
        <div className="mt-4 flex items-center justify-between text-xs">
          <span
            className={`mr-2 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}
          >
            &lt;/&gt;
          </span>

          <div className="flex-grow mx-2 relative">
            <div
              className={`w-full h-1 rounded-full ${
                isDarkMode ? 'bg-zinc-800' : 'bg-zinc-200'
              }`}
            >
              <motion.div
                className={`h-full rounded-full ${
                  isDarkMode
                    ? `bg-gradient-to-r ${darkColor}`
                    : `bg-gradient-to-r ${color}`
                }`}
                initial={{ width: '0%' }}
                animate={progressControls}
              />
            </div>
          </div>

          <div
            className={`font-mono font-medium text-sm ${
              isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
            }`}
          >
            {displayPercentage}%
          </div>
        </div>
      </div>
    </motion.div>
  );
}
