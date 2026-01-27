"use client";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * AboutInfiniteSlider
 * - 無限ループ（3周コピーして真ん中周に常駐）
 * - センターにスナップ（scroll-snap）
 * - 矢印で1枚ずつ（scrollBy + step計測）
 */
export default function AboutInfiniteSlider({
  slides = [],
  gapPx = 16,
  cardRatio = 0.86,
  edgeFade = true,
  aspect = "16/10",
  radius = "xl",
}) {
  const safe = useMemo(() => slides.filter(Boolean), [slides]);
  const len = safe.length;

  const scrollerRef = useRef(null);
  const trackRef = useRef(null);

  const [active, setActive] = useState(0);

  const loopIdxRef = useRef(0); // 0..(3len-1)
  const stepPxRef = useRef(0); // 1枚分(px)
  const isRecenteringRef = useRef(false);
  const scrollEndTimerRef = useRef(null);

  if (!len) return null;

  // 3周（真ん中周に常駐させる）
  const loopSlides = useMemo(() => {
    if (len <= 1) return safe;
    return [...safe, ...safe, ...safe];
  }, [safe, len]);

  const cardPct = (cardRatio * 100).toFixed(4);
  const sidePad = `calc((100% - ${cardPct}%) / 2)`;

  const radiusClass =
    radius === "none"
      ? "rounded-none"
      : radius === "lg"
      ? "rounded-lg"
      : radius === "xl"
      ? "rounded-xl"
      : radius === "3xl"
      ? "rounded-3xl"
      : "rounded-2xl";

  const getCards = () => {
    const track = trackRef.current;
    if (!track) return [];
    return Array.from(track.children);
  };

  // 1枚分(step)を計測（カード幅+gap）
  const measureStep = () => {
    const cards = getCards();
    if (cards.length < 2) return;

    const a = /** @type {HTMLElement} */ (cards[0]);
    const b = /** @type {HTMLElement} */ (cards[1]);

    const step = b.offsetLeft - a.offsetLeft;
    if (step > 0) stepPxRef.current = step;
  };

  // “中心に一番近いカード”の loop index を取る
  const computeClosestLoopIndex = () => {
    const el = scrollerRef.current;
    if (!el) return 0;

    const center = el.scrollLeft + el.clientWidth / 2;
    const cards = getCards();

    let best = 0;
    let bestDist = Infinity;

    for (let i = 0; i < cards.length; i++) {
      const n = /** @type {HTMLElement} */ (cards[i]);
      const c = n.offsetLeft + n.clientWidth / 2;
      const d = Math.abs(c - center);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    }
    return best;
  };

  // スクロールが止まったら「真ん中周」に戻す（見た目を維持）
  const recenterToMiddleRound = () => {
    if (len <= 1) return;

    const el = scrollerRef.current;
    if (!el) return;

    const loopIdx = loopIdxRef.current;

    // 真ん中周：[len .. 2len-1] に居ればOK
    if (loopIdx >= len && loopIdx < 2 * len) return;

    const step = stepPxRef.current;
    if (!step) return;

    const real = loopIdx % len;     // 0..len-1
    const targetIdx = len + real;   // 真ん中周の同じカード
    const deltaIdx = targetIdx - loopIdx; // ±len
    if (!deltaIdx) return;

    isRecenteringRef.current = true;
    el.scrollLeft += deltaIdx * step;
    loopIdxRef.current = targetIdx;

    requestAnimationFrame(() => {
      isRecenteringRef.current = false;
    });
  };

  const scheduleRecenterOnScrollEnd = () => {
    if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
    scrollEndTimerRef.current = setTimeout(() => {
      if (!isRecenteringRef.current) recenterToMiddleRound();
    }, 140);
  };

  const onScroll = () => {
    if (isRecenteringRef.current) return;

    const loopIdx = computeClosestLoopIndex();
    loopIdxRef.current = loopIdx;
    setActive(loopIdx % len);

    scheduleRecenterOnScrollEnd();
  };

  // 初期位置：真ん中周の先頭へ
  useEffect(() => {
    if (len <= 1) return;

    requestAnimationFrame(() => {
      measureStep();

      const el = scrollerRef.current;
      const cards = getCards();
      if (!el || !cards.length) return;

      const startIdx = len; // 真ん中周の先頭
      cards[startIdx]?.scrollIntoView({
        behavior: "auto",
        inline: "center",
        block: "nearest",
      });

      loopIdxRef.current = startIdx;
      setActive(0);
    });

    // リサイズ時にstep再計測
    const ro = new ResizeObserver(() => measureStep());
    if (scrollerRef.current) ro.observe(scrollerRef.current);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [len]);

  // 矢印：1枚分(step)だけ進む
  const moveBy = (dir) => {
    const el = scrollerRef.current;
    const step = stepPxRef.current;
    if (!el || !step) return;

    scheduleRecenterOnScrollEnd();
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const pad2 = (n) => String(n).padStart(2, "0");

  return (
    <div className="bg-transparent">
      <div className="relative w-full">
        <div
          ref={scrollerRef}
          onScroll={onScroll}
          className="relative w-full overflow-x-auto overflow-y-hidden"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            scrollPaddingLeft: sidePad,
            scrollPaddingRight: sidePad,
          }}
          aria-label="about slider"
        >
          {/* scrollbar非表示 */}
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          <div
            ref={trackRef}
            className="flex items-stretch"
            style={{
              gap: `${gapPx}px`,
              paddingLeft: sidePad,
              paddingRight: sidePad,
            }}
          >
            {loopSlides.map((s, i) => (
              <div
                key={`${s?.src || "x"}-${i}`}
                className={`flex-none overflow-hidden ${radiusClass}`}
                style={{
                  width: `${cardPct}%`,
                  aspectRatio: aspect,
                  scrollSnapAlign: "center",
                }}
              >
                <img
                  src={s.src}
                  alt={s.alt || ""}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {edgeFade && (
            <>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white/70 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white/70 to-transparent" />
            </>
          )}
        </div>
      </div>

      {/* 下のタイトル + 矢印 + ページ数 */}
      <div className="pt-6 pb-4 text-center">
        <p className="text-[15px] tracking-[0.12em] text-neutral-900/90 transition-all duration-300">
          {safe[active]?.title || ""}
        </p>

        <div className="mt-4 flex items-center justify-center gap-10">
          <button
            type="button"
            onClick={() => moveBy(-1)}
            className="h-10 w-10 rounded-full border border-black/10 bg-white/60 backdrop-blur-sm text-xl leading-none hover:bg-white/80 active:scale-95 transition"
            aria-label="prev"
          >
            ←
          </button>

          <p className="text-[11px] tracking-[0.28em] text-neutral-800/80">
            {pad2(active + 1)} / {pad2(len)}
          </p>

          <button
            type="button"
            onClick={() => moveBy(1)}
            className="h-10 w-10 rounded-full border border-black/10 bg-white/60 backdrop-blur-sm text-xl leading-none hover:bg-white/80 active:scale-95 transition"
            aria-label="next"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
