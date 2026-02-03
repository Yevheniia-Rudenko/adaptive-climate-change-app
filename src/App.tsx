import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { IntroPage } from './components/IntroPage';
import { FlexibleModulePage } from './components/FlexibleModulePage';
import { AboutPage } from './components/AboutPage';
import { EducatorsPage } from './components/EducatorsPage';
import { ResourcesPage } from './components/ResourcesPage';
import { GlossaryPage } from './components/GlossaryPage';
import { ResourceCategoryPage } from './components/ResourceCategoryPage';
import { ContributorsPage } from './components/ContributorsPage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { moduleStructures } from './data/moduleStructures';
import { resourceCategoriesData } from './data/resourceCategories';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter basename="/adaptive-climate-change-app">
          <div className="min-h-screen transition-colors">
            <Header />

            <Routes>
              <Route path="/" element={<IntroPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/educators" element={<EducatorsPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/resources/:categoryId" element={<ResourceCategoryPageWrapper />} />
              <Route path="/glossary" element={<GlossaryPage />} />
              <Route path="/contributors" element={<ContributorsPage />} />
              <Route path="/module/:moduleId" element={<FlexibleModulePageWrapper />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            <Footer />
          </div>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}

// Wrapper components to handle props and params
import { useParams } from 'react-router-dom';

function FlexibleModulePageWrapper() {
  const { moduleId } = useParams();
  const id = parseInt(moduleId || '1', 10);
  const module = moduleStructures[id - 1]; // Arrays are 0-indexed

  if (!module) return <Navigate to="/" replace />;

  return <FlexibleModulePage module={module} moduleId={id} />;
}

function ResourceCategoryPageWrapper() {
  const { categoryId } = useParams();
  const categoryData = categoryId ? resourceCategoriesData[categoryId] : undefined;

  if (!categoryData) return <Navigate to="/resources" replace />;

  return <ResourceCategoryPage category={categoryData} />;
}

export default App;