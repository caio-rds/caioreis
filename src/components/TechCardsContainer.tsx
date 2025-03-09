'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import TechCard from '@/components/TechCard';
import skillsData from '@/data/skillsData';

interface TechCardsContainerProps {
  isDarkMode: boolean;
}

export default function TechCardsContainer({
  isDarkMode,
}: TechCardsContainerProps) {
  const { t } = useLanguage();

  // Card container animation
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
      <motion.h3
        className={`text-2xl md:text-3xl font-bold text-center mb-12 ${
          isDarkMode ? 'text-zinc-200' : 'text-zinc-800'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.25 }}
      >
        {t('tech.title') || 'My Tech Stack'}
      </motion.h3>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {skillsData.map((skill, index) => (
          <TechCard
            key={skill.id}
            id={skill.id}
            icon=""
            title={
              t(`tech.${skill.id}.title`) ||
              skill.id.charAt(0).toUpperCase() + skill.id.slice(1)
            }
            description={
              t(`tech.${skill.id}.description`) || 'Lorem ipsum dolor sit amet'
            }
            color={skill.color}
            darkColor={skill.darkColor}
            percentage={skill.percentage}
            isDarkMode={isDarkMode}
            index={index}
          />
        ))}
      </motion.div>
    </section>
  );
}
