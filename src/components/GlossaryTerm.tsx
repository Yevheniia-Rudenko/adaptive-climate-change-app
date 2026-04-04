import { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { TermPopup } from './TermPopup';
import { trackEvent } from '../utils/analytics';

type GlossaryTermProps = {
  term: string;
  definition: string;
};

export function GlossaryTerm({ term, definition }: GlossaryTermProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    trackEvent('glossary_click', { term });
    setIsOpen(true);
  };

  return (
    <>
      <span
        onClick={handleClick}
        className="relative inline-flex items-center gap-1 px-1.5 py-0.5 -mx-1 cursor-pointer rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/50 hover:text-blue-900 dark:hover:text-blue-100 transition-all duration-200 border-b-2 border-blue-300 dark:border-blue-600 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-sm"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        aria-label="Show definition"
      >
        {term}
        <HelpCircle size={13} className="inline-block opacity-60 hover:opacity-80 flex-shrink-0 transition-opacity" />
      </span>
      
      <TermPopup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        term={term}
        definition={definition}
      />
    </>
  );
}