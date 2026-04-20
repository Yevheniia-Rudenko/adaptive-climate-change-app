import { useLanguage } from '../contexts/LanguageContext';

interface SubmitButtonProps {
    onClick?: () => void;
    disabled?: boolean;
}

export function SubmitButton({ onClick, disabled = false }: SubmitButtonProps) {
    const { t } = useLanguage();

    return (
        <div className="flex mt-6" style={{ justifyContent: 'flex-end' }}>
            <button
                onClick={onClick}
                disabled={disabled}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
            >
                {t.common.submit}
            </button>
        </div>
    );
}
