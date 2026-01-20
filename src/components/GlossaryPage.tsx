import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { glossary } from '../data/glossary';

type GlossaryPageProps = {
  onBackToHome: () => void;
};

export function GlossaryPage({ onBackToHome }: GlossaryPageProps) {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const entries = useMemo(() => glossary[language] || glossary.en, [language]);

  const filteredTerms = useMemo(() => {
    if (searchTerm.trim() === '') return entries;

    const searchLower = searchTerm.toLowerCase();
    return entries.filter((entry) =>
      entry.term.toLowerCase().includes(searchLower) ||
      entry.definition.toLowerCase().includes(searchLower)
    );
  }, [entries, searchTerm]);

  useEffect(() => {
    setSearchTerm('');
  }, [language]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-6 font-sora">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Button
          onClick={onBackToHome}
          variant="outline"
          className="mb-4 sm:mb-6"
        >
          ← {t.backHome}
        </Button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 md:p-12">
          <h1 className="text-green-600 mb-3 sm:mb-4">{t.glossary}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base">
            {t.exploreTerms}
          </p>

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

          <div className="space-y-4 sm:space-y-6">
            {filteredTerms.length > 0 ? (
              filteredTerms.map((entry) => (
                <div key={entry.term} className="border-b border-gray-200 dark:border-gray-700 pb-4 sm:pb-6 last:border-b-0">
                  <h3 className="text-green-700 mb-2 text-base sm:text-lg">{entry.term}</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{entry.definition}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 sm:py-12 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                {t.noTermsFound}: "{searchTerm}"
              </div>
            )}
          </div>

          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {filteredTerms.length} / {entries.length} {t.termsDisplayed.toLowerCase()}
            </p>
            {searchTerm.trim() !== '' && (
              <button
                className="mt-3 text-sm text-green-700 dark:text-green-300 hover:underline"
                onClick={() => setSearchTerm('')}
              >
                {t.showAllTerms || 'Show all terms'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
