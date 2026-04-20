import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { Linkedin } from 'lucide-react';
import tibyanPhoto from '../assets/team_photos/tibyan.png';
import yevheniaPhoto from '../assets/team_photos/yevhenia.png';
import karimPhoto from '../assets/team_photos/karim.png';
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
  const { t, language } = useLanguage();

  const teamText = {
    en: {
      lanaRole: 'Project Lead',
      lanaBio: 'Associate Director | MIT Systems Awareness Lab',
      peterRole: 'Project Advisor',
      peterBio: 'Co-Director, MIT Systems Awareness Lab | Senior Lecturer, MIT Sloan',
      jonasRole: 'Curriculum Design',
      jonasBio: 'Youth Leadership | Center for Systems Awareness',
      webDeveloper: 'Web Developer',
      graphicDesigner: 'Graphic Designer',
      tibyanBio: 'Mathematical Engineering Student | YTÜ',
      fullStackBio: 'Full Stack Developer | MIT Systems Awareness Lab',
      fiorellaBio: 'Freelance graphic designer and photographer',
    },
    de: {
      lanaRole: 'Projektleitung',
      lanaBio: 'Stellvertretende Direktorin | MIT Systems Awareness Lab',
      peterRole: 'Projektberater',
      peterBio: 'Co-Direktor, MIT Systems Awareness Lab | Senior Lecturer, MIT Sloan',
      jonasRole: 'Curriculum-Design',
      jonasBio: 'Jugendführung | Center for Systems Awareness',
      webDeveloper: 'Webentwickler',
      graphicDesigner: 'Grafikdesignerin',
      tibyanBio: 'Student der mathematischen Ingenieurwissenschaften | YTÜ',
      fullStackBio: 'Full-Stack-Entwickler | MIT Systems Awareness Lab',
      fiorellaBio: 'Freiberufliche Grafikdesignerin und Fotografin',
    },
    es: {
      lanaRole: 'Líder del proyecto',
      lanaBio: 'Directora asociada | MIT Systems Awareness Lab',
      peterRole: 'Asesor del proyecto',
      peterBio: 'Co-director, MIT Systems Awareness Lab | Profesor sénior, MIT Sloan',
      jonasRole: 'Diseño curricular',
      jonasBio: 'Liderazgo juvenil | Center for Systems Awareness',
      webDeveloper: 'Desarrollador web',
      graphicDesigner: 'Diseñadora gráfica',
      tibyanBio: 'Estudiante de Ingeniería Matemática | YTÜ',
      fullStackBio: 'Desarrollador full stack | MIT Systems Awareness Lab',
      fiorellaBio: 'Diseñadora gráfica y fotógrafa freelance',
    },
  }[language];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 pt-20 font-sora">
      <div className="max-w-4xl w-full">
        <Link to="/">
          <Button
            variant="outline"
            className="mb-4 sm:mb-6 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-500 dark:hover:bg-gray-600"
          >
            ← {t.nav.backToHome}
          </Button>
        </Link>

        {/* Reverted to standard block layout */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 md:p-12">
          
          {/* Main About Heading - FORCED SIZE */}
          <h1 
            className="font-bold text-gray-800 dark:text-gray-100 text-center mb-4"
            style={{ fontSize: '3rem', lineHeight: '1.2' }}
          >
            {t.pages.about.title}
          </h1>
          
          {/* SPACER */}
          <div className="h-6 sm:h-16 w-full block"></div>

          {/* Curriculum Overview Section */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-green-600 mb-3">
              {t.pages.about.curriculumOverview.title}
            </h2>
            <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed mb-4">
              {t.pages.about.curriculumOverview.p1}
            </p>
            <ol className="list-decimal list-outside pl-14 sm:pl-16 text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed space-y-2">
              <li className="pl-2"><em>{t.pages.about.curriculumOverview.list1}</em></li>
              <li className="pl-2"><em>{t.pages.about.curriculumOverview.list2}</em></li>
              <li className="pl-2"><em>{t.pages.about.curriculumOverview.list3}</em></li>
            </ol>
          </div>
          
          {/* SPACER */}
          <div className="h-6 sm:h-24 w-full block"></div>

            <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed mb-4">
              {t.pages.about.curriculumOverview.p2.split('En-ROADS')[0]}
              <a href="https://www.climateinteractive.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">Climate Interactive</a>
              {t.pages.about.curriculumOverview.p2.split('Climate Interactive')[1]}
            </p>

          {/* SPACER */}
          <div className="h-1 sm:h-24 w-full block"></div>

            <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed mb-4">
              {t.pages.about.curriculumOverview.p3}
            </p>

          {/* SPACER */}
          <div className="h-6 sm:h-24 w-full block"></div>

          {/* About Day of Climate Section */}
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 mb-3">
              {t.pages.about.dayOfClimate.title}
            </h2>
            <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed">
              {t.pages.about.dayOfClimate.p1}
            </p>

          {/* SPACER */}
          <div className="h-6 sm:h-24 w-full block"></div>

            <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed">
              {t.pages.about.dayOfClimate.p2}
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
                  {t.pages.about.dayOfClimate.button}
                </Button>
              </a>
            </div>
          </div>

          {/*SPACER*/}
          <div className="h-6 sm:h-24 w-full block"></div>

          {/* About Systems Awareness Lab Section */}
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 mb-3">
              {t.pages.about.systemsAwarenessLab.title}
            </h2>
            <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed">
              {t.pages.about.systemsAwarenessLab.p1}
            </p>
            
          {/*SPACER*/}
          <div className="h-6 sm:h-24 w-full block"></div>

            <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed">
              {t.pages.about.systemsAwarenessLab.p2}
            </p>

          {/*SPACER*/}
          <div className="h-6 sm:h-24 w-full block"></div>
          
            <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed">
             {t.pages.about.systemsAwarenessLab.p3}
            </p>

          {/*SPACER*/}
          <div className="h-6 sm:h-24 w-full block"></div>

            <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed">
             {t.pages.about.systemsAwarenessLab.p4}
            </p>

          {/*SPACER*/}
          <div className="h-6 sm:h-24 w-full block"></div>

            <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed">
             {t.pages.about.systemsAwarenessLab.p5}
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
                  {t.pages.about.systemsAwarenessLab.button}
                </Button>
              </a>
            </div>
          </div>

          {/*SPACER*/}
          <div className="h-6 sm:h-24 w-full block"></div>

          {/* About Climate Interactive Section */}
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 mb-3">
              {t.pages.about.climateInteractive.title}
            </h2>
            <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed">
              {t.pages.about.climateInteractive.p1}
            </p>
            <div className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed mt-4 leading-loose flex flex-wrap items-center gap-2">
              <span>{t.pages.about.climateInteractive.toLearnMore}</span>
              <a 
                href="https://www.climateinteractive.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block align-middle"
              >
                <Button 
                  variant="outline"
                  className="text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm sm:text-sm font-semibold px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all h-auto"
                >
                  {t.pages.about.climateInteractive.button}
                </Button>
              </a>
            </div>
          </div>

          {/*SPACER*/}
          <div className="h-6 sm:h-24 w-full block"></div>

          {/* About the Center for Systems Awareness Section */}
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 mb-3">
              {t.pages.about.centerForSystemsAwareness.title}
            </h2>
            <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed mb-4">
              {t.pages.about.centerForSystemsAwareness.p1}
            </p>
            <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed">
              {t.pages.about.centerForSystemsAwareness.p2}
            </p>

            <div className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed mt-4 leading-loose flex flex-wrap items-center gap-2">
              <span>{t.pages.about.centerForSystemsAwareness.toLearnMore}</span>
              <a 
                href="https://systemsawareness.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block align-middle"
              >
                <Button 
                  variant="outline"
                  className="text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm sm:text-sm font-semibold px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all h-auto"
                >
                  {t.pages.about.centerForSystemsAwareness.button}
                </Button>
              </a>
            </div>
          </div>

          {/*SPACER*/}
          <div className="h-6 sm:h-16 w-full block"></div>

          {/* Meet Our Team Section */}
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 mb-4">
              {t.pages.about.projectTeam.title}
            </h2>
            <div className="space-y-4">
              <div className="flex flex-row gap-2">
                <TeamMemberCard
                  photo={lanaCookPhoto}
                  name="Dr. Lana Cook"
                  role={teamText.lanaRole}
                  bio={teamText.lanaBio}
                  linkedinLink="https://www.linkedin.com/in/lanacook/"
                />
                <TeamMemberCard
                  photo={peterSengePhoto}
                  name="Dr. Peter Senge"
                  role={teamText.peterRole}
                  bio={teamText.peterBio}
                  linkedinLink="https://mitsloan.mit.edu/faculty/directory/peter-m-senge"
                />
                <TeamMemberCard
                  photo={jonasJebrilPhoto}
                  name="Jonas Jebril"
                  role={teamText.jonasRole}
                  bio={teamText.jonasBio}
                  linkedinLink="https://systemsawareness.org/person/jonas-jebril/"
                />
              </div>

              <div className="flex flex-row gap-2">
                <TeamMemberCard 
                  photo={tibyanPhoto} 
                  name="Tibyan Bilal" 
                  role={teamText.webDeveloper} 
                  bio={teamText.tibyanBio} 
                  linkedinLink="https://www.linkedin.com/in/tibyankhalid/"
                  compact
                />
                <TeamMemberCard 
                  photo={yevheniaPhoto} 
                  name="Yevheniia Rudenko" 
                  role={teamText.webDeveloper} 
                  bio={teamText.fullStackBio} 
                  linkedinLink="https://www.linkedin.com/in/yevheniia-rudenko/"
                  compact
                />
                <TeamMemberCard 
                  photo={karimPhoto} 
                  name="Karim Makie" 
                  role={teamText.webDeveloper} 
                  bio={teamText.fullStackBio} 
                  linkedinLink="https://www.linkedin.com/in/karim-makie/"
                  compact
                />
                <TeamMemberCard
                  photo={fiorellaPhoto}
                  name="Fiorella Massa"
                  role={teamText.graphicDesigner}
                  bio={teamText.fiorellaBio}
                  linkedinLink="https://www.behance.net/fiorellamassa"
                  compact
                />
              </div>
            </div>
          </div>

          {/*SPACER*/}
          <div className="h-6 sm:h-16 w-full block"></div>

          {/* Contributors Link */}
          <div className="flex justify-center">
            <Link to="/contributors">
              <Button 
                variant="outline"
                className="text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-lg sm:text-xl font-semibold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                {(t.pages.about as any).viewContributors ?? (t.pages.about as any).contributorsLink ?? 'View Our Contributors & Credits →'}
              </Button>
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}