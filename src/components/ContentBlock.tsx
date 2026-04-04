import { useEffect, useRef, useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import { Play, BookOpen, Sparkles, Layers, Headphones, ChevronDown, ChevronUp, Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import Lottie from 'lottie-react';
import { ContentBlock as ContentBlockType } from '../data/moduleStructures';
import { InteractiveDashboard } from './InteractiveDashboard';
import { useLanguage } from '../contexts/LanguageContext';
import { TextWithGlossary } from './TextWithGlossary';
import Module1CarbonRemovalDashboard from './Module1CarbonRemovalDashboard';
import Module1RenewablesDashboard from './Module1RenewablesDashboard';
import Module1FossilFuelTaxesDashboard from './Module1FossilFuelTaxesDashboard';
import Module1CarbonPriceDashboard from './Module1CarbonPriceDashboard';
import Module3CarbonPriceDashboard from './module_3/Module3CarbonPriceDashboard';
import Module2ExerciseDashboard from './Module2ExerciseDashboard';
import Module2RemovalsDashboard from './Module2RemovalsDashboard';
import { FlipCard } from './FlipCard';
import { SubmitButton } from './SubmitButton';
import { postInput } from '../api/postInput';
import { downloadInputsPdf } from '../api/getInputsPdf';
import { useSession } from '../contexts/SessionContext';
import { Button } from './ui/button';
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from './ui/carousel';
import { Link } from 'react-router-dom';
import * as RechartsPrimitive from 'recharts';


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
      <div className="mb-4">
        {block.question.split('\n').map((line, i) => {
          const boldMatch = line.match(/^\*\*(.+?)\*\*$/);
          if (boldMatch) {
            return <h3 key={i} className="text-gray-900 dark:text-gray-100 text-base sm:text-lg md:text-xl font-bold mb-2">{boldMatch[1]}</h3>;
          }
          return <p key={i} className="text-gray-900 dark:text-gray-100 text-sm sm:text-base md:text-lg">{line}</p>;
        })}
      </div>
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
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

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

  const handleExport = async () => {
    if (isExporting) return;
    setIsExporting(true);
    setExportError(null);
    try {
      await downloadInputsPdf(sessionId);
    } catch (e) {
      setExportError(e instanceof Error ? e.message : 'Failed to export');
    } finally {
      setIsExporting(false);
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
      <div className="mt-8 pt-6 border-t border-green-200/60 dark:border-green-700/60">
        <h3 className="text-gray-900 dark:text-gray-100 font-bold text-base sm:text-lg">
          Export responses
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm sm:text-base">
          Download a PDF containing the responses from this session.
        </p>
        <div className="flex mt-6" style={{ justifyContent: 'flex-end' }}>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="px-4 py-2 bg-white hover:bg-purple-50 disabled:bg-gray-200 disabled:cursor-not-allowed text-purple-600 border-2 border-purple-600 text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            {isExporting ? 'Generating PDF…' : 'Export responses'}
          </button>
        </div>
        {exportError && <div className="mt-2 text-sm text-red-600">{exportError}</div>}
      </div>
    </div>
  );
}

function ReflectionBlock({ block, moduleId }: { block: Extract<ContentBlockType, { type: 'reflection' }>; moduleId: number }) {
  const { sessionId } = useSession();
  const { t } = useLanguage();
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
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 min-w-0">
        <div className="w-full sm:w-32 min-w-0">
          <div className="flex items-center w-full min-w-0 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 focus-within:border-blue-500">
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
              className="w-full min-w-0 p-3 sm:p-2 text-lg sm:text-xl font-bold text-right focus:outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-300"
            />
            {block.unit && <span className="pr-3 pl-2 text-base sm:text-lg font-bold text-gray-500 whitespace-nowrap">{block.unit}</span>}
          </div>
        </div>
      </div>
      <SubmitButton onClick={handleSubmit} disabled={!canSubmit || isSubmitting} />
      {isSubmitting && <div className="mt-2 text-sm text-gray-600">Submitting…</div>}
      {submitError && <div className="mt-2 text-sm text-red-600">{submitError}</div>}
      {isSubmitted && !submitError && <div className="mt-2 text-sm text-green-700">Submitted.</div>}
    </div>
  );
}

function QuoteCarouselBlock({ block }: { block: Extract<ContentBlockType, { type: 'quote-carousel' }> }) {
  const hasMultiple = block.quotes.length > 1;
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(block.quotes.length);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (!api) return;

    const update = () => {
      setCurrent(api.selectedScrollSnap() + 1);
      setCount(api.scrollSnapList().length);
      setCanPrev(api.canScrollPrev());
      setCanNext(api.canScrollNext());
    };

    update();
    api.on('select', update);
    api.on('reInit', update);

    return () => {
      api.off('select', update);
      api.off('reInit', update);
    };
  }, [api]);

  return (
    <div className="mb-6 sm:mb-8 font-sora">
      {block.title && (
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <Quote className="text-blue-600 dark:text-blue-400 flex-shrink-0" size={20} />
          <h3 className="text-gray-900 dark:text-gray-100 text-base sm:text-lg font-bold">{formatTitle(block.title)}</h3>
        </div>
      )}

      <Carousel setApi={(nextApi) => setApi(nextApi)} opts={{ loop: hasMultiple }} className="w-full">
        <CarouselContent>
          {block.quotes.map((q, idx) => (
            <CarouselItem key={idx} className="w-full">
              <div className="w-full max-w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <p
                  className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed italic"
                  style={{ whiteSpace: 'normal', overflowWrap: 'anywhere', wordBreak: 'break-word' }}
                >
                  “{q.quote}”
                </p>
                <div className="mt-4">
                  <div className="text-gray-900 dark:text-gray-100 text-sm sm:text-base font-semibold">
                    —{q.author}
                  </div>
                  {q.subtitle && (
                    <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-1">
                      {q.subtitle}
                    </div>
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {hasMultiple && (
          <div className="mt-3 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              disabled={!canPrev}
              onClick={() => api?.scrollPrev()}
              className="bg-white/80 dark:bg-gray-900/60"
              aria-label="Previous quote"
            >
              <ArrowLeft size={16} />
            </Button>
            <div className="px-2 text-xs text-gray-500 dark:text-gray-400 tabular-nums">
              {current} / {count}
            </div>
            <Button
              variant="outline"
              size="icon"
              disabled={!canNext}
              onClick={() => api?.scrollNext()}
              className="bg-white/80 dark:bg-gray-900/60"
              aria-label="Next quote"
            >
              <ArrowRight size={16} />
            </Button>
          </div>
        )}
      </Carousel>
    </div>
  );
}

function ImageCollageBlock({ block }: { block: Extract<ContentBlockType, { type: 'image-collage' }> }) {
  const cols = block.columns ?? 2;
  const gridColsClass =
    cols === 1
      ? 'sm:grid-cols-1'
      : cols === 2
        ? 'sm:grid-cols-2'
        : cols === 3
          ? 'sm:grid-cols-3'
          : 'sm:grid-cols-4';

  return (
    <div className="mb-6 sm:mb-8 font-sora">
      {block.title && (
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <Layers className="text-blue-600 dark:text-blue-400 flex-shrink-0" size={20} />
          <h3 className="text-gray-900 dark:text-gray-100 text-base sm:text-lg font-bold">{formatTitle(block.title)}</h3>
        </div>
      )}

      <div
        className={`grid grid-cols-1 ${gridColsClass} gap-3 sm:gap-4`}
        style={block.width ? { maxWidth: block.width, margin: '0 auto' } : undefined}
      >
        {block.images.map((img, idx) => (
          <div
            key={`${img.imageUrl}-${idx}`}
            className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80"
          >
            <img src={img.imageUrl} alt={img.alt} className="w-full h-auto block" />
            {img.caption && (
              <div className="px-3 py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                {img.caption}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function LottieBlock({ block }: { block: Extract<ContentBlockType, { type: 'lottie' }> }) {
  const lottieRef = useRef<any>(null);
  const [animationData, setAnimationData] = useState<unknown | null>((block.animationData as unknown) ?? null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    setLoadError(null);
    setAnimationData((block.animationData as unknown) ?? null);
  }, [block.animationData]);

  useEffect(() => {
    if (block.animationData) return;
    if (!block.animationUrl) return;

    let cancelled = false;
    setLoadError(null);

    (async () => {
      try {
        const url = block.animationUrl as string;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to load animation (${res.status})`);
        const json = await res.json();
        if (!cancelled) setAnimationData(json);
      } catch (e) {
        if (!cancelled) setLoadError(e instanceof Error ? e.message : 'Failed to load animation');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [block.animationUrl, block.animationData]);

  useEffect(() => {
    if (typeof block.speed !== 'number') return;
    if (!lottieRef.current?.setSpeed) return;
    lottieRef.current.setSpeed(block.speed);
  }, [block.speed, animationData]);

  const containerStyle = block.width ? { maxWidth: block.width, margin: '0 auto' } : undefined;

  return (
    <div className="mb-2 font-sora">
      {block.title && (
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="text-blue-600 dark:text-blue-400 flex-shrink-0" size={20} />
          <h3 className="text-gray-900 dark:text-gray-100 text-base sm:text-lg font-bold">{formatTitle(block.title)}</h3>
        </div>
      )}

      <div className="overflow-hidden" style={containerStyle}>
        {loadError ? (
          <div className="text-sm text-red-600">{loadError}</div>
        ) : !animationData ? (
          <div className="text-sm text-gray-600 dark:text-gray-400">Loading…</div>
        ) : (
          <Lottie
            lottieRef={lottieRef}
            animationData={animationData as any}
            loop={block.loop ?? true}
            autoplay={block.autoplay ?? true}
            style={{ width: '100%', height: block.height || undefined }}
          />
        )}
      </div>
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

const stripMarkdownMarkers = (text: string) => text.replace(/\*\*/g, '').trim();

const toSectionSlug = (text: string) =>
  stripMarkdownMarkers(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export function ContentBlock({
  block,
  moduleId
}: ContentBlockProps) {
  const { t } = useLanguage();
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);

  switch (block.type) {
    case 'text':
      const sectionSlug = block.title ? toSectionSlug(block.title) : undefined;
      return (
        <div className="mb-6 sm:mb-8 font-sora" data-section-slug={sectionSlug}>
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

    case 'stats': {
      const accent = block.accentColor ?? 'blue';
      const accents: Record<NonNullable<typeof block.accentColor>, { color: string; ring: string }> = {
        blue: { color: '#2563eb', ring: 'border-blue-100 dark:border-blue-900/40' },
        green: { color: '#16a34a', ring: 'border-green-100 dark:border-green-900/40' },
        amber: { color: '#d97706', ring: 'border-amber-100 dark:border-amber-900/40' },
        purple: { color: '#9333ea', ring: 'border-purple-100 dark:border-purple-900/40' },
        pink: { color: '#db2777', ring: 'border-pink-100 dark:border-pink-900/40' },
        teal: { color: '#0d9488', ring: 'border-teal-100 dark:border-teal-900/40' },
      };
      const styles = accents[accent];
      const data = block.items.map(item => ({
        name: item.label,
        value: Math.max(0, Math.min(100, item.value)),
      }));

      return (
        <div className="mb-6 sm:mb-8 font-sora">
          {block.title && (
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              {!block.hideIcon && <Layers className="text-blue-600 dark:text-blue-400 flex-shrink-0" size={20} />}
              <h2 className="text-gray-900 dark:text-gray-100 text-base sm:text-lg md:text-xl font-bold">{formatTitle(block.title)}</h2>
            </div>
          )}

          <div className={`rounded-2xl p-5 bg-white dark:bg-gray-800 border ${styles.ring} shadow-sm`}>
            <div className="h-48 w-full">
              <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
                <RechartsPrimitive.BarChart
                  data={data}
                  layout="vertical"
                  margin={{ left: 0, right: 28, top: 8, bottom: 8 }}
                >
                  <RechartsPrimitive.CartesianGrid horizontal={false} />
                  <RechartsPrimitive.XAxis
                    type="number"
                    domain={[0, 100]}
                    tickFormatter={(v: number) => `${v}%`}
                    axisLine={false}
                    tickLine={false}
                  />
                  <RechartsPrimitive.YAxis
                    type="category"
                    dataKey="name"
                    width={170}
                    axisLine={false}
                    tickLine={false}
                  />
                  <RechartsPrimitive.Bar
                    dataKey="value"
                    fill={styles.color}
                    radius={[8, 8, 8, 8]}
                    isAnimationActive={false}
                  >
                    <RechartsPrimitive.LabelList
                      dataKey="value"
                      position="right"
                      formatter={(v: number) => `${v}%`}
                    />
                  </RechartsPrimitive.Bar>
                </RechartsPrimitive.BarChart>
              </RechartsPrimitive.ResponsiveContainer>
            </div>
          </div>

          {block.footer ? (
            <TextWithGlossary
              text={block.footer}
              className="mt-4 text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line"
            />
          ) : null}
        </div>
      );
    }

    case 'tags': {
      const colorByLabel: Record<string, string> = {
        Sad: '#2563eb',
        Anxious: '#9333ea',
        Angry: '#dc2626',
        Powerless: '#6b7280',
        Helpless: '#0d9488',
        Guilty: '#d97706',
      };
      const fallbackColors = ['#2563eb', '#16a34a', '#d97706', '#9333ea', '#db2777', '#0d9488'];

      const getColor = (label: string, idx: number) => colorByLabel[label] ?? fallbackColors[idx % fallbackColors.length];

      const hexToRgba = (hex: string, alpha: number) => {
        const normalized = hex.replace('#', '').trim();
        const full = normalized.length === 3
          ? normalized.split('').map(c => `${c}${c}`).join('')
          : normalized;
        const r = parseInt(full.slice(0, 2), 16);
        const g = parseInt(full.slice(2, 4), 16);
        const b = parseInt(full.slice(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      };

      return (
        <div className="mb-6 sm:mb-8 font-sora">
          {block.title && (
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              {!block.hideIcon && <Quote className="text-blue-600 dark:text-blue-400 flex-shrink-0" size={20} />}
              <h2 className="text-gray-900 dark:text-gray-100 text-base sm:text-lg md:text-xl font-bold">{formatTitle(block.title)}</h2>
            </div>
          )}

          <div className="rounded-2xl p-5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
            {block.lead ? (
              <TextWithGlossary
                text={block.lead}
                className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line"
              />
            ) : null}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: block.lead ? '0.75rem' : undefined }}>
              {block.items.map((label, idx) => {
                const color = getColor(label, idx);
                return (
                  <span
                    key={`${label}-${idx}`}
                    className="text-sm sm:text-base font-semibold"
                    style={{
                      backgroundColor: hexToRgba(color, 0.12),
                      border: `1px solid ${hexToRgba(color, 0.25)}`,
                      color,
                      borderRadius: 9999,
                      padding: '0.45rem 0.75rem',
                      lineHeight: 1.2,
                    }}
                  >
                    {label}
                  </span>
                );
              })}
            </div>
          </div>

          {block.footer ? (
            <TextWithGlossary
              text={block.footer}
              className="mt-4 text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line"
            />
          ) : null}
        </div>
      );
    }

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
              <audio controls className="w-full" onPlay={() => trackEvent('audio_play', { module_id: moduleId, audio_title: block.title || 'Audio' })}>
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

    case 'video': {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [tracked, setTracked] = useState(false);
      return (
        <div 
          className="mb-6 sm:mb-8 font-sora"
          onMouseEnter={() => {
            // Track when user focuses/clicks into the iframe
            const checkFocus = () => {
              if (!tracked && document.activeElement instanceof HTMLIFrameElement && document.activeElement.src === block.videoUrl) {
                trackEvent('video_play', { module_id: moduleId, video_title: block.title || 'Video' });
                setTracked(true);
              }
            };
            window.addEventListener('blur', checkFocus);
            setTimeout(() => window.removeEventListener('blur', checkFocus), 30000);
          }}
        >
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
    }

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

    case 'image-collage':
      return <ImageCollageBlock block={block} />;

    case 'button': {
      const IconComponent = block.iconName ? (LucideIcons as any)[block.iconName] : null;
      const isHash = block.url.startsWith('#');
      const isInternal = block.url.startsWith('/');

      if (isHash) {
        return (
          <div className="mb-6 sm:mb-8 font-sora">
            <Button
              variant={block.variant}
              size={block.size}
              onClick={() => {
                const id = block.url.slice(1);
                const el = document.getElementById(id);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                window.history.replaceState(null, '', block.url);
              }}
            >
              {IconComponent ? <IconComponent /> : null}
              {block.label}
            </Button>
          </div>
        );
      }

      if (isInternal) {
        return (
          <div className="mb-6 sm:mb-8 font-sora">
            <Button asChild variant={block.variant} size={block.size}>
              <Link to={block.url}>
                {IconComponent ? <IconComponent /> : null}
                {block.label}
              </Link>
            </Button>
          </div>
        );
      }

      return (
        <div className="mb-6 sm:mb-8 font-sora">
          <Button asChild variant={block.variant} size={block.size}>
            <a
              href={block.url}
              target={block.newTab ? '_blank' : undefined}
              rel={block.newTab ? 'noopener noreferrer' : undefined}
            >
              {IconComponent ? <IconComponent /> : null}
              {block.label}
            </a>
          </Button>
        </div>
      );
    }

    case 'lottie':
      return <LottieBlock block={block} />;

    case 'icon': {
      const IconComponent = block.iconName ? (LucideIcons as any)[block.iconName] : null;
      return (
        <div className="mb-6 sm:mb-8 font-sora">
          {block.title && (
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              {IconComponent ? (
                <IconComponent className="text-blue-600 dark:text-blue-400 flex-shrink-0" size={20} />
              ) : block.iconAsset ? (
                <img src={block.iconAsset} alt="" className="w-5 h-5 object-contain flex-shrink-0" />
              ) : null}
              <h3 className="text-gray-900 dark:text-gray-100 text-base sm:text-lg font-bold">{formatTitle(block.title)}</h3>
            </div>
          )}
          <div className="flex justify-center py-2">
            {IconComponent ? (
              <IconComponent
                size={block.size || 48}
                className={block.color || "text-blue-600 dark:text-blue-400"}
              />
            ) : block.iconAsset ? (
              <img
                src={block.iconAsset}
                alt={block.title || "Icon"}
                style={{ width: block.size || 48, height: block.size || 48 }}
                className="object-contain"
              />
            ) : null}
          </div>
        </div>
      );
    }

    case 'dashboard':
      return moduleId === 1 ? <Module1CarbonRemovalDashboard /> : <InteractiveDashboard moduleId={moduleId} />;

    case 'exercise1-dashboard':
      return <Module1CarbonRemovalDashboard />;

    case '2ndExerciseDashboard':
      return <Module1RenewablesDashboard />;

    case 'third-exercise':
      return <Module1FossilFuelTaxesDashboard />;

    case 'fourth-exercise':
      return <Module1CarbonPriceDashboard />;

    case 'module3-carbon-price-dashboard':
      return <Module3CarbonPriceDashboard />;
    case 'module2-exercise':
      return <Module2ExerciseDashboard />;

    case 'module2-removals':
      return <Module2RemovalsDashboard />;

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

    case 'quote-carousel':
      return <QuoteCarouselBlock block={block} />;

    case 'module-feedback':
      return <ModuleFeedbackBlock block={block} moduleId={moduleId} />;

    default:
      return null;
  }
}
