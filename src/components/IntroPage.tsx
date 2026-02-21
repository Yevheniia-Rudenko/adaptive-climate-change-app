import { ArrowRight, BookOpen, Droplets, Map, Network, Rocket, Sparkles, Sprout } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import module1Icon from '../assets/module1.png';
import module2Icon from '../assets/module2.png';
import module3Icon from '../assets/module3.png';
import module4Icon from '../assets/module4.png';
import module5Icon from '../assets/module5.png';
import resourcesIcon from '../assets/resources.png';
import earthImage from '../assets/earth_img.jpg';
import backgroundImage from '../assets/background.jpeg';

export function IntroPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const onStart = () => {
    navigate('/module/1');
  };

  const onNavigateToModule = (moduleId: number | 'resources') => {
    if (moduleId === 'resources') {
      navigate('/resources');
    } else {
      navigate(`/module/${moduleId}`);
    }
  };

  const moduleCards = [
    {
      id: 1,
      label: t.module1,
      Icon: Sparkles,
      iconImage: module1Icon,
      gradient: 'from-emerald-500 via-teal-400 to-sky-400',
      gradientStyle: 'linear-gradient(135deg, #526c63 0%, #14b8a6 45%, #4b6e7d 100%)',
      chips: ['Climate futures', 'Feelings'],
      backText: 'Explore different climate scenarios and understand how our choices today shape tomorrow. Connect your emotions and actions to potential futures.',
    },
    {
      id: 2,
      label: t.module2,
      Icon: Droplets,
      iconImage: module2Icon,
      gradient: 'from-cyan-500 via-sky-400 to-blue-500',
      gradientStyle: 'linear-gradient(135deg, #06b6d4 0%, #38bdf8 50%, #4d6a99 100%)',
      chips: ['Flows', 'Balance'],
      backText: 'Learn how resources accumulate and deplete over time. Understand the balance between inflows and outflows in climate systems.',
    },
    {
      id: 3,
      label: t.module3,
      Icon: Map,
      iconImage: module3Icon,
      gradient: 'from-amber-400 via-orange-400 to-pink-500',
      gradientStyle: 'linear-gradient(135deg, #f59e0b 0%, #fb923c 45%, #7e6270 100%)',
      chips: ['Pathways', 'Scenarios'],
      backText: 'Navigate through various climate pathways and scenarios. Discover the multiple routes we can take toward sustainability.',
    },
    {
      id: 4,
      label: t.module4,
      Icon: Network,
      iconImage: module4Icon,
      gradient: 'from-lime-400 via-green-500 to-emerald-600',
      gradientStyle: 'linear-gradient(135deg, #a3e635 0%, #22c55e 45%, #059669 100%)',
      chips: ['Systems', 'Ripple effects'],
      backText: 'See how climate solutions interconnect in complex systems. Understand the ripple effects of interventions across multiple domains.',
    },
    {
      id: 5,
      label: t.module5,
      Icon: Rocket,
      iconImage: module5Icon,
      gradient: 'from-purple-500 via-indigo-500 to-blue-600',
      gradientStyle: 'linear-gradient(135deg, #a855f7 0%, #6366f1 50%, #2563eb 100%)',
      chips: ['Leverage', 'Momentum'],
      backText: 'Identify high-leverage points for climate action. Learn where to apply effort for maximum impact and lasting change.',
    },
    {
      id: 6,
      label: t.module6,
      Icon: BookOpen,
      iconImage: resourcesIcon,
      gradient: 'from-rose-500 via-pink-500 to-purple-500',
      gradientStyle: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 50%, #a855f7 100%)',
      chips: ['Resources', 'Learn More'],
      backText: 'Access additional learning materials, research papers, and tools to deepen your understanding of climate systems.',
    },
  ];

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 pt-20 font-sora"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Hero Image */}
          <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden">
            <img
              src={earthImage}
              alt="Earth from space"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
              <div className="flex items-center gap-2 mb-2">
                <Sprout className="text-green-400 flex-shrink-0" size={24} />
                <span className="text-green-400 uppercase tracking-wider text-xs sm:text-sm">{t.climateEducation}</span>
              </div>
              <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                {t.mainTitle}
              </h1>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 md:p-8 lg:p-10">
            <div className="mb-6 sm:mb-8">
              <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-4">
                {t.introP1_1}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-4">
                {t.introP1_2}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                {t.introP1_3}
              </p>
            </div>

            {/* Module List */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="text-purple-600 dark:text-purple-400 flex-shrink-0" size={20} />
                <h2 className="text-gray-900 dark:text-gray-100">{t.whatYouLearn}</h2>
              </div>
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 auto-rows-fr max-w-3xl mx-auto">
                {moduleCards.map(({ id, label, Icon, iconImage, gradient, gradientStyle, chips, backText }, index) => (
                  <motion.div
                    key={id}
                    className="h-full"
                    style={{ perspective: '1000px' }}
                    onMouseEnter={() => setFlippedCard(id)}
                    onMouseLeave={() => setFlippedCard(null)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                  >
                    <div
                      className="relative w-full h-full transition-transform duration-900"
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: flippedCard === id ? 'rotateY(180deg)' : 'rotateY(0deg)',
                        minHeight: '320px'
                      }}
                    >
                      {/* Front of card */}
                      <div
                        className="absolute inset-0 cursor-pointer"
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <div className="overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col" style={{ backgroundColor: '#2D6A4F' }}>
                          
                          {/* Image Area - BULLETPROOF FIX */}
                          <div
                            className="h-40 sm:h-48 w-full relative overflow-hidden flex-shrink-0"
                            style={{ background: iconImage ? '#ffffff' : gradientStyle }}
                          >
                            {/* Module Number Badge */}
                            {id !== 6 && (
                              <div className="absolute top-0 left-0 px-4 py-1.5 shadow-lg z-10" style={{ borderRadius: '50px', backgroundColor: '#4A6652' }}>
                                <span className="text-lg font-bold text-white tracking-wide">Module {id}</span>
                              </div>
                            )}

                            {/* Absolute Image Container */}
                            <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
                              {iconImage ? (
                                <img
                                  src={iconImage}
                                  alt={label}
                                  style={{ 
                                    width: 'auto', 
                                    height: 'auto', 
                                    maxWidth: '100%', 
                                    maxHeight: '100%', 
                                    objectFit: 'contain' 
                                  }}
                                  className="group-hover:scale-105 transition-transform duration-300"
                                />
                              ) : (
                                <Icon size={56} strokeWidth={1.5} className="text-white/90" />
                              )}
                            </div>
                          </div>

                          {/* Title Bar */}
                          <div className="px-8 py-8 min-h-28 flex items-center justify-center flex-grow" style={{ backgroundColor: '#2D6A4F' }}>
                            <h3 className="text-xl sm:text-2xl md:text-2xl leading-snug line-clamp-3 w-full text-center" style={{ color: '#ffffff', fontWeight: '900' }}>
                              {label}
                            </h3>
                          </div>
                        </div>
                      </div>

                      {/* Back of card */}
                      <div
                        className="absolute inset-0 cursor-pointer"
                        style={{
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)'
                        }}
                        onClick={() => onNavigateToModule(id === 6 ? 'resources' : id)}
                      >
                        <div
                          className="overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700 shadow-md h-full flex flex-col"
                          style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                        >
                          <div className="h-full flex flex-col items-center justify-center p-6 text-white">
                            <Icon size={48} strokeWidth={1.5} className="mb-4 opacity-80" />
                            <p className="text-center text-sm leading-relaxed mb-4">
                              {backText}
                            </p>
                            <div className="mt-auto pt-4 flex items-center gap-2 text-sm font-semibold">
                              <span>Explore Module</span>
                              <ArrowRight size={16} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Start Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                onClick={onStart}
                size="lg"
                className="w-full"
              >
                <span>{t.startJourney}</span>
                <ArrowRight size={20} />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}