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
  
  if (!entries || entries.length === 0) {
    return <p className={className}>{text}</p>;
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
        parts.push(
          <span key={`text-${keyCounter++}`}>
            {text.substring(lastIndex, matchStart)}
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
    parts.push(
      <span key={`text-${keyCounter++}`}>
        {text.substring(lastIndex)}
      </span>
    );
  }
  
  return (
    <p className={className}>
      {parts.length > 0 ? parts : text}
    </p>
  );
}