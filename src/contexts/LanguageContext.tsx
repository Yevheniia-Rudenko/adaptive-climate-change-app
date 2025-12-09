import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Language, translations, Translations } from '../data/translations';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to load from localStorage
    const saved = localStorage.getItem('climateAppLanguage');
    if (saved && ['en', 'es', 'ar', 'de', 'ru', 'uk'].includes(saved)) {
      return saved as Language;
    }
    // Default to English
    return 'en';
  });

  useEffect(() => {
    // Save to localStorage when language changes
    localStorage.setItem('climateAppLanguage', language);
    
    // Set direction for RTL languages
    if (language === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = language;
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = translations[language];

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
