
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
                        className="mb-4 sm:mb-6"
                    >
                        ← {t.backHome}
                    </Button>
                </Link>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 md:p-12">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 sm:mb-8">Privacy Policy</h1>

                    <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none text-gray-700 dark:text-gray-300">
                        <p className="mb-6">
                            We respect your privacy and are committed to being transparent about how data is collected and used in this application.
                        </p>

                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">1. Information We Collect</h2>
                        <p className="mb-4">
                            This application stores user inputs provided during interaction with the product. These inputs are saved in our database without any personally identifiable information, such as names, email addresses, or contact details.
                        </p>
                        <p className="mb-6">
                            The data we collect cannot be used to identify individual users.
                        </p>

                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">2. Information We Do Not Collect</h2>
                        <p className="mb-4">We do not collect:</p>
                        <ul className="list-disc pl-6 mb-6 space-y-2">
                            <li>Names</li>
                            <li>Email addresses</li>
                            <li>Phone numbers</li>
                            <li>Precise location data</li>
                            <li>Any other personal or sensitive information</li>
                        </ul>

                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">3. How We Use the Data</h2>
                        <p className="mb-4">The collected inputs are used solely to:</p>
                        <ul className="list-disc pl-6 mb-6 space-y-2">
                            <li>Improve product functionality</li>
                            <li>Analyze usage patterns</li>
                            <li>Enhance user experience</li>
                            <li>Improve the overall quality of the application</li>
                        </ul>
                        <p className="mb-6">All data is processed in an aggregated and anonymized form.</p>

                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">4. Analytics and Tracking</h2>
                        <p className="mb-4">
                            In the future, we may use tools such as Google Analytics or similar tracking technologies to understand how users navigate through the application.
                        </p>
                        <p className="mb-4">These tools will be used only to:</p>
                        <ul className="list-disc pl-6 mb-6 space-y-2">
                            <li>Track page navigation</li>
                            <li>Analyze user interaction flows</li>
                            <li>Identify areas for product improvement</li>
                        </ul>
                        <p className="mb-6">No personally identifiable information will be collected through these tools.</p>

                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">5. Data Storage and Security</h2>
                        <p className="mb-6">
                            All collected data is securely stored and protected using appropriate technical measures. We take reasonable steps to prevent unauthorized access, disclosure, or misuse of data.
                        </p>

                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">6. Changes to This Policy</h2>
                        <p className="mb-6">
                            This Privacy Policy may be updated from time to time to reflect changes in the product or legal requirements. Any updates will be published on this page.
                        </p>

                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">7. Contact</h2>
                        <p className="mb-6">
                            If you have any questions about this Privacy Policy or data usage, you can contact us through the application.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
