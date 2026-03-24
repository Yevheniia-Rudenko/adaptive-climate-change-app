import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { GlossaryTerm } from './GlossaryTerm';
import { useLanguage } from '../contexts/LanguageContext';
import { useGlossaryHighlight } from '../contexts/GlossaryHighlightContext';
import { glossary, createTermPattern, findDefinition } from '../data/glossary';

type TextWithGlossaryProps = {
  text: string;
  className?: string;
};

export function TextWithGlossary({ text, className }: TextWithGlossaryProps) {
  const { language } = useLanguage();
  const entries = glossary[language];

  // Helper to process bold text, italic text, and links within strings
  const formatText = (inputText: string, keyPrefix: string) => {
    // First, split by links [text](url)
    const linkPattern = /(\[([^\]]+)\]\(([^)]+)\))/g;
    const linkParts = inputText.split(linkPattern);

    return linkParts.map((part, linkIndex) => {
      // Check if this is a link match (every 4th element starting from index 1)
      if (linkIndex % 4 === 1) {
        const linkText = linkParts[linkIndex + 1];
        const linkUrl = linkParts[linkIndex + 2];

        const isExternalLink = /^(https?:\/\/|mailto:|tel:)/i.test(linkUrl);
        const isInternalRoute = linkUrl.startsWith('/');

        if (isInternalRoute) {
          return (
            <Link
              key={`${keyPrefix}-link-${linkIndex}`}
              to={linkUrl}
              className="text-blue-700 dark:text-blue-300 underline decoration-2 underline-offset-2 font-medium hover:text-blue-800 dark:hover:text-blue-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 rounded-sm"
            >
              {linkText}
            </Link>
          );
        }

        if (isExternalLink) {
          return (
            <a
              key={`${keyPrefix}-link-${linkIndex}`}
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 dark:text-blue-300 underline decoration-2 underline-offset-2 font-medium hover:text-blue-800 dark:hover:text-blue-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 rounded-sm"
            >
              {linkText}
            </a>
          );
        }

        return (
          <a
            key={`${keyPrefix}-link-${linkIndex}`}
            href={linkUrl}
            className="text-blue-700 dark:text-blue-300 underline decoration-2 underline-offset-2 font-medium hover:text-blue-800 dark:hover:text-blue-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 rounded-sm"
          >
            {linkText}
          </a>
        );
      }

      // Skip the captured groups (text and url parts)
      if (linkIndex % 4 === 2 || linkIndex % 4 === 3) {
        return null;
      }

      // Process bold and italic in non-link text
      // We use a regex that captures both **bold** and *italic*
      // The regex captures the whole matched string, so we need to inspect it
      const boldItalicParts = part.split(/(\*\*.*?\*\*|\*.*?\*)/g);

      return boldItalicParts.map((subPart, subIndex) => {
        if (!subPart) return null;

        if (subPart.startsWith('**') && subPart.endsWith('**')) {
          return <strong key={`${keyPrefix}-${linkIndex}-${subIndex}`} className="font-bold">{subPart.slice(2, -2)}</strong>;
        } else if (subPart.startsWith('*') && subPart.endsWith('*') && subPart.length > 1) {
          return <em key={`${keyPrefix}-${linkIndex}-${subIndex}`} className="italic">{subPart.slice(1, -1)}</em>;
        }

        return subPart;
      });
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

  // Use the shared module-level set if a provider exists, otherwise local set
  const glossaryCtx = useGlossaryHighlight();
  const highlightedTerms = glossaryCtx?.highlightedTerms ?? new Set<string>();

  // Reset regex lastIndex
  pattern.lastIndex = 0;

  while ((match = pattern.exec(text)) !== null) {
    const matchStart = match.index;
    const matchEnd = pattern.lastIndex;

    const matchedText = match[0];
    const entry = findDefinition(matchedText, entries);

    if (entry) {
      // Normalize term for tracking (lowercase to handle case variations)
      const normalizedTerm = matchedText.toLowerCase();
      const isFirstOccurrence = !highlightedTerms.has(normalizedTerm);

      // Add text before the match
      if (matchStart > lastIndex) {
        const prefix = `text-${keyCounter++}`;
        parts.push(
          <span key={prefix}>
            {formatText(text.substring(lastIndex, matchStart), prefix)}
          </span>
        );
      }

      if (isFirstOccurrence) {
        // First occurrence: highlight as glossary term
        highlightedTerms.add(normalizedTerm);
        parts.push(
          <GlossaryTerm
            key={`term-${keyCounter++}`}
            term={matchedText}
            definition={entry.definition}
          />
        );
      } else {
        // Subsequent occurrence: render as plain formatted text
        const prefix = `plain-${keyCounter++}`;
        parts.push(
          <span key={prefix}>
            {formatText(matchedText, prefix)}
          </span>
        );
      }

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