// ⚠️ TEMPORARY — delete this file and remove route from App.tsx when done

import React, { useState, useRef } from 'react';
import { BeforeAfterSlider } from './BeforeAfterSlider';

import urmiaBeforeImg from '../assets/lake_urmia_june_2021_before.jpg';
import urmiaAfterImg from '../assets/lake_urmia_nov_2021_after.jpg';
import beaufortBeforeImg from '../assets/beaufort-sea-ice-breakup-before-2048x1536-80.jpg';
import beaufortAfterImg from '../assets/beaufort-sea-ice-breakup-after-2048x1536-80.jpg';
import himalayasBeforeImg from '../assets/Icemelt_Himalayas-A.jpg';
import himalayasAfterImg from '../assets/Icemelt_Himalayas-B.jpg';

import memeNocap from '../assets/meme/nocap.png';
import memeIcecaps from '../assets/meme/icecaps.png';
import memePinguin from '../assets/meme/pinguin.png';
import memeScientist from '../assets/meme/scirntist.png';
import memeMiami from '../assets/meme/miami.png';
import memeGenz from '../assets/meme/genz.png';
import memeCow from '../assets/meme/cow.png';
import memeTiktok from '../assets/meme/tiktok.png';

import birdsUrl from '../assets/music/birds.mp3';
import forestUrl from '../assets/music/forest.mp3';
import stormUrl from '../assets/music/storm.mp3';
import whalesUrl from '../assets/music/whales.mp3';


// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const SLIDERS = [
    {
        id: 1,
        title: 'Lake Urmia, Iran',
        beforeImage: urmiaBeforeImg,
        beforeLabel: 'June 2021 — filled with water',
        afterImage: urmiaAfterImg,
        afterLabel: 'Nov 2021 — drying out',
        caption: 'One of the world\'s largest hypersaline lakes has been shrinking rapidly since the 1990s.',
    },
    {
        id: 2,
        title: 'Beaufort Sea Ice',
        beforeImage: beaufortBeforeImg,
        beforeLabel: 'Before — solid ice',
        afterImage: beaufortAfterImg,
        afterLabel: 'After — ice breakup',
        caption: 'Arctic sea ice is breaking up at an accelerating rate due to rising temperatures.',
    },
    {
        id: 3,
        title: 'Himalayas Glacier',
        beforeImage: himalayasBeforeImg,
        beforeLabel: 'Before — glaciers intact',
        afterImage: himalayasAfterImg,
        afterLabel: 'After — glaciers melting',
        caption: 'Himalayan glaciers have lost over 40% of their ice volume in the last four decades.',
    },
];

const STATS = [
    { number: '1 million', unit: 'species', context: 'threatened with extinction due to climate & ecosystem destruction', color: '#ef4444', emoji: '🦋' },
    { number: '11 years', unit: '', context: 'left to cut emissions in half before climate change becomes uncontrollable — the clock started in 2021', color: '#f97316', emoji: '⏱️' },
    { number: '8×', unit: 'more likely', context: 'to experience a deadly heatwave if you\'re born today vs someone born in 1960', color: '#eab308', emoji: '🔥' },
    { number: '20 million', unit: 'people/year', context: 'already displaced by extreme weather events — the real climate refugees', color: '#3b82f6', emoji: '🌊' },
    { number: '1 football field', unit: 'every second', context: 'of forest is lost. Every. Second. While you read this, 4 fields disappeared.', color: '#22c55e', emoji: '🌳' },
    { number: '100×', unit: 'faster', context: 'than natural — the current rate of species extinction caused by human activity', color: '#a855f7', emoji: '🐾' },
];

const QUIZ: { question: string; myth: boolean; explanation: string }[] = [
    {
        question: '"Recycling is the most important thing I can do for the climate."',
        myth: true,
        explanation: 'Myth! Recycling helps but it\'s tiny. What\'s 10× more impactful: eating less meat, flying less, and switching to clean energy. Don\'t let companies convince you it\'s all on you.',
    },
    {
        question: '"Scientists actually disagree about whether climate change is real."',
        myth: true,
        explanation: 'Myth! 97% of climate scientists agree it\'s real and human-caused. The "debate" was largely manufactured by fossil fuel companies in the 1980s. Yes, really.',
    },
    {
        question: '"Renewable energy is now cheaper than coal in most countries."',
        myth: false,
        explanation: 'TRUE! Solar and wind are now the cheapest electricity ever recorded in history — cheaper than new coal or gas in most of the world. The technology won.',
    },
    {
        question: '"Trees alone can absorb all the CO₂ we produce."',
        myth: true,
        explanation: 'Myth! We\'d need to plant trees the size of the entire USA — every year — to absorb current emissions. Trees help, but we still need to cut emissions at the source.',
    },
    {
        question: '"Young people\'s individual actions can\'t make a real difference."',
        myth: true,
        explanation: 'Myth! When young people elect climate-conscious leaders, push schools to divest, and shift culture — that\'s systemic change. The youth climate movement has already reshaped global policy.',
    },
    {
        question: '"The oceans absorb about 90% of the excess heat from global warming."',
        myth: false,
        explanation: 'TRUE! The oceans are our biggest buffer. But it\'s making them warmer, more acidic, and killing ecosystems from the inside. The ocean is doing the heavy lifting — for now.',
    },
];


const QUOTES = [
    { text: 'The Earth does not belong to us. We belong to the Earth.', author: 'Chief Seattle', emoji: '🌍' },
    { text: 'We do not inherit the earth from our ancestors; we borrow it from our children.', author: 'Antoine de Saint-Exupéry', emoji: '🧒' },
    { text: 'Our house is on fire. I want you to act as if the house is on fire, because it is.', author: 'Greta Thunberg', emoji: '🔥' },
    { text: 'Climate change is the greatest threat to life on Earth. It has no borders, no passport.', author: 'David Attenborough', emoji: '🌊' },
    { text: 'In every walk with nature, one receives far more than he seeks.', author: 'John Muir', emoji: '🌲' },
    { text: 'The good man is the friend of all living things.', author: 'Mahatma Gandhi', emoji: '🕊️' },
];

const SONGS = [
    {
        title: 'Birds',
        desc: 'Morning birdsong in a healthy forest',
        emoji: '🐦',
        color: 'linear-gradient(135deg, #bbf7d0 0%, #4ade80 100%)',
        src: birdsUrl,
    },
    {
        title: 'Forest',
        desc: 'Deep rainforest sounds',
        emoji: '🌿',
        color: 'linear-gradient(135deg, #6ee7b7 0%, #059669 100%)',
        src: forestUrl,
    },
    {
        title: 'Storm',
        desc: 'Thunder & rain — extreme weather',
        emoji: '⛈️',
        color: 'linear-gradient(135deg, #c7d2fe 0%, #4f46e5 100%)',
        src: stormUrl,
    },
    {
        title: 'Whales',
        desc: 'Deep ocean whale songs',
        emoji: '🐋',
        color: 'linear-gradient(135deg, #bae6fd 0%, #0369a1 100%)',
        src: whalesUrl,
    },
];

const MEMES: { img: string; meme: string; fact: string }[] = [
    {
        img: memeNocap,
        meme: 'No cap, the planet is literally cooked rn',
        fact: '2023 was the hottest year ever recorded on Earth. It was 1.45°C above pre-industrial levels. No cap.',
    },
    {
        img: memeIcecaps,
        meme: 'POV: the ice caps after one summer',
        fact: 'Arctic sea ice is melting 3× faster than the global average. Some scientists predict ice-free summers by 2040.',
    },
    {
        img: memePinguin,
        meme: 'Penguin looking for its home after we messed up Antarctica',
        fact: 'Emperor penguins could be near extinct by 2100 if emissions don\'t drop. They need sea ice to breed.',
    },
    {
        img: memeScientist,
        meme: 'Climate scientists: "This is fine." 🔬🔥',
        fact: 'In 2024 alone, the world experienced 44 separate billion-dollar weather disasters. Fine.',
    },
    {
        img: memeMiami,
        meme: 'Miami in 2050 be like: underwater city, new aesthetic',
        fact: 'Miami could face regular flooding by 2040. Sea levels around Miami are rising 3–5mm every year.',
    },
    {
        img: memeGenz,
        meme: 'Gen Z really said: okay fine, we\'ll fix it ourselves',
        fact: 'Young people (under 35) report the highest levels of climate anxiety AND the highest rates of taking climate action. Let\'s go.',
    },
    {
        img: memeCow,
        meme: 'Every time someone orders a burger, a cow side-eyes the Amazon',
        fact: 'Beef production is responsible for 80% of Amazon deforestation. One beef burger = 3kg of CO₂.',
    },
    {
        img: memeTiktok,
        meme: 'Me scrolling TikTok while the reef is bleaching again',
        fact: 'The Great Barrier Reef has experienced 6 mass bleaching events since 1998. The last 4 happened after 2016.',
    },
];


// ─────────────────────────────────────────────────────────────────────────────
// PROGRESS SHOWCASE
// ─────────────────────────────────────────────────────────────────────────────

const TOTAL_BLOCKS = 8;

/** Variant A — Battery */
function BatteryProgress({ current }: { current: number }) {
    const pct = Math.round((current / TOTAL_BLOCKS) * 100);
    const color = pct >= 75 ? '#22c55e' : pct >= 40 ? '#84cc16' : '#facc15';
    return (
        <div className="flex items-center justify-center gap-3">
            <div className="relative flex items-center" style={{ width: 160, height: 52 }}>
                {/* Body */}
                <div
                    className="rounded-md border-2 relative overflow-hidden"
                    style={{ width: 148, height: 48, borderColor: '#374151', background: '#f3f4f6' }}
                >
                    {/* Fill */}
                    <div
                        className="absolute inset-y-0 left-0 transition-all duration-500"
                        style={{ width: `${pct}%`, background: color, borderRadius: '4px 0 0 4px' }}
                    />
                    {/* Segment lines */}
                    {[1, 2, 3, 4, 5, 6, 7].map(i => (
                        <div
                            key={i}
                            className="absolute inset-y-0 w-px bg-gray-300/60"
                            style={{ left: `${(i / TOTAL_BLOCKS) * 100}%` }}
                        />
                    ))}
                    {/* Label */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold" style={{ color: pct > 50 ? 'white' : '#374151' }}>
                            {current} / {TOTAL_BLOCKS}
                        </span>
                    </div>
                </div>
                {/* Nub */}
                <div className="rounded-r" style={{ width: 8, height: 22, background: '#374151' }} />
            </div>
        </div>
    );
}

/** Variant B — Minimal dots */
function DotsProgress({ current }: { current: number }) {
    return (
        <div className="flex items-center justify-center gap-2">
            {Array.from({ length: TOTAL_BLOCKS }).map((_, i) => (
                <div
                    key={i}
                    className="rounded-full transition-all duration-400"
                    style={{
                        width: i < current ? 10 : 8,
                        height: i < current ? 10 : 8,
                        background: i < current ? '#2F8237' : '#d1fae5',
                        border: i < current ? 'none' : '1.5px solid #86efac',
                        transform: i === current - 1 ? 'scale(1.25)' : 'scale(1)',
                        transition: 'all 0.3s ease',
                    }}
                />
            ))}
        </div>
    );
}

/** Variant C — Pill steps */
function PillProgress({ current }: { current: number }) {
    return (
        <div className="flex items-center gap-1 justify-center">
            {Array.from({ length: TOTAL_BLOCKS }).map((_, i) => (
                <div
                    key={i}
                    className="rounded-full transition-all duration-400"
                    style={{
                        height: 6,
                        width: i < current ? 28 : 16,
                        background: i < current ? '#2F8237' : '#d1fae5',
                        opacity: i === current - 1 ? 1 : i < current ? 0.85 : 0.5,
                        transition: 'all 0.35s cubic-bezier(.4,0,.2,1)',
                    }}
                />
            ))}
        </div>
    );
}

/** Variant D — Leaf / nature fill */
function LeafProgress({ current }: { current: number }) {
    const pct = (current / TOTAL_BLOCKS) * 100;
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="w-full rounded-full overflow-hidden" style={{ height: 14, background: '#dcfce7', maxWidth: 260 }}>
                <div
                    className="h-full rounded-full relative transition-all duration-500"
                    style={{
                        width: `${pct}%`,
                        background: 'linear-gradient(90deg, #86efac 0%, #2F8237 100%)',
                    }}
                />
            </div>
            <div className="flex w-full justify-between text-[10px] text-gray-400" style={{ maxWidth: 260 }}>
                <span>🌱 Start</span>
                <span style={{ color: '#2F8237', fontWeight: 600 }}>{current} of {TOTAL_BLOCKS} blocks</span>
                <span>🌳 Done</span>
            </div>
        </div>
    );
}

/** Variant E — Arc / semicircle */
function ArcProgress({ current }: { current: number }) {
    const pct = current / TOTAL_BLOCKS;
    const r = 52;
    const cx = 70;
    const cy = 70;
    const strokeW = 10;
    // We use half-circle: arc from 180° to 0°
    const total = Math.PI * r; // half circumference
    const dash = total * pct;
    const gap = total - dash;
    // SVG arc path for a half-circle
    const d = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;
    return (
        <div className="flex flex-col items-center gap-1">
            <svg width={140} height={80} viewBox="0 0 140 78">
                {/* Track */}
                <path d={d} fill="none" stroke="#d1fae5" strokeWidth={strokeW} strokeLinecap="round" />
                {/* Fill */}
                <path
                    d={d}
                    fill="none"
                    stroke="#2F8237"
                    strokeWidth={strokeW}
                    strokeLinecap="round"
                    strokeDasharray={`${dash} ${gap + 0.01}`}
                    style={{ transition: 'stroke-dasharray 0.5s ease' }}
                />
                {/* Tick marks */}
                {Array.from({ length: TOTAL_BLOCKS + 1 }).map((_, i) => {
                    const angle = Math.PI - (i / TOTAL_BLOCKS) * Math.PI;
                    const x1 = cx + (r - strokeW / 2 - 2) * Math.cos(angle);
                    const y1 = cy - (r - strokeW / 2 - 2) * Math.sin(angle);
                    const x2 = cx + (r + strokeW / 2 + 2) * Math.cos(angle);
                    const y2 = cy - (r + strokeW / 2 + 2) * Math.sin(angle);
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth={1.5} />;
                })}
                <text x={cx} y={cy - 4} textAnchor="middle" fontSize={18} fontWeight="bold" fill="#2F8237">{current}</text>
                <text x={cx} y={cy + 14} textAnchor="middle" fontSize={9} fill="#9ca3af">of {TOTAL_BLOCKS}</text>
            </svg>
        </div>
    );
}

/** 📊 Progress Showcase Section */
function ProgressShowcase() {
    const [step, setStep] = useState(3);

    const variants = [
        { id: 'battery', label: 'A  Battery', component: <BatteryProgress current={step} /> },
        { id: 'dots', label: 'B  Dots', component: <DotsProgress current={step} /> },
        { id: 'pills', label: 'C  Pills', component: <PillProgress current={step} /> },
        { id: 'leaf', label: 'D  Nature bar', component: <LeafProgress current={step} /> },
        { id: 'arc', label: 'E  Arc', component: <ArcProgress current={step} /> },
    ];

    return (
        <div className="space-y-5">
            {/* Stepper controls */}
            <div className="flex items-center justify-center gap-4">
                <button
                    onClick={() => setStep(s => Math.max(0, s - 1))}
                    disabled={step === 0}
                    className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-30 transition-colors"
                >← Prev block</button>
                <span className="text-xs font-mono text-gray-500">block {step} / {TOTAL_BLOCKS}</span>
                <button
                    onClick={() => setStep(s => Math.min(TOTAL_BLOCKS, s + 1))}
                    disabled={step === TOTAL_BLOCKS}
                    className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-30 transition-colors"
                >Next block →</button>
            </div>

            {/* Variants grid */}
            <div className="space-y-4">
                {variants.map(v => (
                    <div key={v.id} className="rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-5 py-4 space-y-3">
                        <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">{v.label}</div>
                        <div className="py-1">{v.component}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

/** 💥 Shocking Stats */
function ShockingStats() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {STATS.map((s, i) => (
                <div
                    key={i}
                    className="rounded-lg p-3 text-white flex flex-col justify-between"
                    style={{ backgroundColor: s.color, minHeight: '110px' }}
                >
                    <div className="text-xl mb-1">{s.emoji}</div>
                    <div>
                        <div className="text-lg font-black leading-tight">{s.number}</div>
                        {s.unit && <div className="text-xs font-semibold opacity-90">{s.unit}</div>}
                        <div className="text-[11px] opacity-80 mt-0.5 leading-snug">{s.context}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

/** ✅ True or Myth? Quiz */
function TrueOrMyth() {
    const [answers, setAnswers] = useState<{ [i: number]: boolean }>({});
    const [revealed, setRevealed] = useState<{ [i: number]: boolean }>({});

    const handleAnswer = (i: number, calledMyth: boolean) => {
        if (revealed[i]) return;
        setAnswers(a => ({ ...a, [i]: calledMyth }));
        setRevealed(r => ({ ...r, [i]: true }));
    };

    const score = Object.entries(revealed).filter(([i]) => answers[+i] === QUIZ[+i].myth).length;
    const total = Object.keys(revealed).length;

    return (
        <div className="space-y-2">
            {total > 0 && (
                <div className="text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
                    Score: {score}/{total} correct
                </div>
            )}
            {QUIZ.map((q, i) => {
                const done = !!revealed[i];
                const correct = answers[i] === q.myth;
                return (
                    <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
                        <div className="px-3 py-2.5">
                            <p className="text-sm text-gray-800 dark:text-gray-200 leading-snug mb-2">{q.question}</p>
                            {!done ? (
                                <div className="flex gap-1.5">
                                    <button
                                        onClick={() => handleAnswer(i, false)}
                                        className="flex-1 py-1.5 rounded text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 transition-colors"
                                    >
                                        ✅ TRUE
                                    </button>
                                    <button
                                        onClick={() => handleAnswer(i, true)}
                                        className="flex-1 py-1.5 rounded text-xs font-semibold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 transition-colors"
                                    >
                                        🚫 MYTH
                                    </button>
                                </div>
                            ) : (
                                <div className={`rounded p-2 text-xs ${correct ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500' : 'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500'}`}>
                                    <span className="font-bold">{correct ? '🎉 Correct!' : '❌ Wrong!'} It\'s a {q.myth ? 'MYTH' : 'TRUE fact'}.</span>{' '}
                                    <span className="text-gray-600 dark:text-gray-300">{q.explanation}</span>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

/** ✍️ Pledge Wall */
function PledgeWall() {
    const [pledge, setPledge] = useState('');
    const [pledges, setPledges] = useState<string[]>([]);
    const [submitted, setSubmitted] = useState(false);

    const PROMPTS = [
        'I will eat one meat-free meal per week 🥗',
        'I will talk to one person about climate change 💬',
        'I will walk or cycle instead of getting a car ride 🚲',
        'I will research which politicians support climate action 🗳️',
        'I will stop buying fast fashion for one month 👕',
    ];

    const submit = () => {
        if (!pledge.trim()) return;
        setPledges(p => [pledge, ...p]);
        setPledge('');
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className="space-y-4">
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Pick one or write your own:</p>

                {/* Prompt chips */}
                <div className="flex flex-wrap gap-2">
                    {PROMPTS.map((p, i) => (
                        <button
                            key={i}
                            onClick={() => setPledge(p)}
                            className="text-xs px-3 py-1.5 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors text-left"
                        >
                            {p}
                        </button>
                    ))}
                </div>

                {/* Input */}
                <textarea
                    rows={2}
                    value={pledge}
                    onChange={e => setPledge(e.target.value)}
                    placeholder="I will..."
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                    onClick={submit}
                    disabled={!pledge.trim()}
                    className="w-full py-2.5 rounded-lg text-white font-semibold text-sm transition-opacity disabled:opacity-40"
                    style={{ backgroundColor: '#2F8237' }}
                >
                    {submitted ? '🎉 Pledged!' : '✊ Take the pledge'}
                </button>
            </div>

            {/* Pledge list */}
            {pledges.length > 0 && (
                <div className="space-y-2">
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Pledges made this session ({pledges.length})</div>
                    {pledges.map((p, i) => (
                        <div key={i} className="flex items-start gap-2 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 px-3 py-2 text-sm text-gray-800 dark:text-gray-200">
                            <span className="text-green-500 mt-0.5">✓</span> {p}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}


/** 🤙 Memes & Relatable Phrases */
function MemesWall() {
    const [flipped, setFlipped] = useState<number | null>(null);

    return (
        <div style={{ padding: '0 10%' }}>
            <div className="grid grid-cols-2 gap-3">

                {MEMES.map((m, i) => (
                    <button
                        key={i}
                        onClick={() => setFlipped(flipped === i ? null : i)}
                        className="text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
                        style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #e5e7eb', background: 'white' }}
                    >
                        {flipped === i ? (
                            /* Fact side — full white card */
                            <div className="flex flex-col justify-between p-4" style={{ minHeight: 220 }}>
                                <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">🔬 Real fact</div>
                                <p className="text-xs text-gray-700 leading-relaxed my-3">{m.fact}</p>
                                <div className="text-[10px] text-gray-400">tap to flip back ↩</div>
                            </div>
                        ) : (
                            /* Image only — text already on the image */
                            <div style={{ aspectRatio: '1 / 1', overflow: 'hidden', background: '#f3f4f6' }}>
                                <img
                                    src={m.img}
                                    alt={m.meme}
                                    draggable={false}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}



/** 💬 Quote Carousel */
function QuoteCarousel() {
    const [idx, setIdx] = useState(0);
    const quote = QUOTES[idx];

    return (
        <div className="space-y-3 text-center">
            <div className="text-3xl">{quote.emoji}</div>
            <blockquote className="text-sm italic text-gray-700 dark:text-gray-300 leading-relaxed">
                “{quote.text}”
            </blockquote>
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                — {quote.author}
            </div>
            <div className="flex items-center justify-center gap-3 pt-1">
                <button
                    onClick={() => setIdx((i) => (i - 1 + QUOTES.length) % QUOTES.length)}
                    className="px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-xs transition-colors"
                >
                    ← Prev
                </button>
                <span className="text-xs text-gray-400">{idx + 1} / {QUOTES.length}</span>
                <button
                    onClick={() => setIdx((i) => (i + 1) % QUOTES.length)}
                    className="px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-xs transition-colors"
                >
                    Next →
                </button>
            </div>
        </div>
    );
}



/** 🎵 Audio Player */
function AudioPlayer() {
    const [playing, setPlaying] = useState<number | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const toggle = (i: number, src: string) => {
        if (playing === i) {
            audioRef.current?.pause();
            setPlaying(null);
        } else {
            if (audioRef.current) audioRef.current.pause();
            const audio = new Audio(src);
            audio.play().catch(() => { });
            audioRef.current = audio;
            audio.onended = () => setPlaying(null);
            setPlaying(i);
        }
    };

    return (
        <div className="grid grid-cols-2 gap-3">
            {SONGS.map((song, i) => {
                const isPlaying = playing === i;
                return (
                    <button
                        key={i}
                        onClick={() => toggle(i, song.src)}
                        className="relative text-left rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-xl active:scale-[0.97]"
                        style={{ background: song.color, minHeight: 130 }}
                    >
                        {/* Big emoji */}
                        <div style={{ fontSize: 44, padding: '18px 18px 0', lineHeight: 1 }}>{song.emoji}</div>

                        {/* Title + desc */}
                        <div style={{ padding: '10px 18px 14px' }}>
                            <div className="text-sm font-bold text-white">{song.title}</div>
                            <div className="text-[10px] text-white/70 mt-0.5">{song.desc}</div>
                        </div>

                        {/* Play/Pause button — bottom right */}
                        <div
                            className="absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
                            style={{ background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(6px)' }}
                        >
                            {isPlaying ? (
                                /* Pause icon */
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
                                    <rect x="2" y="1" width="4" height="12" rx="1" />
                                    <rect x="8" y="1" width="4" height="12" rx="1" />
                                </svg>
                            ) : (
                                /* Play icon */
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
                                    <polygon points="3,1 13,7 3,13" />
                                </svg>
                            )}
                        </div>

                        {/* Animated waveform when playing */}
                        {isPlaying && (
                            <div
                                className="absolute bottom-3 left-3 flex gap-[3px] items-end"
                                style={{ height: 20 }}
                            >
                                {[4, 8, 6, 10, 5, 9, 7].map((h, b) => (
                                    <div
                                        key={b}
                                        className="rounded-full"
                                        style={{
                                            width: 3,
                                            height: h,
                                            background: 'rgba(255,255,255,0.8)',
                                            animation: `pulse 0.${6 + b}s ease-in-out infinite alternate`,
                                            animationDelay: `${b * 0.08}s`,
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </button>
                );
            })}
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────

const SECTION_STYLES: Record<string, { accent: string; iconBg: string; iconColor: string }> = {
    progress: { accent: '#2F8237', iconBg: '#dcfce7', iconColor: '#15803d' },
    photos: { accent: '#0ea5e9', iconBg: '#e0f2fe', iconColor: '#0369a1' },
    quiz: { accent: '#8b5cf6', iconBg: '#ede9fe', iconColor: '#6d28d9' },
    pledge: { accent: '#f97316', iconBg: '#ffedd5', iconColor: '#c2410c' },
    quotes: { accent: '#ec4899', iconBg: '#fce7f3', iconColor: '#be185d' },
    audio: { accent: '#14b8a6', iconBg: '#ccfbf1', iconColor: '#0f766e' },
    memes: { accent: '#6366f1', iconBg: '#e0e7ff', iconColor: '#4338ca' },
};

export function SandboxPage() {
    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sora">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">

                    {/* Header */}
                    <div className="relative h-32 sm:h-40 overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, #0d1117 0%, #1a3a2a 100%)' }}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-6 right-6">
                            <div
                                className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full mb-2"
                                style={{ background: 'rgba(255,255,255,0.08)', color: '#86efac', border: '1px solid rgba(134,239,172,0.25)' }}
                            >
                                🧪 Sandbox — UI explorations
                            </div>
                            <h1 className="text-white text-xl sm:text-2xl font-black tracking-tight">
                                Our Changing Planet
                            </h1>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-6 md:p-8 lg:p-10">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                            {/* 1 — Progress Indicators */}
                            <SectionCard style={SECTION_STYLES.progress}>
                                <SectionHeader num={1} emoji="📊" title="Progress Indicators" subtitle="8 блоков в модуле — как показывать продвижение? Нажимай Prev / Next и выбирай вариант." accent={SECTION_STYLES.progress.accent} iconBg={SECTION_STYLES.progress.iconBg} iconColor={SECTION_STYLES.progress.iconColor} />
                                <div className="mt-5"><ProgressShowcase /></div>
                            </SectionCard>

                            {/* 2 — Before & After */}
                            <SectionCard style={SECTION_STYLES.photos}>
                                <SectionHeader num={2} emoji="📸" title="Before &amp; After" subtitle="Drag the slider to compare — same place, different times." accent={SECTION_STYLES.photos.accent} iconBg={SECTION_STYLES.photos.iconBg} iconColor={SECTION_STYLES.photos.iconColor} />
                                <div className="space-y-5 mt-5">
                                    {SLIDERS.map((s) => (
                                        <div key={s.id}>
                                            <BeforeAfterSlider
                                                beforeImage={s.beforeImage}
                                                afterImage={s.afterImage}
                                                beforeLabel={s.beforeLabel}
                                                afterLabel={s.afterLabel}
                                                caption={s.caption}
                                            />
                                            <p className="text-[11px] text-center text-gray-400 mt-1.5 font-medium">{s.title}</p>
                                        </div>
                                    ))}
                                </div>
                            </SectionCard>

                            {/* 3 — True or Myth */}
                            <SectionCard style={SECTION_STYLES.quiz}>
                                <SectionHeader num={3} emoji="🧠" title="True or Myth?" subtitle="Tap TRUE or MYTH — then find out what's really going on." accent={SECTION_STYLES.quiz.accent} iconBg={SECTION_STYLES.quiz.iconBg} iconColor={SECTION_STYLES.quiz.iconColor} />
                                <div className="mt-4"><TrueOrMyth /></div>
                            </SectionCard>

                            {/* 4 — Pledge */}
                            <SectionCard style={SECTION_STYLES.pledge}>
                                <SectionHeader num={4} emoji="✊" title="Take a Pledge" subtitle="One action. Just one. You've got this." accent={SECTION_STYLES.pledge.accent} iconBg={SECTION_STYLES.pledge.iconBg} iconColor={SECTION_STYLES.pledge.iconColor} />
                                <div className="mt-4"><PledgeWall /></div>
                            </SectionCard>

                            {/* 5 — Quotes */}
                            <SectionCard style={SECTION_STYLES.quotes}>
                                <SectionHeader num={5} emoji="💬" title="Voices for the Planet" subtitle="What scientists, activists, and leaders say about climate change." accent={SECTION_STYLES.quotes.accent} iconBg={SECTION_STYLES.quotes.iconBg} iconColor={SECTION_STYLES.quotes.iconColor} />
                                <div className="mt-4"><QuoteCarousel /></div>
                            </SectionCard>

                            {/* 6 — Audio */}
                            <SectionCard style={SECTION_STYLES.audio}>
                                <SectionHeader num={6} emoji="🎵" title="Sounds of Nature" subtitle="Listen to what we're protecting. Press play." accent={SECTION_STYLES.audio.accent} iconBg={SECTION_STYLES.audio.iconBg} iconColor={SECTION_STYLES.audio.iconColor} />
                                <div className="mt-4"><AudioPlayer /></div>
                            </SectionCard>

                            {/* 7 — Memes */}
                            <SectionCard style={SECTION_STYLES.memes}>
                                <SectionHeader num={7} emoji="💀" title="No Cap: Climate Memes" subtitle="Tap a card to reveal the real fact behind the meme." accent={SECTION_STYLES.memes.accent} iconBg={SECTION_STYLES.memes.iconBg} iconColor={SECTION_STYLES.memes.iconColor} />
                                <div className="mt-4"><MemesWall /></div>
                            </SectionCard>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


function SectionCard({
    children,
    style,
}: {
    children: React.ReactNode;
    style: { accent: string; iconBg: string; iconColor: string };
}) {
    return (
        <section
            className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm"
            style={{ border: '1px solid #e5e7eb', borderLeft: `4px solid ${style.accent}` }}
        >
            <div className="px-5 py-5">{children}</div>
        </section>
    );
}

function SectionHeader({
    num, emoji, title, subtitle, accent, iconBg, iconColor,
}: {
    num: number;
    emoji: string;
    title: string;
    subtitle: string;
    accent: string;
    iconBg: string;
    iconColor: string;
}) {
    return (
        <div className="flex items-start gap-3">
            {/* Icon badge */}
            <div
                className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-base"
                style={{ background: iconBg, color: iconColor }}
            >
                {emoji}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: accent }}>#{num}</span>
                    <h2 className="text-[15px] font-bold text-gray-900 dark:text-gray-100 leading-snug">{title}</h2>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">{subtitle}</p>
            </div>
        </div>
    );
}
