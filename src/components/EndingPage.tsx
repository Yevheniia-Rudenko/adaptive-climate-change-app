import { Award, Heart, RotateCcw, Home, Sparkles } from 'lucide-react';
import { ModuleProgress } from '../App';
import { useLanguage } from '../contexts/LanguageContext';

type EndingPageProps = {
  progress: ModuleProgress;
  onRestart: () => void;
  onBackToHome: () => void;
};

export function EndingPage({ progress, onRestart, onBackToHome }: EndingPageProps) {
  const completedCount = Object.values(progress).filter(p => p.completed).length;
  const allCompleted = completedCount === 5;
  const { t } = useLanguage();

  const moduleNames: { [key: string]: string } = {
    '1': t.module1,
    '2': t.module2,
    '3': t.module3,
    '4': t.module4,
    '5': t.module5
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-blue-600 via-green-600 to-teal-600 p-8 sm:p-12 text-center text-white">
            <div className="flex justify-center mb-6">
              {allCompleted ? (
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Award size={48} className="text-yellow-300" />
                </div>
              ) : (
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Sparkles size={48} className="text-yellow-300" />
                </div>
              )}
            </div>
            
            <h1 className="text-3xl sm:text-5xl mb-4">
              {allCompleted ? t.congratulations : 'Great Progress!'}
            </h1>
            
            <p className="text-xl sm:text-2xl text-white/90 mb-4">
              {allCompleted 
                ? t.journeyComplete 
                : `${completedCount} / 5 ${t.completedModules}`}
            </p>
            
            <p className="text-white/80 max-w-2xl mx-auto">
              {allCompleted 
                ? t.completedAllModules
                : `Keep going! Every module brings you closer to understanding how you can be part of climate solutions.`}
            </p>
          </div>

          <div className="p-6 sm:p-10">
            {/* Final Reflection */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="text-red-500" size={24} />
                <h2 className="text-gray-900">{t.yourReflections}</h2>
              </div>
              
              <p className="text-gray-700 mb-6">
                Here&apos;s a summary of your journey through the climate systems modules:
              </p>

              <div className="space-y-4">
                {Object.entries(progress).map(([moduleId, data]) => {
                  if (!data.completed) return null;

                  return (
                    <div 
                      key={moduleId}
                      className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white">
                          {moduleId}
                        </div>
                        <h3 className="text-gray-900">{moduleNames[moduleId]}</h3>
                      </div>
                      <div className="ml-11 space-y-3">
                        {Object.entries(data.reflections).map(([key, value]) => {
                          if (!value || !value.trim()) return null;
                          return (
                            <div key={key}>
                              <p className="text-gray-700 italic text-sm">
                                &quot;{value}&quot;
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {allCompleted && (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 mb-8">
                <h3 className="text-gray-900 mb-3">What&apos;s Next?</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 flex-shrink-0 mt-1">✓</span>
                    <span>Share what you&apos;ve learned with friends and family</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 flex-shrink-0 mt-1">✓</span>
                    <span>Look for opportunities to apply systems thinking in your community</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 flex-shrink-0 mt-1">✓</span>
                    <span>Identify your lever of change and take action</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 flex-shrink-0 mt-1">✓</span>
                    <span>Stay informed and engaged with climate solutions</span>
                  </li>
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onBackToHome}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-xl transition-all shadow-lg"
              >
                <Home size={20} />
                <span>{t.backHome}</span>
              </button>
              
              <button
                onClick={onRestart}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors"
              >
                <RotateCcw size={20} />
                <span>{t.restartJourney}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}