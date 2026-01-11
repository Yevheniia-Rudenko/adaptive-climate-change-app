import { Play, BookOpen, Sparkles } from 'lucide-react';
import { ContentBlock as ContentBlockType } from '../data/moduleStructures';
import { InteractiveDashboard } from './InteractiveDashboard';
import { useLanguage } from '../contexts/LanguageContext';
import { TextWithGlossary } from './TextWithGlossary';
import EnRoadsDashboard from './EnRoadsDashboard';
import SecondExerciseDashboard from './2ndExerciseDashboard';
import ThirdExerciseDashboard from './ThirdExerciseDashboard';
import FourthExerciseDashboard from './FourthExerciseDashboard' ;

type ContentBlockProps = {
  block: ContentBlockType;
  moduleId: number;
};

export function ContentBlock({ 
  block, 
  moduleId
}: ContentBlockProps) {
  const { t } = useLanguage();
  
  switch (block.type) {
    case 'text':
      return (
        <div className="mb-6 sm:mb-8 font-sora">
          {block.title && (
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <BookOpen className="text-blue-600 dark:text-blue-400 flex-shrink-0" size={20} />
              <h2 className="text-gray-900 dark:text-gray-100 text-base sm:text-lg md:text-xl">{block.title}</h2>
            </div>
          )}
          <TextWithGlossary 
            text={block.content}
            className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed"
          />
        </div>
      );

    case 'video':
      return (
        <div className="mb-6 sm:mb-8">
          {block.title && (
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Play className="text-blue-600 dark:text-blue-400 flex-shrink-0" size={20} />
              <h2 className="text-gray-900 dark:text-gray-100 text-base sm:text-lg md:text-xl">{block.title}</h2>
            </div>
          )}
          {block.description && (
            <p className="text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">{block.description}</p>
          )}
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-gray-900 aspect-video shadow-lg">
            <iframe
              src={block.videoUrl}
              title={block.title || 'Video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      );

    case 'image':
      return (
        <div className="mb-6 sm:mb-8">
          <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
            <img 
              src={block.imageUrl} 
              alt={block.alt}
              className="w-full h-auto"
            />
          </div>
        </div>
      );

    case 'dashboard':
      return moduleId === 1 ? <EnRoadsDashboard /> : <InteractiveDashboard moduleId={moduleId} />;

    case '2ndExerciseDashboard':
      return <SecondExerciseDashboard />;

    case 'third-exercise':
      return <ThirdExerciseDashboard />;

    case 'fourth-exercise':
      return <FourthExerciseDashboard />;

    case 'reflection':
      return (
        <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
          <h3 className="text-gray-900 dark:text-gray-100 mb-2 sm:mb-3 text-base sm:text-lg">{t.reflection}</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
            {block.prompt}
          </p>
          <textarea
            placeholder={t.typeYourThoughts}
            className="w-full p-3 sm:p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none min-h-[100px] sm:min-h-[120px] resize-y bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm sm:text-base"
          />
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">
            Take a moment to reflect on your emotions and thoughts.
          </p>
        </div>
      );

    case 'meditation':
      return (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Sparkles className="text-purple-600 dark:text-purple-400 flex-shrink-0" size={20} />
            <h3 className="text-gray-900 dark:text-gray-100 text-base sm:text-lg">{t.guidedReflection}</h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-sm sm:text-base">
            {block.content}
          </p>
        </div>
      );

    default:
      return null;
  }
}