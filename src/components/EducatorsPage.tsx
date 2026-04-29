import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import {
  BookOpen,
  Users,
  Target,
  Download,
  Clock,
  GraduationCap,
  Lightbulb,
  MessageSquare,
  Calendar,
  Settings,
  FileText,
  Accessibility,
  Award,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Monitor,
  Layers
} from 'lucide-react';
import { TextWithGlossary } from './TextWithGlossary';
import { useState, useRef } from 'react';

// Section type definition
type Section = {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
};

// Collapsible component
function CollapsibleSection({
  title,
  children,
  defaultOpen = false
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
      >
        <span className="font-medium text-gray-900 dark:text-gray-100">{title}</span>
        {isOpen ? (
          <ChevronDown size={20} className="text-gray-500 dark:text-gray-400" />
        ) : (
          <ChevronRight size={20} className="text-gray-500 dark:text-gray-400" />
        )}
      </button>
      {isOpen && (
        <div className="p-4 bg-white dark:bg-gray-800">
          {children}
        </div>
      )}
    </div>
  );
}

// Callout box component
function CalloutBox({
  type,
  title,
  children
}: {
  type: 'tip' | 'pitfall' | 'note';
  title: string;
  children: React.ReactNode;
}) {
  const styles = {
    tip: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      icon: <Lightbulb size={20} className="text-green-600 dark:text-green-400" />,
      titleColor: 'text-green-800 dark:text-green-300'
    },
    pitfall: {
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      border: 'border-amber-200 dark:border-amber-800',
      icon: <AlertTriangle size={20} className="text-amber-600 dark:text-amber-400" />,
      titleColor: 'text-amber-800 dark:text-amber-300'
    },
    note: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      icon: <CheckCircle size={20} className="text-blue-600 dark:text-blue-400" />,
      titleColor: 'text-blue-800 dark:text-blue-300'
    }
  };

  const style = styles[type];
  // We intentionally compare against the English string only as a style cue;
  // the actual displayed title is always the prop passed in.
  const isFacilitatorTip = title.toLowerCase().includes('tip') || title.toLowerCase().includes('tipp') || title.toLowerCase().includes('consejo');

  return (
    <div className={`${style.bg} ${style.border} border rounded-lg p-4 my-4`}>
      <div className="flex items-center gap-2 mb-2">
        {style.icon}
        <span
          className={`${isFacilitatorTip ? 'font-bold' : 'font-semibold'} ${style.titleColor}`}
          style={isFacilitatorTip ? { fontStyle: 'italic' } : undefined}
        >
          {title}
        </span>
      </div>
      <div
        className="text-gray-700 dark:text-gray-300 text-sm"
        style={isFacilitatorTip ? { fontStyle: 'italic' } : undefined}
      >
        {children}
      </div>
    </div>
  );
}

export function EducatorsPage() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('overview');
  const [openTocModules, setOpenTocModules] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
  });
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const sectionCardClass = 'scroll-mt-6 rounded-2xl p-6 sm:p-8 mb-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md';

const sections: Section[] = [
    { id: 'overview', title: t.pages.educators.sections.overview.title, icon: BookOpen },
    { id: 'how-to-use', title: t.pages.educators.sections.howToUse.title, icon: Settings },
    { id: 'learning-objectives', title: t.pages.educators.sections.objectives.title, icon: Target },
    { id: 'lesson-flow', title: t.pages.educators.sections.lessonFlow.title, icon: MessageSquare },
    { id: 'formats', title: t.pages.educators.sections.formats.title, icon: Calendar },
    { id: 'enroads', title: t.pages.educators.sections.enroads.title, icon: Layers },
    { id: 'downloads', title: t.pages.educators.sections.downloads.title, icon: Download },
    { id: 'adaptations', title: t.pages.educators.sections.adaptations.title, icon: Accessibility },
    { id: 'professional-dev', title: t.pages.educators.sections.professionalDev.title, icon: Award },
    { id: 'faqs', title: t.pages.educators.sections.faqs.title, icon: HelpCircle },
  ];

  const defaultTocData = [
    {
      module: "Module 1: Relating to Climate Futures",
      id: 1,
      subsections: [
        "About this Module",
        "Understanding Climate Drivers and Impacts",
        "Exercise 1: Nature-Based Carbon Dioxide Removal",
        "Exercise 2: Renewable Energy",
        "Exercise 3: Fossil Fuels",
        "Exercise 4: Carbon Price",
        "The Practice of Hope",
        "Module end"
      ]
    },
    {
      module: "Module 2: Stock and Flow",
      id: 2,
      subsections: [
        "About this Module",
        "Why This Matters for Climate Change",
        "Understanding CO₂ Removals",
        "How this works in the simulation",
        "Why This Matters for Climate Change",
        "The Vision of “Net‑Zero Emissions”",
        "Hope As A Stock",
        "Module end"
      ]
    },
    {
      module: "Module 3: Roadmaps to Possible Futures",
      id: 3,
      subsections: [
        "About this Module",
        "Group Activity",
        "Explore the Scenario in En‑ROADS",
        "So here’s the big question:",
        "Create Your Own Climate Policy Scenario in En‑ROADS",
        "Welcome back! ",
        "Imagining the Future",
        "Module end"
      ]
    },
    {
      module: "Module 4: Systems View of Climate Solutions",
      id: 4,
      subsections: [
        "About this Module",
        "Top of the Iceberg: Events",
        "Just Below the Surface: Patterns & Trends",
        "Deeper: Underlying Systemic Structures",
        "Deepest Level: Mental Models",
        "Why Think About Climate Systems Using the Iceberg Model?",
        "Draw Your Own Climate Iceberg",
        "Let's Reflect",
        "Why the Systems Iceberg Matters for Climate Change",
        "Module end"
      ]
    },
    {
      module: "Module 5: Lever of Change",
      id: 5,
      subsections: [
        "You have a role to play.",
        "You are not alone: the power of collective leadership",
        "Finding Your Climate Action",
        "Designing for Systems Change",
        "Caring for Your Energy (So You Can Sustain Action)",
        "Let's Reflect",
        "Module end"
      ]
    }
  ];

  const tocData = ((t.pages.educators as any)?.tocModules as typeof defaultTocData | undefined) ?? defaultTocData;

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionRefs.current[sectionId]) {
      sectionRefs.current[sectionId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleTocModule = (moduleId: number) => {
    setOpenTocModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

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

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
          {/* Page Header */}
          <div className="mb-4 sm:mb-5 pb-0">
            <h1
              className="font-bold text-gray-800 dark:text-gray-100 text-center mb-3 sm:mb-4"
              style={{ fontSize: '3rem', lineHeight: '1.2' }}
            >
              {t.pages.educators.header.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-3xl">
              {t.pages.educators.header.description}
            </p>
          </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left Navigation Sidebar */}
          <aside className="lg:w-64 flex-shrink-0 flex flex-col gap-6 lg:sticky lg:top-6 max-h-[calc(100vh-3rem)] overflow-y-auto no-scrollbar pb-6">
            
            {/* Sections Container */}
            <div className="rounded-2xl p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md">
              <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">
                {t.pages.educators.sidebar.sections}
              </h2>
              <nav className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-all duration-200 ${activeSection === section.id
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-medium'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200'
                        }`}
                    >
                      <Icon size={18} />
                      <span>{section.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Table of Contents Container */}
            <div className="rounded-2xl p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md">
              <h2 className="text-xl font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">
                {t.pages.educators.sidebar.toc}
              </h2>
              <div className="space-y-3">
                {tocData.map((module) => (
                  <div key={module.id} className="border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800/50">
                    <button
                      onClick={() => toggleTocModule(module.id)}
                      className="w-full bg-gray-100/80 dark:bg-gray-700/80 px-3 py-3 font-semibold text-gray-800 dark:text-gray-200 text-base border-b border-gray-200 dark:border-gray-600 leading-snug flex items-center justify-between text-left hover:bg-gray-200/80 dark:hover:bg-gray-700 transition-colors"
                    >
                      <span>{module.module}</span>
                      {openTocModules[module.id] ? (
                        <ChevronDown size={18} className="text-gray-500 dark:text-gray-400 flex-shrink-0" />
                      ) : (
                        <ChevronRight size={18} className="text-gray-500 dark:text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    {openTocModules[module.id] && (
                      <ul className="p-3 space-y-2.5">
                        {module.subsections.map((sub, index) => (
                          <li key={index} className="text-sm">
                            <Link 
                              to={`/module/${module.id}?block=${index + 1}`}
                              className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors flex items-start gap-2"
                            >
                              <span className="text-green-600/70 dark:text-green-500/70 font-semibold min-w-[1.4rem]">{index + 1}.</span>
                              <span className="leading-snug">{sub}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link to="/resources" className="block">
                  <Button variant="outline" size="sm" className="w-full">
                    {t.pages.educators.sidebar.resourcesBtn}
                  </Button>
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
              <div>

              {/* Section 1: Overview */}
              <section
                ref={(el) => { sectionRefs.current['overview'] = el; }}
                className={sectionCardClass}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <BookOpen className="text-green-600 dark:text-green-400" size={20} />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    {t.pages.educators.sections.overview.title}
                  </h2>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t.pages.educators.sections.overview.description}
                </p>

                {/* Key Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <Clock size={24} className="text-green-600 dark:text-green-400 mb-2" />
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">{t.pages.educators.sections.overview.time.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{t.pages.educators.sections.overview.time.value}</p>
                    <p className="text-gray-500 dark:text-gray-500 text-xs">{t.pages.educators.sections.overview.time.subtext}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <Users size={24} className="text-green-600 dark:text-green-400 mb-2" />
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">{t.pages.educators.sections.overview.audience.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{t.pages.educators.sections.overview.audience.value}</p>
                    <p className="text-gray-500 dark:text-gray-500 text-xs">{t.pages.educators.sections.overview.audience.subtext}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <FileText size={24} className="text-green-600 dark:text-green-400 mb-2" />
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">{t.pages.educators.sections.overview.materials.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{t.pages.educators.sections.overview.materials.value}</p>
                    <p className="text-gray-500 dark:text-gray-500 text-xs">{t.pages.educators.sections.overview.materials.subtext}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <Monitor size={24} className="text-green-600 dark:text-green-400 mb-2" />
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">{t.pages.educators.sections.overview.tech.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{t.pages.educators.sections.overview.tech.value}</p>
                    <p className="text-gray-500 dark:text-gray-500 text-xs">{t.pages.educators.sections.overview.tech.subtext}</p>
                  </div>
                </div>

                <CalloutBox type="note" title={t.pages.educators.sections.overview.flexibleTip.title}>
                  {t.pages.educators.sections.overview.flexibleTip.text}
                </CalloutBox>
              </section>

              {/* Section 2: How to Use This Curriculum */}
              <section
                ref={(el) => { sectionRefs.current['how-to-use'] = el; }}
                className={sectionCardClass}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Settings className="text-blue-600 dark:text-blue-400" size={20} />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    {t.pages.educators.sections.howToUse.title}
                  </h2>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t.pages.educators.sections.howToUse.description}
                </p>

                <div className="space-y-4">
                  {t.pages.educators.sections.howToUse.steps.map((step, i) => (
                    <CollapsibleSection key={i} title={step.title} defaultOpen={i === 0}>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 text-sm">
                        {step.items.map((item, j) => (
                          <li key={j} className="inline-block w-full">
                            <TextWithGlossary text={item} as="span" disableGlossary={true} />
                          </li>
                        ))}
                      </ul>
                    </CollapsibleSection>
                  ))}
                </div>
                <div className="mt-6" />
                <CalloutBox type="tip" title={t.pages.educators.sections.howToUse.tip.title}>
                  {t.pages.educators.sections.howToUse.tip.text}
                </CalloutBox>
              </section>

              {/* Section 3: Learning Objectives */}
              <section
                ref={(el) => { sectionRefs.current['learning-objectives'] = el; }}
                className={sectionCardClass}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                    <Target className="text-teal-600 dark:text-teal-400" size={20} />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    {t.pages.educators.sections.objectives.title}
                  </h2>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t.pages.educators.sections.objectives.description}
                </p>

                <div className="space-y-3">
                  {t.pages.educators.sections.objectives.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <CheckCircle size={20} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">{item.title}</h4>
                        <TextWithGlossary text={item.text} as="p" className="text-gray-600 dark:text-gray-400 text-sm whitespace-pre-line" disableGlossary={true} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 4: Lesson Flow & Facilitation */}
              <section
                ref={(el) => { sectionRefs.current['lesson-flow'] = el; }}
                className={sectionCardClass}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <MessageSquare className="text-purple-600 dark:text-purple-400" size={20} />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    {t.pages.educators.sections.lessonFlow.title}
                  </h2>
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">{t.pages.educators.sections.lessonFlow.subtitle1}</h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t.pages.educators.sections.lessonFlow.description1}
                </p>

                <div className="space-y-4 mb-6">
                  {t.pages.educators.sections.lessonFlow.flowItems.map((item, i) => (
                    <CollapsibleSection key={i} title={item.title} defaultOpen={i === 0}>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{item.text}</p>
                    </CollapsibleSection>
                  ))}
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">{t.pages.educators.sections.lessonFlow.subtitle2}</h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 text-sm">
                    {t.pages.educators.sections.lessonFlow.prompts.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">{t.pages.educators.sections.lessonFlow.subtitle3}</h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 text-sm">
                    {t.pages.educators.sections.lessonFlow.questions.map((q, i) => <li key={i}>{q}</li>)}
                  </ul>
                </div>
                <div className="mt-6" />
                <CalloutBox type="tip" title={t.pages.educators.sections.lessonFlow.tip.title}>
                  {t.pages.educators.sections.lessonFlow.tip.text}
                </CalloutBox>
              </section>

              {/* Section 5: Classroom & Workshop Formats */}
              <section
                ref={(el) => { sectionRefs.current['formats'] = el; }}
                className={sectionCardClass}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <Calendar className="text-orange-600 dark:text-orange-400" size={20} />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    {t.pages.educators.sections.formats.title}
                  </h2>
                </div>

                <div className="space-y-4">
                  {t.pages.educators.sections.formats.items.map((fmt, i) => (
                    <CollapsibleSection key={i} title={fmt.title} defaultOpen={i === 0}>
                      <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                        <p className="font-medium">{fmt.subtitle}</p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          {fmt.bulletPoints.map((bp, j) => <li key={j}>{bp}</li>)}
                        </ul>
                      </div>
                    </CollapsibleSection>
                  ))}
                </div>

                <div className="mt-6">
                  <CalloutBox type="tip" title={t.pages.educators.sections.formats.tip.title}>
                    {t.pages.educators.sections.formats.tip.text}
                  </CalloutBox>
                </div>
              </section>

              {/* Section 6: En-ROADS & Systems Tools */}
              <section
                ref={(el) => { sectionRefs.current['enroads'] = el; }}
                className={sectionCardClass}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                    <Layers className="text-indigo-600 dark:text-indigo-400" size={20} />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    {t.pages.educators.sections.enroads.title}
                  </h2>
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">{t.pages.educators.sections.enroads.subtitle1}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                  <a
                    href="https://en-roads.climateinteractive.org/scenario.html?v=26.4.0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    En-ROADS
                  </a>{' '}
                  {t.pages.educators.sections.enroads.p1}{' '}
                  <a
                    href="https://www.climateinteractive.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    Climate Interactive
                  </a>{' '}
                  {t.pages.educators.sections.enroads.p2}
                </p>

                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">{t.pages.educators.sections.enroads.subtitle2}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">{t.pages.educators.sections.enroads.simplified.title}</h4>
                    <ul className="text-green-700 dark:text-green-400 text-sm space-y-1">
                      {t.pages.educators.sections.enroads.simplified.items.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">{t.pages.educators.sections.enroads.full.title}</h4>
                    <ul className="text-blue-700 dark:text-blue-400 text-sm space-y-1">
                      {t.pages.educators.sections.enroads.full.items.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">{t.pages.educators.sections.enroads.subtitle3}</h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                  <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-4">
                    {t.pages.educators.sections.enroads.usage.map((u, i) => (
                      <li key={i}><strong>{u.label}</strong> {u.text}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-row flex-wrap gap-3 mb-2">
                  <a
                    href="https://www.climateinteractive.org/en-roads/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border-2 border-indigo-600 dark:border-indigo-500 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors text-sm font-semibold"
                  >
                    <ExternalLink size={16} />
                    {t.pages.educators.sections.enroads.visitLink}
                  </a>

                  <a
                    href="https://docs.google.com/presentation/d/1vMWTb9xpBjTX-EVpygowQGXio89y2Y9RNd8TvVUciHE/edit?slide=id.p3#slide=id.p3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-indigo-300 dark:border-indigo-600 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors text-sm font-medium"
                  >
                    <ExternalLink size={16} />
                    {t.pages.educators.sections.enroads.howPeopleUseLink}
                  </a>
                </div>

                <CalloutBox type="tip" title={t.pages.educators.sections.enroads.tip.title}>
                  {t.pages.educators.sections.enroads.tip.text}
                </CalloutBox>
              </section>

              {/* Section 7: Downloadable Materials */}
              <section
                ref={(el) => { sectionRefs.current['downloads'] = el; }}
                className={sectionCardClass}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                    <Download className="text-pink-600 dark:text-pink-400" size={20} />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    {t.pages.educators.sections.downloads.title}
                  </h2>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
                  {t.pages.educators.sections.downloads.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <FileText size={32} className="text-red-500 mb-3" />
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">{t.pages.educators.sections.downloads.worksheets.title}</h4>
                    <TextWithGlossary text={t.pages.educators.sections.downloads.worksheets.desc} as="p" className="text-gray-500 dark:text-gray-400 text-xs mb-3" disableGlossary={true} />
                    <a
                      href="https://drive.google.com/file/d/1VlDmsX8SJUJk2d6uRX6yxf6XWMixppdQ/view"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button variant="outline" size="sm" className="w-full">
                        <Download size={14} className="mr-2" />
                        {t.pages.educators.sections.downloads.worksheets.btn}
                      </Button>
                    </a>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <FileText size={32} className="text-blue-500 mb-3" />
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">{t.pages.educators.sections.downloads.guide.title}</h4>
                    <TextWithGlossary text={t.pages.educators.sections.downloads.guide.desc} as="p" className="text-gray-500 dark:text-gray-400 text-xs mb-3" disableGlossary={true} />
                    <a
                      href="https://docs.google.com/document/d/1VBAsgn1bI3qElLKjSzrpaPxjv7Xp71APCIApMFSXkEI/edit?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button variant="outline" size="sm" className="w-full">
                        <Download size={14} className="mr-2" />
                        {t.pages.educators.sections.downloads.guide.btn}
                      </Button>
                    </a>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <FileText size={32} className="text-orange-500 mb-3" />
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">{t.pages.educators.sections.downloads.slides.title}</h4>
                    <TextWithGlossary text={t.pages.educators.sections.downloads.slides.desc} as="p" className="text-gray-500 dark:text-gray-400 text-xs mb-3" disableGlossary={true} />
                    <a
                      href="https://docs.google.com/presentation/d/1umatC5r_7w39ZlDvg5TLfvuHEbTseCqS2Vx2zOAU0dw/edit?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button variant="outline" size="sm" className="w-full">
                        <Download size={14} className="mr-2" />
                        {t.pages.educators.sections.downloads.slides.btn}
                      </Button>
                    </a>
                  </div>
                </div>
              </section>

              {/* Section 8: Adaptations for Learners */}
              <section
                ref={(el) => { sectionRefs.current['adaptations'] = el; }}
                className={sectionCardClass}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
                    <Accessibility className="text-cyan-600 dark:text-cyan-400" size={20} />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    {t.pages.educators.sections.adaptations.title}
                  </h2>
                </div>

                <div className="space-y-4">
                  <CollapsibleSection title={t.pages.educators.sections.adaptations.ageGroups.title} defaultOpen={true}>
                    <div className="space-y-3 text-sm">
                      {t.pages.educators.sections.adaptations.ageGroups.items.map((item, i) => (
                        <div key={i}>
                          <h5 className="font-medium text-gray-900 dark:text-gray-100">{item.title}</h5>
                          <TextWithGlossary text={item.text} as="p" className="text-gray-600 dark:text-gray-400" disableGlossary={true} />
                        </div>
                      ))}
                    </div>
                  </CollapsibleSection>

                  <CollapsibleSection title={t.pages.educators.sections.adaptations.accessibility.title}>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 text-sm">
                      {t.pages.educators.sections.adaptations.accessibility.items.map((item, i) => (
                        <li key={i} className="inline-block w-full">
                          <TextWithGlossary text={item} as="span" disableGlossary={true} />
                        </li>
                      ))}
                    </ul>
                  </CollapsibleSection>

                  <CollapsibleSection title={t.pages.educators.sections.adaptations.contexts.title}>
                    <div className="space-y-3 text-sm">
                      {t.pages.educators.sections.adaptations.contexts.items.map((item, i) => (
                        <div key={i}>
                          <h5 className="font-medium text-gray-900 dark:text-gray-100">{item.title}</h5>
                          <TextWithGlossary text={item.text} as="p" className="text-gray-600 dark:text-gray-400" disableGlossary={true} />
                        </div>
                      ))}
                    </div>
                  </CollapsibleSection>
                </div>
              </section>

              {/* Section 9: Teacher Professional Development */}
              <section
                ref={(el) => { sectionRefs.current['professional-dev'] = el; }}
                className={sectionCardClass}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                    <Award className="text-amber-600 dark:text-amber-400" size={20} />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    {t.pages.educators.sections.professionalDev.title}
                  </h2>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                  {t.pages.educators.sections.professionalDev.description}
                </p>


                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5 mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">{t.pages.educators.sections.professionalDev.block2.title}</h3>
                  <div className="space-y-4 text-sm">
                    {t.pages.educators.sections.professionalDev.block2.items.map((item, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="w-20 flex-shrink-0 text-gray-500 dark:text-gray-400">{item.time}</div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">{item.title}</h4>
                          <TextWithGlossary text={item.text} as="p" className="text-gray-600 dark:text-gray-400" disableGlossary={true} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <CalloutBox type="tip" title={t.pages.educators.sections.professionalDev.tip.title}>
                  {t.pages.educators.sections.professionalDev.tip.text}
                </CalloutBox>

              </section>


              {/* Section 10: FAQs & Troubleshooting */}
              <section
                ref={(el) => { sectionRefs.current['faqs'] = el; }}
                className={sectionCardClass}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                    <HelpCircle className="text-rose-600 dark:text-rose-400" size={20} />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    {t.pages.educators.sections.faqs.title}
                  </h2>
                </div>

                <div className="space-y-3">
                  {t.pages.educators.sections.faqs.sections.map((section, i) => (
                    <CollapsibleSection key={i} title={section.title} defaultOpen={i === 0}>
                      <div className="space-y-4 text-sm">
                        {section.items.map((item, j) => (
                          <div key={j}>
                            <h5 className="font-medium text-gray-900 dark:text-gray-100">{item.q}</h5>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">{item.a}</p>
                          </div>
                        ))}
                      </div>
                    </CollapsibleSection>
                  ))}
                </div>
              </section>

              </div>

              {/* Footer */}
              <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  {t.pages.educators.footer.text1}<br />
                  <span className="text-green-600 dark:text-green-400">{t.pages.educators.footer.email}</span>
                </p>
              </div>
          </main>
        </div>
        </div>
      </div>
    </div>
  );
}