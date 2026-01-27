"use client";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Mago3({ slides = [], gap = 30, peek = 40, aspect = "5/3", radius = 0, startIndex = 0 }) {
  // ...（スライダーの中身全部）

  const safe = useMemo(() => slides.filter(Boolean), [slides]);
  const len = safe.length;

  const scrollerRef = useRef(null);
  const trackRef = useRef(null);

  const [active, setActive] = useState(0);
  const [cardW, setCardW] = useState(520);

  const loopIdxRef = useRef(0);
  const stepRef = useRef(0);
  const isJumpingRef = useRef(false);
  const timerRef = useRef(null);

  if (!len) return null;

  const loopSlides = useMemo(() => {
    if (len <= 1) return safe;
    return [...safe, ...safe, ...safe];
  }, [safe, len]);

  const r = typeof radius === "number" ? `${radius}px` : "0px";

  const measure = () => {
    const el = scrollerRef.current;
    if (!el) return;

    const w = el.clientWidth || 0;
    // 左右peek分だけ残して中央カード幅を決める（px固定）
    const cw = Math.max(1, Math.round(w - peek * 2));
    setCardW(cw);
    stepRef.current = cw + gap;
  };

  const getClosest = () => {
    const el = scrollerRef.current;
    if (!el) return 0;

    const center = el.scrollLeft + el.clientWidth / 2;
    const cards = trackRef.current ? Array.from(trackRef.current.children) : [];

    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < cards.length; i++) {
      const n = cards[i];
      const c = n.offsetLeft + n.clientWidth / 2;
      const d = Math.abs(c - center);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    }
    return best;
  };

  const jumpToMiddleIfNeeded = () => {
    if (len <= 1) return;
    const el = scrollerRef.current;
    if (!el) return;

    const loopIdx = loopIdxRef.current;

    // 中央周 [len .. 2len-1] にいればOK
    if (loopIdx >= len && loopIdx < 2 * len) return;

    const step = stepRef.current;
    if (!step) return;

    const real = ((loopIdx % len) + len) % len; // 0..len-1
    const target = len + real;                 // 中央周へ
    const delta = target - loopIdx;

    isJumpingRef.current = true;
    el.scrollLeft += delta * step;
    loopIdxRef.current = target;

    requestAnimationFrame(() => {
      isJumpingRef.current = false;
    });
  };

  const scheduleJump = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (!isJumpingRef.current) jumpToMiddleIfNeeded();
    }, 140);
  };

  const onScroll = () => {
    if (isJumpingRef.current) return;
    const idx = getClosest();
    loopIdxRef.current = idx;
    setActive(((idx % len) + len) % len);
    scheduleJump();
  };

  const go = (dir) => {
    const el = scrollerRef.current;
    const step = stepRef.current;
    if (!el || !step) return;

    scheduleJump();
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  // 初期計測 + リサイズ追従
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    measure();

    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peek, gap]);

  // 初期位置：中央周 + startIndex をセンターへ
  useEffect(() => {
    if (len <= 1) return;
    if (!cardW) return;

    requestAnimationFrame(() => {
      const el = scrollerRef.current;
      if (!el) return;

      const start = len + (startIndex % len);
      loopIdxRef.current = start;
      setActive(startIndex % len);

      // scrollLeft をpxで確実に合わせる（ズレ防止）
      const step = stepRef.current;
      el.scrollLeft = start * step;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [len, cardW, startIndex]);

  const pad2 = (n) => String(n).padStart(2, "0");

  return (
    <div className="w-full">
      <div className="relative">
        <div
          ref={scrollerRef}
          onScroll={onScroll}
          className="roomsScroller md:max-h-full max-w-full max-w-[400px] max-h-[150px] overflow-x-auto overflow-y-hidden"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            scrollPaddingLeft: `${peek}px`,
            scrollPaddingRight: `${peek}px`,
          }}
          aria-label="rooms slider"
        >
         <style jsx>{`
  .roomsScroller::-webkit-scrollbar {
    display: none;
  }
`}</style>

          <div
            ref={trackRef}
            className="flex"
            style={{
              gap: `${gap}px`,
              paddingLeft: `${peek}px`,
              paddingRight: `${peek}px`,
            }}
          >
            {loopSlides.map((s, i) => (
              <div
                key={`${s?.src || "x"}-${i}`}
                style={{
                  width: `${cardW}px`,
                  aspectRatio: aspect,
                  scrollSnapAlign: "center",
                  borderRadius: r,
                  overflow: "hidden",
                  flex: "0 0 auto",
                }}
              >
                {/* 画像 + スライド内文字 */}
                <div className="relative h-full w-full">
                  <img
                    src={s.src}
                    alt={s.title || ""}
                    className="h-full w-full object-cover object-center"
                    draggable={false}
                  />
                  {(s.title || s.caption) && (
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      {s.title && (
                        <div className="text-white text-2xl font-semibold drop-shadow">
                          {}
                        </div>
                      )}
                      {s.caption && (
                        <div className="mt-1 text-white/90 drop-shadow">
                          {s.caption}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 矢印（必要なら消してOK） */}
        <button
          type="button"
          onClick={() => go(-1)}
          className="absolute md:left-60 md:top-90 left-20 top-45 h-11 w-11 rounded-full border border-black/20 bg-white/70 backdrop-blur"
          aria-label="prev"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="absolute md:right-60 md:top-90 right-20 top-45 h-11 w-11 rounded-full border border-black/20 bg-white/70 backdrop-blur"
          aria-label="next"
        >
          →
        </button>
      </div>

      {/* 下の表示（不要なら丸ごと消してOK） */}
      <div className="mt-6 text-center">
        <div className="text-xl">{safe[active]?.title || ""}</div>
        <div className="mt-2 text-sm text-neutral-600">
          {pad2(active + 1)} / {pad2(len)}
        </div>
      </div>
    </div>
  );
}
