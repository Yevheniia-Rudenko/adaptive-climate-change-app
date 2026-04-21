import { useLanguage } from '../contexts/LanguageContext';
import { LANGUAGE_NAMES, SUPPORTED_LANGUAGES } from '../i18n';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const activeLanguageLabel = language.toUpperCase();

  const languages = SUPPORTED_LANGUAGES.map(code => ({
    code,
    name: LANGUAGE_NAMES[code],
  }));

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="px-3 py-1.5 rounded-full border border-gray-300 dark:border-gray-600 text-xs font-semibold tracking-wide text-gray-900 dark:text-gray-100 hover:bg-white/20 dark:hover:bg-gray-700 hover:opacity-80 transition-opacity duration-200 cursor-pointer"
          aria-label="Select language"
        >
          {activeLanguageLabel}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-2" align="end">
        <div className="flex flex-col gap-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                language === lang.code
                  ? 'bg-primary/15 text-primary font-medium'
                  : 'hover:bg-muted'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}