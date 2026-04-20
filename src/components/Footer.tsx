import { Globe, Mail, Youtube, Linkedin, Accessibility, Heart, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import systemsAwarenessLabLogoWhite from '../assets/logos/SAL_sub-brand_lockup_two-line_rgb_white.png';
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

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerSections: FooterSection[] = [
    {
      title: 'MIT Systems Awareness Lab',
      links: [
        {
          label: t.nav.footer.website,
          href: 'https://systemsawareness.mit.edu',
          icon: <Globe size={18} />,
        },
        {
          label: t.nav.footer.email,
          href: 'mailto:systemsawareness@mit.edu',
          icon: <Mail size={18} />,
        },
        {
          label: t.nav.footer.youtube,
          href: 'https://www.youtube.com/@mitsystemsawareness',
          icon: <Youtube size={18} />,
        },
        {
          label: t.nav.footer.linkedin,
          href: 'https://www.linkedin.com/company/mit-systems-awareness-lab/',
          icon: <Linkedin size={18} />,
        },
        {
          label: t.nav.footer.accessibility,
          href: 'https://www.mit.edu/accessibility/',
          icon: <Accessibility size={18} />,
        },
      ],
    },
    {
      title: 'Day of Climate',
      links: [
        {
          label: t.nav.footer.website,
          href: 'https://dayofclimate.mit.edu',
          icon: <Globe size={18} />,
        },
        {
          label: t.nav.footer.email,
          href: 'mailto:day-of-climate-rfp@mit.edu',
          icon: <Mail size={18} />,
        },
      ],
    },
  ];

  return (
    <div className="flex justify-center px-4 sm:px-6 pb-4 sm:pb-6">
      <footer style={{ backgroundColor: '#153833' }} className="max-w-4xl w-full rounded-2xl transition-colors shadow-lg">
        {/* Main Footer Content */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-col items-start gap-6 sm:flex-row justify-between">
            {footerSections.map((section) => (
              <div key={section.title} className="flex-1">
                {section.title === 'MIT Systems Awareness Lab' ? (
                  <img
                    src={systemsAwarenessLabLogoWhite}
                    alt="MIT Systems Awareness Lab Logo"
                    className="h-9 mb-4"
                  />
                ) : section.title === 'Day of Climate' ? (
                  <img
                    src={dayOfClimateLogo}
                    alt="Day of Climate Logo"
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
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-4">
                {t.nav.footer.aboutApp}
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
                    <span className="text-sm font-medium">{t.nav.footer.contributors}</span>
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
                    <span className="text-sm font-medium">{t.nav.footer.privacyPolicy}</span>
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
