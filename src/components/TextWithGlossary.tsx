import { ReactNode } from 'react';
import { GlossaryTerm } from './GlossaryTerm';
import { useLanguage } from '../contexts/LanguageContext';
import { glossary, createTermPattern, findDefinition } from '../data/glossary';

type TextWithGlossaryProps = {
  text: string;
  className?: string;
};

export function TextWithGlossary({ text, className }: TextWithGlossaryProps) {
  const { language } = useLanguage();
  const entries = glossary[language];

  // Helper to process bold text within strings
  const formatText = (inputText: string, keyPrefix: string) => {
    const parts = inputText.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={`${keyPrefix}-${index}`} className="font-bold text-gray-900 dark:text-gray-100">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  if (!entries || entries.length === 0) {
    return <p className={className}>{formatText(text, 'simple')}</p>;
  }

  const pattern = createTermPattern(entries);
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let keyCounter = 0;

  // Reset regex lastIndex
  pattern.lastIndex = 0;

  while ((match = pattern.exec(text)) !== null) {
    const matchStart = match.index;
    const matchEnd = pattern.lastIndex;

    const matchedText = match[0];
    const entry = findDefinition(matchedText, entries);

    if (entry) {
      // Add text before the match
      if (matchStart > lastIndex) {
        const prefix = `text-${keyCounter++}`;
        parts.push(
          <span key={prefix}>
            {formatText(text.substring(lastIndex, matchStart), prefix)}
          </span>
        );
      }

      // Add the glossary term
      parts.push(
        <GlossaryTerm
          key={`term-${keyCounter++}`}
          term={matchedText}
          definition={entry.definition}
        />
      );

      lastIndex = matchEnd;
    }
  }

  // Add remaining text after the last match
  if (lastIndex < text.length) {
    const prefix = `text-${keyCounter++}`;
    parts.push(
      <span key={prefix}>
        {formatText(text.substring(lastIndex), prefix)}
      </span>
    );
  }

  return (
    <p className={className}>
      {parts.length > 0 ? parts : formatText(text, 'fallback')}
    </p>
  );
}