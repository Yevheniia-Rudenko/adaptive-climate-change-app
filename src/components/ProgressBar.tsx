import { Home, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

type ProgressBarProps = {
  completedCount: number;
  percentComplete: number;
  onNavigateHome: () => void;
};

export function ProgressBar({ completedCount, percentComplete, onNavigateHome }: ProgressBarProps) {
  const { t } = useLanguage();
  
  return (
    <div className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onNavigateHome}
            className="flex-shrink-0 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label={t.backToHome}
          >
            <Home size={24} className="text-gray-700 dark:text-gray-300" />
          </button>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-green-600" />
                <span className="text-sm text-gray-600">
                  {completedCount} / 5 {t.completedModules}
                </span>
              </div>
              <span className="text-sm">{percentComplete}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-green-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${percentComplete}%` }}
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