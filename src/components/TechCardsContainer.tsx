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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section id="skills-section" className="scroll-mt-24">
      <h3
        className={`text-2xl md:text-3xl font-bold text-center mb-12 ${
          isDarkMode ? 'text-zinc-200' : 'text-zinc-800'
        }`}
      >
        {t('tech.title') || 'My Tech Stack'}
      </h3>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {skillsData.map((skill, index) => (
          <TechCard
            key={skill.id}
            id={skill.id}
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
