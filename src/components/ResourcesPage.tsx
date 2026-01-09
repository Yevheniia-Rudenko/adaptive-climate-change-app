import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { ExternalLink, BookOpen, Video, Globe, FileText } from 'lucide-react';

type ResourcesPageProps = {
  onBackToHome: () => void;
};

export function ResourcesPage({ onBackToHome }: ResourcesPageProps) {
  const { t } = useLanguage();

  const resources = [
    {
      category: 'Climate Science',
      icon: BookOpen,
      items: [
        {
          title: 'IPCC Reports',
          description: 'Comprehensive assessment reports on climate change from the Intergovernmental Panel on Climate Change',
          url: 'https://www.ipcc.ch/reports/'
        },
        {
          title: 'NASA Climate',
          description: 'Scientific data and information about Earth\'s changing climate',
          url: 'https://climate.nasa.gov/'
        }
      ]
    },
    {
      category: 'Interactive Tools',
      icon: Globe,
      items: [
        {
          title: 'En-ROADS Climate Simulator',
          description: 'Interactive tool to explore climate solutions and their impacts',
          url: 'https://en-roads.climateinteractive.org/'
        },
        {
          title: 'Climate Action Tracker',
          description: 'Independent analysis tracking climate action and commitments',
          url: 'https://climateactiontracker.org/'
        }
      ]
    },
    {
      category: 'Educational Videos',
      icon: Video,
      items: [
        {
          title: 'Systems Thinking and Climate',
          description: 'Introduction to systems thinking approaches for climate solutions',
          url: 'https://www.climateinteractive.org/programs/world-climate/'
        }
      ]
    },
    {
      category: 'Reports & Publications',
      icon: FileText,
      items: [
        {
          title: 'Project Drawdown',
          description: 'Comprehensive review of climate solutions and their potential impact',
          url: 'https://drawdown.org/'
        },
        {
          title: 'UNEP Emissions Gap Report',
          description: 'Annual assessment of global emissions and climate commitments',
          url: 'https://www.unep.org/emissions-gap-report-2023'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-6 font-sora">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Button
          onClick={onBackToHome}
          variant="outline"
          className="mb-4 sm:mb-6"
        >
          ← {t.backHome}
        </Button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 md:p-12">
          <h1 className="text-green-600 mb-3 sm:mb-4">{t.resources}</h1>
          <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
            Explore additional resources to deepen your understanding of climate systems 
            and climate action.
          </p>

          <div className="space-y-6 sm:space-y-8">
            {resources.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.category} className="border-b border-gray-200 pb-6 sm:pb-8 last:border-b-0">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <Icon className="text-green-600 flex-shrink-0" size={20} />
                    <h2 className="text-green-700 text-base sm:text-lg">{category.category}</h2>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {category.items.map((item) => (
                      <a
                        key={item.title}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                      >
                        <div className="flex items-start justify-between gap-3 sm:gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-gray-900 dark:text-gray-100 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors mb-1 text-sm sm:text-base">
                              {item.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">{item.description}</p>
                          </div>
                          <ExternalLink className="text-gray-400 dark:text-gray-500 group-hover:text-green-600 dark:group-hover:text-green-400 flex-shrink-0" size={18} />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              <strong>Note:</strong> External links will open in a new tab. We are not responsible 
              for the content on external websites.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}