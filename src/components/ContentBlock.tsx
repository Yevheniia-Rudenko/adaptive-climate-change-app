import { Play, BookOpen, Sparkles } from 'lucide-react';
import { ContentBlock as ContentBlockType } from '../data/moduleStructures';
import { InteractiveDashboard } from './InteractiveDashboard';
import { useLanguage } from '../contexts/LanguageContext';
import { TextWithGlossary } from './TextWithGlossary';

type ContentBlockProps = {
  block: ContentBlockType;
  moduleId: number;
  reflection?: string;
  onReflectionChange?: (id: string, value: string) => void;
  isCompleted?: boolean;
};

export function ContentBlock({ 
  block, 
  moduleId, 
  reflection, 
  onReflectionChange,
  isCompleted 
}: ContentBlockProps) {
  const { t } = useLanguage();
  
  switch (block.type) {
    case 'text':
      return (
        <div className="mb-8">
          {block.title && (
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="text-blue-600" size={24} />
              <h2 className="text-gray-900">{block.title}</h2>
            </div>
          )}
          <TextWithGlossary 
            text={block.content}
            className="text-gray-700 text-lg leading-relaxed"
          />
        </div>
      );

    case 'video':
      return (
        <div className="mb-8">
          {block.title && (
            <div className="flex items-center gap-2 mb-4">
              <Play className="text-blue-600" size={24} />
              <h2 className="text-gray-900">{block.title}</h2>
            </div>
          )}
          {block.description && (
            <p className="text-gray-600 mb-4">{block.description}</p>
          )}
          <div className="relative rounded-2xl overflow-hidden bg-gray-900 aspect-video shadow-lg">
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
        <div className="mb-8">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img 
              src={block.imageUrl} 
              alt={block.alt}
              className="w-full h-auto"
            />
          </div>
        </div>
      );

    case 'dashboard':
      return <InteractiveDashboard moduleId={moduleId} />;

    case 'reflection':
      const reflectionValue = reflection || '';
      return (
        <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6 sm:p-8 mb-8">
          <h3 className="text-gray-900 mb-3">{t.reflection}</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            {block.prompt}
          </p>
          <textarea
            value={reflectionValue}
            onChange={(e) => onReflectionChange?.(block.id, e.target.value)}
            placeholder={t.typeYourThoughts}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none min-h-[120px] resize-y bg-white"
            disabled={isCompleted}
          />
          {!isCompleted && (
            <p className="text-sm text-gray-600 mt-2">
              Take a moment to reflect on your emotions and thoughts.
            </p>
          )}
        </div>
      );

    case 'meditation':
      return (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 sm:p-8 mb-8 border-2 border-purple-200">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-purple-600" size={24} />
            <h3 className="text-gray-900">{block.title}</h3>
          </div>
          <TextWithGlossary 
            text={block.content}
            className="text-gray-700 leading-relaxed italic"
          />
        </div>
      );

    default:
      return null;
  }
}