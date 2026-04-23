import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export type TrueOrMythItem = {
  statement: string;
  answer: 'TRUE' | 'MYTH';
  explanation: string;
};

type Props = {
  items: TrueOrMythItem[];
};

type GuessState = 'TRUE' | 'MYTH' | null;

export function TrueOrMythBlock({ items }: Props) {
  const { t } = useLanguage();
  const quiz = (t.pages.flexibleModule as any)?.trueOrMyth ?? {};

  const labelText    = quiz.label        ?? 'TRUE OR MYTH';
  const trueText     = quiz.trueButton   ?? 'True';
  const mythText     = quiz.mythButton   ?? 'Myth';
  const correctText  = quiz.correct      ?? 'Correct!';
  const incorrectText = quiz.incorrect   ?? 'Not quite';

  const [guesses, setGuesses]   = useState<GuessState[]>(items.map(() => null));
  const [revealed, setRevealed] = useState<boolean[]>(items.map(() => false));

  const handleGuess = (index: number, guess: 'TRUE' | 'MYTH') => {
    if (revealed[index]) return;
    const ng = [...guesses];   ng[index] = guess;   setGuesses(ng);
    const nr = [...revealed];  nr[index] = true;    setRevealed(nr);
  };

  return (
    <div className="mb-8 font-sora">

      {/* ── Label ─────────────────────────────────────────────── */}
      <div className="mb-6">
        <span
          className="inline-block text-xs font-extrabold tracking-widest uppercase px-3 py-1 rounded-md"
          style={{
            color: '#0d9488',
            background: 'rgba(13,148,136,0.09)',
            letterSpacing: '0.12em',
          }}
        >
          {labelText}
        </span>
      </div>

      {/* ── Questions ─────────────────────────────────────────── */}
      <div className="space-y-8">
        {items.map((item, index) => {
          const guess      = guesses[index];
          const isRevealed = revealed[index];
          const isCorrect  = guess === item.answer;

          return (
            <div key={index}>

              {/* Divider (except first) */}
              {index > 0 && (
                <div className="h-px bg-gray-100 dark:bg-gray-700 mb-8" />
              )}

              {/* Statement */}
              <p
                className="text-gray-900 dark:text-gray-100 text-base sm:text-lg font-semibold leading-relaxed mb-5"
                style={{ lineHeight: 1.65 }}
              >
                {item.statement}
              </p>

              {/* Buttons */}
              {!isRevealed ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleGuess(index, 'TRUE')}
                    className="flex-1 py-3 rounded-xl text-sm sm:text-base font-semibold transition-all duration-150 active:scale-95 hover:brightness-95"
                    style={{
                      background: 'rgba(74,153,100,0.10)',
                      color: '#2d7a50',
                      border: '1.5px solid rgba(74,153,100,0.30)',
                    }}
                    aria-label={`${trueText} — statement ${index + 1}`}
                  >
                    {trueText}
                  </button>
                  <button
                    onClick={() => handleGuess(index, 'MYTH')}
                    className="flex-1 py-3 rounded-xl text-sm sm:text-base font-semibold transition-all duration-150 active:scale-95 hover:brightness-95"
                    style={{
                      background: 'rgba(185,72,72,0.08)',
                      color: '#b94848',
                      border: '1.5px solid rgba(185,72,72,0.28)',
                    }}
                    aria-label={`${mythText} — statement ${index + 1}`}
                  >
                    {mythText}
                  </button>
                </div>
              ) : (
                <div className="flex gap-3 mb-4">
                  {/* True pill — filled if selected / faded otherwise */}
                  <div
                    className="flex-1 py-3 rounded-xl text-sm sm:text-base font-semibold text-center transition-all"
                    style={
                      guess === 'TRUE'
                        ? { background: 'rgba(74,153,100,0.18)', color: '#2d7a50', border: '1.5px solid rgba(74,153,100,0.45)' }
                        : { background: 'rgba(107,114,128,0.05)', color: '#9ca3af', border: '1.5px solid rgba(107,114,128,0.12)' }
                    }
                  >
                    {trueText}
                  </div>
                  {/* Myth pill — filled if selected / faded otherwise */}
                  <div
                    className="flex-1 py-3 rounded-xl text-sm sm:text-base font-semibold text-center transition-all"
                    style={
                      guess === 'MYTH'
                        ? { background: 'rgba(185,72,72,0.13)', color: '#b94848', border: '1.5px solid rgba(185,72,72,0.38)' }
                        : { background: 'rgba(107,114,128,0.05)', color: '#9ca3af', border: '1.5px solid rgba(107,114,128,0.12)' }
                    }
                  >
                    {mythText}
                  </div>
                </div>
              )}

              {/* Answer reveal — fade in */}
              {isRevealed && (
                <div
                  className="mt-4 rounded-xl px-5 py-4"
                  style={{
                    animation: 'fadeInUp 0.3s ease-out both',
                    background: isCorrect
                      ? 'rgba(74,153,100,0.08)'
                      : 'rgba(185,72,72,0.07)',
                    borderLeft: `3px solid ${isCorrect ? 'rgba(74,153,100,0.55)' : 'rgba(185,72,72,0.45)'}`,
                  }}
                >
                  {/* Correct / Incorrect tag */}
                  <p
                    className="text-xs font-extrabold uppercase tracking-widest mb-2"
                    style={{ color: isCorrect ? '#2d7a50' : '#b94848', letterSpacing: '0.1em' }}
                  >
                    {isCorrect ? correctText : incorrectText}
                    {' · '}
                    <span style={{ color: isCorrect ? '#2d7a50' : '#b94848' }}>
                      {item.answer === 'TRUE' ? trueText : mythText}
                    </span>
                  </p>
                  {/* Explanation */}
                  <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                    {item.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Keyframe for reveal animation */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
