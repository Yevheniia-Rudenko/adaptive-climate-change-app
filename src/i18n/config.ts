export const SUPPORTED_LANGUAGES = ['en'] as const;
export type Language = typeof SUPPORTED_LANGUAGES[number];

export const LANGUAGE_NAMES: Record<Language, string> = {
  en: 'English',
};

export const DEFAULT_LANGUAGE: Language = 'en';
