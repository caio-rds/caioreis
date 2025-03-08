'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeroSectionProps {
  isDarkMode: boolean;
}

export default function HeroSection({ isDarkMode }: HeroSectionProps) {
  const { t } = useLanguage();
  const [typingComplete, setTypingComplete] = useState(false);
  const codeControls = useAnimation();

  const codeLines = [
    'function Developer() {',
    '  const skills = ["Backend", "API", "Architecture"];',
    '  const passion = "Building robust solutions";',
    '  ',
    '  return (',
    '    <Expert skills={skills} drive={passion} />',
    '  );',
    '}',
  ];

  useEffect(() => {
    if (typingComplete) {
      codeControls.start('visible');
    }
  }, [typingComplete, codeControls]);

  const BracketDecoration = ({ side }: { side: 'left' | 'right' }) => (
    <motion.div
      className="hidden md:flex absolute top-0 bottom-0 items-center"
      style={{ [side]: '-30px' }}
      initial={{ opacity: 0, x: side === 'left' ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <div
        className={`h-40 text-6xl font-mono font-bold ${
          isDarkMode ? 'text-zinc-700' : 'text-zinc-200'
        } opacity-80`}
      >
        {side === 'left' ? '{' : '}'}
      </div>
    </motion.div>
  );

  return (
    <motion.div
      className="text-center py-16 md:py-24 px-4 md:px-8 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className={`absolute text-xs font-mono ${
                isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
              }`}
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: [0, 1, 0],
                y: ['0%', '100%'],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                delay: Math.random() * 2,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'linear',
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
              }}
            >
              {Math.random() > 0.5 ? '0' : '1'}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative">
        <BracketDecoration side="left" />
        <BracketDecoration side="right" />

        <motion.div
          className="mb-6 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className={`text-4xl md:text-6xl font-bold relative text-transparent bg-clip-text bg-gradient-to-r inline-block ${
              isDarkMode
                ? 'from-emerald-400 to-blue-400'
                : 'from-emerald-600 to-blue-600'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <span className="inline-block">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="font-mono"
              >
                &lt;
              </motion.span>
              <TypewriterText
                text="Caio Reis"
                onComplete={() => setTypingComplete(true)}
                isDarkMode={isDarkMode}
              />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="font-mono"
              >
                /&gt;
              </motion.span>
            </span>
          </motion.h1>

          <motion.div
            className="h-px w-3/4 mx-auto my-2"
            initial={{ width: 0 }}
            animate={{ width: '75%' }}
            transition={{ delay: 1.6, duration: 0.8 }}
            style={{
              background: isDarkMode
                ? 'linear-gradient(to right, transparent, rgba(129, 140, 248, 0.4), transparent)'
                : 'linear-gradient(to right, transparent, rgba(37, 99, 235, 0.2), transparent)',
            }}
          />
        </motion.div>

        <motion.h2
          className={`mt-4 text-xl md:text-2xl font-mono mb-4 ${
            isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
        >
          <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>
            {'{{'}
          </span>
          {t('home.title')}
          <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>
            {'}}'}
          </span>
        </motion.h2>

        <motion.div
          className={`mt-8 mb-6 mx-auto max-w-xl rounded-lg overflow-hidden ${
            isDarkMode ? 'bg-zinc-800 shadow-xl' : 'bg-zinc-100 shadow-md'
          }`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.5 }}
        >
          <div
            className={`flex items-center px-4 py-2 ${
              isDarkMode ? 'bg-zinc-900' : 'bg-zinc-200'
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
              developer.js
            </div>
          </div>

          <div className="p-4 font-mono text-sm relative">
            <motion.div
              className="origin-top"
              variants={{
                hidden: { opacity: 0, height: 0 },
                visible: { opacity: 1, height: 'auto' },
              }}
              initial="hidden"
              animate={codeControls}
              transition={{ duration: 0.8 }}
            >
              {codeLines.map((line, index) => (
                <CodeLine
                  key={index}
                  line={line}
                  index={index}
                  isDarkMode={isDarkMode}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.p
          className={`mt-8 text-lg max-w-2xl mx-auto font-light ${
            isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <span
            className={`font-mono ${
              isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
            }`}
          >
            //
          </span>
          {t('home.subtitle')}
        </motion.p>
      </div>
    </motion.div>
  );
}

function TypewriterText({
  text,
  onComplete,
  isDarkMode,
}: {
  text: string;
  onComplete: () => void;
  isDarkMode: boolean;
}) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        onComplete();
      }
    }, 80);

    return () => clearInterval(interval);
  }, [text, onComplete]);

  return (
    <span>
      {displayText}
      {displayText.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className={isDarkMode ? 'text-zinc-100' : 'text-zinc-800'}
        >
          |
        </motion.span>
      )}
    </span>
  );
}

function CodeLine({
  line,
  index,
  isDarkMode,
}: {
  line: string;
  index: number;
  isDarkMode: boolean;
}) {
  const formattedLine = line
    .replace(
      /(function|const|return|skills|passion)/g,
      `<span class="${
        isDarkMode ? 'text-purple-400' : 'text-purple-600'
      }">$1</span>`,
    )
    .replace(
      /(\{|\}|\(|\)|;|,|\[|\])/g,
      `<span class="${
        isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
      }">$1</span>`,
    )
    .replace(
      /"([^"]*)"/g,
      `<span class="${
        isDarkMode ? 'text-emerald-300' : 'text-emerald-600'
      }">"$1"</span>`,
    )
    .replace(
      /(&lt;|&gt;|\/)/g,
      `<span class="${
        isDarkMode ? 'text-orange-300' : 'text-orange-600'
      }">$1</span>`,
    );

  return (
    <motion.div
      className={`${
        isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
      } whitespace-pre`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index + 2.2, duration: 0.3 }}
    >
      <span
        className={`mr-4 inline-block w-5 text-right ${
          isDarkMode ? 'text-zinc-600' : 'text-zinc-400'
        }`}
      >
        {index + 1}
      </span>
      <span dangerouslySetInnerHTML={{ __html: formattedLine }} />
    </motion.div>
  );
}
