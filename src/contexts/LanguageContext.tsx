import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Language, getDictionary, TranslationDictionary, DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '../i18n';
import { setUserProperties } from '../utils/analytics';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('climateAppLanguage');
      if (saved && (SUPPORTED_LANGUAGES as readonly string[]).includes(saved)) {
        return saved as Language;
      }
    } catch {
      // ignore storage access errors and fall back to default language
    }
    return DEFAULT_LANGUAGE;
  });

  useEffect(() => {
    // Save to localStorage when language changes
    localStorage.setItem('climateAppLanguage', language);

    // Set direction for RTL languages
    // if (language === 'ar') {
    //   document.documentElement.dir = 'rtl';
    //   document.documentElement.lang = 'ar';
    // } else {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = language;
    // }
    setUserProperties({ language });
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = getDictionary(language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
