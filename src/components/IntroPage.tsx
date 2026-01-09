import { ArrowRight, BookOpen, Sprout } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { motion } from 'motion/react';

type IntroPageProps = {
  onStart: () => void;
  onNavigateToModule: (moduleId: number) => void;
};

export function IntroPage({ onStart, onNavigateToModule }: IntroPageProps) {
  const { t } = useLanguage();

  const modules = [
    t.module1,
    t.module2,
    t.module3,
    t.module4,
    t.module5
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 pt-20 font-sora bg-gray-50 dark:bg-gray-900">
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
              src="https://images.unsplash.com/photo-1642714388464-9d350c8cff39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aCUyMGNsaW1hdGUlMjBjaGFuZ2V8ZW58MXx8fHwxNzY1MTc1MDY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Earth and climate"
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
                {t.introP1}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                {t.introP2}
              </p>
            </div>

            {/* Module List */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="text-purple-600 dark:text-purple-400 flex-shrink-0" size={20} />
                <h2 className="text-gray-900 dark:text-gray-100">{t.whatYouLearn}</h2>
              </div>
              <div className="grid gap-3">
                {modules.map((module, index) => {
                  const moduleId = index + 1;
                  
                  return (
                    <motion.button
                      key={index}
                      onClick={() => onNavigateToModule(moduleId)}
                      className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:shadow-md transition-all cursor-pointer text-left group"
                      whileHover={{ scale: 1.02, x: 4 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-purple-600 dark:bg-purple-500 rounded-full flex items-center justify-center text-white font-gugi group-hover:scale-110 transition-transform">
                        {moduleId}
                      </div>
                      <span className="text-gray-800 dark:text-gray-200 flex-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {module}
                      </span>
                      <ArrowRight className="text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" size={20} />
                    </motion.button>
                  );
                })}
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