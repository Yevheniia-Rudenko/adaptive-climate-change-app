import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { Linkedin } from 'lucide-react';
import aboutDayOfClimate from '../assets/about_dayofclimate.jpeg';
import aboutSystemsLab from '../assets/about_systemslab.jpeg';
import tibyanPhoto from '../assets/team_photos/tibyan.jpg';
import yevheniaPhoto from '../assets/team_photos/yevhenia.jpg';
import karimPhoto from '../assets/team_photos/karim.jpg';

function TeamMemberCard({ photo, name, role, bio, linkedinLink }: { photo: string, name: string, role: string, bio: string, linkedinLink: string }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="flex-1 cursor-pointer" 
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div 
        className="relative w-full h-full transition-transform duration-500" 
        style={{ 
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Front */}
        <div 
          className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 shadow-md text-center flex flex-col w-full h-full"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <img 
            src={photo} 
            alt={name} 
            className="w-full aspect-square rounded-lg mb-3 object-cover shadow-sm"
          />
          <h3 className="text-sm sm:text-base font-bold text-gray-800 dark:text-gray-100">{name}</h3>
        </div>

        {/* Back */}
        <div 
          className="absolute top-0 left-0 w-full h-full bg-gray-50 dark:bg-gray-700 rounded-lg p-4 sm:p-6 shadow-md flex flex-col items-center justify-between text-center"
          style={{ 
            backfaceVisibility: 'hidden', 
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)' 
          }}
        >
          <div className="flex-1 flex flex-col items-center justify-center w-full">
            <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">{name}</h3>
            <p className="text-sm sm:text-base font-semibold text-green-500 mb-3 sm:mb-5">{role}</p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 px-2 leading-relaxed">
              {bio}
            </p>
          </div>
          <div className="mt-4">
            <a href={linkedinLink} target="_blank" rel="noopener noreferrer" className="inline-block text-blue-500 hover:text-blue-700 dark:text-blue-400 transition-transform hover:scale-110">
              <Linkedin size={28} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 pt-20 font-sora">
      <div className="max-w-4xl w-full">
        <Link to="/">
          <Button
            variant="outline"
            className="mb-4 sm:mb-6 dark:text-gray-100 dark:border-gray-400"
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
            <div className="flex justify-start mt-6">
              <a 
                href="https://dayofclimate.mit.edu" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button 
                  variant="outline"
                  className="text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-lg sm:text-sm font-semibold px-6 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  Visit Day of Climate →
                </Button>
              </a>
            </div>
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
            <div className="flex justify-start mt-6">
              <a 
                href="https://systemsawareness.mit.edu" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button 
                  variant="outline"
                  className="text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-lg sm:text-sm font-semibold px-6 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  Visit Systems Awareness Lab →
                </Button>
              </a>
            </div>
          </div>

          {/*SPACER*/}
          <div className="h-6 sm:h-16 w-full block"></div>

          {/* Meet Our Team Section */}
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 mb-4">
              Meet Our Team
            </h2>
            <div className="flex flex-row gap-4">
              <TeamMemberCard 
                photo={tibyanPhoto} 
                name="Tibyan Bilal" 
                role="Web Developer" 
                bio="Mathematical Engineering Student at YTÜ | MIT Emerging Talent Alum 25’ | Web Dev | NLP " 
                linkedinLink="https://www.linkedin.com/in/tibyankhalid/" 
              />
              <TeamMemberCard 
                photo={yevheniaPhoto} 
                name="Yevheniia Rudenko" 
                role="Web Developer" 
                bio="MIT Emerging Talent 2024/25 Data Science learner | ReDI School (Machine Learning & AI) | MSc in Computer Science" 
                linkedinLink="https://www.linkedin.com/in/yevheniia-rudenko/" 
              />
              <TeamMemberCard 
                photo={karimPhoto} 
                name="Karim Makie" 
                role="Web Developer" 
                bio="[Full Stack Developer @ MIT System Awareness Lab | Flutter Developer | Data Analyst" 
                linkedinLink="https://www.linkedin.com/in/karim-makie/" 
              />
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