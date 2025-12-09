import { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { TermPopup } from './TermPopup';

type GlossaryTermProps = {
  term: string;
  definition: string;
};

export function GlossaryTerm({ term, definition }: GlossaryTermProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: rect.left + rect.width / 2,
      y: rect.bottom + 8
    });
    setIsOpen(true);
  };

  return (
    <>
      <span
        onClick={handleClick}
        className="relative inline-flex items-center gap-1 px-1.5 py-0.5 -mx-1 cursor-pointer rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 transition-all duration-200 border-b-2 border-blue-300 hover:border-blue-500 hover:shadow-sm"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClick(e as any);
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
        position={position}
      />
    </>
  );
}