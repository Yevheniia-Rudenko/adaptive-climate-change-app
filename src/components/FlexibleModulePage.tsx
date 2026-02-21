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

  // Organize Module 1 sections into 8 blocks
  const getBlockSections = () => {
    if (moduleId !== 1) {
      return [module.sections]; // Other modules show all sections
    }

    // Module 1: Split into 8 blocks
    // Sections breakdown:
    // 0: teal block (About + Key Concepts + Reflection + Learning to Name Emotions)
    // 1: green block (Understanding Climate Drivers)
    // 2: amber block (Exercise 1)
    // 3: purple block (Exercise 2) 
    // 4: amber block (Exercise 3)
    // 5-16: loose sections (Exercise 4: title, image, text, audio, poll, predictions, dashboard, 2 reflections)
    // 17: teal block (Practice of Hope)
    // 18: module feedback (Congratulations)
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
  };

  const blockSections = getBlockSections();
  const totalBlocks = moduleId === 1 ? 8 : 1;
  const currentSections = moduleId === 1 ? blockSections[currentBlock - 1] : module.sections;

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
            {/* Block Progress Bar for Module 1 - Fun & Visual */}
            {moduleId === 1 && (() => {
              const stepEmojis = ['🌱', '🌿', '🌍', '🌊', '☀️', '🌈', '⭐', '🎉'];
              const stepLabels = ['Start', 'Climate', 'Exercise 1', 'Exercise 2', 'Exercise 3', 'Exercise 4', 'Hope', 'Done!'];
              const pct = Math.round((currentBlock / totalBlocks) * 100);
              return (
                <div className="mb-8 select-none">
                  {/* Step circles inside a pill container */}
                  <div className="mb-4 flex justify-center">
                    <div className="relative inline-flex items-center gap-2 px-3 py-1 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border-2 border-gray-200 dark:border-gray-700 shadow-sm">
                      {/* Connecting line behind circles */}
                      <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-1 rounded-full bg-gray-200 dark:bg-gray-600 z-0" />
                      {/* Filled portion of connecting line */}
                      <div
                        className="absolute left-4 top-1/2 -translate-y-1/2 h-1 rounded-full z-0 transition-all duration-700"
                        style={{
                          width: `calc(${((currentBlock - 1) / (totalBlocks - 1)) * 100}% - 1rem)`,
                          background: 'linear-gradient(90deg, #a78bfa, #60a5fa, #34d399, #fbbf24)'
                        }}
                      />
                      {stepEmojis.map((emoji, i) => {
                        const stepNum = i + 1;
                        const isDone = stepNum < currentBlock;
                        const isCurrent = stepNum === currentBlock;
                        return (
                          <div key={i} className="relative z-10 inline-flex flex-col items-center gap-0.5">
                            <div
                              className={`
                              flex items-center justify-center rounded-full font-bold transition-all duration-500
                              ${isCurrent
                                  ? 'w-10 h-10 text-xl border-4 border-yellow-400 bg-white shadow-lg shadow-yellow-300/60 scale-110 animate-pulse'
                                  : isDone
                                    ? 'w-8 h-8 text-base border-2 border-green-400 bg-white shadow-sm'
                                    : 'w-8 h-8 text-base border-2 border-gray-200 bg-white opacity-60'
                                }
                              `}
                            >
                              {isDone ? '✅' : emoji}
                            </div>
                            <span className={`text-[9px] font-semibold hidden sm:block transition-all duration-300 whitespace-nowrap ${isCurrent ? 'text-yellow-600' : isDone ? 'text-green-600' : 'text-gray-400'}`}>
                              {stepLabels[i]}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Rainbow gradient bar */}
                  <div className="relative w-full bg-gray-100 dark:bg-gray-700 rounded-full h-4 overflow-hidden shadow-inner">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${pct}%`,
                        background: 'linear-gradient(90deg, #a78bfa, #60a5fa, #34d399, #fbbf24, #f87171)',
                        boxShadow: '0 0 10px rgba(167,139,250,0.5)'
                      }}
                    />
                    {/* Shine overlay */}
                    <div className="absolute inset-0 rounded-full" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 60%)' }} />
                  </div>

                  {/* Label */}
                  <div className="flex items-center justify-between mt-2 text-sm">
                    <span className="font-semibold text-purple-600 dark:text-purple-400">
                      🚀 Step {currentBlock} of {totalBlocks}
                    </span>
                    <span className="font-bold text-green-600 dark:text-green-400">{pct}% complete!</span>
                  </div>
                </div>
              );
            })()}

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
                  {moduleId === 1 && currentBlock === totalBlocks
                    ? 'Continue to Module 2'
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