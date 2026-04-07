import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { BookOpen, FileText, Wrench, PlayCircle, Globe, Users, ExternalLink, ArrowRight, BookText } from 'lucide-react';
import newspaperArticleVideo from '../assets/resources categories/Newspaper Article.mp4';
import toolVideo from '../assets/resources categories/Tool.mp4';
import bookmarksVideoPage from '../assets/resources categories/Bookmarks video page.mp4';

type ResourceCategory = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  video?: string;
};

export function ResourcesPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

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
      video: newspaperArticleVideo,
    },
    {
      id: 'tools-frameworks',
      title: 'Tools & Frameworks',
      description: 'Interactive simulators and analytical tools for climate exploration.',
      icon: Wrench,
      video: toolVideo,
    },
    {
      id: 'videos-podcasts',
      title: 'Videos & Podcasts',
      description: 'Engaging multimedia content to learn about climate solutions.',
      icon: PlayCircle,
      video: bookmarksVideoPage,
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
    if (categoryId === 'glossary') {
      navigate('/glossary');
      return;
    }
    navigate(`/resources/${categoryId}`);
  };

  const playCardVideo = (categoryId: string) => {
    const video = videoRefs.current[categoryId];
    if (!video) return;

    // Restart each hover so the animation is noticeable.
    video.currentTime = 0;
    void video.play().catch(() => {
      // Ignore autoplay/play promise rejections.
    });
  };

  const stopCardVideo = (categoryId: string) => {
    const video = videoRefs.current[categoryId];
    if (!video) return;

    video.pause();
    video.currentTime = 0;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 pt-20 font-sora">
      <div className="max-w-4xl w-full">
        <Link to="/">
          <Button
            variant="outline"
            className="mb-4 sm:mb-6 dark:text-gray-100 dark:border-gray-400"
          >
            ← {t.backHome}
          </Button>
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 md:p-12">
          <h1 
            className="font-bold text-gray-800 dark:text-gray-100 text-center mb-3 sm:mb-4"
            style={{ fontSize: '3rem', lineHeight: '1.2' }}
          >{t.resources}</h1>
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
                  className="bg-white dark:bg-gray-700 rounded-xl p-5 sm:p-6 border border-gray-200 dark:border-gray-600 shadow-sm flex flex-col cursor-pointer"
                  style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(34,197,94,0.25)';
                    e.currentTarget.style.borderColor = '#22c55e';
                    if (category.video) playCardVideo(category.id);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '';
                    e.currentTarget.style.borderColor = '';
                    if (category.video) stopCardVideo(category.id);
                  }}
                >
                  {/* Icon / Video */}
                  {category.video ? (
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 mx-auto overflow-hidden">
                      <video
                        ref={(el) => {
                          videoRefs.current[category.id] = el;
                        }}
                        src={category.video}
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4 mx-auto">
                      <Icon className="text-green-600 dark:text-green-400" size={24} />
                    </div>
                  )}

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