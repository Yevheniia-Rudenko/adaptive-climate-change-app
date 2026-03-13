import { createContext, useContext, useRef, ReactNode } from 'react';

type GlossaryHighlightContextType = {
  highlightedTerms: Set<string>;
};

const GlossaryHighlightContext = createContext<GlossaryHighlightContextType | null>(null);

/**
 * Provider that shares a single Set of already-highlighted glossary terms
 * across every <TextWithGlossary> rendered inside it.
 *
 * Tip: give the provider a `key` that changes per page / block so the Set
 * resets whenever the user navigates to a new page within the module.
 */
export function GlossaryHighlightProvider({ children }: { children: ReactNode }) {
  const setRef = useRef(new Set<string>());
  return (
    <GlossaryHighlightContext.Provider value={{ highlightedTerms: setRef.current }}>
      {children}
    </GlossaryHighlightContext.Provider>
  );
}

/**
 * Returns the shared Set if a provider exists, otherwise `null` so the
 * component can fall back to a local Set.
 */
export function useGlossaryHighlight() {
  return useContext(GlossaryHighlightContext);
}
