import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Use requestAnimationFrame to ensure this runs after React's render cycle
    // and after the browser has attempted its own scroll restoration
    window.requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }, [pathname]);
  return null;
}
import { IntroPage } from './components/IntroPage';
import { FlexibleModulePage } from './components/FlexibleModulePage';
import { AboutPage } from './components/AboutPage';
import { EducatorsPage } from './components/EducatorsPage';
import { ResourcesPage } from './components/ResourcesPage';
import { GlossaryPage } from './components/GlossaryPage';
import { ResourceCategoryPage } from './components/ResourceCategoryPage';
import { ContributorsPage } from './components/ContributorsPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
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
            <ScrollToTop />
            <Header />

            <Routes>
              <Route path="/" element={<IntroPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/educators" element={<EducatorsPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/resources/:categoryId" element={<ResourceCategoryPageWrapper />} />
              <Route path="/glossary" element={<GlossaryPage />} />
              <Route path="/contributors" element={<ContributorsPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
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

  // Add a key ensuring the component fully remounts when the ID changes
  return <FlexibleModulePage key={id} module={module} moduleId={id} />;
}

function ResourceCategoryPageWrapper() {
  const { categoryId } = useParams();
  const categoryData = categoryId ? resourceCategoriesData[categoryId] : undefined;

  if (!categoryData) return <Navigate to="/resources" replace />;

  return <ResourceCategoryPage category={categoryData} />;
}

export default App;