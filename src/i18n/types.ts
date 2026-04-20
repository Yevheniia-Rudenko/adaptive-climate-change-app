import { en } from './locales/en';
import { Language } from './config';

// Infer the entire translation tree structure from the English implementation
export type TranslationDictionary = typeof en;

// Utility to deeply make all properties optional
export type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;

// All other language dictionaries will be DeepPartial of TranslationDictionary
export type PartialTranslationDictionary = DeepPartial<TranslationDictionary>;
