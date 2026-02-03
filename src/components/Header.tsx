import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
// import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import systemsAwarenessLabLogo from '../assets/systemsAwarenessLabLogo.png';
import dayOfClimateLogo from '../assets/day_of_climate.png';

export function Header() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modulesDropdownOpen, setModulesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isRTL = language === 'ar';
  const pathname = location.pathname;

  // Helper to check if a module page is active
  const isModuleActive = pathname.startsWith('/module/');
  // Helper to check if a specific module is active
  const isSpecificModuleActive = (id: number) => pathname === `/module/${id}`;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setModulesDropdownOpen(false);
      }
    }

    if (modulesDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [modulesDropdownOpen]);

  // Close mobile menu when language changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setModulesDropdownOpen(false);
  }, [language]);

  const modules = [
    { id: 1, label: t.module1 },
    { id: 2, label: t.module2 },
    { id: 3, label: t.module3 },
    { id: 4, label: t.module4 },
    { id: 5, label: t.module5 },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setModulesDropdownOpen(false);
  };

  return (
    <header className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-sm sticky top-0 z-50 font-sora transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNavigate('/')}
            className="flex items-center gap-3 sm:gap-4 hover:opacity-80 transition-opacity"
            aria-label="Home"
          >
            <div className="flex items-center gap-4 sm:gap-6">
              <img
                src={dayOfClimateLogo}
                alt="Day of Climate"
                className="h-10 sm:h-12 w-auto"
              />
              <img
                src={systemsAwarenessLabLogo}
                alt="Systems Awareness Lab"
                className="h-6 sm:h-8 w-auto"
              />
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-foreground">
            {/* Modules Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setModulesDropdownOpen(!modulesDropdownOpen)}
                className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${isModuleActive
                  ? 'bg-primary/10 dark:bg-primary/20 text-primary'
                  : 'hover:bg-muted'
                  }`}
              >
                <span>{t.modules}</span>
                <ChevronDown size={16} className={`transition-transform ${modulesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {modulesDropdownOpen && (
                <div className={`absolute ${isRTL ? 'right-0' : 'left-0'} mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50`}>
                  {modules.map((module) => (
                    <button
                      key={module.id}
                      onClick={() => handleNavigate(`/module/${module.id}`)}
                      className={`w-full text-left px-4 py-2 transition-colors ${isSpecificModuleActive(module.id)
                        ? 'bg-primary/15 dark:bg-primary/25 text-primary'
                        : 'text-foreground hover:bg-muted'
                        }`}
                    >
                      <div className="text-sm text-gray-500 dark:text-gray-400">{t.modules} {module.id}</div>
                      <div className="font-medium">{module.label}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavigate('/about')}
              className={`px-3 py-2 rounded-md transition-colors ${pathname === '/about'
                ? 'bg-primary/10 dark:bg-primary/20 text-primary'
                : 'hover:bg-muted'
                }`}
            >
              {t.about}
            </button>

            <button
              onClick={() => handleNavigate('/educators')}
              className={`px-3 py-2 rounded-md transition-colors ${pathname === '/educators'
                ? 'bg-primary/10 dark:bg-primary/20 text-primary'
                : 'hover:bg-muted'
                }`}
            >
              {t.forEducators}
            </button>

            <button
              onClick={() => handleNavigate('/resources')}
              className={`px-3 py-2 rounded-md transition-colors ${pathname.startsWith('/resources')
                ? 'bg-primary/10 dark:bg-primary/20 text-primary'
                : 'hover:bg-muted'
                }`}
            >
              {t.resources}
            </button>

            <button
              onClick={() => handleNavigate('/glossary')}
              className={`px-3 py-2 rounded-md transition-colors ${pathname === '/glossary'
                ? 'bg-primary/10 dark:bg-primary/20 text-primary'
                : 'hover:bg-muted'
                }`}
            >
              {t.glossary}
            </button>

            {/* <LanguageSwitcher /> */}
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col gap-2 text-foreground">
              {/* Modules Section */}
              <div className="border-b border-gray-100 dark:border-gray-700 pb-2 mb-2">
                <button
                  onClick={() => setModulesDropdownOpen(!modulesDropdownOpen)}
                  className={`w-full flex items-center justify-between px-4 py-2 rounded-md transition-colors ${isModuleActive
                    ? 'bg-primary/10 dark:bg-primary/20 text-primary'
                    : 'hover:bg-muted'
                    }`}
                >
                  <span>{t.modules}</span>
                  <ChevronDown size={16} className={`transition-transform ${modulesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {modulesDropdownOpen && (
                  <div className={`mt-2 ${isRTL ? 'mr-4' : 'ml-4'} space-y-1`}>
                    {modules.map((module) => (
                      <button
                        key={module.id}
                        onClick={() => handleNavigate(`/module/${module.id}`)}
                        className={`w-full text-left px-4 py-2 rounded-md transition-colors ${isSpecificModuleActive(module.id)
                          ? 'bg-primary/15 dark:bg-primary/25 text-primary'
                          : 'text-foreground hover:bg-muted'
                          }`}
                      >
                        <div className="text-sm text-gray-500 dark:text-gray-400">{t.modules} {module.id}</div>
                        <div className="font-medium">{module.label}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => handleNavigate('/about')}
                className={`px-4 py-2 text-left rounded-md transition-colors ${pathname === '/about'
                  ? 'bg-primary/10 dark:bg-primary/20 text-primary'
                  : 'hover:bg-muted'
                  }`}
              >
                {t.about}
              </button>

              <button
                onClick={() => handleNavigate('/educators')}
                className={`px-4 py-2 text-left rounded-md transition-colors ${pathname === '/educators'
                  ? 'bg-primary/10 dark:bg-primary/20 text-primary'
                  : 'hover:bg-muted'
                  }`}
              >
                {t.forEducators}
              </button>

              <button
                onClick={() => handleNavigate('/resources')}
                className={`px-4 py-2 text-left rounded-md transition-colors ${pathname.startsWith('/resources')
                  ? 'bg-primary/10 dark:bg-primary/20 text-primary'
                  : 'hover:bg-muted'
                  }`}
              >
                {t.resources}
              </button>

              <button
                onClick={() => handleNavigate('/glossary')}
                className={`px-4 py-2 text-left rounded-md transition-colors ${pathname === '/glossary'
                  ? 'bg-primary/10 dark:bg-primary/20 text-primary'
                  : 'hover:bg-muted'
                  }`}
              >
                {t.glossary}
              </button>

              {/* Language Switcher in Mobile Menu */}
              <div className="px-4 py-2 mt-2 border-t border-gray-100 dark:border-gray-700 pt-4 flex items-center gap-3">
                {/* <LanguageSwitcher /> */}
                <ThemeToggle />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}