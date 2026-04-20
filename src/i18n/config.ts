export const SUPPORTED_LANGUAGES = ['en', 'es', 'de'] as const;
export type Language = typeof SUPPORTED_LANGUAGES[number];

export const LANGUAGE_NAMES: Record<Language, string> = {
  en: 'English',
  es: 'Español',
  de: 'Deutsch',
};

export const DEFAULT_LANGUAGE: Language = 'en';
