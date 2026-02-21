import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../data/translations';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  // Only English is currently available - other translations need to be updated
  const languages: { code: Language; name: string }[] = [
    { code: 'en', name: 'English' },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="p-2 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Select language"
        >
          <Globe className="text-white" size={20} />
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