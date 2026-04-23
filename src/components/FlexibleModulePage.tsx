import { ArrowLeft, ArrowRight, ExternalLink, Home } from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { moduleStructures, ModuleStructure, ContentBlock as ModuleContentBlock } from '../data/moduleStructures';
import { ContentBlock } from './ContentBlock';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocalizedModule } from '../hooks/useLocalizedModule';
import { GlossaryHighlightProvider } from '../contexts/GlossaryHighlightContext';
import { Button } from './ui/button';
import { trackEvent } from '../utils/analytics';
import { useSession } from '../contexts/SessionContext';
import { useTheme } from '../contexts/ThemeContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

const replaceValues = (str: string, values: Record<string, string | number>) => {
  let result = str;
  Object.entries(values).forEach(([key, value]) => {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value.toString());
  });
  return result;
};

type FlexibleModulePageProps = {
  module: ModuleStructure;
  moduleId: number;
};

export function FlexibleModulePage({
  moduleId
}: FlexibleModulePageProps) {
  const { t } = useLanguage();
  const localizedModuleData = useLocalizedModule(moduleId);
  // fallback if somehow wrong ID
  const module = localizedModuleData || moduleStructures[0];
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { search } = useLocation();
  const [currentBlock, setCurrentBlock] = useState(1);
  const [isConsentDialogOpen, setIsConsentDialogOpen] = useState(false);
  const { studyConsent, setStudyConsent } = useSession();
  const fm = t.pages.flexibleModule;
  const quote = fm.quotes[moduleId as keyof typeof fm.quotes];
  const totalModules = moduleStructures.length;
  const isLastModule = moduleId >= totalModules;
  const consentOpenTimeoutRef = useRef<number | null>(null);

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

  const mountTimeRef = useRef<number>(Date.now());
  const isCompleteRef = useRef<boolean>(false);
  const trackedModuleRef = useRef<number | null>(null);

  useEffect(() => {
    mountTimeRef.current = Date.now();
    isCompleteRef.current = false;
    trackedModuleRef.current = moduleId;

    trackEvent('module_start', {
      module_id: moduleId,
      module_name: module.title,
    });

    return () => {
      const timeSpentSeconds = Math.round((Date.now() - mountTimeRef.current) / 1000);
      trackEvent('module_time_spent', {
        module_id: moduleId,
        seconds_spent: timeSpentSeconds
      });

      if (!isCompleteRef.current) {
        trackEvent('module_abandon', {
          module_id: moduleId,
          step_number: currentBlock,
          total_steps: totalBlocks,
          time_spent_seconds: timeSpentSeconds
        });
      }
    };
  }, [moduleId, module.title]);

  useEffect(() => {
    if (consentOpenTimeoutRef.current !== null) {
      window.clearTimeout(consentOpenTimeoutRef.current);
      consentOpenTimeoutRef.current = null;
    }
    setIsConsentDialogOpen(false);

    if (studyConsent !== null) return;
    consentOpenTimeoutRef.current = window.setTimeout(() => {
      setIsConsentDialogOpen(true);
    }, 10000);

    return () => {
      if (consentOpenTimeoutRef.current !== null) {
        window.clearTimeout(consentOpenTimeoutRef.current);
        consentOpenTimeoutRef.current = null;
      }
    };
  }, [moduleId, studyConsent]);

  useEffect(() => {
    const handler = () => {
      if (studyConsent !== null) return;
      setIsConsentDialogOpen(true);
    };

    window.addEventListener('study_consent_request', handler);
    return () => {
      window.removeEventListener('study_consent_request', handler);
    };
  }, [studyConsent]);

  useEffect(() => {
    trackEvent('module_step_view', {
      module_id: moduleId,
      step_number: currentBlock,
      total_steps: totalBlocks,
    });
  }, [moduleId, currentBlock, totalBlocks]);

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
      isCompleteRef.current = true;
      trackEvent('module_complete', {
        module_id: moduleId,
        module_name: module.title,
      });
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
    if (!isLastModule) {
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

  const groupModule2Content = (blocks: ModuleContentBlock[]) => {
    const groups: ModuleContentBlock[][] = [];
    let currentGroup: ModuleContentBlock[] = [];
    let inDrawYourOwnStockFlow = false;
    let inCo2RemovalsSection = false;
    const defaultGroupingFilters = {
      drawYourOwn: 'draw your own stock & flow',
      step: 'step',
      reflect: "let's reflect",
      whatAreRemovals: 'what are co2 removals?',
      naturalRemovals: 'natural co2 removals include',
      technologicalRemovals: 'technological co2 removals include',
      netRemovals: 'why we say net co2 removals',
      co2Removal: 'co2 removals'
    };
    const filters = (t.data.modules.module2 as any)?.groupingFilters ?? defaultGroupingFilters;

    const normalizeTitle = (value: string) =>
      value
        .replace(/\*\*/g, '')
        .replace(/₂/g, '2')
        .replace(/[’']/g, "'")
        .trim()
        .toLowerCase();

    blocks.forEach((block, index) => {
      const title = 'title' in block && typeof block.title === 'string' ? block.title.trim() : '';
      const normalizedTitle = normalizeTitle(title);
      const previousBlock = index > 0 ? blocks[index - 1] : undefined;
      
      const isDrawYourOwnHeading = normalizedTitle.includes(filters.drawYourOwn);
      const isStepHeading = normalizedTitle.includes(filters.step);
      const isReflectHeading = normalizedTitle.includes(filters.reflect);
      const isCo2RemovalsHeading = normalizedTitle.includes(filters.whatAreRemovals);
      const isNaturalCo2Heading = normalizedTitle.includes(filters.naturalRemovals);
      const isTechnologicalCo2Heading = normalizedTitle.includes(filters.technologicalRemovals);
      const isNetCo2Heading = normalizedTitle.includes(filters.netRemovals);
      
      const isCo2RemovalImage =
        block.type === 'image' &&
        typeof block.alt === 'string' &&
        block.alt.replace(/₂/g, '2').toLowerCase().includes(filters.co2Removal);
        
      const isUntitledTextAfterVideo =
        block.type === 'text' &&
        title.length === 0 &&
        previousBlock?.type === 'video';

      if (isDrawYourOwnHeading) {
        inDrawYourOwnStockFlow = true;
      }

      let startsNewSection = index === 0 || title.length > 0;

      // Keep Draw Your Own + Step One..Five + related image/text in one card.
      if (inDrawYourOwnStockFlow && isStepHeading) {
        startsNewSection = false;
      }

      // Reflection should begin its own card.
      if (inDrawYourOwnStockFlow && isReflectHeading) {
        startsNewSection = true;
        inDrawYourOwnStockFlow = false;
      }

      // Keep the CO2 removals explanation + natural + technological subsections in one card.
      if (isCo2RemovalsHeading) {
        inCo2RemovalsSection = true;
      }
      if (inCo2RemovalsSection && (isNaturalCo2Heading || isTechnologicalCo2Heading || isCo2RemovalImage)) {
        startsNewSection = false;
      }
      if (inCo2RemovalsSection && isNetCo2Heading) {
        startsNewSection = true;
        inCo2RemovalsSection = false;
      }

      // For Module 2 layout: keep title+video together, then start a new card for explanatory text.
      if (isUntitledTextAfterVideo) {
        startsNewSection = true;
      }

      // True-or-myth quizzes always get their own card.
      if (block.type === 'true-or-myth') {
        startsNewSection = true;
      }

      if (startsNewSection) {
        if (currentGroup.length > 0) {
          groups.push(currentGroup);
        }
        currentGroup = [block];
        return;
      }

      currentGroup.push(block);
    });

    if (currentGroup.length > 0) {
      groups.push(currentGroup);
    }

    return groups;
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sora">
      <AlertDialog open={isConsentDialogOpen} onOpenChange={setIsConsentDialogOpen}>
        <AlertDialogContent className="font-sora">
          <AlertDialogHeader>
            <AlertDialogTitle>{fm.consentDialog.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {fm.consentDialog.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="justify-center sm:justify-center">
            <AlertDialogCancel
              onClick={() => {
                setStudyConsent('out');
                setIsConsentDialogOpen(false);
              }}
            >
              {fm.consentDialog.disagree}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setStudyConsent('in');
                setIsConsentDialogOpen(false);
              }}
            >
              {fm.consentDialog.agree}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
                  {replaceValues(fm.progress.moduleOf, { current: moduleId, total: totalModules })}
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
                  {moduleId === 2 ? (
                    <div className="flex items-center justify-between gap-2 text-sm">
                      <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-3 py-1 font-semibold text-green-700 dark:border-green-700/60 dark:bg-green-900/30 dark:text-green-300">
                        {replaceValues(fm.progress.stepOf, { current: currentBlock, total: totalBlocks })}
                      </span>
                      <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-3 py-1 font-bold text-green-700 dark:border-green-700/60 dark:bg-green-900/30 dark:text-green-300">
                        {replaceValues(fm.progress.percentComplete, { pct })}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-purple-600 dark:text-purple-400">
                        {replaceValues(fm.progress.stepOfRocket, { current: currentBlock, total: totalBlocks })}
                      </span>
                      <span className="font-bold text-green-600 dark:text-green-400">
                        {replaceValues(fm.progress.percentCompleteExclaim, { pct })}
                      </span>
                    </div>
                  )}
                </div>
              );
            })()}


            {/* Content Blocks */}
            <GlossaryHighlightProvider key={`glossary-${moduleId}`}>
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
                      {moduleId === 2
                        ? groupModule2Content(section.content).map((group, groupIndex) => (
                          <div
                            key={groupIndex}
                            className="mb-4 sm:mb-5"
                          >
                            {group.map((block, blockIndex) => (
                              <ContentBlock
                                key={`${groupIndex}-${blockIndex}`}
                                block={block}
                                moduleId={moduleId}
                              />
                            ))}
                          </div>
                        ))
                        : section.content.map((block, blockIndex) => (
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

            {/* Quote section — shown only on the last block of non-final modules */}
            {(!isMultiBlock || currentBlock === totalBlocks) && !isLastModule && quote && (
              <div className="mb-8 rounded-2xl bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border border-green-200 dark:border-green-700/60 p-6 sm:p-8 text-center shadow-sm">
                <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl italic leading-relaxed mb-4">
                  &ldquo;{quote.text}&rdquo;
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base font-semibold">
                  — {quote.author}
                </p>
              </div>
            )}

            {/* Program completion CTAs — centered, shown only on Module 5's last block */}
            {isLastModule && (!isMultiBlock || currentBlock === totalBlocks) && (
              <div className="mb-8 flex flex-col items-center gap-3 w-full max-w-sm mx-auto">
                <Link
                  to="/resources"
                  className="w-full px-6 py-3 bg-white dark:bg-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-2 border-purple-600 dark:border-purple-500 font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                >
                  <ExternalLink size={18} />
                  <span className="font-semibold">{fm.navigation.exploreResources}</span>
                </Link>
              </div>
            )}

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button
                onClick={handleBlockBack}
                variant="outline"
                className="order-2 sm:order-1"
                style={{
                  backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
                  borderColor: theme === 'dark' ? '#6b7280' : '#7B2CBF'
                }}
              >
                <ArrowLeft size={18} />
                <span>{t.common.back}</span>
              </Button>

              {(!isLastModule) ? (
                // --- MODULES 1-4 NAVIGATION ---
                <>
                  {(!isMultiBlock || currentBlock === totalBlocks) && (
                    <Link
                      to="/resources"
                      className="order-3 sm:order-2 px-4 py-2 bg-white dark:bg-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-2 border-purple-600 dark:border-purple-500 text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      <ExternalLink size={16} />
                      <span>{fm.navigation.goToResources}</span>
                    </Link>
                  )}
                  <Button
                    onClick={handleBlockNext}
                    className="flex-1 order-1 sm:order-4 hover:brightness-90"
                    style={{ backgroundColor: '#7B2CBF', borderColor: '#7B2CBF', color: '#ffffff' }}
                  >
                    <span>
                      {isMultiBlock && currentBlock === totalBlocks
                        ? replaceValues(fm.navigation.continueToModule, { next: moduleId + 1 })
                        : t.common.next}
                    </span>
                    <ArrowRight size={18} />
                  </Button>
                </>
              ) : (
                // --- MODULE 5 NAVIGATION ---
                (!isMultiBlock || currentBlock === totalBlocks) ? (
                  // Module 5 FINAL block => Return to Main Menu
                  <Link
                    to="/"
                    style={{ backgroundColor: '#8031C5', color: '#ffffff' }}
                    className="flex-1 order-1 sm:order-4 hover:brightness-90 border-0 flex justify-center items-center gap-2 py-2 px-4 rounded-md font-medium transition-all h-10"
                  >
                    <span>{fm.navigation.returnToMainMenu}</span>
                    <ArrowRight size={18} />
                  </Link>
                ) : (
                  // Module 5 NON-final block => Next
                  <Button
                    onClick={handleBlockNext}
                    className="flex-1 order-1 sm:order-4 hover:brightness-90"
                    style={{ backgroundColor: '#7B2CBF', borderColor: '#7B2CBF', color: '#ffffff' }}
                  >
                    <span>{t.common.next}</span>
                    <ArrowRight size={18} />
                  </Button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
