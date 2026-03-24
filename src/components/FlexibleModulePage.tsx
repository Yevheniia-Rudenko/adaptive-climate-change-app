import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ModuleStructure } from '../data/moduleStructures';
import { ContentBlock } from './ContentBlock';
import { useLanguage } from '../contexts/LanguageContext';
import { GlossaryHighlightProvider } from '../contexts/GlossaryHighlightContext';
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
  const { search } = useLocation();
  const [currentBlock, setCurrentBlock] = useState(1);

  // Build per-block navigation groups.
  // For Module 1 we use the existing hand-crafted grouping.
  // For any other module whose top-level sections are all 'block' (or 'module-feedback') entries
  // we treat each section as its own subpage — identical to Module 1's UX.
  const getBlockSections = () => {
    if (moduleId === 1) {
      // Module 1: Split into 8 blocks (legacy hand-crafted grouping)
      const blockGroups = [
        module.sections.slice(0, 1),   // Block 1: About Module + Emotions (index 0: teal block)
        module.sections.slice(1, 2),   // Block 2: Understanding Climate Drivers (index 1: green block)
        module.sections.slice(2, 3),   // Block 3: Exercise 1 (index 2: amber block)
        module.sections.slice(3, 4),   // Block 4: Exercise 2 (index 3: purple block)
        [module.sections[4]],          // Block 5: Exercise 3 (index 4: amber block)
        module.sections.slice(5, 17),  // Block 6: Exercise 4 (indices 5-16: all Exercise 4 content)
        [module.sections[17]],         // Block 7: Practice of Hope (index 17: teal block)
        [module.sections[18]],         // Block 8: Module Feedback (index 18: congratulations)
      ];
      return blockGroups;
    }

    // Generic: if every top-level section is a 'block' or 'module-feedback',
    // give each its own subpage. Otherwise fall back to showing all at once.
    const allSectionsAreBlocks = module.sections.every(
      s => s.type === 'block' || s.type === 'module-feedback'
    );
    if (allSectionsAreBlocks && module.sections.length > 1) {
      return module.sections.map(s => [s]);
    }

    return [module.sections]; // fallback: single page
  };

  const blockSections = getBlockSections();

  // isMultiBlock: true when we have more than one navigable subpage
  const isMultiBlock = blockSections.length > 1;
  const totalBlocks = isMultiBlock ? blockSections.length : 1;
  const currentSections = isMultiBlock ? blockSections[currentBlock - 1] : module.sections;

  // Allow deep-linking to a specific sub-section with ?block=N
  useEffect(() => {
    const requested = Number.parseInt(new URLSearchParams(search).get('block') || '', 10);
    const nextBlock = Number.isNaN(requested)
      ? 1
      : Math.min(Math.max(requested, 1), totalBlocks);

    setCurrentBlock(prev => (prev === nextBlock ? prev : nextBlock));
  }, [moduleId, search, totalBlocks]);

  // Scroll to top whenever the block changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentBlock]);

  // Allow deep-linking to a specific section title in the active block with ?section=<slug>
  useEffect(() => {
    const sectionSlug = new URLSearchParams(search).get('section');
    if (!sectionSlug) return;

    const selector = `[data-section-slug="${sectionSlug}"]`;
    let raf2 = 0;

    // Wait for block content to render before scrolling to target subsection
    const raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => {
        const target = document.querySelector(selector);
        if (target instanceof HTMLElement) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    return () => {
      window.cancelAnimationFrame(raf1);
      if (raf2) window.cancelAnimationFrame(raf2);
    };
  }, [currentBlock, search]);

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
            {/* Block Progress Bar — shown for all multi-block modules */}
            {isMultiBlock && (() => {
              const pct = Math.round((currentBlock / totalBlocks) * 100);
              return (
                <div className="mb-8 select-none">
                  {/* Dots row */}
                  <div className="flex justify-center mb-2">
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: totalBlocks }, (_, i) => {
                        const stepNum = i + 1;
                        const isDone = stepNum < currentBlock;
                        const isCurrent = stepNum === currentBlock;
                        const size = isCurrent ? 20 : isDone ? 14 : Math.max(8, 12 - (stepNum - currentBlock));
                        const bg = isCurrent ? '#1a5c27' : isDone ? '#2d7a3a' : 'transparent';
                        const border = (isCurrent || isDone) ? 'none' : '2px solid #a7d7a9';
                        const opacity = isCurrent ? 1 : isDone ? 0.85 : Math.max(0.3, 1 - (stepNum - currentBlock) * 0.15);
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setCurrentBlock(stepNum)}
                            aria-label={`Go to step ${stepNum}`}
                            aria-current={isCurrent ? 'step' : undefined}
                            className="rounded-full focus:outline-none focus:ring-2 focus:ring-green-500/60"
                            style={{
                              width: size,
                              height: size,
                              background: bg,
                              border,
                              opacity,
                              transition: 'all 0.4s ease',
                              flexShrink: 0,
                              cursor: 'pointer',
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                  {/* Label row */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-purple-600 dark:text-purple-400">
                      🚀 Step {currentBlock} of {totalBlocks}
                    </span>
                    <span className="font-bold text-green-600 dark:text-green-400">{pct}% complete!</span>
                  </div>
                </div>
              );
            })()}


            {/* Content Blocks */}
            <GlossaryHighlightProvider key={`glossary-${moduleId}-${currentBlock}`}>
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
            </GlossaryHighlightProvider>

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
                  {isMultiBlock && currentBlock === totalBlocks
                    ? `Continue to Module ${moduleId + 1}`
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
