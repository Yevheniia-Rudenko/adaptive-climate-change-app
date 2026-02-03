import { Globe, Mail, Youtube, Linkedin, Accessibility, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <footer style={{ backgroundColor: '#ffffff' }} className="border-t border-[#245840] transition-colors min-h-[220px]">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-16">
          {footerSections.map((section) => (
            <div key={section.title} className="mb-4">
              <h3 className="text-2xl font-bold text-black mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 text-black hover:opacity-80 transition-colors duration-200"
                    >
                      <span className="flex-shrink-0 text-black transition-colors duration-200">
                        {link.icon}
                      </span>
                      <span className="text-sm font-medium">{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contributors Section */}
          <div className="mb-4">
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
            </ul>
          </div>
        </div>
      </div>

    </footer>
  );
}
