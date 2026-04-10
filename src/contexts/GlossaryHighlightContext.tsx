import { createContext, useContext, useRef, ReactNode } from 'react';

type GlossaryHighlightContextType = {
  highlightedTerms: Map<string, string>;
};

const GlossaryHighlightContext = createContext<GlossaryHighlightContextType | null>(null);

/**
 * Provider that shares a single Map of already-highlighted glossary terms
 * across every <TextWithGlossary> rendered inside it.
 *
 * Tip: give the provider a `key` that changes per page / block so the Map
 * resets whenever the user navigates... wait, actually we want it to persist across the module!
 */
export function GlossaryHighlightProvider({ children }: { children: ReactNode }) {
  const mapRef = useRef(new Map<string, string>());
  return (
    <GlossaryHighlightContext.Provider value={{ highlightedTerms: mapRef.current }}>
      {children}
    </GlossaryHighlightContext.Provider>
  );
}

/**
 * Returns the shared Map if a provider exists, otherwise `null` so the
 * component can fall back to a local Map.
 */
export function useGlossaryHighlight() {
  return useContext(GlossaryHighlightContext);
}
