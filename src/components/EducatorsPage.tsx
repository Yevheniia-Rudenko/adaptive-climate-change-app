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
        className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
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

  return (
    <div className={`${style.bg} ${style.border} border rounded-lg p-4 my-4`}>
      <div className="flex items-center gap-2 mb-2">
        {style.icon}
        <span className={`font-semibold ${style.titleColor}`}>{title}</span>
      </div>
      <div className="text-gray-700 dark:text-gray-300 text-sm">
        {children}
      </div>
    </div>
  );
}

export function EducatorsPage() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('overview');
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const sections: Section[] = [
    { id: 'overview', title: 'Overview', icon: BookOpen },
    { id: 'how-to-use', title: 'How to Use', icon: Settings },
    { id: 'learning-objectives', title: 'Learning Objectives', icon: Target },
    { id: 'lesson-flow', title: 'Lesson Flow', icon: MessageSquare },
    { id: 'formats', title: 'Class Formats', icon: Calendar },
    { id: 'enroads', title: 'En-ROADS & Tools', icon: Layers },
    { id: 'downloads', title: 'Downloads', icon: Download },
    { id: 'adaptations', title: 'Adaptations', icon: Accessibility },
    { id: 'professional-dev', title: 'Professional Dev', icon: Award },
    { id: 'faqs', title: 'FAQs', icon: HelpCircle },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionRefs.current[sectionId]) {
      sectionRefs.current[sectionId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-6 font-sora">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link to="/">
          <Button
            variant="outline"
            className="mb-4 sm:mb-6"
          >
            ← {t.backHome}
          </Button>
        </Link>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left Navigation Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 lg:sticky lg:top-6">
              <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Sections
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
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
              {/* Page Header */}
              <div className="mb-8 sm:mb-10 pb-6 border-b border-gray-200 dark:border-gray-700">
                <h1 className="text-green-600 text-2xl sm:text-3xl font-bold mb-3">Educator Guide</h1>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-3xl">
                  Welcome! This guide supports you in teaching and facilitating the climate systems curriculum.
                  Here you'll find everything you need to effectively use this platform in your classroom or workshop settings.
                </p>
              </div>

              {/* Section 1: Overview */}
              <section
                ref={(el) => { sectionRefs.current['overview'] = el; }}
                className="mb-10 sm:mb-12 scroll-mt-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <BookOpen className="text-green-600 dark:text-green-400" size={20} />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    Overview (At a Glance)
                  </h2>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  This curriculum is designed to help students aged 14-18 develop systems thinking skills
                  and understand climate change through interactive modules and simulations.
                </p>

                {/* Key Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <Clock size={24} className="text-green-600 dark:text-green-400 mb-2" />
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">Estimated Time</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">5-6 hours total</p>
                    <p className="text-gray-500 dark:text-gray-500 text-xs">45-60 min per module</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <Users size={24} className="text-green-600 dark:text-green-400 mb-2" />
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">Target Audience</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Ages 14-18</p>
                    <p className="text-gray-500 dark:text-gray-500 text-xs">High school level</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <FileText size={24} className="text-green-600 dark:text-green-400 mb-2" />
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">Materials Needed</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Internet access</p>
                    <p className="text-gray-500 dark:text-gray-500 text-xs">Optional: worksheets</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <Monitor size={24} className="text-green-600 dark:text-green-400 mb-2" />
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">Tech Requirements</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Modern browser</p>
                    <p className="text-gray-500 dark:text-gray-500 text-xs">Desktop, tablet, or mobile</p>
                  </div>
                </div>


                <CalloutBox type="note" title="Flexible Design">
                  The curriculum is modular—use all 5 modules sequentially or select specific modules
                  that fit your teaching needs and available time.
                </CalloutBox>
                <div className="mb-8" />
              </section>
              <div className="mb-14 sm:mb-16" />

              {/* Section 2: How to Use This Curriculum */}
              <section
                ref={(el) => { sectionRefs.current['how-to-use'] = el; }}
                className="mb-10 sm:mb-12 scroll-mt-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Settings className="text-blue-600 dark:text-blue-400" size={20} />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    How to Use This Curriculum
                  </h2>
                </div>

                <div className="space-y-4">
                  <CollapsibleSection title="Step 1: Familiarize Yourself" defaultOpen={true}>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 text-sm">
                      <li>Review all 5 modules to understand the content flow</li>
                      <li>Explore the <strong>Glossary</strong> tab for key terminology</li>
                      <li>Check the <strong>Resources</strong> section for supplementary materials</li>
                      <li>Try the interactive En-ROADS dashboard yourself</li>
                    </ul>
                  </CollapsibleSection>

                  <CollapsibleSection title="Step 2: Plan Your Sessions">
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 text-sm">
                      <li>Decide whether to use all modules or select specific ones</li>
                      <li>Allocate 45-60 minutes per module</li>
                      <li>Plan discussion time and reflection activities</li>
                      <li>Prepare any supplementary materials (worksheets, slides)</li>
                    </ul>
                  </CollapsibleSection>

                  <CollapsibleSection title="Step 3: Prepare Your Environment">
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 text-sm">
                      <li>Ensure stable internet connection</li>
                      <li>Test the platform on your classroom devices</li>
                      <li>Prepare projection capability for group discussions</li>
                      <li>Have backup materials ready in case of technical issues</li>
                    </ul>
                  </CollapsibleSection>

                  <CollapsibleSection title="Step 4: Facilitate & Support">
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 text-sm">
                      <li>Guide students through modules at an appropriate pace</li>
                      <li>Pause for discussion at key points</li>
                      <li>Encourage use of reflection prompts</li>
                      <li>Connect concepts to local and global contexts</li>
                    </ul>
                  </CollapsibleSection>
                </div>
                <div className="mb-8" />

                <div className="mb-14 sm:mb-16" />

                <CalloutBox type="tip" title="Facilitator Tip">
                  Before your first session, work through one complete module as a student would.
                  This helps you anticipate questions and identify good discussion points.
                </CalloutBox>
                <div className="mb-8" />
              </section>
              <div className="mb-14 sm:mb-16" />

              {/* Section 3: Learning Objectives */}
              <section
                ref={(el) => { sectionRefs.current['learning-objectives'] = el; }}
                className="mb-10 sm:mb-12 scroll-mt-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                    <Target className="text-teal-600 dark:text-teal-400" size={20} />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    Learning Objectives
                  </h2>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  By the end of this curriculum, students will be able to:
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <CheckCircle size={20} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">Systems Thinking</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Identify feedback loops, leverage points, and interconnections in climate systems</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <CheckCircle size={20} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">Climate Science Understanding</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Explain the greenhouse effect, climate drivers, and projected impacts</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <CheckCircle size={20} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">Solution Evaluation</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Analyze and compare different climate solutions using simulation tools</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <CheckCircle size={20} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">Discussion Skills</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Engage in constructive dialogue about climate policy and personal action</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <CheckCircle size={20} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">Agency & Action</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Identify personal and collective actions to address climate change</p>
                    </div>
                  </div>
                </div>
                <div className="mb-8" />
              </section>
              <div className="mb-14 sm:mb-16" />

              {/* Section 4: Lesson Flow & Facilitation */}
              <section
                ref={(el) => { sectionRefs.current['lesson-flow'] = el; }}
                className="mb-10 sm:mb-12 scroll-mt-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <MessageSquare className="text-purple-600 dark:text-purple-400" size={20} />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    Lesson Flow & Facilitation
                  </h2>
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Suggested Lesson Structure</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-16 text-center flex-shrink-0">
                      <span className="inline-block px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded">5-10 min</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">Opening</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Warm-up question, connect to prior knowledge, introduce today's focus</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-16 text-center flex-shrink-0">
                      <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-medium rounded">30-40 min</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">Core Activity</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Students work through module content, interact with simulations, pause for discussions</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-16 text-center flex-shrink-0">
                      <span className="inline-block px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-medium rounded">10-15 min</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">Reflection & Debrief</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Written reflections, group discussion, connections to real world</p>
                    </div>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Sample Discussion Prompts</h3>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-4">
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 text-sm">
                    <li>What surprised you most about the simulation results?</li>
                    <li>How do the solutions we explored connect to each other?</li>
                    <li>What trade-offs did you notice between different approaches?</li>
                    <li>How might this apply to our local community?</li>
                    <li>What questions do you still have?</li>
                  </ul>
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Reflection Questions</h3>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 text-sm">
                    <li>What is one thing you learned today that changed how you think about climate?</li>
                    <li>What action could you take this week based on what you learned?</li>
                    <li>What would you want to explore further?</li>
                  </ul>
                </div>
                <div className="mb-8" />

                <div className="mb-14 sm:mb-16" />
                <CalloutBox type="tip" title="Facilitator Tip">
                  Allow students to share reflections in pairs before whole-group discussion.
                  This increases participation and helps students articulate their thoughts.
                </CalloutBox>
                <div className="mb-8" />
              </section>
              <div className="mb-14 sm:mb-16" />

              {/* Section 5: Classroom & Workshop Formats */}
              <section
                ref={(el) => { sectionRefs.current['formats'] = el; }}
                className="mb-10 sm:mb-12 scroll-mt-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <Calendar className="text-orange-600 dark:text-orange-400" size={20} />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    Classroom & Workshop Formats
                  </h2>
                </div>

                <div className="space-y-4">
                  <CollapsibleSection title="30-Minute Introduction" defaultOpen={true}>
                    <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                      <p className="font-medium">Best for: Assembly presentations, introductory sessions</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>5 min: Introduction to climate systems thinking</li>
                        <li>15 min: Quick demonstration of one module or simulation</li>
                        <li>10 min: Q&A and next steps</li>
                      </ul>
                    </div>
                  </CollapsibleSection>

                  <CollapsibleSection title="60-90 Minute Class Session">
                    <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                      <p className="font-medium">Best for: Single-period classes, after-school programs</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>10 min: Opening and context setting</li>
                        <li>40-60 min: Complete one full module</li>
                        <li>15-20 min: Discussion and reflection</li>
                      </ul>
                    </div>
                  </CollapsibleSection>

                  <CollapsibleSection title="Multi-Session Workshop (5+ Sessions)">
                    <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                      <p className="font-medium">Best for: Deep learning, comprehensive coverage</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Session 1: Introduction + Module 1 (Systems Basics)</li>
                        <li>Session 2: Module 2 (Climate Science)</li>
                        <li>Session 3: Module 3 (Solutions)</li>
                        <li>Session 4: Module 4 (Taking Action)</li>
                        <li>Session 5: Module 5 (Synthesis) + Final Reflection</li>
                      </ul>
                      <p className="mt-2 italic">Add extra sessions for deeper exploration of En-ROADS or project work.</p>
                    </div>
                  </CollapsibleSection>
                </div>

                <CalloutBox type="pitfall" title="Common Pitfall">
                  Don't rush through simulations. Students need time to experiment, observe results,
                  and discuss findings. It's better to cover less content deeply than to rush through everything.
                </CalloutBox>
                <div className="mb-8" />
              </section>
              <div className="mb-14 sm:mb-16" />

              {/* Section 6: En-ROADS & Systems Tools */}
              <section
                ref={(el) => { sectionRefs.current['enroads'] = el; }}
                className="mb-10 sm:mb-12 scroll-mt-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                    <Layers className="text-indigo-600 dark:text-indigo-400" size={20} />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    En-ROADS & Systems Tools
                  </h2>
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">About En-ROADS</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                  En-ROADS is a free, online climate simulation developed by Climate Interactive and MIT Sloan.
                  It allows users to explore how different policies and actions affect global temperature,
                  energy systems, and emissions over time.
                </p>

                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Simplified vs. Full Model</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">This Curriculum (Simplified)</h4>
                    <ul className="text-green-700 dark:text-green-400 text-sm space-y-1">
                      <li>• Focused set of key sliders</li>
                      <li>• Streamlined interface for learning</li>
                      <li>• Guided exploration with prompts</li>
                      <li>• Best for first-time users</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Full En-ROADS Model</h4>
                    <ul className="text-blue-700 dark:text-blue-400 text-sm space-y-1">
                      <li>• 100+ policy levers</li>
                      <li>• Detailed graphs and data</li>
                      <li>• Advanced scenario building</li>
                      <li>• For deeper exploration</li>
                    </ul>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">When to Use Each</h3>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-4">
                  <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-2">
                    <li><strong>Use Simplified Version:</strong> For initial learning, younger students, shorter sessions, or when focusing on key concepts</li>
                    <li><strong>Use Full Model:</strong> For advanced students, extended workshops, research projects, or when students are ready for more complexity</li>
                  </ul>
                </div>

                <a
                  href="https://www.climateinteractive.org/en-roads/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  <ExternalLink size={16} />
                  Visit Climate Interactive En-ROADS
                </a>

                <CalloutBox type="tip" title="Facilitator Tip">
                  Start with the simplified version in this curriculum. Once students are comfortable,
                  introduce the full En-ROADS model for advanced exploration or independent projects.
                </CalloutBox>
                <div className="mb-8" />
              </section>
              <div className="mb-14 sm:mb-16" />

              {/* Section 7: Downloadable Materials */}
              <section
                ref={(el) => { sectionRefs.current['downloads'] = el; }}
                className="mb-10 sm:mb-12 scroll-mt-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                    <Download className="text-pink-600 dark:text-pink-400" size={20} />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    Downloadable Materials
                  </h2>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
                  Download these resources to support your teaching. All materials are free to use
                  for educational purposes.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <FileText size={32} className="text-red-500 mb-3" />
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Student Worksheets</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mb-3">PDF - Printable worksheets for each module</p>
                    <Button variant="outline" size="sm" className="w-full" disabled>
                      <Download size={14} className="mr-2" />
                      Coming Soon
                    </Button>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <FileText size={32} className="text-blue-500 mb-3" />
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Facilitator Guide</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mb-3">PDF - Detailed facilitation notes</p>
                    <Button variant="outline" size="sm" className="w-full" disabled>
                      <Download size={14} className="mr-2" />
                      Coming Soon
                    </Button>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <FileText size={32} className="text-orange-500 mb-3" />
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Slide Deck</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mb-3">PPTX - Presentation slides</p>
                    <Button variant="outline" size="sm" className="w-full" disabled>
                      <Download size={14} className="mr-2" />
                      Coming Soon
                    </Button>
                  </div>
                </div>
                <div className="mb-8" />

                <div className="mb-14 sm:mb-16" />
                <CalloutBox type="note" title="More Resources Coming">
                  We're actively developing additional materials. Check back regularly for updates,
                  or contact us if you have specific resource needs.
                </CalloutBox>
                <div className="mb-8" />
              </section>
              <div className="mb-14 sm:mb-16" />

              {/* Section 8: Adaptations for Learners */}
              <section
                ref={(el) => { sectionRefs.current['adaptations'] = el; }}
                className="mb-10 sm:mb-12 scroll-mt-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
                    <Accessibility className="text-cyan-600 dark:text-cyan-400" size={20} />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    Adaptations for Learners
                  </h2>
                </div>

                <div className="space-y-4">
                  <CollapsibleSection title="Different Age Groups" defaultOpen={true}>
                    <div className="space-y-3 text-sm">
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-gray-100">Ages 14-15 (Middle School)</h5>
                        <p className="text-gray-600 dark:text-gray-400">Focus on foundational concepts, use more visual aids, allow more time for activities, pair with guided worksheets</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-gray-100">Ages 16-18 (High School)</h5>
                        <p className="text-gray-600 dark:text-gray-400">Introduce more complexity, encourage independent exploration, connect to current events and policy</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-gray-100">Advanced/College</h5>
                        <p className="text-gray-600 dark:text-gray-400">Use full En-ROADS model, assign research projects, facilitate debates on policy trade-offs</p>
                      </div>
                    </div>
                  </CollapsibleSection>

                  <CollapsibleSection title="Accessibility Considerations">
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 text-sm">
                      <li>Platform supports dark mode for reduced eye strain</li>
                      <li>All content is keyboard navigable</li>
                      <li>Text can be resized using browser zoom</li>
                      <li>Provide printed materials for students who need them</li>
                      <li>Allow extra time for students who need it</li>
                      <li>Consider pairing students for collaborative support</li>
                    </ul>
                  </CollapsibleSection>

                  <CollapsibleSection title="Different Learning Contexts">
                    <div className="space-y-3 text-sm">
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-gray-100">Formal Classroom</h5>
                        <p className="text-gray-600 dark:text-gray-400">Follow structured lesson flow, use for assessment, integrate with existing curriculum</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-gray-100">After-School Programs</h5>
                        <p className="text-gray-600 dark:text-gray-400">More flexible pacing, emphasis on engagement and discussion, project-based extensions</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-gray-100">Community Workshops</h5>
                        <p className="text-gray-600 dark:text-gray-400">Mixed ages, focus on local relevance, action-oriented outcomes, shorter sessions</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-gray-100">Remote/Hybrid Learning</h5>
                        <p className="text-gray-600 dark:text-gray-400">Students can work independently, use breakout rooms for discussions, screen share simulations</p>
                      </div>
                    </div>
                  </CollapsibleSection>
                </div>
                <div className="mb-8" />
              </section>
              <div className="mb-14 sm:mb-16" />

              {/* Section 9: Teacher Professional Development */}
              <section
                ref={(el) => { sectionRefs.current['professional-dev'] = el; }}
                className="mb-10 sm:mb-12 scroll-mt-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                    <Award className="text-amber-600 dark:text-amber-400" size={20} />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    Teacher Professional Development
                  </h2>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                  Use this outline to run a professional development session for fellow educators.
                </p>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-5 mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Suggested PD Session (2-3 hours)</h3>

                  <div className="space-y-4 text-sm">
                    <div className="flex gap-3">
                      <div className="w-20 flex-shrink-0 text-gray-500 dark:text-gray-400">30 min</div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Introduction to Systems Thinking</h4>
                        <p className="text-gray-600 dark:text-gray-400">Overview of systems thinking concepts and why they matter for climate education</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-20 flex-shrink-0 text-gray-500 dark:text-gray-400">45 min</div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Experience the Curriculum</h4>
                        <p className="text-gray-600 dark:text-gray-400">Educators work through 1-2 modules as students would</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-20 flex-shrink-0 text-gray-500 dark:text-gray-400">30 min</div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Exploring En-ROADS</h4>
                        <p className="text-gray-600 dark:text-gray-400">Hands-on time with the simulation tool, guided exploration</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-20 flex-shrink-0 text-gray-500 dark:text-gray-400">30 min</div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Facilitation Practice</h4>
                        <p className="text-gray-600 dark:text-gray-400">Practice facilitating discussions, role-play challenging scenarios</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-20 flex-shrink-0 text-gray-500 dark:text-gray-400">15 min</div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Implementation Planning</h4>
                        <p className="text-gray-600 dark:text-gray-400">Educators plan how they'll use the curriculum in their context</p>
                      </div>
                    </div>
                  </div>
                </div>

                <CalloutBox type="tip" title="Facilitator Tip">
                  The best way to prepare educators is to let them experience the curriculum as learners first.
                  This builds empathy for student experiences and surfaces potential challenges.
                </CalloutBox>
                <div className="mb-8" />
              </section>
              <div className="mb-14 sm:mb-16" />


              {/* Section 10: FAQs & Troubleshooting */}
              <section
                ref={(el) => { sectionRefs.current['faqs'] = el; }}
                className="mb-10 sm:mb-12 scroll-mt-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                    <HelpCircle className="text-rose-600 dark:text-rose-400" size={20} />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    FAQs & Troubleshooting
                  </h2>
                </div>

                <div className="space-y-3">
                  <CollapsibleSection title="Classroom Challenges" defaultOpen={true}>
                    <div className="space-y-4 text-sm">
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-gray-100">Q: Students finish at very different paces. How do I manage this?</h5>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">A: Build in extension activities for fast finishers (deeper exploration of En-ROADS, reflection journaling). Allow peer support where appropriate.</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-gray-100">Q: Some students seem disengaged or skeptical about climate change.</h5>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">A: Focus on systems thinking as a skill rather than climate beliefs. Use the simulation to explore "what if" scenarios without judgment. Meet students where they are.</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-gray-100">Q: Discussions get heated or political. How do I navigate this?</h5>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">A: Establish discussion norms upfront. Focus on data and trade-offs rather than political positions. Acknowledge different perspectives while grounding in scientific evidence.</p>
                      </div>
                    </div>
                  </CollapsibleSection>

                  <CollapsibleSection title="Common Student Misconceptions">
                    <div className="space-y-4 text-sm">
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-gray-100">"One big solution will fix everything"</h5>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">Use the simulation to show that no single lever dramatically changes outcomes—it takes a portfolio of solutions working together.</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-gray-100">"Individual actions don't matter"</h5>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">Discuss leverage points and how individual actions can influence systems (voting, consumer choices, community organizing).</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-gray-100">"Technology will save us without any changes"</h5>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">Show that even aggressive technology scenarios require behavior and policy changes to meet climate goals.</p>
                      </div>
                    </div>
                  </CollapsibleSection>

                  <CollapsibleSection title="Technical Issues">
                    <div className="space-y-4 text-sm">
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-gray-100">Q: The simulation isn't loading or is slow.</h5>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">A: Check internet connection. Try refreshing the page. Use Chrome or Firefox for best performance. Close other browser tabs.</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-gray-100">Q: Student progress isn't saving.</h5>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">A: Progress is saved in browser local storage. Students should use the same browser and device. Private/incognito mode won't save progress.</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-gray-100">Q: We don't have enough devices for individual work.</h5>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">A: Use pair or small group work. Project the simulation for whole-class exploration with students voting on what to try next.</p>
                      </div>
                    </div>
                  </CollapsibleSection>

                  <CollapsibleSection title="Time Management">
                    <div className="space-y-4 text-sm">
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-gray-100">Q: We're running out of time mid-module.</h5>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">A: It's okay to split modules across sessions. Build in natural stopping points. Prioritize quality engagement over completion.</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-gray-100">Q: How do I fit this into an already packed curriculum?</h5>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">A: Look for integration points with existing units (science, social studies, math). Use modules selectively. Consider after-school or advisory time.</p>
                      </div>
                    </div>
                  </CollapsibleSection>
                </div>
              </section>

              {/* Footer */}
              <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Have questions or feedback? We'd love to hear from you!<br />
                  <span className="text-green-600 dark:text-green-400">educators@climatesystems.edu</span> (example)
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}