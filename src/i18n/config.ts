export const SUPPORTED_LANGUAGES = ['en', 'es', 'de', 'tr', 'ru', 'uk', 'da', 'ar'] as const;
export type Language = typeof SUPPORTED_LANGUAGES[number];

export const LANGUAGE_NAMES: Record<Language, string> = {
  en: 'English',
  es: 'Español',
  de: 'Deutsch',
  tr: 'Türkçe',
  ru: 'Русский',
  uk: 'Українська',
  da: 'Dansk',
  ar: 'العربية',
};

export const DEFAULT_LANGUAGE: Language = 'en';
