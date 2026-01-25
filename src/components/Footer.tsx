import { Globe, Mail, Youtube, Linkedin, Accessibility } from 'lucide-react';

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
        label: 'Accessibility',
        href: 'https://www.mit.edu/accessibility/',
        icon: <Accessibility size={18} />,
      },
    ],
  },
  {
    title: 'Climate Interactive',
    links: [
      {
        label: 'Website',
        href: 'https://www.climateinteractive.org',
        icon: <Globe size={18} />,
      },
      {
        label: 'Email',
        href: 'mailto:support@climateinteractive.org',
        icon: <Mail size={18} />,
      },
      {
        label: 'YouTube',
        href: 'https://www.youtube.com/channel/UCqIrcmlomSKTJxYC2d0bOKw',
        icon: <Youtube size={18} />,
      },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/company/climate-interactive',
        icon: <Linkedin size={18} />,
      },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200"
                    >
                      <span className="flex-shrink-0 text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors duration-200">
                        {link.icon}
                      </span>
                      <span className="text-sm font-medium">{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Empowering climate action through systems thinking and interactive learning.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 flex-shrink-0">
              © {currentYear} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
