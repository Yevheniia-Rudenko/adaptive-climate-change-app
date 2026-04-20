import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { BookOpen, FileText, Wrench, PlayCircle, Globe, Users, ExternalLink, ArrowRight, BookText } from 'lucide-react';

type ResourceCategory = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
};

export function ResourcesPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const categories: ResourceCategory[] = [
    {
      id: 'climate-basics',
      title: t.pages.resources.categories.climateBasics.title,
      description: t.pages.resources.categories.climateBasics.description,
      icon: BookOpen,
    },
    {
      id: 'articles-publications',
      title: t.pages.resources.categories.articlesPublications.title,
      description: t.pages.resources.categories.articlesPublications.description,
      icon: FileText,
    },
    {
      id: 'tools-frameworks',
      title: t.pages.resources.categories.toolsFrameworks.title,
      description: t.pages.resources.categories.toolsFrameworks.description,
      icon: Wrench,
    },
    {
      id: 'videos-podcasts',
      title: t.pages.resources.categories.videosPodcasts.title,
      description: t.pages.resources.categories.videosPodcasts.description,
      icon: PlayCircle,
    },
    {
      id: 'case-studies',
      title: t.pages.resources.categories.caseStudies.title,
      description: t.pages.resources.categories.caseStudies.description,
      icon: Globe,
    },
    {
      id: 'action-participation',
      title: t.pages.resources.categories.actionParticipation.title,
      description: t.pages.resources.categories.actionParticipation.description,
      icon: Users,
    },
    {
      id: 'glossary',
      title: t.pages.resources.categories.glossary.title,
      description: t.pages.resources.categories.glossary.description,
      icon: BookText,
    },
    {
      id: 'learning-opportunities',
      title: t.pages.resources.categories.learningOpportunities.title,
      description: t.pages.resources.categories.learningOpportunities.description,
      icon: ExternalLink,
    },
  ];

  const handleExplore = (categoryId: string) => {
    if (categoryId === 'glossary') {
      navigate('/glossary');
      return;
    }
    navigate(`/resources/${categoryId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 pt-20 font-sora">
      <div className="max-w-4xl w-full">
        <Link to="/">
          <Button
            variant="outline"
            className="mb-4 sm:mb-6 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-500 dark:hover:bg-gray-600"
          >
            ← {t.nav.backToHome}
          </Button>
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 md:p-12">
          <h1 
            className="font-bold text-gray-800 dark:text-gray-100 text-center mb-3 sm:mb-4"
            style={{ fontSize: '3rem', lineHeight: '1.2' }}
          >{t.pages.resources.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8 sm:mb-10 text-sm sm:text-base max-w-2xl">
            {t.pages.resources.description}
          </p>

          {/* Category Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  className="bg-white dark:bg-gray-700 rounded-xl p-5 sm:p-6 border border-gray-200 dark:border-gray-600 shadow-sm flex flex-col cursor-pointer"
                  style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(34,197,94,0.25)';
                    e.currentTarget.style.borderColor = '#22c55e';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '';
                    e.currentTarget.style.borderColor = '';
                  }}
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4 mx-auto">
                    <Icon className="text-green-600 dark:text-green-400" size={24} />
                  </div>

                  {/* Title */}
                  <h3 className="text-green-600 dark:text-green-400 font-semibold text-base sm:text-xl text-center mb-2">
                    {category.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 text-center flex-grow">
                    {category.description}
                  </p>

                  {/* Explore Button */}
                  <Button
                    onClick={() => handleExplore(category.id)}
                    variant="outline"
                    className="w-full mt-auto group hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-500 hover:text-green-700 dark:hover:text-green-400"
                  >
                    <span>{t.pages.resources.explore}</span>
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              );
            })}
          </div>

          <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center">
              {t.pages.resources.footerNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}