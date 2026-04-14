import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { Linkedin } from 'lucide-react';
import aboutDayOfClimate from '../assets/about_dayofclimate.jpeg';
import aboutSystemsLab from '../assets/about_systemslab.jpeg';
import tibyanPhoto from '../assets/team_photos/tibyan.png';
import yevheniaPhoto from '../assets/team_photos/yevhenia.png';
import karimPhoto from '../assets/team_photos/karim.JPG';
import lanaCookPhoto from '../assets/team_photos/2025Lanacook.jpeg';
import peterSengePhoto from '../assets/team_photos/Peter_Senge_2022-square.webp';
import jonasJebrilPhoto from '../assets/team_photos/Jonas_Jebril_2022-1024x1015-square-fbe1b6fff45e771ef3c854b654383771-.webp';
import fiorellaPhoto from '../assets/team_photos/FiorellaMassa.jpeg';

function TeamMemberCard({ photo, name, role, bio, linkedinLink, compact = false }: { photo?: string, name: string, role: string, bio: string, linkedinLink: string, compact?: boolean }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const initials = name
    .replace('Dr. ', '')
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div 
      className={`flex-1 basis-0 cursor-pointer ${compact ? 'min-w-0 h-[200px] sm:h-[230px]' : ''}`}
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
          className={`bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md text-center flex flex-col w-full h-full ${compact ? 'p-2' : 'p-3'}`}
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <div className={`w-full rounded-lg overflow-hidden shadow-sm ${compact ? 'h-[140px] sm:h-[150px] mb-2' : 'aspect-square mb-3'}`}>
            {photo ? (
              <img 
                src={photo} 
                alt={name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                <span className={`${compact ? 'text-2xl' : 'text-3xl'} font-bold text-gray-600 dark:text-gray-200`}>{initials}</span>
              </div>
            )}
          </div>
          <h3 className={`${compact ? 'text-[10px] sm:text-[11px]' : 'text-base sm:text-lg'} font-bold text-gray-800 dark:text-gray-100`}>{name}</h3>
        </div>

        {/* Back */}
        <div 
          className={`absolute top-0 left-0 w-full h-full bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md flex flex-col items-center justify-between text-center overflow-hidden ${compact ? 'p-3 sm:p-4' : 'p-4 sm:p-6'}`}
          style={{ 
            backfaceVisibility: 'hidden', 
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)' 
          }}
        >
          <div className="flex-1 flex flex-col items-center justify-center w-full">
            <h3 className={`${compact ? 'text-[11px] sm:text-xs mb-1 sm:mb-2' : 'text-lg sm:text-xl mb-3 sm:mb-4'} font-bold text-gray-800 dark:text-gray-100`}>{name}</h3>
            <p className={`${compact ? 'text-[10px] sm:text-[11px] mb-1 sm:mb-2' : 'text-base sm:text-lg mb-3 sm:mb-5'} font-semibold text-green-500`}>{role}</p>
            <p
              className={`${compact ? 'text-[9px] sm:text-[10px]' : 'text-sm sm:text-base'} text-gray-500 dark:text-gray-400 px-2 leading-relaxed`}
              style={compact ? { display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' } : undefined}
            >
              {bio}
            </p>
          </div>
          <div className={compact ? 'mt-2' : 'mt-4'}>
            <a href={linkedinLink} target="_blank" rel="noopener noreferrer" className="inline-block text-blue-500 hover:text-blue-700 dark:text-blue-400 transition-transform hover:scale-110">
              <Linkedin size={compact ? 18 : 32} />
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
            <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed mb-4">
              This curriculum draws from the MIT Systems Awareness Lab’s research and the Center for Systems Awareness’ work  the “Compassionate Systems Framework.” This educational framework brings together tools and practices designed to develop students’ understanding of and efficacy in navigating complex change across interconnecting systems:
            </p>
            <ol className="list-decimal pl-8 text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed space-y-2">
              <li>1. self: personal, emotional, individual;</li>
              <li>2. relational: self and others;</li>
              <li>3. collective: larger societal, political, ecological and economic realities.</li>
            </ol>
          </div>
          
          {/* SPACER */}
          <div className="h-6 sm:h-24 w-full block"></div>

            <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed mb-4">
             This curriculum also supports young people to learn about climate policies using <a href="https://www.climateinteractive.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">Climate Interactive</a>’s En-ROADS climate policy simulator. En‑ROADS is a global climate simulator that lets you test how different climate solutions—like electrifying transportation, putting a price on carbon, or changing farming practices—affect things like temperature, air quality, sea level rise, and energy costs. In this combination of compassionate systems and En-ROADS, students learn about the inner and outer systems dynamics that underlie climate change, its drivers, and effects–from global energy policies, consumer behavior, to our sense of agency and hope in contributing to a more positive future.          
             </p>

          {/* SPACER */}
          <div className="h-1 sm:h-24 w-full block"></div>

            <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed mb-4">
             In this combination of compassionate systems and En-ROADS, students learn about the inner and outer systems dynamics that underlie climate change, its drivers, and effects–from global energy policies, consumer behavior, to our sense of agency and hope in contributing to a more positive future.          
             </p>

          {/* SPACER */}
          <div className="h-6 sm:h-24 w-full block"></div>

          {/* About Day of Climate Section */}
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 mb-3">
              Day of Climate
            </h2>
            <img 
              src={aboutDayOfClimate} 
              alt="A crowd at a climate protest holding signs, with the most prominent reading There Is No Planet B above a drawing of Earth" 
              className="w-full rounded-xl mb-6 object-cover"
            />
            <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed">
              The pK-12 Initiative's Day of Climate at the Massachusetts Institute of Technology (MIT) equips learners and educators with hands-on educational materials and tools to better understand climate change, its impacts, and potential solutions. 
            </p>

          {/* SPACER */}
          <div className="h-6 sm:h-24 w-full block"></div>

            <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed">
              Uniting the broader MIT community toward actionable, concrete solutions, the program provides elementary, middle, and high school-age learners and educators with free, high-quality, and accessible climate curriculum that can be used in and out of the classroom, year-round.           
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
              MIT Systems Awareness Lab
            </h2>
            <img 
              src={aboutSystemsLab} 
              alt="MIT Systems Awareness Lab Team" 
              className="w-full rounded-xl mb-6 object-cover"
            />
            <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed">
              Bringing together researchers, educators, policymakers, and practitioners dedicated to the study of systems change.            </p>
            
          {/*SPACER*/}
          <div className="h-6 sm:h-24 w-full block"></div>

            <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed">
              At the MIT Systems Awareness Lab, our mission is to develop, investigate, and grow the conditions for greater human and planetary flourishing in response to the global poly-crisis, including the climate emergency, social inequities, and the youth mental health crisis.
            </p>

          {/*SPACER*/}
          <div className="h-6 sm:h-24 w-full block"></div>
          
            <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed">
             We believe meaningful change only occurs when we address both tangible artifacts, such as formal structures and policies, and intangible mental models, including the habits of thought, feeling, and action that shape how people engage with one another across the systems of all levels.
            </p>

          {/*SPACER*/}
          <div className="h-6 sm:h-24 w-full block"></div>

            <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed">
             Addressing the climate crisis requires a fundamental shift in our mental models from one of consumption and extraction toward a vision of collective responsibility action for planetary flourishing. 
            </p>

          {/*SPACER*/}
          <div className="h-6 sm:h-24 w-full block"></div>

            <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed">
             Our work explores how cultivating compassion and systems awareness can empower youth and educational communities to lead sustainable transformation in the face of global ecological and social challenges.
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
          <div className="h-6 sm:h-24 w-full block"></div>

          {/* About Climate Interactive Section */}
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 mb-3">
              Climate Interactive
            </h2>
            <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed">
              At Climate Interactive, their mission is to create and share tools that drive effective and equitable action. Developed by Climate Interactive, MIT Sloan School of Management, and Ventana Systems, the En-ROADS Climate Solutions Simulator is based on best-available science and carefully compared with other major climate and energy models. En‑ROADS is free to use online and is available in more than a dozen languages, making it accessible to people all over the world.
            </p>
            <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed mt-4 leading-loose">
              <a 
                href="https://www.climateinteractive.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block mr-2 align-middle"
              >
                <Button 
                  variant="outline"
                  className="text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm sm:text-sm font-semibold px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all h-auto"
                >
                  Visit Climate Interactive →
                </Button>
              </a>
              to learn more about their climate simulators, experiences, insights and research, and how to become an En-ROADS Climate Ambassador through their facilitator training.
            </p>
          </div>

          {/*SPACER*/}
          <div className="h-6 sm:h-24 w-full block"></div>

          {/* About the Center for Systems Awareness Section */}
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 mb-3">
              Center for Systems Awareness
            </h2>
            <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed mb-4">
              The vision of the <a href="https://systemsawareness.org/youth-leadership-team/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Center for Systems Awareness Youth Leadership Team</a> is to increase the capacity for compassion, systems awareness, and self-mastery by training students worldwide and to develop compassionate leaders of the future.
            </p>
            <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed">
              For a decade, this team has been designing highly efficient and meaningful learning experiences in which the pursuit of knowledge, social and emotional literacy, self-agency, collaborative skills, and personal growth may be discovered and embodied using the Compassionate Systems Framework.
            </p>

            <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed mt-4 leading-loose">
              <a 
                href="https://systemsawareness.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block mr-2 align-middle"
              >
                <Button 
                  variant="outline"
                  className="text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm sm:text-sm font-semibold px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all h-auto"
                >
                  Visit the Center for Systems Awareness →
                </Button>
              </a>
              to learn more about upcoming programs.
            </p>
          </div>

          {/*SPACER*/}
          <div className="h-6 sm:h-16 w-full block"></div>

          {/* Meet Our Team Section */}
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 mb-4">
              Project Team
            </h2>
            <div className="space-y-4">
              <div className="flex flex-row gap-4">
                <TeamMemberCard
                  photo={lanaCookPhoto}
                  name="Dr. Lana Cook"
                  role="Project Lead"
                  bio="Associate Director | MIT Systems Awareness Lab"
                  linkedinLink="https://www.linkedin.com/in/lanacook/"
                />
                <TeamMemberCard
                  photo={peterSengePhoto}
                  name="Dr. Peter Senge"
                  role="Project Advisor"
                  bio="Co-Director, MIT Systems Awareness Lab | Senior Lecturer, MIT Sloan"
                  linkedinLink="https://mitsloan.mit.edu/faculty/directory/peter-m-senge"
                />
                <TeamMemberCard
                  photo={jonasJebrilPhoto}
                  name="Jonas Jebril"
                  role="Curriculum Design"
                  bio="Youth Leadership | Center for Systems Awareness"
                  linkedinLink="https://systemsawareness.org/person/jonas-jebril/"
                />
              </div>

              <div className="flex flex-row gap-4">
                <TeamMemberCard 
                  photo={tibyanPhoto} 
                  name="Tibyan Bilal" 
                  role="Web Developer" 
                  bio="Mathematical Engineering Student | YTÜ" 
                  linkedinLink="https://www.linkedin.com/in/tibyankhalid/"
                  compact
                />
                <TeamMemberCard 
                  photo={yevheniaPhoto} 
                  name="Yevheniia Rudenko" 
                  role="Web Developer" 
                  bio="Full Stack Developer | MIT Systems Awareness Lab" 
                  linkedinLink="https://www.linkedin.com/in/yevheniia-rudenko/"
                  compact
                />
                <TeamMemberCard 
                  photo={karimPhoto} 
                  name="Karim Makie" 
                  role="Web Developer" 
                  bio="Full Stack Developer | MIT Systems Awareness Lab" 
                  linkedinLink="https://www.linkedin.com/in/karim-makie/"
                  compact
                />
                <TeamMemberCard
                  photo={fiorellaPhoto}
                  name="Fiorella Massa"
                  role="Graphic Designer"
                  bio="Graphic Designer"
                  linkedinLink="https://www.behance.net/fiorellamassa"
                  compact
                />
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