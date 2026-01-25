import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { ArrowLeft, ExternalLink, Video, FileText, Clock } from 'lucide-react';

// Types for resource data
export type ResourceItem = {
  title: string;
  description: string;
  type: 'video' | 'article';
  duration: string;
  url: string;
};

export type ResourceSection = {
  title: string;
  items: ResourceItem[];
};

export type ResourceCategoryData = {
  id: string;
  title: string;
  description: string;
  sections: ResourceSection[];
};

type ResourceCategoryPageProps = {
  category: ResourceCategoryData;
  onBackToResources: () => void;
};

export function ResourceCategoryPage({ category, onBackToResources }: ResourceCategoryPageProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-6 font-sora">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back Navigation */}
        <Button
          onClick={onBackToResources}
          variant="ghost"
          className="mb-4 sm:mb-6 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 -ml-2"
        >
          <ArrowLeft size={18} className="mr-2" />
          {t.backToResources || 'Back to Resources'}
        </Button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 md:p-12">
          {/* Page Header */}
          <h1 className="text-green-600 mb-3 sm:mb-4">{category.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8 sm:mb-10 text-sm sm:text-base max-w-2xl">
            {category.description}
          </p>

          {/* Sections */}
          <div className="space-y-16 sm:space-y-20">
            {category.sections.map((section, index) => (
              <div key={section.title}>
                {/* Section Title */}
                <h2 className={`text-gray-900 dark:text-gray-100 text-lg sm:text-xl font-semibold mb-4 sm:mb-6 pb-2 border-b border-gray-200 dark:border-gray-700 ${index > 0 ? 'mt-4' : ''}`}>
                  {section.title}
                </h2>

                {/* Resource Items */}
                <div className="space-y-6">
                  {section.items.map((item) => (
                    <div
                      key={item.title}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 sm:p-5 border border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-600 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          {/* Title */}
                          <h3 className="text-gray-900 dark:text-gray-100 font-medium text-base sm:text-lg mb-1.5">
                            {item.title}
                          </h3>

                          {/* Description */}
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                            {item.description}
                          </p>

                          {/* Badges */}
                          <div className="flex flex-wrap items-center gap-2">
                            {/* Type Badge */}
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                              item.type === 'video'
                                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                                : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                            }`}>
                              {item.type === 'video' ? (
                                <Video size={12} />
                              ) : (
                                <FileText size={12} />
                              )}
                              {item.type === 'video' ? 'Video' : 'Article'}
                            </span>

                            {/* Duration Badge */}
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300">
                              <Clock size={12} />
                              {item.duration}
                            </span>
                          </div>
                        </div>

                        {/* External Link Button */}
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-green-500 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors text-sm font-medium whitespace-nowrap"
                        >
                          <span>Open</span>
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center">
              External links will open in a new tab. We curate these resources for educational purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
