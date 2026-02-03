import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useState, useMemo, useRef } from 'react';
import { glossary } from '../data/glossary';

export function GlossaryPage() {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const entries = useMemo(() => glossary[language] || glossary.en, [language]);

  const filteredTerms = useMemo(() => {
    if (searchTerm.trim() === '') return entries;

    const searchLower = searchTerm.toLowerCase();
    return entries.filter(entry =>
      entry.term.toLowerCase().includes(searchLower) ||
      entry.definition.toLowerCase().includes(searchLower)
    );
  }, [entries, searchTerm]);

  // Group terms by first letter
  const groupedTerms = useMemo(() => {
    const groups: { [key: string]: typeof filteredTerms } = {};
    filteredTerms.forEach(entry => {
      const firstLetter = entry.term.charAt(0).toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(entry);
    });
    return groups;
  }, [filteredTerms]);

  // Get available letters from all entries (not filtered)
  const allLetters = useMemo(() => {
    const letters = new Set<string>();
    entries.forEach(entry => {
      letters.add(entry.term.charAt(0).toUpperCase());
    });
    return Array.from(letters).sort();
  }, [entries]);

  // Get letters that have results in current filter
  const availableLetters = useMemo(() => {
    return new Set(Object.keys(groupedTerms));
  }, [groupedTerms]);

  const scrollToLetter = (letter: string) => {
    if (sectionRefs.current[letter]) {
      sectionRefs.current[letter]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-6 font-sora">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link to="/">
          <Button
            variant="outline"
            className="mb-4 sm:mb-6"
          >
            ← {t.backHome}
          </Button>
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 md:p-12">
          <h1 className="text-green-600 mb-6 sm:mb-8">{t.glossary}</h1>

          <div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base">
              {t.exploreTerms}
            </p>

            {/* Search Box */}
            <div className="relative mb-6 sm:mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
              <input
                type="text"
                placeholder={t.searchTerms}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              />
            </div>

            {/* Alphabet Navigation */}
            <div className="flex flex-wrap gap-1 sm:gap-2 mb-6 sm:mb-8 p-3 sm:p-4 bg-gray-100 dark:bg-gray-700/50 rounded-xl">
              {allLetters.map((letter) => {
                const isAvailable = availableLetters.has(letter);
                return (
                  <button
                    key={letter}
                    onClick={() => isAvailable && scrollToLetter(letter)}
                    disabled={!isAvailable}
                    className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${
                      isAvailable
                        ? 'bg-white dark:bg-gray-600 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-300 shadow-sm cursor-pointer'
                        : 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    }`}
                    className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${isAvailable
                        ? 'bg-white dark:bg-gray-600 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-300 shadow-sm cursor-pointer'
                        : 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      }`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>

            {/* Terms List - Grouped by Letter */}
            <div className="space-y-8 sm:space-y-10">
              {filteredTerms.length > 0 ? (
                Object.keys(groupedTerms).sort().map((letter) => (
                  <div 
                    key={letter} 
                  <div
                    key={letter}
                    ref={(el) => { sectionRefs.current[letter] = el; }}
                    className="scroll-mt-4"
                  >
                    {/* Letter Header */}
                    <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 py-2 mb-4">
                      <h2 className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 border-b-2 border-green-200 dark:border-green-800 pb-2">
                        {letter}
                      </h2>
                    </div>
                    

                    {/* Terms for this letter */}
                    <div className="space-y-4 sm:space-y-6">
                      {groupedTerms[letter].map((entry) => (
                        <div key={entry.term} className="border-b border-gray-200 dark:border-gray-700 pb-4 sm:pb-6 last:border-b-0">
                          <h3 className="text-green-700 dark:text-green-500 mb-2 text-base sm:text-lg font-medium">{entry.term}</h3>
                          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{entry.definition}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 sm:py-12 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                  {t.noTermsFound}: &quot;{searchTerm}&quot;
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center">
                {filteredTerms.length} / {entries.length} {t.termsDisplayed.toLowerCase()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
