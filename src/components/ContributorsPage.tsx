import { ExternalLink, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';
import { imageAttributions } from '../data/imageAttribution';

export function ContributorsPage() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 pt-20 font-sora">
            <div className="max-w-4xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 md:p-10"
                >
                    {/* Header */}
                    <div className="mb-8">
                        <h1
                            className="font-bold text-gray-800 dark:text-gray-100 text-center mb-3 sm:mb-4"
                            style={{ fontSize: '3rem', lineHeight: '1.2' }}
                        >
                            {t.pages.contributors.title}
                        </h1>
                        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                            {t.pages.contributors.description}
                        </p>
                    </div>

                    {/* Image Credits Section */}
                    <section>
                        <div className="flex items-center gap-2 mb-6">
                            <ImageIcon className="text-blue-600 dark:text-blue-400 flex-shrink-0" size={24} />
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                {t.pages.contributors.imageCredits}
                            </h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            {t.pages.contributors.imageCreditsDescription}
                        </p>
                        <div className="grid gap-4">
                            {imageAttributions.map((attribution, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.08 }}
                                    className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5 border border-gray-200 dark:border-gray-600"
                                >
                                    <div className="flex items-start justify-between gap-4 mb-3">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                                {attribution.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                {attribution.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <span className="text-gray-500 dark:text-gray-400 font-medium">{t.pages.contributors.labels.author}</span>
                                            {attribution.authorUrl ? (
                                                <a
                                                    href={attribution.authorUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="ml-2 text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                                                >
                                                    {attribution.author}
                                                    <ExternalLink size={14} />
                                                </a>
                                            ) : (
                                                <span className="ml-2 text-gray-700 dark:text-gray-300">
                                                    {attribution.author}
                                                </span>
                                            )}
                                        </div>

                                        <div>
                                            <span className="text-gray-500 dark:text-gray-400 font-medium">{t.pages.contributors.labels.source}</span>
                                            {attribution.sourceUrl ? (
                                                <a
                                                    href={attribution.sourceUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="ml-2 text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                                                >
                                                    {attribution.source}
                                                    <ExternalLink size={14} />
                                                </a>
                                            ) : (
                                                <span className="ml-2 text-gray-700 dark:text-gray-300">
                                                    {attribution.source}
                                                </span>
                                            )}
                                        </div>

                                        <div>
                                            <span className="text-gray-500 dark:text-gray-400 font-medium">{t.pages.contributors.labels.license}</span>
                                            {attribution.licenseUrl ? (
                                                <a
                                                    href={attribution.licenseUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="ml-2 text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                                                >
                                                    {attribution.license}
                                                    <ExternalLink size={14} />
                                                </a>
                                            ) : (
                                                <span className="ml-2 text-gray-700 dark:text-gray-300">
                                                    {attribution.license}
                                                </span>
                                            )}
                                        </div>

                                        <div>
                                            <span className="text-gray-500 dark:text-gray-400 font-medium">{t.pages.contributors.labels.file}</span>
                                            <code className="ml-2 text-xs text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded">
                                                {attribution.filePath}
                                            </code>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Footer Note */}
                    <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {t.pages.contributors.footerText1}
                        </p>
                        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                            {t.pages.contributors.footerText2}
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
