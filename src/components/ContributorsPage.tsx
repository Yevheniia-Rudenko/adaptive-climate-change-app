import { ExternalLink, Heart, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';
import { imageAttributions, contributors } from '../data/imageAttribution';

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
                        <div className="flex items-center gap-3 mb-4">
                            <Heart className="text-red-500 flex-shrink-0" size={32} fill="currentColor" />
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
                                Contributors & Credits
                            </h1>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                            This project is made possible by the contributions of many individuals and organizations.
                            We are grateful for their support and dedication to climate education.
                        </p>
                    </div>

                    {/* Contributors Section */}
                    <section className="mb-10">
                        <div className="flex items-center gap-2 mb-6">
                            <Heart className="text-purple-600 dark:text-purple-400 flex-shrink-0" size={24} />
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                Development Team
                            </h2>
                        </div>
                        <div className="grid gap-4 sm:gap-6">
                            {contributors.map((contributor, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-700"
                                >
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                        {contributor.name}
                                    </h3>
                                    <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">
                                        {contributor.role}
                                    </p>
                                    {contributor.description && (
                                        <p className="text-gray-700 dark:text-gray-300">
                                            {contributor.description}
                                        </p>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Image Credits Section */}
                    <section>
                        <div className="flex items-center gap-2 mb-6">
                            <ImageIcon className="text-blue-600 dark:text-blue-400 flex-shrink-0" size={24} />
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                Image Credits
                            </h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            We are grateful to the following creators and organizations for their images and graphics:
                        </p>
                        <div className="grid gap-4">
                            {imageAttributions.map((attribution, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.08 }}
                                    className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 border border-gray-200 dark:border-gray-600"
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
                                            <span className="text-gray-500 dark:text-gray-400 font-medium">Author:</span>
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
                                            <span className="text-gray-500 dark:text-gray-400 font-medium">Source:</span>
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
                                            <span className="text-gray-500 dark:text-gray-400 font-medium">License:</span>
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
                                            <span className="text-gray-500 dark:text-gray-400 font-medium">File:</span>
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
                        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                            If you believe any attribution is incorrect or missing, please contact us so we can update it.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
