import { useRef, useState, useCallback, useEffect } from 'react';

export interface BeforeAfterSliderProps {
    beforeImage: string;
    afterImage: string;
    beforeLabel?: string;
    afterLabel?: string;
    caption?: string;
    initialPosition?: number;
}

export function BeforeAfterSlider({
    beforeImage,
    afterImage,
    beforeLabel = 'Before',
    afterLabel = 'After',
    caption,
    initialPosition = 50,
}: BeforeAfterSliderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [pos, setPos] = useState(initialPosition); // 0–100
    const dragging = useRef(false);

    const calcPos = useCallback((clientX: number) => {
        const el = containerRef.current;
        if (!el) return 50;
        const { left, width } = el.getBoundingClientRect();
        return Math.min(100, Math.max(0, ((clientX - left) / width) * 100));
    }, []);

    // Unified pointer event approach — no jumping, works on touch + mouse
    const onPointerDown = (e: React.PointerEvent) => {
        e.preventDefault();
        dragging.current = true;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    };

    const onPointerMove = useCallback((e: React.PointerEvent) => {
        if (!dragging.current) return;
        setPos(calcPos(e.clientX));
    }, [calcPos]);

    const onPointerUp = () => {
        dragging.current = false;
    };

    // Click anywhere on img to jump
    const onContainerPointerDown = (e: React.PointerEvent) => {
        setPos(calcPos(e.clientX));
        dragging.current = true;
    };

    // Keyboard accessibility
    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowLeft') setPos(p => Math.max(0, p - 1));
        if (e.key === 'ArrowRight') setPos(p => Math.min(100, p + 1));
    };

    return (
        <div className="space-y-2">
            {/* Container */}
            <div
                ref={containerRef}
                onPointerDown={onContainerPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                className="relative w-full overflow-hidden rounded-xl select-none cursor-col-resize"
                style={{ aspectRatio: '16 / 9', touchAction: 'none' }}
                aria-label="Before and after image comparison"
            >
                {/* AFTER — base layer, always full width */}
                <img
                    src={afterImage}
                    alt={afterLabel}
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* BEFORE — clipped via clip-path so image never changes size → no jump */}
                <img
                    src={beforeImage}
                    alt={beforeLabel}
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                        clipPath: `inset(0 ${100 - pos}% 0 0)`,
                        transition: dragging.current ? 'none' : 'clip-path 0.05s linear',
                    }}
                />

                {/* Divider line */}
                <div
                    className="absolute inset-y-0 w-px pointer-events-none"
                    style={{
                        left: `${pos}%`,
                        transform: 'translateX(-50%)',
                        background: 'rgba(255,255,255,0.7)',
                        backdropFilter: 'blur(1px)',
                        boxShadow: '0 0 6px rgba(0,0,0,0.4)',
                    }}
                />

                {/* Handle — transparent glass, perfectly centered */}
                <div
                    tabIndex={0}
                    onKeyDown={onKeyDown}
                    role="slider"
                    aria-valuenow={Math.round(pos)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    className="absolute top-1/2 z-10 flex items-center justify-center
                               w-10 h-10 rounded-full
                               cursor-grab active:cursor-grabbing
                               focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    style={{
                        left: `${pos}%`,
                        transform: 'translate(-50%, -50%)',
                        background: 'rgba(255,255,255,0.25)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        border: '1.5px solid rgba(255,255,255,0.55)',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
                        // pointer-events only on handle so it can capture
                        touchAction: 'none',
                    }}
                >
                    {/* Double chevron — white, minimal */}
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                        <path d="M7 4.5L3.5 9L7 13.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M11 4.5L14.5 9L11 13.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                {/* Labels */}
                {beforeLabel && (
                    <div className="absolute bottom-3 left-3 pointer-events-none
                                    text-white text-[11px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}>
                        {beforeLabel}
                    </div>
                )}
                {afterLabel && (
                    <div className="absolute bottom-3 right-3 pointer-events-none
                                    text-white text-[11px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}>
                        {afterLabel}
                    </div>
                )}
            </div>

            {/* Caption */}
            {caption && (
                <p className="text-xs text-center text-gray-500 dark:text-gray-400 italic px-4">
                    {caption}
                </p>
            )}
        </div>
    );
}
