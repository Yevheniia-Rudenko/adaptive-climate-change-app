import { useState } from 'react';
import { motion } from 'motion/react';

type FlipCardProps = {
    frontTitle: string;
    frontDescription?: string;
    backTitle?: string;
    backDescription: string;
};

export function FlipCard({
    frontTitle,
    frontDescription,
    backTitle,
    backDescription,
}: FlipCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // We flip on click
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div
            className="relative h-64 w-full cursor-pointer perspective-1000"
            onClick={handleFlip}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ perspective: '1000px' }}
        >
            <motion.div
                className="relative w-full h-full transition-all duration-500 preserve-3d"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 260, damping: 20 }}
                style={{
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 w-full h-full backface-hidden rounded-xl shadow-lg overflow-hidden bg-white dark:bg-gray-800 border-2 border-transparent hover:border-green-400 dark:hover:border-green-500 transition-colors"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20">
                        <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">
                            {frontTitle}
                        </h3>
                        {frontDescription && (
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                {frontDescription}
                            </p>
                        )}
                        <div className={`mt-4 text-xs font-semibold uppercase tracking-wider text-green-600 dark:text-green-400 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                            Click to flip
                        </div>
                    </div>
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 w-full h-full backface-hidden rounded-xl shadow-lg overflow-hidden bg-white dark:bg-gray-800"
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                    }}
                >
                    <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-gradient-to-br from-green-50 to-teal-100 dark:from-green-900/20 dark:to-teal-900/20">
                        {backTitle && (
                            <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-2">
                                {backTitle}
                            </h3>
                        )}
                        <p className="text-gray-700 dark:text-gray-200 text-base leading-relaxed">
                            {backDescription}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
