import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ModuleStructure } from '../data/moduleStructures';
import { ContentBlock } from './ContentBlock';
import { useLanguage } from '../contexts/LanguageContext';

type FlexibleModulePageProps = {
  module: ModuleStructure;
  moduleId: number;
  isCompleted: boolean;
  savedReflections: { [key: string]: string };
  onComplete: (moduleId: number, reflections: { [key: string]: string }) => void;
  onNext: () => void;
  onBack: () => void;
};

export function FlexibleModulePage({ 
  module, 
  moduleId, 
  isCompleted, 
  savedReflections,
  onComplete, 
  onNext, 
  onBack 
}: FlexibleModulePageProps) {
  const [reflections, setReflections] = useState<{ [key: string]: string }>(savedReflections);
  const [hasCompletedNow, setHasCompletedNow] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setReflections(savedReflections);
  }, [savedReflections, moduleId]);

  const handleReflectionChange = (id: string, value: string) => {
    setReflections(prev => ({ ...prev, [id]: value }));
  };

  const handleComplete = () => {
    // Check if at least one reflection has content
    const hasAnyReflection = Object.values(reflections).some(r => r.trim().length > 0);
    
    if (hasAnyReflection) {
      onComplete(moduleId, reflections);
      setHasCompletedNow(true);
      setTimeout(() => setHasCompletedNow(false), 3000);
    }
  };

  const canComplete = Object.values(reflections).some(r => r.trim().length > 0);

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="relative h-48 sm:h-64 overflow-hidden">
            <img 
              src={module.headerImage}
              alt={module.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-white/90 text-sm uppercase tracking-wider">
                  Module {moduleId} of 5
                </span>
                {isCompleted && (
                  <CheckCircle2 className="text-green-400" size={20} />
                )}
              </div>
              <h1 className="text-white text-2xl sm:text-4xl">
                {module.title}
              </h1>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            {/* Content Blocks */}
            {module.sections.map((block, index) => {
              const reflectionId = block.type === 'reflection' ? block.id : undefined;
              const reflectionValue = reflectionId ? reflections[reflectionId] : undefined;
              
              return (
                <ContentBlock
                  key={index}
                  block={block}
                  moduleId={moduleId}
                  reflection={reflectionValue}
                  onReflectionChange={handleReflectionChange}
                  isCompleted={isCompleted}
                />
              );
            })}

            {/* Completion Message */}
            {hasCompletedNow && (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                <CheckCircle2 className="text-green-600 flex-shrink-0" size={24} />
                <p className="text-green-800">
                  Great work! Your reflections have been saved.
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onBack}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors"
              >
                <ArrowLeft size={20} />
                <span>{t.back}</span>
              </button>

              {!isCompleted && (
                <button
                  onClick={handleComplete}
                  disabled={!canComplete}
                  className={`flex-1 px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
                    canComplete
                      ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle2 size={20} />
                  <span>{t.complete}</span>
                </button>
              )}

              <button
                onClick={onNext}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-xl transition-all shadow-lg"
              >
                <span>{t.next}</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}