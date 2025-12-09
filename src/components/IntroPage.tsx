import { ArrowRight, BookOpen, Sprout, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

type IntroPageProps = {
  onStart: () => void;
  onNavigateToModule: (moduleId: number) => void;
  completedCount: number;
  percentComplete: number;
};

export function IntroPage({ onStart, onNavigateToModule, completedCount, percentComplete }: IntroPageProps) {
  const hasProgress = completedCount > 0;
  const { t } = useLanguage();

  const modules = [
    t.module1,
    t.module2,
    t.module3,
    t.module4,
    t.module5
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      {/* Language Switcher - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      <div className="max-w-4xl w-full">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-64 sm:h-80 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1642714388464-9d350c8cff39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aCUyMGNsaW1hdGUlMjBjaGFuZ2V8ZW58MXx8fHwxNzY1MTc1MDY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Earth and climate"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-2 mb-2">
                <Sprout className="text-green-400" size={28} />
                <span className="text-green-400 uppercase tracking-wider">{t.climateEducation}</span>
              </div>
              <h1 className="text-white text-3xl sm:text-5xl">
                {t.mainTitle}
              </h1>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-10">
            <div className="mb-8">
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                {t.introP1}
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                {t.introP2}
              </p>
            </div>

            {/* Progress Indicator */}
            {hasProgress && (
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-700">{t.yourProgress}</span>
                  <span className="text-2xl">{percentComplete}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentComplete}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {completedCount} {t.completedModules.replace('modules', '').trim()} {t.completedModules.includes('of') ? 'of 5' : '/ 5'}
                </p>
              </div>
            )}

            {/* Module List */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="text-blue-600" size={24} />
                <h2 className="text-gray-900">{t.whatYouLearn}</h2>
              </div>
              <div className="grid gap-3">
                {modules.map((module, index) => {
                  const moduleId = index + 1;
                  const isCompleted = completedCount > index;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => onNavigateToModule(moduleId)}
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 hover:shadow-md transition-all cursor-pointer text-left group"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                        {moduleId}
                      </div>
                      <span className="text-gray-800 flex-1 group-hover:text-blue-700 transition-colors">
                        {module}
                      </span>
                      {isCompleted && (
                        <CheckCircle2 className="text-green-600 flex-shrink-0" size={20} />
                      )}
                      <ArrowRight className="text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" size={20} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={onStart}
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 group shadow-lg"
            >
              <span className="text-lg">{hasProgress ? t.continueJourney : t.startJourney}</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}