import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { ExternalLink, Video, FileText, Clock, Globe, Wrench, BookOpen, Headphones, ClipboardList } from 'lucide-react';

// Types for resource data
export type ResourceItem = {
  title: string;
  description: string;
  type: 'video' | 'Article' | 'Website' | 'Tool' | 'Case Study' | 'Podcast' | 'Report' ;
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
};

export function ResourceCategoryPage({ category }: ResourceCategoryPageProps) {
  const { t } = useLanguage();
  
  // Get localized content for this category
  // Type assertion handles dynamic lookup safely for our known dictionary
  const localizedContent = t.pages.resourceCategories?.categories?.[category.id as keyof typeof t.pages.resourceCategories.categories];
  const badgeLabels = (t.pages.resourceCategories as any)?.badges ?? {};

  const getTypeLabel = (type: ResourceItem['type']) => {
    if (type === 'video') return badgeLabels.video ?? 'Video';
    if (type === 'Podcast') return badgeLabels.podcast ?? 'Podcast';
    if (type === 'Tool') return badgeLabels.tool ?? 'Tool';
    if (type === 'Website') return badgeLabels.website ?? 'Website';
    if (type === 'Case Study') return badgeLabels.caseStudy ?? 'Case Study';
    if (type === 'Report') return badgeLabels.report ?? 'Report';
    return badgeLabels.article ?? type;
  };

  const getDurationLabel = (duration: string) => {
    const selfPaced = badgeLabels.selfPaced ?? 'Self-paced';
    const minuteAbbr = badgeLabels.min ?? 'min';
    const interactive = badgeLabels.interactive ?? 'Interactive';
    const varies = badgeLabels.varies ?? 'Varies';
    const shortForm = badgeLabels.shortForm ?? 'Short-form';
    const longForm = badgeLabels.longForm ?? 'Long-form';
    const series = badgeLabels.series ?? 'Series';

    const lower = duration.toLowerCase();

    if (lower === 'self-paced') {
      return selfPaced;
    }

    if (lower === 'interactive') return interactive;
    if (lower === 'varies') return varies;
    if (lower === 'short-form') return shortForm;
    if (lower === 'long-form') return longForm;
    if (lower === 'series') return series;

    return duration.replace(/\bmin\b/gi, minuteAbbr);
  };
  
  // Use localized title and description if available, otherwise fallback to base data
  const pageTitle = localizedContent?.title || category.title;
  const pageDescription = localizedContent?.description || category.description;

  return (
    <div className="min-h-screen pt-6 font-sora">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back Navigation */}
        <Link to="/resources">
          <Button
            variant="outline"
            className="mb-4 sm:mb-6 dark:text-gray-100 dark:border-gray-400"
          >
            ← {t.pages.resourceCategories?.backToResources ?? 'Back to Resources'}
          </Button>
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 md:p-12">
          {/* Page Header */}
          <h1 
            className="font-bold text-gray-800 dark:text-gray-100 text-center mb-3 sm:mb-4"
            style={{ fontSize: '2rem', lineHeight: '1.2' }}
          >{pageTitle}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8 sm:mb-10 text-sm sm:text-base max-w-2xl">
            {pageDescription}
          </p>

          {/* Sections */}
          <div className="space-y-16 sm:space-y-20">
            {category.sections.map((section, sectionIndex) => {
              const localizedSection = localizedContent?.sections?.[sectionIndex];
              const sectionTitle = localizedSection?.title || section.title;

              return (
              <div key={section.title}>
                {/* Section Title */}
                <h2 className={`text-gray-900 dark:text-gray-100 text-lg sm:text-xl font-semibold mb-4 sm:mb-6 pb-2 border-b border-gray-200 dark:border-gray-700 ${sectionIndex > 0 ? 'mt-4' : ''}`}>
                  {sectionTitle}
                </h2>

                {/* Resource Items */}
                <div className="space-y-6">
                  {section.items.map((item, itemIndex) => {
                    const localizedItem = localizedSection?.items?.[itemIndex];
                    const itemTitle = localizedItem?.title || item.title;
                    const itemDescription = localizedItem?.description || item.description;

                    return (
                    <div
                      key={item.title}
                      className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 sm:p-5 border border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-600 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          {/* Title */}
                          <h3 className="text-gray-900 dark:text-gray-100 font-medium text-base sm:text-lg mb-1.5">
                            {itemTitle}
                          </h3>

                          {/* Description */}
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                            {itemDescription}
                          </p>

                          {/* Badges */}
                          <div className="flex flex-wrap items-center gap-2">
                            {/* Type Badge */}
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                              item.type === 'video'
                                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                                : item.type === 'Podcast'
                                ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300'
                                : item.type === 'Tool'
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                : item.type === 'Website'
                                ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300'
                                : item.type === 'Case Study'
                                ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                                : item.type === 'Report'
                                ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                                : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                              }`}>
                              {item.type === 'video' ? (
                                <Video size={12} />
                              ) : item.type === 'Podcast' ? (
                                <Headphones size={12} />
                              ) : item.type === 'Tool' ? (
                                <Wrench size={12} />
                              ) : item.type === 'Website' ? (
                                <Globe size={12} />
                              ) : item.type === 'Case Study' ? (
                                <BookOpen size={12} />
                              ) : item.type === 'Report' ? (
                                <ClipboardList size={12} />
                              ) : (
                                <FileText size={12} />
                              )}
                              {getTypeLabel(item.type)}
                            </span>

                            {/* Duration Badge */}
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                              <Clock size={12} />
                              {getDurationLabel(item.duration)}
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
                          <span>{t.pages.resourceCategories?.openLink ?? 'Open'}</span>
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                    );
                  })}
                </div>
              </div>
              );
            })}
          </div>

          {/* Footer Note */}
          <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center">
              {t.pages.resourceCategories?.footerNote ?? 'External links will open in a new tab. We curate these resources for educational purposes.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
