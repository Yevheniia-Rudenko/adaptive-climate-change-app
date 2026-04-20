
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

export function PrivacyPolicyPage() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 pt-20 font-sora">
            <div className="max-w-4xl w-full">
                <Link to="/">
                    <Button
                        variant="outline"
                        className="mb-4 sm:mb-6 dark:text-gray-100 dark:border-gray-400"
                    >
                        ← {t.nav.backToHome}
                    </Button>
                </Link>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 md:p-12">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 sm:mb-8">{t.pages.privacyPolicy.title}</h1>

                    <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none text-gray-700 dark:text-gray-300">
                        <p className="mb-6">
                            {t.pages.privacyPolicy.intro}
                        </p>

                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">{t.pages.privacyPolicy.sections.infoWeCollect.title}</h2>
                        <p className="mb-4">
                            {t.pages.privacyPolicy.sections.infoWeCollect.p1}
                        </p>
                        <p className="mb-6">
                            {t.pages.privacyPolicy.sections.infoWeCollect.p2}
                        </p>

                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">{t.pages.privacyPolicy.sections.infoWeDoNotCollect.title}</h2>
                        <p className="mb-4">{t.pages.privacyPolicy.sections.infoWeDoNotCollect.p1}</p>
                        <ul className="list-disc pl-6 mb-6 space-y-2">
                            {t.pages.privacyPolicy.sections.infoWeDoNotCollect.items.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>

                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">{t.pages.privacyPolicy.sections.howWeUseData.title}</h2>
                        <p className="mb-4">{t.pages.privacyPolicy.sections.howWeUseData.p1}</p>
                        <ul className="list-disc pl-6 mb-6 space-y-2">
                            {t.pages.privacyPolicy.sections.howWeUseData.items.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                        <p className="mb-6">{t.pages.privacyPolicy.sections.howWeUseData.p2}</p>

                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">{t.pages.privacyPolicy.sections.analyticsTracking.title}</h2>
                        <p className="mb-4">
                            {t.pages.privacyPolicy.sections.analyticsTracking.p1}
                        </p>
                        <p className="mb-4">{t.pages.privacyPolicy.sections.analyticsTracking.p2}</p>
                        <ul className="list-disc pl-6 mb-6 space-y-2">
                            {t.pages.privacyPolicy.sections.analyticsTracking.items.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                        <p className="mb-6">{t.pages.privacyPolicy.sections.analyticsTracking.p3}</p>

                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">{t.pages.privacyPolicy.sections.dataStorage.title}</h2>
                        <p className="mb-6">
                            {t.pages.privacyPolicy.sections.dataStorage.p1}
                        </p>

                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">{t.pages.privacyPolicy.sections.changesToPolicy.title}</h2>
                        <p className="mb-6">
                            {t.pages.privacyPolicy.sections.changesToPolicy.p1}
                        </p>

                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">{t.pages.privacyPolicy.sections.contact.title}</h2>
                        <p className="mb-6">
                            {t.pages.privacyPolicy.sections.contact.p1}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
