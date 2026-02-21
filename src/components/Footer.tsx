import { Globe, Mail, Youtube, Linkedin, Accessibility, Heart, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import systemsAwarenessLabLogo from '../assets/systemsAwarenessLabLogo.png';
import dayOfClimateLogo from '../assets/day_of_climate.png';

type FooterLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

const footerSections: FooterSection[] = [
  {
    title: 'MIT Systems Awareness Lab',
    links: [
      {
        label: 'Website',
        href: 'https://systemsawareness.mit.edu',
        icon: <Globe size={18} />,
      },
      {
        label: 'Email',
        href: 'mailto:systemsawareness@mit.edu',
        icon: <Mail size={18} />,
      },
      {
        label: 'YouTube',
        href: 'https://www.youtube.com/@mitsystemsawareness',
        icon: <Youtube size={18} />,
      },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/company/mit-systems-awareness-lab/',
        icon: <Linkedin size={18} />,
      },
      {
        label: 'MIT Accessibility',
        href: 'https://www.mit.edu/accessibility/',
        icon: <Accessibility size={18} />,
      },
    ],
  },
  {
    title: 'Day of Climate',
    links: [
      {
        label: 'Website',
        href: 'https://dayofclimate.mit.edu',
        icon: <Globe size={18} />,
      },
      {
        label: 'Email',
        href: 'mailto:day-of-climate-rfp@mit.edu',
        icon: <Mail size={18} />,
      },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex justify-center px-4 sm:px-6 pb-4 sm:pb-6">
      <footer style={{ backgroundColor: '#283b2e' }} className="max-w-4xl w-full rounded-2xl transition-colors shadow-lg">
        {/* Main Footer Content */}
        <div className="p-6 sm:p-8">
          <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem', justifyContent: 'space-between' }}>
          {footerSections.map((section) => (
            <div key={section.title} style={{ flex: 1 }}>
              {section.title === 'MIT Systems Awareness Lab' ? (
                <img 
                  src={systemsAwarenessLabLogo} 
                  alt="MIT Systems Awareness Lab" 
                  className="h-9 mb-4"
                />
              ) : section.title === 'Day of Climate' ? (
                <img 
                  src={dayOfClimateLogo} 
                  alt="Day of Climate" 
                  className="h-16 mb-4"
                />
              ) : (
                <h3 className="text-2xl font-bold text-white mb-4">
                  {section.title}
                </h3>
              )}
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 text-white hover:opacity-80 transition-colors duration-200"
                    >
                      <span className="flex-shrink-0 text-white transition-colors duration-200">
                        {link.icon}
                      </span>
                      <span className="text-sm font-medium">{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* About This App Section */}
          <div style={{ flex: 1 }}>
            <h3 className="text-2xl font-bold text-white mb-4">
              About This App
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/contributors"
                  className="group flex items-center gap-3 text-white hover:opacity-80 transition-colors duration-200"
                >
                  <span className="flex-shrink-0 text-white transition-colors duration-200">
                    <Heart size={18} />
                  </span>
                  <span className="text-sm font-medium">Contributors & Credits</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="group flex items-center gap-3 text-white hover:opacity-80 transition-colors duration-200"
                >
                  <span className="flex-shrink-0 text-white transition-colors duration-200">
                    <Shield size={18} />
                  </span>
                  <span className="text-sm font-medium">Privacy Policy</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </footer>
    </div>
  );
}
