import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import aboutDayOfClimate from '../assets/about_dayofclimate.jpeg';
import aboutSystemsLab from '../assets/about_systemslab.jpeg';
import tibyanPhoto from '../assets/team_photos/tibyan.jpg';
import yevheniaPhoto from '../assets/team_photos/yevhenia.jpg';
import karimPhoto from '../assets/team_photos/karim.jpg';

export function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 pt-20 font-sora">
      <div className="max-w-4xl w-full">
        <Link to="/">
          <Button
            variant="outline"
            className="mb-4 sm:mb-6"
          >
            ← {t.backHome}
          </Button>
        </Link>

        {/* Reverted to standard block layout */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 md:p-12">
          
          {/* Main About Heading - FORCED SIZE */}
          <h1 
            className="font-bold text-gray-800 dark:text-gray-100 text-center mb-4"
            style={{ fontSize: '3rem', lineHeight: '1.2' }}
          >
            About
          </h1>
          
          {/* SPACER */}
          <div className="h-6 sm:h-16 w-full block"></div>

          {/* Curriculum Overview Section */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-green-600 mb-3">
              Curriculum Overview
            </h2>
            <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed">
              This curriculum draws from the MIT Systems Awareness Lab's research on the "Compassionate Systems Framework," an educational framework that brings together tools and practices designed to develop students' understanding of and efficacy in navigating complex change across interconnecting systems of 1) self: personal, emotional, individual; 2) relational: self and others; and 3) collective: the self and larger societal and ecological realities.
            </p>
          </div>

          {/* SPACER */}
          <div className="h-6 sm:h-24 w-full block"></div>

          {/* About Day of Climate Section */}
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 mb-3">
              About Day of Climate
            </h2>
            <img 
              src={aboutDayOfClimate} 
              alt="Day of Climate at MIT" 
              className="w-full rounded-xl mb-6 object-cover"
            />
            <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed">
              The pK-12 Initiative's Day of Climate at MIT equips learners and educators with hands-on educational materials and tools to better understand climate change, its impacts, and potential solutions. Uniting the broader MIT community toward actionable, concrete solutions, the program provides elementary, middle, and high school-age learners and educators with free, high-quality, and accessible climate curriculum that can be used in and out of the classroom, year-round.
            </p>
            <a 
              href="https://dayofclimate.mit.edu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mt-4 text-black-600 hover:text-green-700 font-semibold underline"
            >
              Visit Day of Climate →
            </a>
          </div>

          {/*SPACER*/}
          <div className="h-6 sm:h-24 w-full block"></div>

          {/* About Systems Awareness Lab Section */}
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 mb-3">
              About MIT Systems Awareness Lab
            </h2>
            <img 
              src={aboutSystemsLab} 
              alt="MIT Systems Awareness Lab" 
              className="w-full rounded-xl mb-6 object-cover"
            />
            <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed">
              A global research network advancing the study of ongoing systems change efforts in education. The MIT Systems Awareness Lab is a community of researchers and practitioners dedicated to the rigorous, scientific study of long-term, transformative, and ongoing "systems change in the making."
            </p>
            <a 
              href="https://systemsawareness.mit.edu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mt-4 text-black-600 hover:text-green-700 font-semibold underline"
            >
              Visit Systems Awareness Lab →
            </a>
          </div>

          {/*SPACER*/}
          <div className="h-6 sm:h-16 w-full block"></div>

          {/* Meet Our Team Section */}
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 mb-4">
              Meet Our Team
            </h2>
            <div className="flex flex-row gap-4">
              {/* Team Member Card - Tibyan */}
              <div className="flex-1 bg-gray-50 dark:bg-gray-700 rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow text-center">
                <img 
                  src={tibyanPhoto} 
                  alt="Tibyan Bilal" 
                  className="w-full aspect-square rounded-lg mb-3 object-cover"
                />
                <h3 className="text-sm sm:text-base font-bold text-gray-800 dark:text-gray-100">Tibyan Bilal</h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Web Developer</p>
              </div>

              {/* Team Member Card - Yevheniia */}
              <div className="flex-1 bg-gray-50 dark:bg-gray-700 rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow text-center">
                <img 
                  src={yevheniaPhoto} 
                  alt="Yevheniia Rudenk" 
                  className="w-full aspect-square rounded-lg mb-3 object-cover"
                />
                <h3 className="text-sm sm:text-base font-bold text-gray-800 dark:text-gray-100">Yevheniia Rudenk</h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Web Developer</p>
              </div>

              {/* Team Member Card - Karim */}
              <div className="flex-1 bg-gray-50 dark:bg-gray-700 rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow text-center">
                <img 
                  src={karimPhoto} 
                  alt="Karim Makie" 
                  className="w-full aspect-square rounded-lg mb-3 object-cover"
                />
                <h3 className="text-sm sm:text-base font-bold text-gray-800 dark:text-gray-100">Karim Makie</h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Web Developer</p>
              </div>
            </div>
          </div>

          {/*SPACER*/}
          <div className="h-6 sm:h-16 w-full block"></div>

          {/* Contributors Link */}
          <div className="flex justify-start">
            <Link to="/contributors">
              <Button 
                variant="outline"
                className="text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-lg sm:text-xl font-semibold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                View Our Contributors & Credits →
              </Button>
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}