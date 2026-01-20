import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { BookOpen, Users, Target, Download } from 'lucide-react';

type EducatorsPageProps = {
  onBackToHome: () => void;
};

export function EducatorsPage({ onBackToHome }: EducatorsPageProps) {
  const { t } = useLanguage();

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
        </div>
      </div>
    </div>
  );
}