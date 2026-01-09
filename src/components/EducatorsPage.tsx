import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BookOpen, Users, Target, Download, Search } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { glossary } from '../data/glossary';

type EducatorsPageProps = {
  onBackToHome: () => void;
};

export function EducatorsPage({ onBackToHome }: EducatorsPageProps) {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('guide');

  // Reset search when switching tabs
  useEffect(() => {
    if (activeTab === 'guide') {
      setSearchTerm('');
    }
  }, [activeTab]);

  const entries = useMemo(() => glossary[language] || glossary.en, [language]);
  
  const filteredTerms = useMemo(() => {
    if (searchTerm.trim() === '') return entries;
    
    const searchLower = searchTerm.toLowerCase();
    return entries.filter(entry => 
      entry.term.toLowerCase().includes(searchLower) ||
      entry.definition.toLowerCase().includes(searchLower)
    );
  }, [entries, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-6 font-sora">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Button
          onClick={onBackToHome}
          variant="outline"
          className="mb-4 sm:mb-6"
        >
          ← {t.backHome}
        </Button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 md:p-12">
          <h1 className="text-green-600 mb-6 sm:mb-8">{t.forEducators}</h1>

          <Tabs defaultValue="guide" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="guide">Teaching Guide</TabsTrigger>
              <TabsTrigger value="glossary">{t.glossary}</TabsTrigger>
            </TabsList>

            <TabsContent value="guide">
              <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
                <p className="lead text-base sm:text-lg">
                  Welcome, educators! This platform is designed to support you in teaching climate systems 
                  thinking to students aged 14-18.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 my-6 sm:my-8 not-prose">
                  <div className="bg-blue-50 p-4 sm:p-6 rounded-lg">
                    <BookOpen className="text-blue-600 mb-2 sm:mb-3" size={28} />
                    <h3 className="text-blue-900 mb-2 text-base sm:text-lg">Curriculum Design</h3>
                    <p className="text-blue-800 text-sm sm:text-base">
                      Our 5-module curriculum is designed to be flexible—use all modules sequentially 
                      or select specific modules that fit your teaching needs.
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 sm:p-6 rounded-lg">
                    <Users className="text-green-600 mb-2 sm:mb-3" size={28} />
                    <h3 className="text-green-900 mb-2 text-base sm:text-lg">Classroom Ready</h3>
                    <p className="text-green-800 text-sm sm:text-base">
                      Each module includes discussion prompts, reflection activities, and interactive 
                      simulations perfect for both individual and group learning.
                    </p>
                  </div>

                  <div className="bg-teal-50 p-4 sm:p-6 rounded-lg">
                    <Target className="text-teal-600 mb-2 sm:mb-3" size={28} />
                    <h3 className="text-teal-900 mb-2 text-base sm:text-lg">Learning Objectives</h3>
                    <p className="text-teal-800 text-sm sm:text-base">
                      Students develop systems thinking skills, understand climate science, and build 
                      agency to take meaningful climate action.
                    </p>
                  </div>

                  <div className="bg-purple-50 p-4 sm:p-6 rounded-lg">
                    <Download className="text-purple-600 mb-2 sm:mb-3" size={28} />
                    <h3 className="text-purple-900 mb-2 text-base sm:text-lg">Teaching Resources</h3>
                    <p className="text-purple-800 text-sm sm:text-base">
                      Access lesson plans, facilitation guides, and assessment rubrics to support 
                      your classroom implementation.
                    </p>
                  </div>
                </div>

                <h2>How to Use This Platform</h2>
                <ul>
                  <li>
                    <strong>Self-Paced Learning:</strong> Students can work through modules independently, 
                    with built-in reflection prompts to deepen understanding.
                  </li>
                  <li>
                    <strong>Facilitated Sessions:</strong> Use the interactive dashboards to lead class 
                    discussions about climate scenarios and solutions.
                  </li>
                  <li>
                    <strong>Assessment:</strong> Student reflections provide rich material for assessing 
                    understanding and critical thinking.
                  </li>
                  <li>
                    <strong>Multilingual Support:</strong> The platform supports 6 languages, making it 
                    accessible for diverse classrooms.
                  </li>
                </ul>

                <h2>Suggested Time Allocation</h2>
                <p>
                  Each module is designed to take approximately 45-60 minutes to complete. For a complete 
                  unit, plan for 5-6 hours of instructional time, including discussion and reflection activities.
                </p>

                <h2>Technical Requirements</h2>
                <p>
                  The platform works on any modern web browser and is responsive for tablets and mobile 
                  devices. No special software or accounts are required—student progress is saved locally 
                  in their browser.
                </p>

                <h2>Contact Us</h2>
                <p>
                  Have questions or feedback? We'd love to hear from you! Contact us at 
                  educators@climatesystems.edu (example)
                </p>
              </div>
            </TabsContent>

            <TabsContent value="glossary">
              <div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base">
                  {t.exploreTerms}
                </p>

                {/* Search Box */}
                <div className="relative mb-6 sm:mb-8">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                  <input
                    type="text"
                    placeholder={t.searchTerms}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                  />
                </div>

                {/* Terms List */}
                <div className="space-y-4 sm:space-y-6">
                  {filteredTerms.length > 0 ? (
                    filteredTerms.map((entry) => (
                      <div key={entry.term} className="border-b border-gray-200 dark:border-gray-700 pb-4 sm:pb-6 last:border-b-0">
                        <h3 className="text-green-700 mb-2 text-base sm:text-lg">{entry.term}</h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{entry.definition}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 sm:py-12 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                      {t.noTermsFound}: &quot;{searchTerm}&quot;
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center">
                    {filteredTerms.length} / {entries.length} {t.termsDisplayed.toLowerCase()}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}