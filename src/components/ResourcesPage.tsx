import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { BookOpen, FileText, Wrench, PlayCircle, Globe, Users, ExternalLink, ArrowRight, BookText } from 'lucide-react';

type ResourcesPageProps = {
  onBackToHome: () => void;
  onNavigateToGlossary?: () => void;
  onNavigateToCategory?: (categoryId: string) => void;
};

type ResourceCategory = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
};

export function ResourcesPage({ onBackToHome, onNavigateToGlossary, onNavigateToCategory }: ResourcesPageProps) {
  const { t } = useLanguage();

  const categories: ResourceCategory[] = [
    {
      id: 'climate-basics',
      title: 'Climate Basics',
      description: 'Foundational knowledge about climate science and Earth systems.',
      icon: BookOpen,
    },
    {
      id: 'articles-publications',
      title: 'Articles & Publications',
      description: 'Research papers, reports, and in-depth reading materials.',
      icon: FileText,
    },
    {
      id: 'tools-frameworks',
      title: 'Tools & Frameworks',
      description: 'Interactive simulators and analytical tools for climate exploration.',
      icon: Wrench,
    },
    {
      id: 'videos-podcasts',
      title: 'Videos & Podcasts',
      description: 'Engaging multimedia content to learn about climate solutions.',
      icon: PlayCircle,
    },
    {
      id: 'case-studies',
      title: 'Case Studies & Real-World Examples',
      description: 'Practical examples of climate action and their outcomes.',
      icon: Globe,
    },
    {
      id: 'action-participation',
      title: 'Action & Participation',
      description: 'Opportunities to get involved and make a difference.',
      icon: Users,
    },
    {
      id: 'glossary',
      title: 'Glossary',
      description: 'Key terms and definitions for climate and systems thinking concepts.',
      icon: BookText,
    },
    {
      id: 'external-links',
      title: 'External Links',
      description: 'Curated links to trusted climate organizations and resources.',
      icon: ExternalLink,
    },
  ];

  const handleExplore = (categoryId: string) => {
    if (categoryId === 'glossary' && onNavigateToGlossary) {
      onNavigateToGlossary();
      return;
    }
    if (onNavigateToCategory) {
      onNavigateToCategory(categoryId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-6 font-sora">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Button
          onClick={onBackToHome}
          variant="outline"
          className="mb-4 sm:mb-6"
        >
          ← {t.backHome}
        </Button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 md:p-12">
          <h1 className="text-green-600 mb-3 sm:mb-4">{t.resources}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8 sm:mb-10 text-sm sm:text-base max-w-2xl">
            Explore additional resources to deepen your understanding of climate systems 
            and climate action. Select a category to discover curated materials.
          </p>

          {/* Category Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-green-300 dark:hover:border-green-600 border border-gray-200 dark:border-gray-600 transition-all duration-200 flex flex-col"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                    <Icon className="text-green-600 dark:text-green-400" size={24} />
                  </div>

                  {/* Title */}
                  <h3 className="text-gray-900 dark:text-gray-100 font-semibold text-base sm:text-lg mb-2">
                    {category.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">
                    {category.description}
                  </p>

                  {/* Explore Button */}
                  <Button
                    onClick={() => handleExplore(category.id)}
                    variant="outline"
                    className="w-full mt-auto group hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-500 hover:text-green-700 dark:hover:text-green-400"
                  >
                    <span>Explore</span>
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              );
            })}
          </div>

          <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center">
              More categories and resources are being added regularly. Check back for updates!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}