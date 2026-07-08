import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { FiCpu, FiActivity, FiAward, FiCheck } from 'react-icons/fi';

interface StatisticsSectionProps {
  isDarkMode: boolean;
}

const statisticsData = [
  {
    value: 5,
    suffix: '+',
    label: 'Years Experience',
    icon: <FiCpu size={22} />,
    light: '#059669',
    dark: '#34d399',
  },
  {
    value: 50,
    suffix: '+',
    label: 'Projects Delivered',
    icon: <FiActivity size={22} />,
    light: '#2563eb',
    dark: '#60a5fa',
  },
  {
    value: 20,
    suffix: '+',
    label: 'Happy Clients',
    icon: <FiAward size={22} />,
    light: '#7c3aed',
    dark: '#c084fc',
  },
  {
    value: 99,
    suffix: '%',
    label: 'Success Rate',
    icon: <FiCheck size={22} />,
    light: '#0891b2',
    dark: '#22d3ee',
  },
];

const GLYPHS = '01<>{}/*#$%';

function DecodeValue({
  value,
  active,
  delay = 0,
}: {
  value: number;
  active: boolean;
  delay?: number;
}) {
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!active) return;

    const final = String(value);
    const totalFrames = 18;
    let frame = 0;
    let intervalId: ReturnType<typeof setInterval>;

    const startTimer = setTimeout(() => {
      intervalId = setInterval(() => {
        frame++;
        const revealCount = Math.ceil((frame / totalFrames) * final.length);
        let out = '';
        for (let i = 0; i < final.length; i++) {
          out += i < revealCount ? final[i] : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setDisplay(out);

        if (frame >= totalFrames) {
          setDisplay(final);
          clearInterval(intervalId);
        }
      }, 45);
    }, delay);

    return () => {
      clearTimeout(startTimer);
      clearInterval(intervalId);
    };
  }, [active, value, delay]);

  return <>{display}</>;
}

function TiltCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [9, -9]), {
    stiffness: 250,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), {
    stiffness: 250,
    damping: 22,
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function GlowBorderCard({
  accent,
  isDarkMode,
  children,
}: {
  accent: string;
  isDarkMode: boolean;
  children: ReactNode;
}) {
  return (
    <div className="relative h-full rounded-xl p-px overflow-hidden">
      <motion.div
        className="absolute inset-[-60%]"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, ${accent} 70deg, transparent 160deg)`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
      />
      <div
        className={`relative h-full rounded-xl ${
          isDarkMode ? 'bg-zinc-900' : 'bg-white'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default function StatisticsSection({ isDarkMode }: StatisticsSectionProps) {
  const { t } = useLanguage();
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, margin: '-80px' });

  const gridLineColor = isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)';

  return (
    <motion.section
      className={`relative p-8 md:p-12 rounded-2xl overflow-hidden border ${
        isDarkMode
          ? 'border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950'
          : 'border-zinc-200 bg-gradient-to-br from-zinc-50 to-white'
      }`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${gridLineColor} 1px, transparent 1px), linear-gradient(90deg, ${gridLineColor} 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
        }}
      />

      <motion.div
        className="absolute inset-y-0 w-1/3 pointer-events-none"
        style={{
          background: isDarkMode
            ? 'linear-gradient(90deg, transparent, rgba(52,211,153,0.08), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(5,150,105,0.06), transparent)',
        }}
        animate={{ x: ['-120%', '220%'] }}
        transition={{ duration: 6, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
      />

      <div className="relative flex items-center justify-center gap-3 mb-10">
        <div className="flex space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
        </div>
        <h3
          className={`text-2xl md:text-3xl font-bold text-center font-mono ${
            isDarkMode ? 'text-zinc-200' : 'text-zinc-800'
          }`}
        >
          <span className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}>
            $
          </span>{' '}
          {t('stats.title') || 'By the Numbers'}
        </h3>
      </div>

      <div
        ref={gridRef}
        className="relative grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        style={{ perspective: 800 }}
      >
        {statisticsData.map((stat, index) => {
          const accent = isDarkMode ? stat.dark : stat.light;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24, rotateX: -12 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: 0.08 * index, duration: 0.5, ease: 'easeOut' }}
              style={{ transformPerspective: 800 }}
            >
              <TiltCard className="h-full">
                <GlowBorderCard accent={accent} isDarkMode={isDarkMode}>
                  <div className="p-5 md:p-6 flex flex-col items-center text-center">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                      style={{
                        backgroundColor: isDarkMode ? `${accent}22` : `${accent}18`,
                        color: accent,
                      }}
                    >
                      {stat.icon}
                    </div>

                    <div
                      className="font-mono text-3xl md:text-4xl font-bold tabular-nums"
                      style={{ color: accent }}
                    >
                      <DecodeValue value={stat.value} active={isInView} delay={index * 120} />
                      {stat.suffix}
                    </div>

                    <p
                      className={`mt-3 font-mono text-sm ${
                        isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
                      }`}
                    >
                      {t(`stats.${index}`) || stat.label}
                    </p>
                  </div>
                </GlowBorderCard>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
