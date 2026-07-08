import { useState, useEffect, type ReactNode } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { SiNodedotjs, SiPython, SiGo, SiDocker, SiReact } from 'react-icons/si';
import { BiData } from 'react-icons/bi';
import { VscTerminalBash } from 'react-icons/vsc';
import { TbBuildingBank, TbTestPipe } from 'react-icons/tb';

interface TechCardProps {
  id: string;
  title: string;
  description: string;
  color: string;
  darkColor: string;
  percentage: number;
  isDarkMode: boolean;
  index: number;
}

const iconComponents: Record<string, ReactNode> = {
  nodejs: <SiNodedotjs size={32} />,
  python: <SiPython size={32} />,
  golang: <SiGo size={32} />,
  database: <BiData size={32} />,
  lua: <VscTerminalBash size={32} />,
  docker: <SiDocker size={32} />,
  architecture: <TbBuildingBank size={32} />,
  testing: <TbTestPipe size={32} />,
  react: <SiReact size={32} />,
};

const HEX_COLOR_MAP: Record<string, string> = {
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

    let frameId: number;
    const animatePercentage = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      setDisplayPercentage(Math.round(easeOut(progress) * end));

      if (progress < 1) {
        frameId = requestAnimationFrame(animatePercentage);
      }
    };

    const timer = setTimeout(() => {
      frameId = requestAnimationFrame(animatePercentage);
      progressControls.start({
        width: `${percentage}%`,
        transition: { ease: 'easeOut', duration: 1 },
      });
    }, 200 + index * 80);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frameId);
    };
  }, [percentage, progressControls, index]);

  const lightColorValue = color.replace('from-', 'text-').split(' ')[0];
  const darkColorValue = darkColor.replace('from-', 'text-').split(' ')[0];
  const iconHexColor =
    HEX_COLOR_MAP[isDarkMode ? darkColorValue : lightColorValue] || '#10b981';

  return (
    <motion.div
      className={`p-6 rounded-lg border transition-colors duration-300 ${
        isDarkMode
          ? 'border-zinc-800 bg-zinc-900/40 glassmorphism'
          : 'border-zinc-200 bg-white/40 glassmorphism'
      }`}
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      whileHover={{
        y: -6,
        borderColor: `${iconHexColor}80`,
        boxShadow: isDarkMode 
          ? `0 12px 30px -10px ${iconHexColor}40`
          : `0 12px 30px -10px ${iconHexColor}20`,
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <div className="flex justify-between items-start mb-4 select-none">
        <div
          className={`flex items-center p-2.5 rounded-md ${
            isDarkMode ? 'bg-zinc-850/80' : 'bg-zinc-100'
          }`}
        >
          <span className="text-xl" style={{ color: iconHexColor }}>
            {iconComponents[id] || '⚡'}
          </span>
        </div>

        <div className="flex space-x-1.5">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === 0
                  ? 'bg-red-500/80'
                  : i === 1
                  ? 'bg-yellow-500/80'
                  : 'bg-green-500/80'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-2 text-left">
        <div className="font-mono mb-3 flex items-center select-none">
          <span
            className={`mr-2 font-bold ${
              isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
            }`}
          >
            $
          </span>
          <h4
            className={`text-base font-bold ${
              isDarkMode ? 'text-zinc-100' : 'text-zinc-800'
            }`}
          >
            {title}
          </h4>
        </div>

        <div
          className={`${
            isDarkMode ? 'bg-zinc-950/70' : 'bg-zinc-50'
          } p-3 rounded-md border ${
            isDarkMode ? 'border-zinc-900' : 'border-zinc-150'
          } font-mono text-xs leading-relaxed`}
        >
          <p className={isDarkMode ? 'text-zinc-400' : 'text-zinc-650'}>
            {description}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs select-none">
          <span
            className={`font-mono ${isDarkMode ? 'text-zinc-600' : 'text-zinc-400'}`}
          >
            &lt;/&gt;
          </span>

          <div className="flex-grow mx-3 relative">
            <div
              className={`w-full h-1.5 rounded-full ${
                isDarkMode ? 'bg-zinc-800/80' : 'bg-zinc-200/80'
              }`}
            >
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${
                  isDarkMode ? darkColor : color
                }`}
                initial={{ width: '0%' }}
                animate={progressControls}
              />
            </div>
          </div>

          <div
            className={`font-mono font-bold text-xs ${
              isDarkMode ? 'text-zinc-400' : 'text-zinc-650'
            }`}
          >
            {displayPercentage}%
          </div>
        </div>
      </div>
    </motion.div>
  );
}
