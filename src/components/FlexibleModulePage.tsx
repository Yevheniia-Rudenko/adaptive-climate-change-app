import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ModuleStructure } from '../data/moduleStructures';
import { ContentBlock } from './ContentBlock';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';

type FlexibleModulePageProps = {
  module: ModuleStructure;
  moduleId: number;
};

export function FlexibleModulePage({
  module,
  moduleId
}: FlexibleModulePageProps) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [currentBlock, setCurrentBlock] = useState(1);

  // Organize sections into paginated blocks
  const getBlockSections = () => {
    // Check if module has block wrappers
    const hasBlocks = module.sections.some(s => s.type === 'block');

    if (!hasBlocks) {
      return [module.sections]; // No blocks = single page
    }

    if (moduleId === 1) {
      // Module 1: Custom grouping (mix of block wrappers and loose sections)
      const blockGroups = [
        module.sections.slice(0, 1),   // Block 1: About Module + Emotions
        module.sections.slice(1, 2),   // Block 2: Understanding Climate Drivers
        module.sections.slice(2, 3),   // Block 3: Exercise 1
        module.sections.slice(3, 4),   // Block 4: Exercise 2
        [module.sections[4]],          // Block 5: Exercise 3
        module.sections.slice(5, 17),  // Block 6: Exercise 4
        [module.sections[17]],         // Block 7: Practice of Hope
        [module.sections[18]],         // Block 8: Module Feedback
      ];
      return blockGroups;
    }

    // Generic: each top-level section (block or loose) becomes its own page
    // Group consecutive loose sections together with the next block
    const pages: (typeof module.sections)[] = [];
    let looseGroup: typeof module.sections = [];

    for (const section of module.sections) {
      if (section.type === 'block') {
        if (looseGroup.length > 0) {
          pages.push(looseGroup);
          looseGroup = [];
        }
        pages.push([section]);
      } else {
        looseGroup.push(section);
      }
    }
    if (looseGroup.length > 0) {
      pages.push(looseGroup);
    }

    return pages;
  };

  const blockSections = getBlockSections();
  const totalBlocks = blockSections.length;
  const isPaginated = totalBlocks > 1;
  const currentSections = isPaginated ? blockSections[currentBlock - 1] : module.sections;

  // Scroll to top whenever the block changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentBlock]);

  const handleBlockNext = () => {
    if (currentBlock < totalBlocks) {
      setCurrentBlock(currentBlock + 1);
    } else {
      // Last block, go to next module
      handleNext();
    }
  };

  const handleBlockBack = () => {
    if (currentBlock > 1) {
      setCurrentBlock(currentBlock - 1);
    } else {
      // First block, go back to previous module/home
      handleBack();
    }
  };

  const handleNext = () => {
    if (moduleId < 5) {
      navigate(`/module/${moduleId + 1}`);
    } else {
      navigate('/');
    }
  };

  const handleBack = () => {
    if (moduleId > 1) {
      navigate(`/module/${moduleId - 1}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sora">
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
            {/* Progress Bar */}
            {totalBlocks > 1 && (
              <div style={{ marginBottom: '2rem' }}>
                <div style={{
                  width: '100%',
                  height: '12px',
                  backgroundColor: '#d1d5db',
                  borderRadius: '9999px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%',
                    width: `${Math.round((currentBlock / totalBlocks) * 100)}%`,
                    backgroundColor: '#2563eb',
                    borderRadius: '9999px',
                    transition: 'width 0.5s ease-out',
                  }} />
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '0.5rem',
                  fontSize: '0.875rem',
                  color: '#6b7280',
                }}>
                  <span>Step {currentBlock} of {totalBlocks}</span>
                  <span>{Math.round((currentBlock / totalBlocks) * 100)}%</span>
                </div>
              </div>
            )}

            {/* Content Blocks */}
            {currentSections.map((section, index) => {
              if (section.type === 'block') {
                // Color theme mapping
                const colorThemes = {
                  teal: 'bg-gradient-to-br from-teal-50/60 to-cyan-50/60 dark:from-teal-900/10 dark:to-cyan-900/10',
                  green: 'bg-gradient-to-br from-green-50/60 to-emerald-50/60 dark:from-green-900/10 dark:to-emerald-900/10',
                  amber: 'bg-gradient-to-br from-amber-50/60 to-yellow-50/60 dark:from-amber-900/10 dark:to-yellow-900/10',
                  purple: 'bg-gradient-to-br from-purple-50/60 to-violet-50/60 dark:from-purple-900/10 dark:to-violet-900/10',
                  pink: 'bg-gradient-to-br from-pink-50/60 to-rose-50/60 dark:from-pink-900/10 dark:to-rose-900/10',
                  blue: 'bg-gradient-to-br from-blue-50/60 to-indigo-50/60 dark:from-blue-900/10 dark:to-indigo-900/10'
                };

                return (
                  <div
                    key={index}
                    className={`rounded-2xl p-6 sm:p-8 mb-8 ${colorThemes[section.colorTheme]}`}
                  >
                    {section.blockTitle && (
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                        {section.blockTitle}
                      </h2>
                    )}
                    {section.content.map((block, blockIndex) => (
                      <ContentBlock
                        key={blockIndex}
                        block={block}
                        moduleId={moduleId}
                      />
                    ))}
                  </div>
                );
              } else {
                // Regular content block (not wrapped)
                return (
                  <ContentBlock
                    key={index}
                    block={section}
                    moduleId={moduleId}
                  />
                );
              }
            })}

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button
                onClick={handleBlockBack}
                variant="ghost"
                className="order-2 sm:order-1"
              >
                <ArrowLeft size={18} />
                <span>{t.back}</span>
              </Button>

              <Button
                onClick={handleBlockNext}
                className="flex-1 order-1 sm:order-3"
              >
                <span>
                  {isPaginated && currentBlock === totalBlocks
                    ? moduleId < 5 ? `Continue to Module ${moduleId + 1}` : 'Finish'
                    : t.next}
                </span>
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}