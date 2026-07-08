import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaDiscord } from 'react-icons/fa';
import { FiMessageCircle, FiX } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';
import { getWhatsappUrl, DISCORD_INVITE_URL } from '@/data/contact';

interface ContactGooeyMenuProps {
  isDarkMode: boolean;
}

export default function ContactGooeyMenu({ isDarkMode }: ContactGooeyMenuProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const whatsappUrl = getWhatsappUrl(t('contact.whatsappMessage'));

  const satellites = [
    {
      key: 'discord',
      href: DISCORD_INVITE_URL,
      label: t('contact.discord'),
      bg: '#5865F2',
      icon: <FaDiscord size={22} />,
      offset: -136,
    },
    {
      key: 'whatsapp',
      href: whatsappUrl,
      label: t('contact.whatsapp'),
      bg: '#25D366',
      icon: <FaWhatsapp size={24} />,
      offset: -72,
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="contact-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className="group relative w-14 h-14">
        <div
          className={`absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none ${
            isDarkMode ? 'bg-emerald-400' : 'bg-emerald-500'
          }`}
        />

        <div className="relative w-14 h-14" style={{ filter: 'url(#contact-goo)' }}>
          {satellites.map((sat) => (
            <motion.a
              key={sat.key}
              href={sat.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={sat.label}
              className="absolute inset-0 flex items-center justify-center w-14 h-14 rounded-full text-white shadow-lg cursor-pointer"
              style={{ backgroundColor: sat.bg, pointerEvents: isOpen ? 'auto' : 'none' }}
              initial={false}
              animate={
                isOpen
                  ? { y: sat.offset, scale: 1, opacity: 1 }
                  : { y: 0, scale: 0.4, opacity: 0 }
              }
              whileHover={{ scale: isOpen ? 1.1 : 0.4 }}
              whileTap={{ scale: isOpen ? 0.95 : 0.4 }}
              transition={{
                y: { type: 'spring', stiffness: 260, damping: 20 },
                scale: { type: 'spring', stiffness: 260, damping: 20 },
                opacity: isOpen ? { duration: 0.12 } : { duration: 0.12, delay: 0.2 },
              }}
            >
              {sat.icon}
            </motion.a>
          ))}

          <motion.button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={t('contact.label')}
            aria-expanded={isOpen}
            className={`absolute inset-0 flex items-center justify-center w-14 h-14 rounded-full text-white shadow-xl bg-gradient-to-br cursor-pointer ${
              isDarkMode ? 'from-emerald-400 to-blue-500' : 'from-emerald-600 to-blue-600'
            }`}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <FiX size={24} />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <FiMessageCircle size={24} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen &&
          satellites.map((sat) => (
            <motion.a
              key={`${sat.key}-label`}
              href={sat.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 10, y: 0 }}
              animate={{ opacity: 1, x: 0, y: sat.offset }}
              exit={{ opacity: 0, x: 10, y: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className={`absolute bottom-7 right-16 flex items-center px-3 py-1.5 rounded-md text-xs font-mono whitespace-nowrap shadow-md pointer-events-auto ${
                isDarkMode ? 'bg-zinc-800 text-zinc-200' : 'bg-white text-zinc-700'
              }`}
            >
              {sat.label}
            </motion.a>
          ))}
      </AnimatePresence>
    </div>
  );
}
