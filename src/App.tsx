import { useState } from 'react';
import { IntroPage } from './components/IntroPage';
import { FlexibleModulePage } from './components/FlexibleModulePage';
import { AboutPage } from './components/AboutPage';
import { EducatorsPage } from './components/EducatorsPage';
import { ResourcesPage } from './components/ResourcesPage';
import { GlossaryPage } from './components/GlossaryPage';
import { ResourceCategoryPage } from './components/ResourceCategoryPage';
import { Header } from './components/Header';
import { moduleStructures } from './data/moduleStructures';
import { resourceCategoriesData } from './data/resourceCategories';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [currentPage, setCurrentPage] = useState<'intro' | number | 'about' | 'educators' | 'resources' | 'glossary' | 'ending' | `resources/${string}`>('intro');

  const handleNavigate = (page: 'intro' | number | 'about' | 'educators' | 'resources' | 'glossary' | 'ending' | `resources/${string}`) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
          <Header onNavigate={handleNavigate} currentPage={currentPage} />
          
          {currentPage === 'intro' && (
            <IntroPage 
              onStart={() => handleNavigate(1)}
              onNavigateToModule={(moduleId) => handleNavigate(moduleId)}
            />
          )}

          {typeof currentPage === 'number' && (
            <FlexibleModulePage
              module={moduleStructures[currentPage - 1]}
              moduleId={currentPage}
              onNext={() => {
                if (currentPage < 5) {
                  handleNavigate(currentPage + 1);
                } else {
                  handleNavigate('intro');
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

          {currentPage === 'about' && (
            <AboutPage
              onBackToHome={() => handleNavigate('intro')}
            />
          )}

          {currentPage === 'educators' && (
            <EducatorsPage
              onBackToHome={() => handleNavigate('intro')}
            />
          )}

          {currentPage === 'resources' && (
            <ResourcesPage
              onBackToHome={() => handleNavigate('intro')}
              onNavigateToGlossary={() => handleNavigate('glossary')}
              onNavigateToCategory={(categoryId) => handleNavigate(`resources/${categoryId}`)}
            />
          )}

          {currentPage === 'glossary' && (
            <GlossaryPage
              onBackToHome={() => handleNavigate('intro')}
            />
          )}

          {typeof currentPage === 'string' && currentPage.startsWith('resources/') && (() => {
            const categoryId = currentPage.replace('resources/', '');
            const categoryData = resourceCategoriesData[categoryId];
            if (categoryData) {
              return (
                <ResourceCategoryPage
                  category={categoryData}
                  onBackToResources={() => handleNavigate('resources')}
                />
              );
            }
            return null;
          })()}
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;