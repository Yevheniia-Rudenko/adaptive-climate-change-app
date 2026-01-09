import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ModuleStructure } from '../data/moduleStructures';
import { ContentBlock } from './ContentBlock';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';

type FlexibleModulePageProps = {
  module: ModuleStructure;
  moduleId: number;
  onNext: () => void;
  onBack: () => void;
};

export function FlexibleModulePage({ 
  module, 
  moduleId, 
  onNext, 
  onBack 
}: FlexibleModulePageProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 font-sora">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="relative h-40 sm:h-48 md:h-64 overflow-hidden">
            <img 
              src={module.headerImage}
              alt={module.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 md:bottom-6 md:left-6 md:right-6">
              <div className="flex items-center gap-2 mb-1 sm:mb-2">
                <span className="text-white/90 text-xs sm:text-sm uppercase tracking-wider">
                  Module {moduleId} of 5
                </span>
              </div>
              <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                {module.title}
              </h1>
            </div>
          </div>

          <div className="p-4 sm:p-6 md:p-8 lg:p-10">
            {/* Content Blocks */}
            {module.sections.map((block, index) => (
              <ContentBlock
                key={index}
                block={block}
                moduleId={moduleId}
              />
            ))}

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button
                onClick={onBack}
                variant="ghost"
                className="order-2 sm:order-1"
              >
                <ArrowLeft size={18} />
                <span>{t.back}</span>
              </Button>

              <Button
                onClick={onNext}
                className="flex-1 order-1 sm:order-3"
              >
                <span>{t.next}</span>
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}