import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Language, languageNames } from '../data/translations';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 font-sora">
      <Globe className="text-gray-600" size={20} />
      <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
        <SelectTrigger className="w-[160px] bg-white/80 backdrop-blur-sm border-gray-300">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">{languageNames.en}</SelectItem>
          {/* <SelectItem value="es">{languageNames.es}</SelectItem>
          <SelectItem value="ar">{languageNames.ar}</SelectItem>
          <SelectItem value="de">{languageNames.de}</SelectItem>
          <SelectItem value="ru">{languageNames.ru}</SelectItem>
          <SelectItem value="uk">{languageNames.uk}</SelectItem> */}
        </SelectContent>
      </Select>
    </div>
  );
}