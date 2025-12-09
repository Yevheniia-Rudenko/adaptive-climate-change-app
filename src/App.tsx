import { useState, useEffect } from 'react';
import { IntroPage } from './components/IntroPage';
import { FlexibleModulePage } from './components/FlexibleModulePage';
import { EndingPage } from './components/EndingPage';
import { ProgressBar } from './components/ProgressBar';
import { moduleStructures } from './data/moduleStructures';
import { LanguageProvider } from './contexts/LanguageContext';

export type ModuleProgress = {
  [key: number]: {
    completed: boolean;
    reflections: { [key: string]: string };
  };
};

function App() {
  const [currentPage, setCurrentPage] = useState<'intro' | number | 'ending'>('intro');
  const [progress, setProgress] = useState<ModuleProgress>(() => {
    try {
      const saved = localStorage.getItem('climateModulesProgress');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Migrate old format to new format if needed
        const migrated: ModuleProgress = {};
        Object.entries(parsed).forEach(([key, value]: [string, any]) => {
          if (value && typeof value === 'object') {
            // Check if old format (has 'reflection' string instead of 'reflections' object)
            if ('reflection' in value && typeof value.reflection === 'string') {
              migrated[Number(key)] = {
                completed: value.completed,
                reflections: { main: value.reflection }
              };
            } else if ('reflections' in value && typeof value.reflections === 'object') {
              // Already in new format
              migrated[Number(key)] = value;
            }
          }
        });
        return migrated;
      }
    } catch (error) {
      // Silent error handling
    }
    return {};
  });

  useEffect(() => {
    try {
      localStorage.setItem('climateModulesProgress', JSON.stringify(progress));
    } catch (error) {
      // Silent error handling
    }
  }, [progress]);

  const completedCount = Object.values(progress).filter(p => p.completed).length;
  const percentComplete = Math.round((completedCount / 5) * 100);

  const handleCompleteModule = (moduleId: number, reflections: { [key: string]: string }) => {
    setProgress(prev => ({
      ...prev,
      [moduleId]: {
        completed: true,
        reflections
      }
    }));
  };

  const handleNavigate = (page: 'intro' | number | 'ending') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setProgress({});
    setCurrentPage('intro');
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-teal-50">
        {currentPage !== 'intro' && currentPage !== 'ending' && (
          <ProgressBar 
            completedCount={completedCount} 
            percentComplete={percentComplete}
            onNavigateHome={() => handleNavigate('intro')}
          />
        )}
        
        {currentPage === 'intro' && (
          <IntroPage 
            onStart={() => handleNavigate(1)}
            onNavigateToModule={(moduleId) => handleNavigate(moduleId)}
            completedCount={completedCount}
            percentComplete={percentComplete}
          />
        )}

        {typeof currentPage === 'number' && (
          <FlexibleModulePage
            module={moduleStructures[currentPage - 1]}
            moduleId={currentPage}
            isCompleted={progress[currentPage]?.completed || false}
            savedReflections={progress[currentPage]?.reflections || {}}
            onComplete={handleCompleteModule}
            onNext={() => {
              if (currentPage < 5) {
                handleNavigate(currentPage + 1);
              } else {
                handleNavigate('ending');
              }
            }}
            onBack={() => {
              if (currentPage > 1) {
                handleNavigate(currentPage - 1);
              } else {
                handleNavigate('intro');
              }
            }}
          />
        )}

        {currentPage === 'ending' && (
          <EndingPage
            progress={progress}
            onRestart={handleReset}
            onBackToHome={() => handleNavigate('intro')}
          />
        )}
      </div>
    </LanguageProvider>
  );
}

export default App;