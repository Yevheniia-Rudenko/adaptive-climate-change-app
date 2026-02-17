import { useState } from 'react';
import { Play, BookOpen, Sparkles, Layers, Headphones, ChevronDown, ChevronUp, Star, Download } from 'lucide-react';
import { ContentBlock as ContentBlockType } from '../data/moduleStructures';
import { InteractiveDashboard } from './InteractiveDashboard';
import { useLanguage } from '../contexts/LanguageContext';
import { TextWithGlossary } from './TextWithGlossary';
import EnRoadsDashboard from './EnRoadsDashboard';
import SecondExerciseDashboard from './2ndExerciseDashboard';
import ThirdExerciseDashboard from './ThirdExerciseDashboard';
import FourthExerciseDashboard from './FourthExerciseDashboard';
import { FlipCard } from './FlipCard';
import { SubmitButton } from './SubmitButton';
import { postInput } from '../api/postInput';
import { useSession } from '../contexts/SessionContext';
import { exportResponses, downloadBlob } from '../api/exportResponses';


function PollBlock({ block, moduleId }: { block: Extract<ContentBlockType, { type: 'poll' }>; moduleId: number }) {
  const { sessionId } = useSession();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [otherText, setOtherText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleOption = (option: string) => {
    setSubmitError(null);
    setIsSubmitted(false);
    if (block.singleSelect) {
      // Single select: always replace selection with new option
      setSelectedOptions([option]);
    } else {
      // Multi select (default): toggle functionality
      setSelectedOptions(prev => {
        if (prev.includes(option)) {
          return prev.filter(o => o !== option);
        } else {
          return [...prev, option];
        }
      });
    }
  };

  const isRadio = block.singleSelect;
  const inputType = isRadio ? 'radio' : 'checkbox';

  const handleSubmit = async () => {
    if (isSubmitting) return;
    const input = JSON.stringify({
      type: block.type,
      question: block.question,
      response: {
        selectedOptions,
        otherText,
      },
    });

    setIsSubmitting(true);
    setSubmitError(null);
    setIsSubmitted(false);
    try {
      await postInput({
        input,
        module_id: String(moduleId),
        section_id: block.id,
        session_id: sessionId,
      });
      setSelectedOptions([]);
      setOtherText('');
      setIsSubmitted(true);
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : 'Failed to submit');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = selectedOptions.length > 0 && (!selectedOptions.includes('Other') || otherText.trim() !== '');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-8 font-sora">
      <h3 className="text-gray-900 dark:text-gray-100 text-sm sm:text-base md:text-lg font-bold mb-4">{block.question}</h3>
      <div className="space-y-3">
        {block.options.map((option) => (
          <label key={option} className={`flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all ${selectedOptions.includes(option)
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-200 dark:border-gray-700 hover:border-blue-200'
            }`}>
            <input
              type={inputType}
              name={`poll-${block.id}`}
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={() => toggleOption(option)}
              className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 rounded-full"
            />
            {/* Note: 'rounded-full' makes checkmarks look like radios if using default styles, 
                but distinct 'type' attribute handles semantic behavior. 
                Tailwind forms plugin might need standard 'rounded' for checkbox vs 'rounded-full' for radio.
                Safest to use specific classes or just let browser default styles apply via type. 
                Currently kept 'rounded-full' for both to be safe or maybe standard 'rounded' for checkbox? 
                Let's stick to 'rounded' for check, 'rounded-full' for radio if possible, or just generic.
                The existing code used 'rounded'. I'll try to pick based on type. */}
            <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base" style={{ marginLeft: '3rem' }}>{option}</span>
          </label>
        ))}
        <div className={`flex flex-col p-3 rounded-xl border-2 transition-all ${selectedOptions.includes('Other')
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
          : 'border-gray-200 dark:border-gray-700 hover:border-blue-200'
          }`}>
          <label className="flex items-center cursor-pointer">
            <input
              type={inputType}
              name={`poll-${block.id}`}
              value="Other"
              checked={selectedOptions.includes('Other')}
              onChange={() => toggleOption('Other')}
              className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 rounded"
            />
            <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base" style={{ marginLeft: '3rem' }}>Other</span>
          </label>
          {selectedOptions.includes('Other') && (
            <input
              type="text"
              value={otherText}
              onChange={(e) => {
                setOtherText(e.target.value);
                setSubmitError(null);
                setIsSubmitted(false);
              }}
              placeholder="Please specify..."
              className="mt-3 p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ marginLeft: '4.25rem' }}
              autoFocus
            />
          )}
        </div>
      </div>
      <SubmitButton onClick={handleSubmit} disabled={!canSubmit || isSubmitting} />
      {isSubmitting && <div className="mt-2 text-sm text-gray-500">Submitting…</div>}
      {submitError && <div className="mt-2 text-sm text-red-600">{submitError}</div>}
      {isSubmitted && !submitError && <div className="mt-2 text-sm text-green-600">Submitted.</div>}
    </div>
  );
}

function ModuleFeedbackBlock({ block, moduleId }: { block: Extract<ContentBlockType, { type: 'module-feedback' }>; moduleId: number }) {
  const { sessionId } = useSession();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    const input = JSON.stringify({
      type: block.type,
      title: block.title,
      response: {
        rating,
        feedback,
      },
    });

    setIsSubmitting(true);
    setSubmitError(null);
    setIsSubmitted(false);
    try {
      await postInput({
        input,
        module_id: String(moduleId),
        section_id: block.id,
        session_id: sessionId,
      });
      setRating(0);
      setHoverRating(0);
      setFeedback('');
      setIsSubmitted(true);
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : 'Failed to submit');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = rating > 0;

  return (
    <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-2xl p-6 sm:p-8 shadow-lg border-2 border-green-200 dark:border-green-700 mb-8 font-sora">
      <h2 className="text-gray-900 dark:text-gray-100 text-xl sm:text-2xl font-bold mb-3">
        {block.title}
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm sm:text-base">
        {block.description}
      </p>

      {/* Star Rating */}
      <div className="mb-6">
        <p className="text-gray-900 dark:text-gray-100 font-semibold mb-3 text-sm sm:text-base">
          Please rate below:
        </p>
        <div className="flex gap-2 items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => {
                setRating(star);
                setSubmitError(null);
                setIsSubmitted(false);
              }}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
              aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
            >
              <Star
                size={36}
                fill={star <= (hoverRating || rating) ? '#facc15' : 'none'}
                stroke={star <= (hoverRating || rating) ? '#facc15' : 'currentColor'}
                className="transition-colors text-gray-300 dark:text-gray-600"
              />
            </button>
          ))}
          {rating > 0 && (
            <span className="ml-3 text-gray-600 dark:text-gray-400 text-sm font-medium">
              {rating === 5 ? 'Excellent' : rating === 4 ? 'Very Good' : rating === 3 ? 'Good' : rating === 2 ? 'Poor' : 'Terrible'}
            </span>
          )}
        </div>
      </div>

      {/* Feedback Text */}
      <div className="mb-4">
        <label htmlFor={`feedback-${block.id}`} className="block text-gray-900 dark:text-gray-100 font-semibold mb-2 text-sm sm:text-base">
          Any feedback?
        </label>
        <textarea
          id={`feedback-${block.id}`}
          value={feedback}
          onChange={(e) => {
            setFeedback(e.target.value);
            setSubmitError(null);
            setIsSubmitted(false);
          }}
          placeholder="Share your thoughts about this module..."
          className="w-full p-3 sm:p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-green-500 dark:focus:border-green-400 focus:outline-none min-h-[100px] sm:min-h-[120px] resize-y bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm sm:text-base placeholder-gray-400"
        />
      </div>

      <SubmitButton onClick={handleSubmit} disabled={!canSubmit || isSubmitting} />
      {isSubmitting && <div className="mt-2 text-sm text-gray-600">Submitting…</div>}
      {submitError && <div className="mt-2 text-sm text-red-600">{submitError}</div>}
      {isSubmitted && !submitError && <div className="mt-2 text-sm text-green-700">Submitted.</div>}

      {/* Export Button */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={async () => {
            try {
              const blob = await exportResponses(sessionId);
              const timestamp = new Date().toISOString().split('T')[0];
              downloadBlob(blob, `module-${moduleId}-responses-${timestamp}.json`);
            } catch (e) {
              console.error('Export failed:', e);
            }
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm"
        >
          <Download size={18} />
          <span>Export Your Responses</span>
        </button>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Download all your responses from this module as a JSON file.
        </p>
      </div>
    </div>
  );
}

function ReflectionBlock({ block, moduleId }: { block: Extract<ContentBlockType, { type: 'reflection' }>; moduleId: number }) {
  const { t } = useLanguage();
  const { sessionId } = useSession();
  const [reflectionText, setReflectionText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    const input = JSON.stringify({
      type: block.type,
      prompt: block.prompt,
      response: {
        text: reflectionText,
      },
    });

    setIsSubmitting(true);
    setSubmitError(null);
    setIsSubmitted(false);
    try {
      await postInput({
        input,
        module_id: String(moduleId),
        section_id: block.id,
        session_id: sessionId,
      });
      setReflectionText('');
      setIsSubmitted(true);
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : 'Failed to submit');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = reflectionText.trim().length > 0;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 font-sora">
      <h3 className="text-gray-900 dark:text-gray-100 mb-2 sm:mb-3 text-base sm:text-lg font-bold">{t.reflection}</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base whitespace-pre-line">
        {block.prompt}
      </p>
      <textarea
        value={reflectionText}
        onChange={(e) => {
          setReflectionText(e.target.value);
          setSubmitError(null);
          setIsSubmitted(false);
        }}
        placeholder={t.typeYourThoughts}
        className="w-full p-3 sm:p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none min-h-[100px] sm:min-h-[120px] resize-y bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm sm:text-base"
      />
      <SubmitButton onClick={handleSubmit} disabled={!canSubmit || isSubmitting} />
      {isSubmitting && <div className="mt-2 text-sm text-gray-600">Submitting…</div>}
      {submitError && <div className="mt-2 text-sm text-red-600">{submitError}</div>}
      {isSubmitted && !submitError && <div className="mt-2 text-sm text-green-700">Submitted.</div>}
    </div>
  );
}

function NumericPredictionBlock({ block, moduleId }: { block: Extract<ContentBlockType, { type: 'numeric-prediction' }>; moduleId: number }) {
  const { sessionId } = useSession();
  const [valueText, setValueText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    const valueNumber = valueText.trim() === '' ? null : Number(valueText);

    const input = JSON.stringify({
      type: block.type,
      question: block.question,
      response: {
        value: Number.isFinite(valueNumber as number) ? valueNumber : null,
        unit: block.unit,
        raw: valueText,
      },
    });

    setIsSubmitting(true);
    setSubmitError(null);
    setIsSubmitted(false);
    try {
      await postInput({
        input,
        module_id: String(moduleId),
        section_id: block.id,
        session_id: sessionId,
      });
      setValueText('');
      setIsSubmitted(true);
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : 'Failed to submit');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = valueText.trim() !== '' && Number.isFinite(Number(valueText));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-8 font-sora">
      <h3 className="text-gray-900 dark:text-gray-100 text-lg font-bold mb-4">{block.question}</h3>
      <div className="flex items-center gap-3">
        <input
          type="number"
          step="0.1"
          value={valueText}
          onChange={(e) => {
            setValueText(e.target.value);
            setSubmitError(null);
            setIsSubmitted(false);
          }}
          placeholder="0.0"
          className="w-24 p-2 text-xl font-bold text-center border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-300"
        />
        {block.unit && <span className="text-lg font-bold text-gray-500">{block.unit}</span>}
      </div>
      <SubmitButton onClick={handleSubmit} disabled={!canSubmit || isSubmitting} />
      {isSubmitting && <div className="mt-2 text-sm text-gray-600">Submitting…</div>}
      {submitError && <div className="mt-2 text-sm text-red-600">{submitError}</div>}
      {isSubmitted && !submitError && <div className="mt-2 text-sm text-green-700">Submitted.</div>}
    </div>
  );
}

type ContentBlockProps = {
  block: ContentBlockType;
  moduleId: number;
};

// Helper to format title with bold support
const formatTitle = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-extrabold text-gray-900 dark:text-gray-100">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

export function ContentBlock({
  block,
  moduleId
}: ContentBlockProps) {
  const { t } = useLanguage();
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);

  switch (block.type) {
    case 'text':
      return (
        <div className="mb-6 sm:mb-8 font-sora">
          {block.title && (
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              {!block.hideIcon && <BookOpen className="text-blue-600 dark:text-blue-400 flex-shrink-0" size={20} />}
              <h2 className="text-gray-900 dark:text-gray-100 text-base sm:text-lg md:text-xl font-bold">{formatTitle(block.title)}</h2>
            </div>
          )}
          <TextWithGlossary
            text={block.content}
            className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line"
          />
        </div>
      );

    case 'audio':
      return (
        <div className="mb-6 sm:mb-8 font-sora">
          {block.title && (
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <Headphones className="text-blue-600 dark:text-blue-400 flex-shrink-0" size={20} />
              <h3 className="text-gray-900 dark:text-gray-100 text-base sm:text-lg font-bold">{formatTitle(block.title)}</h3>
            </div>
          )}
          {block.description && (
            <p className="text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">{block.description}</p>
          )}
          <div className="relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 p-4">
            {block.audioUrl.endsWith('.mp3') || block.audioUrl.endsWith('.m4a') ? (
              <audio controls className="w-full">
                <source src={block.audioUrl} type={block.audioUrl.endsWith('.mp3') ? 'audio/mpeg' : 'audio/mp4'} />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <iframe
                src={block.audioUrl}
                title={block.title || 'Audio'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-32"
              />
            )}
          </div>

          {block.transcript && (
            <div className="mt-4">
              <button
                onClick={() => setIsTranscriptOpen(!isTranscriptOpen)}
                className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
              >
                {isTranscriptOpen ? <ChevronUp size={16} className="mr-1" /> : <ChevronDown size={16} className="mr-1" />}
                {t.transcript || 'Transcript'}
              </button>
              {isTranscriptOpen && (
                <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                  {block.transcript}
                </div>
              )}
            </div>
          )}
        </div>
      );

    case 'video':
      return (
        <div className="mb-6 sm:mb-8 font-sora">
          {block.title && (
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Play className="text-blue-600 dark:text-blue-400 flex-shrink-0" size={20} />
              <h2 className="text-gray-900 dark:text-gray-100 text-base sm:text-lg md:text-xl font-bold">{formatTitle(block.title)}</h2>
            </div>
          )}
          {block.description && (
            <p className="text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">{block.description}</p>
          )}
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-gray-900 aspect-video shadow-lg">
            <iframe
              src={block.videoUrl}
              title={block.title || 'Video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      );

    case 'image':
      return (
        <div className="mb-6 sm:mb-8 font-sora">
          {block.title && (
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <BookOpen className="text-blue-600 dark:text-blue-400 flex-shrink-0" size={20} />
              <h3 className="text-gray-900 dark:text-gray-100 text-base sm:text-lg font-bold">{formatTitle(block.title)}</h3>
            </div>
          )}
          <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg" style={block.width ? { maxWidth: block.width, margin: '0 auto' } : undefined}>
            <img
              src={block.imageUrl}
              alt={block.alt}
              className="w-full h-auto"
            />
          </div>
        </div>
      );

    case 'dashboard':
      return moduleId === 1 ? <EnRoadsDashboard /> : <InteractiveDashboard moduleId={moduleId} />;

    case 'exercise1-dashboard':
      return <EnRoadsDashboard />;

    case '2ndExerciseDashboard':
      return <SecondExerciseDashboard />;

    case 'third-exercise':
      return <ThirdExerciseDashboard />;

    case 'fourth-exercise':
      return <FourthExerciseDashboard />;

    case 'reflection':
      return <ReflectionBlock block={block} moduleId={moduleId} />;

    case 'meditation':
      return (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 font-sora">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Sparkles className="text-purple-600 dark:text-purple-400 flex-shrink-0" size={20} />
            <h3 className="text-gray-900 dark:text-gray-100 text-base sm:text-lg font-bold">{formatTitle(t.guidedReflection)}</h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-sm sm:text-base">
            {block.content}
          </p>
        </div>
      );

    case 'flip-cards':
      return (
        <div className="mb-8 font-sora">
          {block.title && (
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Layers className="text-blue-600 dark:text-blue-400 flex-shrink-0" size={20} />
              <h2 className="text-gray-900 dark:text-gray-100 text-base sm:text-lg md:text-xl font-bold">{formatTitle(block.title)}</h2>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {block.cards.map((card, index) => (
              <FlipCard
                key={index}
                frontTitle={card.frontTitle}
                frontDescription={card.frontDescription}
                backTitle={card.backTitle}
                backDescription={card.backDescription}
              />
            ))}
          </div>
        </div>
      );

    case 'poll':
      return <PollBlock block={block} moduleId={moduleId} />;

    case 'html-embed':
      return (
        <div className="mb-6 sm:mb-8 font-sora">
          {block.title && (
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <BookOpen className="text-blue-600 dark:text-blue-400 flex-shrink-0" size={20} />
              <h3 className="text-gray-900 dark:text-gray-100 text-base sm:text-lg font-bold">{formatTitle(block.title)}</h3>
            </div>
          )}
          <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800">
            <iframe
              src={block.htmlFile}
              title={block.title || 'Interactive Content'}
              className="w-full h-96 border-0"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      );

    case 'numeric-prediction':
      return <NumericPredictionBlock block={block} moduleId={moduleId} />;

    case 'module-feedback':
      return <ModuleFeedbackBlock block={block} moduleId={moduleId} />;

    default:
      return null;
  }
}
