import { Language } from './config';
import { TranslationDictionary, PartialTranslationDictionary } from './types';
import { en } from './locales/en';
import { es } from './locales/es';
import { de } from './locales/de';

// Utility to recursively merge translated keys with English fallbacks
function deepMerge(base: any, partial: any): any {
  if (!partial) return base;
  if (typeof base !== 'object' || base === null) return partial !== undefined ? partial : base;
  if (Array.isArray(base)) {
    // If it is an array we generally replace it entirely rather than merging elements,
    // assuming the translation provides the full array if it exists.
    return partial !== undefined ? partial : base;
  }

  const result = { ...base };
  for (const key in partial) {
    if (Object.prototype.hasOwnProperty.call(partial, key)) {
      if (typeof partial[key] === 'object' && partial[key] !== null && !Array.isArray(partial[key])) {
        result[key] = deepMerge(base[key], partial[key]);
      } else if (partial[key] !== undefined) {
        result[key] = partial[key];
      }
    }
  }
  return result;
}

const dictionaries: Record<Language, PartialTranslationDictionary> = {
  en, // EN is the full dictionary, but PartialTranslationDictionary accommodates it
  es,
  de,
};

export function getDictionary(lang: Language): TranslationDictionary {
  if (lang === 'en') return en;
  return deepMerge(en, dictionaries[lang]);
}

export * from './config';
export * from './types';
export { en, es, de };
