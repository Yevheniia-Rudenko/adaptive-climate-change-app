import { Home } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

type ProgressBarProps = {
  completedCount: number;
  percentComplete: number;
  onNavigateHome: () => void;
};

export function ProgressBar({ completedCount, percentComplete, onNavigateHome }: ProgressBarProps) {
  const { t } = useLanguage();
  const clampedPercent = Math.max(0, Math.min(100, percentComplete));
  
  return (
    <div className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900 backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateHome}
            className="flex-shrink-0 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label={t.nav.backToHome}
          >
            <Home size={24} className="text-gray-700 dark:text-gray-300" />
          </button>
          
          <div className="flex-1 min-w-0">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-green-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${clampedPercent}%` }}
              />
            </div>
          </div>
          
          <div className="flex-shrink-0">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
}