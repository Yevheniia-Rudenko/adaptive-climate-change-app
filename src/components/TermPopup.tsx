import { useEffect } from 'react';
import { X, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

type TermPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  term: string;
  definition: string;
};

export function TermPopup({ isOpen, onClose, term, definition }: TermPopupProps) {
  const { t } = useLanguage();

  const renderFormattedDefinition = (text: string) => {
    return text.split(/(https?:\/\/[^\s]+)/g).map((part, i) => {
      if (/(https?:\/\/[^\s]+)/.test(part)) {
        return (
          <a key={`url-${i}`} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
            {part}
          </a>
        );
      }

      return part.split(/(\*[^*]+\*)/g).map((segment, j) => {
        if (/^\*[^*]+\*$/.test(segment)) {
          return <em key={`em-${i}-${j}`}>{segment.slice(1, -1)}</em>;
        }
        return <span key={`txt-${i}-${j}`}>{segment}</span>;
      });
    });
  };
  
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

          {/* Popup container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: 'spring', duration: 0.3 }}
              role="dialog"
              aria-modal="true"
              className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-blue-200 dark:border-blue-700 p-5 sm:p-6 max-h-[85vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4 gap-2 flex-shrink-0">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <BookOpen className="text-blue-600 flex-shrink-0" size={24} />
                  <h3 className="text-blue-900 dark:text-blue-200 truncate">{term}</h3>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex-shrink-0"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Definition */}
              <div className="min-h-0 overflow-y-auto">
                <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-700/50">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-left break-words">
                    {renderFormattedDefinition(definition)}
                  </p>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="mt-4 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex-shrink-0"
              >
                {t.gotIt}
              </button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}