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
  const entries = glossary[language as keyof typeof glossary] || glossary.en;

  // Helper to process bold text, italic text, and links within strings
  const formatText = (inputText: string, keyPrefix: string) => {
    const renderBoldItalic = (segment: string, segmentKeyPrefix: string) => {
      const boldItalicParts = segment.split(/(\*\*.*?\*\*|\*.*?\*)/g);

      return boldItalicParts.map((subPart, subIndex) => {
        if (!subPart) return null;

        if (subPart.startsWith('**') && subPart.endsWith('**')) {
          return (
            <strong
              key={`${segmentKeyPrefix}-bi-${subIndex}`}
              className="font-bold"
            >
              {subPart.slice(2, -2)}
            </strong>
          );
        }

        if (
          subPart.startsWith('*') &&
          subPart.endsWith('*') &&
          subPart.length > 1
        ) {
          return (
            <em key={`${segmentKeyPrefix}-bi-${subIndex}`} className="italic">
              {subPart.slice(1, -1)}
            </em>
          );
        }

        return subPart;
      });
    };

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

      const highlightParts = part.split(/(==.*?==)/g);

      return highlightParts.map((highlightPart, highlightIndex) => {
        if (!highlightPart) return null;

        if (
          highlightPart.startsWith('==') &&
          highlightPart.endsWith('==') &&
          highlightPart.length > 4
        ) {
          const inner = highlightPart.slice(2, -2);
          return (
            <span
              key={`${keyPrefix}-hl-${linkIndex}-${highlightIndex}`}
              className="inline-flex items-baseline rounded-md bg-purple-50 px-2 py-0.5 font-extrabold text-purple-900 shadow-sm border border-purple-200 tabular-nums dark:bg-purple-500 dark:text-white dark:border-gray-600"
            >
              {renderBoldItalic(inner, `${keyPrefix}-hlbi-${linkIndex}-${highlightIndex}`)}
            </span>
          );
        }

        return renderBoldItalic(
          highlightPart,
          `${keyPrefix}-plain-${linkIndex}-${highlightIndex}`
        );
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

  // Use the shared module-level map if a provider exists, otherwise local map
  const glossaryCtx = useGlossaryHighlight();
  const highlightedTermsMap = glossaryCtx?.highlightedTerms ?? new Map<string, string>();
  
  // Track terms we've already highlighted in *this specific* render pass.
  // This prevents highlighting the same term multiple times within the same text block.
  const localRenderSet = new Set<string>();

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
      
      let firstHighlightedText = highlightedTermsMap.get(normalizedTerm);
      if (!firstHighlightedText) {
        firstHighlightedText = text;
        highlightedTermsMap.set(normalizedTerm, text);
      }
      
      const isFirstInModule = firstHighlightedText === text;
      const seenInThisRender = localRenderSet.has(normalizedTerm);
      const isFirstOccurrence = isFirstInModule && !seenInThisRender;

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
        localRenderSet.add(normalizedTerm);
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
