import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

export function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-6 font-sora">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link to="/">
          <Button
            variant="outline"
            className="mb-4 sm:mb-6"
          >
            ← {t.backHome}
          </Button>
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 md:p-12">
          <h1 className="text-green-600 mb-6 sm:mb-8">{t.about}</h1>

          <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
            <p>
              This interactive climate education platform is designed to help young people (ages 14-18)
              understand the complex systems that shape climate change and discover where they can make
              a meaningful difference.
            </p>

            <h2>Our Mission</h2>
            <p>
              We believe that understanding climate change isn't just about learning facts—it's about
              developing systems thinking skills and connecting emotionally and intellectually with
              different possible futures. Through hands-on exploration and personal reflection, students
              gain the knowledge and agency to become effective climate advocates.
            </p>

            <h2>The Learning Journey</h2>
            <p>
              Our curriculum consists of 5 carefully designed modules that guide students through:
            </p>
            <ul>
              <li>Emotional and intellectual connections to climate futures</li>
              <li>Understanding stocks and flows in climate systems</li>
              <li>Exploring roadmaps to different possible futures</li>
              <li>Developing a systems view of climate solutions</li>
              <li>Identifying powerful levers for change</li>
            </ul>

            <h2>Interactive Learning</h2>
            <p>
              Each module combines educational content, videos, interactive climate simulations, and
              space for personal reflection. The platform supports learning in 6 languages and is
              designed to be accessible and engaging for students worldwide.
            </p>

            <h2>Inspired by Research</h2>
            <p>
              Our interactive dashboards are inspired by the En-ROADS climate simulator, developed by
              Climate Interactive and MIT Sloan. We translate complex climate science into accessible,
              exploratory learning experiences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}