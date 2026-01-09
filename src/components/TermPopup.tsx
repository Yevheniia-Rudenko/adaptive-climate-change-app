import { useEffect } from 'react';
import { X, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

type TermPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  term: string;
  definition: string;
  position: { x: number; y: number };
};

export function TermPopup({ isOpen, onClose, term, definition, position }: TermPopupProps) {
  const { t } = useLanguage();
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="fixed z-50 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-blue-200 dark:border-blue-700 max-w-md w-[90vw] sm:w-[85vw] p-5 sm:p-6"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4 gap-2">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <BookOpen className="text-blue-600 flex-shrink-0" size={24} />
                <h3 className="text-blue-900 truncate">{term}</h3>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg flex-shrink-0"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Definition */}
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-4 border border-blue-100">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-left">{definition}</p>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="mt-4 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              {t.gotIt}
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}