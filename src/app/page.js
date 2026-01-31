"use client";

import AboutSlider from "./components/AboutSlider";
import { useEffect, useMemo, useState } from "react";
import MobileInfinitePeekSlider from "./components/MobileInfinitePeekSlider";
import AboutInfiniteSlider from "./components/AboutInfiniteSlider";



/**
 * MAGONDO – KAKUREGA STAY (single-file / stable responsive)
 * - 臙脂×ゴールド×黒
 * - 固定px依存を md: 以上に寄せ、モバイルは“崩れない配置”を優先
 * - id重複なし / 存在しないTailwindクラス排除 / PDF img対策コメント入り
 * - app/page.js にそのまま貼り替えOK
 */

export default function Site() {
  const [open, setOpen] = useState(false);
const introSlides = [
  {
    src: "/images/about_magondo2.jpg",
    title: "MAGOICHI",
    textPosition: "center",
    textOffset: 0,
    textOffsetY: -160,
  },
  {
    src: "/images/rooms_v1.jpg",
    title: "MAGONI",
    textPosition: "center",
    textOffset: 0,
    textOffsetY: -160,
  },
  {
    src: "/images/dining_v1.jpg",
    title: "MAGOSANN",
    textPosition: "center",
    textOffset: 0,
    textOffsetY: -15,
  },
  
];

const aboutSlides = [
  { src: "/images/room-01.jpg", alt: "room 01", title: "KURA" },
  { src: "/images/room-02.jpg", alt: "room 02", title: "NI" },
  { src: "/images/room-03.jpg", alt: "room 03", title: "SAN" },
];




  // 色（任意）
  const ENJI = "#9E1B21"; // 臙脂
  const GOLD = "#D4AF37"; // ゴールド
  const INK = "#0B0B0B"; // 黒に近い

  // nav items（IDは必ずユニーク）
  const navItems = useMemo(
    () => [
      { href: "#intro", label: "特徴" },
      { href: "#about", label: "お部屋" },
      { href: "#experience", label: "体験" },
      { href: "#gallery", label: "ギャラリー" },
      { href: "#access", label: "アクセス" },
      { href: "#faq", label: "FAQ" },
    ],
    []
  );

  // スムーススクロール（ヘッダー高さを“実測”してズレを防ぐ）
  useEffect(() => {
    const handler = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;

      const el = document.querySelector(id);
      if (!el) return;

      e.preventDefault();
      window.history.pushState({}, "", id);

      const header = document.querySelector('[data-site-header="1"]');
      const offset = header?.offsetHeight ?? 88;

      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setOpen(false);
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // md以上になったらモバイルdrawerを閉じる（回転/リサイズ対策）
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return (
    <div className="min-h-screen text-neutral-900 selection:bg-[#9E1B21]/20 selection:text-[#0B0B0B]">
      {/* === Global Brush Background (軽量化：モバイルは1枚 / md以上は縦チェーン) === */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none">
        <div className="absolute left-1/2 -translate-x-1/2 w-[78vw] md:w-[60vw] opacity-[0.1] md:opacity-[0.1]">
          {/* mobile: 1枚だけ */}
          <img
            src="/images/IMG1.png"
            alt=""
            className="block w-full h-auto object-contain object-top md:hidden"
            style={{ marginTop: "0vh" }}
          />

          {/* md+: チェーン */}
          <div className="hidden md:block">
            <img
              src="/images/IMG1.png"
              alt=""
              className="block w-full h-auto object-contain object-top"
              style={{ marginTop: "0vh" }}
            />
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/70" />
      </div>

      {/* Header */}
      <header
        data-site-header="1"
        className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-neutral-200 supports-[backdrop-filter]:bg-white/60"
      >
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className="inline-flex h-9 w-9 rounded-2xl"
              style={{ background: `linear-gradient(135deg, ${ENJI}, ${INK})` }}
            />
            <p className="font-semibold tracking-wide">
              MAGONDO{" "}
              <span className="text-neutral-400">— KAKUREGA STAY —</span>
            </p>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:opacity-70 transition"
                rel="nofollow"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#booking"
              className="hidden sm:inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-white shadow-sm ring-1 ring-black/5 hover:shadow transition"
              style={{ background: ENJI }}
            >
              空室確認・予約
            </a>
            <button
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-300"
              onClick={() => setOpen((v) => !v)}
              aria-label="Open menu"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="md:hidden border-t border-neutral-200 bg-white/95 backdrop-blur px-4 py-3">
            <div className="mx-auto max-w-6xl grid gap-2 text-sm">
              {[...navItems, { href: "#booking", label: "空室確認・予約" }].map(
                (item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-2 py-2 hover:bg-neutral-100"
                  >
                    {item.label}
                  </a>
                )
              )}
            </div>
          </div>
        )}
      </header>

      {/* Hero（モバイル：縦積み / md：2カラム） */}
      <section className="relative w-full overflow-hidden">
          {/* セクション全体オーバーレイ（フル幅） */}
  <div
  className="
  z-2
    pointer-events-none
    absolute inset-0
    bg-gradient-to-b
    from-neutral-200/100
    via-neutral-200/70
    to-transparent
  "
/>
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-0 md:mt-0 mt-6">
          <div className="grid items-center gap-10 md:grid-cols-[1fr_1.25fr] md:gap-8 min-h-[0vh] md:min-h-[70vh]">
            {/* Left: Text */}
            <div className="relative z-10">
              <h1 className="text-center text-left md:text-left text-4xl md:text-7xl font-serif font-thin leading-tight [text-wrap:balance]">
                <span className="tracking-wide">KAKUREGA</span>
                <span className="block text-0 md:text-7xl opacity-90 mt-1">
                  STAY
                </span>
              </h1>

             
            <div
  className="
    md:mt-6 mt-3
    flex items-center
    justify-end md:justify-start
    gap-3
    md:text-neutral-600 font-serif
    text-neutral-600
  "
>
  <div
    className="
      h-px w-[160px] md:w-[260px]
      md:bg-neutral-300
      bg-neutral-300
      -mt-17 md:mt-0
    "
  />
  <p
    className="
      text-base md:text-xl
      [text-wrap:balance]
      -mt-17 md:mt-0
    "
  >
    MAGONDO
  </p>
</div>
           

              {/* アート寄せ：md以上だけ微調整（壊れやすいpxはここに隔離） */}
              <div className="hidden md:block absolute -left-10 -top-8 h-[1px] w-[1px]">
                {/* place-holder to show where you'd add md-only offsets if needed */}
              </div>
            </div>

           {/* Right: Video */}
<div className="relative z-2 flex items-center justify-center md:justify-end">
  <div
    className="
      w-screen md:w-full
      -mx-4 md:mx-0
      max-w-none md:max-w-[820px] lg:max-w-[920px]
      md:aspect-[16/9] aspect-[16/7]
      -mt-10 md:mt-0
    "
  >
    <video
      className="
        w-full h-full object-cover
        rounded-none shadow-sm ring-1 ring-black/5
      "
      src="/videos/intro.mp4"
      autoPlay
      muted
      loop
      playsInline
    />
  </div>
</div>

          </div>
        </div>

        {/* Hero subtle corner accent */}
        <div
          className="mt-10 md:mt-0 absolute -right-24 -top-24 h-64 w-64 rounded-full blur-3xl opacity-20"
          style={{ background: `radial-gradient(circle, ${ENJI}, transparent 60%)` }}
        />
      </section>

      {/* Intro（特徴 / 旧 about2 1回目） */}
<section id="intro" className="relative w-full scroll-mt-24 -mt-0 py-5">
  {/* 中身だけ幅制限 */}
  <div className="relative z-10 mx-auto max-w-6xl px-4">
    <div className="grid md:grid-cols-2 items-start gap-10">
    {/* 左：画像（md以上） / スライダー（モバイル） */}
<div className="md:pl-6 flex justify-center md:justify-start">
  {/* モバイル：無限ループ（戻り見えない） */}
  <div className="md:hidden w-screen -mx-4 max-w-[520px] mt-4">
    <MobileInfinitePeekSlider
      slides={introSlides}
      gapPx={24}
      cardRatio={0.72}
      durationMs={420}
    />
  </div>

  {/* md以上：画像1枚（そのまま） */}
  <div className="hidden md:block relative w-full max-w-[720px] aspect-[5/3] overflow-hidden shadow-lg rounded-none">
    <img
      src="/images/about_magondo2.jpg"
      alt="橋立の風景"
      className="w-full h-full object-cover object-center"
    />
  </div>
</div>



      {/* 右：縦書き */}
      <div className="font-serif text-neutral-800">
       <p className="text-lg md:[writing-mode:vertical-rl] leading-relaxed">
  {/* モバイル用（改行あり） */}
  <span
    className="
      block md:hidden
      relative -top-80
      text-2xl
      text-right
    "
  >
  Heritage Home
  </span>

  {/* md以上用（1行） */}
  <span
    className="
      hidden md:block
      relative md:left-[480px] md:top-0
      md:text-3xl
     ">
    加賀の海辺、橋立
  </span>
</p>
  <div
    className="
    md:hidden
    h-px w-[125px] md:w-[100px]
      md:bg-neutral-300
      bg-neutral-300
      -mt-84 md:mt-0
      ml-14
    "
  />
  {/* md以上用（1行） */}
  <span
    className="
      md:hidden
      text-neutral-600
      relative md:left-[480px] -top-3
      text-sm
      ml-0
     ">
   古民家
  </span>
        {/* ===== Mobile ===== */}
<div className="block md:hidden text-center mt-67">
   <div className="mt-10 h-px w-full md:w-[300px] bg-neutral-200" />
  <p className="mt-5 text-sm text-neutral-600">
    静けさを大切にした、「隠れ家」ステイ
  </p>
  <p className="mt-0 text-sm text-neutral-600">
    海辺、蔵の空気、和モダンが混ざる時間
  </p>
</div>

{/* ===== Desktop ===== */}
<div className="hidden md:block relative md:ml-4 text-right">
  <div className="mt-2 h-px w-[525px] ml-auto bg-neutral-200" />

  <p className="mt-2 text-sm text-neutral-600">
    静けさを大切にした、「隠れ家」ステイ
  </p>
  <p className="mt-2 text-sm text-neutral-600">
    海辺の散歩、蔵の空気、和とモダンが混ざる時間
  </p>
</div>
      </div>
    </div>
  </div>
</section>


      {/* About（お部屋） */}
      <section
        id="about"
        className="mt-15 md:mt-2 max-w-6xl mx-auto px-4 pt-7 scroll-mt-24 py-4"
      >
        <div className="grid md:grid-cols-[360px_minmax(0,1fr)] items-start gap-10">
          {/* 右：縦書き（モバイルは横書きにして破綻回避） */}
<div className="font-serif text-neutral-800">
  <div className="text-lg md:mt-20 md:[writing-mode:vertical-rl] leading-relaxed">
    <span className="hidden md:block md:relative md:-left-[-35px] text-3xl md:text-4xl">
      古民家について
    </span>
     <span className="md:hidden md:relative md:-left-[-35px] text-3xl md:text-4xl">
      Rooms
    </span>

    <p className="text-sm md:[writing-mode:vertical-rl] leading-relaxed">
      <span className="block md:hidden relative -top-12 text-ml text-right">
        <br />
        客室について<br />
      </span>
    </p>
  </div>
  

 {/* 右：スライダー（md以上だけ表示） */}
<div className="pl-6 md:hidden -mt-10">
  <AboutInfiniteSlider
    slides={aboutSlides}
    gapPx={16}
    cardRatio={0.86}
    edgeFade={true}
    aspect="16/10"
    radius="xl"
  />
</div>

  <div className="mt-8 md:mt-0 md:ml-4">
    <div className="mt-5 h-px w-full md:w-[360px] bg-neutral-200" />

    <div className="mt-5 text-sm text-neutral-600 md:text-left text-center">
      <p className="mt-0">風土や建物の特色を活かしながら、</p>
    </div>

    <p className="mt-0 text-sm text-neutral-600">
      <span className="block mt-0 md:text-left text-center">三つの宿がそれぞれ異なる魅力を持っています</span>
    </p>
  </div>
</div>
 <div
    className="
    md:hidden
    h-px w-[170px] md:w-[100px]
      md:bg-neutral-300
      bg-neutral-300
      -mt-106.5 md:mt-0
      ml-25
    "
  />

          {/* 右：スライダー（md以上だけ表示） */}
<div className="hidden md:block md:pl-6">
  <AboutSlider />
</div>


        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative md:mt-8 -mt-5">
        
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-10">
          <div className="flex items-center gap-2 mb-12 relative">
            <h2 className="text-ml md:text-base font-serif text-neutral-600 md:ml-[10px] ml-[215px]">
              -Looks Experience-
            </h2>
            <h3 className="text-3xl md:text-7xl font-serif text-neutral-800 absolute right-0 -top-6">
              MAGONDO
            </h3>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-3 md:gap-8 gap-2 justify-items-center md:mt-0 -mt-10">
  {/* 宿 */}
  <a href="/dining" className="group block">
  <div className="flex items-center gap-3">
    <p
      className="
        hidden md:flex
        font-serif text-2xl 
       
        [writing-mode:vertical-rl]
        [text-orientation:upright]
        group-hover:text-[#7a001c]
        transition
      "
    >
      ---ICHI---
    </p>
      

      <div className="relative w-full max-w-[150px] md:max-w-none md:w-[300px] h-[150px] md:h-[300px] overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.28)] rounded-2xl">
        <img
          src="/images/mago1.jpg"
          alt="客室について"
          className="
            h-full w-full object-cover
            transition-transform duration-700 ease-out
            group-hover:scale-[1.05]
          "
        />
        <div
          className="
            absolute inset-0
            bg-neutral-900/0
            transition duration-500
            group-hover:bg-neutral-900/28
          "
        />
      </div>
    </div>

    <p className="mt-3 text-xs text-neutral-500 text-right">
      -View more -
    </p>
  </a>

  {/* カフェ */}
  <a href="/rooms" className="group block">
  <div className="flex items-center gap-3">
    <p
      className="
        hidden md:flex
        text-2xl 
       
        [writing-mode:vertical-rl]
        [text-orientation:upright]
        group-hover:text-[#7a001c]
        transition
      "
    >
     ---NI---
    </p>

      <div className="relative w-full max-w-[150px] md:max-w-none md:w-[300px] h-[150px] md:h-[300px] overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.28)] rounded-2xl">
        <img
          src="/images/mago2.jpg"
          alt="カフェについて"
          className="
            h-full w-full object-cover
            transition-transform duration-700 ease-out
            group-hover:scale-[1.05]
          "
        />
        <div
          className="
            absolute inset-0
            bg-neutral-900/0
            transition duration-500
            group-hover:bg-neutral-900/28
          "
        />
      </div>
    </div>

    <p className="mt-3 text-xs text-neutral-500 text-right">
      -View more -
    </p>
  </a>

  {/* 周辺 */}
  <a href="/sightseeing" className="group block">
  <div className="flex items-center gap-3">
    <p
      className="
        hidden md:flex
        
        font-serif text-2xl
        [writing-mode:vertical-rl]
        [text-orientation:upright]
        group-hover:text-[#7a001c]
        transition
      "
    >
      ---SAN---
    </p>

      <div className="relative w-full max-w-[150px] md:max-w-none md:w-[300px] h-[150px] md:h-[300px] overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.28)] rounded-2xl ">
        <img
          src="/images/mago3.jpg"
          alt="周辺について"
          className="
            h-full w-full object-cover
            transition-transform duration-700 ease-out
            group-hover:scale-[1.05]
          "
        />
        <div
          className="
            absolute inset-0
            bg-neutral-900/0
            transition duration-500
            group-hover:bg-neutral-900/28
          "
        />
      </div>
    </div>

        <p className="mt-3 text-xs text-neutral-500 text-right">
         -View more -
        </p>
        </a>
        </div>
        </div>
      </section>

     {/* Kura（蔵の宿） */}
<section id="kura" className="relative w-full scroll-mt-24 py-5 md:mt-5 mt-15">
  {/* 背景グラデーション（フル幅） */}
  <div
    className="
    pointer-events-none absolute inset-0 
  bg-gradient-to-b 
  from-transparent 
  via-neutral-200/60 
  to-neutral-50/100" 
  />

  {/* 中身だけ幅制限（ここが今までのサイズを保つ） */}
  <div className="relative z-10 mx-auto max-w-6xl px-4 ">
    <div className="grid md:grid-cols-2 items-start gap-12">
      {/* 画像 */}
      <div className="md:pl-6">
        <div className="w-screen -mx-4 md:mr-auto md:w-full max-w-[1100px] aspect-[19/6] md:aspect-[5/3] overflow-hidden rounded-none shadow-lg">
          <img
            src="/images/room21.jpg"
            alt="蔵の宿 MAGONDO"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

    {/* テキスト */}
    <div className="font-serif text-neutral-800">
      {/* 見出し */}
      <p className="md:mt-24 -mt-58 text-center font-serif text-center">
  <span
    className="
   
      inline-block
      text-lg md:text-2xl
      font-bold
      tracking-[0.12em]
    "
        >
        -加賀の恵みを、自分たちの手で-
        </span>
      </p>

      {/* 本文ブロック */}
      <div className="md:mt-10 mt-43 md:mt-6 md:ml-6">
        {/* ライン */}
        <div className="md:mt-2  center h-px w-full md:w-[500px] bg-neutral-300" />
        <div className="md:mt-6 mt-3 space-y-0 text-sm text-neutral-600 leading-relaxed ">
          <p>
            近くの市場や直売所で選んだ食材を、
            完全プライベートなキッチンで調理する。
          </p>

          <p>
            この宿では「食べに行く旅」だけでなく、
            “料理する時間”を大切にしています。
          </p>
          
        </div>
      </div>
    </div>
   </div>
  </div>
</section>

{/* ===== NEW EXPERIENCE SECTION (text + 1 wide card) ===== */}
<section id="experience-more" className="relative md:-mt-0 mt-0 py-3">
  <div
    className="
    pointer-events-none absolute inset-0 
  bg-neutral-50/100" 
  />
  <div className="relative z-10 mx-auto max-w-6xl px-4 py-10 md:mt-0 -mt-46">
    {/* 縦ライン */}
<div className="md:absolute md:left-215 md:-top-19 md:bottom-6 h-20 md:w-px md:bg-neutral-300/70 " />
{/* 縦ライン */}
<div className="md:absolute md:left-214 md:-top-19 md:bottom-6 h-20 md:w-px md:bg-neutral-300/70 " />
    {/* 見出し */}
    <div className="flex items-center gap-2 mb-12 relative ">
      
      <h2 className="text-base font-serif text-neutral-600 md:ml-[10px] ml-[0px] md:-top-3 md:mt-3 mt-6">
        KAKUREGA Stay Guide
      </h2>
      {/* ライン */}
        <div className="hidden md:block md:mt-2  center h-px w-full md:w-[335px] bg-neutral-300" />
      <h3 className="md:tracking-[-0.0em] tracking-[-0.04em] text-4xl md:text-7xl font-serif text-neutral-600  absolute md:right-3 -top-3">
        HOW TO ENJOY
      </h3>
       <h4 className="text-5xl md:text-7xl font-serif text-neutral-600  absolute right-3 -top-3">
      
      </h4>
    </div>
    
    {/* 2カラム */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch md:mt-0 -mt-20">
      {/* 左：テキスト（画像なし） */}
      <div className="relative">
        
        <div className="md:mt-0 mt-64 h-full md:p-8 md:mt-0 mt-8 text-left ">
          <p className="hidden md:block font-serif text-sm tracking-[0.18em] text-neutral-500">
            -STAY FLOW-
          </p>

          <h4 className="mt-4 font-serif text-2xl text-neutral-800 tracking-wide">
            直売所 → キッチン → 余韻
          </h4>

          <div className="mt-5 space-y-3 text-sm leading-relaxed text-neutral-600">
            <p>
              旅のはじまりは、町の直売所や市場から。
              その日に出会った旬を選び、宿のキッチンで仕上げる。
            </p>
            <p>
              観光地を“消費”するのではなく、
              この町の“日常”を借りるように過ごすのがMAGOの楽しみ方です。
            </p>
          </div>

          <a
            href="/guide"
            className="
              inline-flex items-center gap-2 mt-7
              text-neutral-800
              border-b border-neutral-400
              hover:border-neutral-800
              transition
            "
          >
            楽しみ方ガイドへ
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>

      {/* 右：横長画像カード（タップで別ページ） */}
      <a href="/shops" className="group block">
        <div className="flex items-start gap-4">


          <div
            className="md:mt-0 -mt-115
              relative w-full md:h-[300px] h-[200px] overflow-hidden
              shadow-[0_16px_40px_rgba(0,0,0,0.28)]
            "
          >
            {/* 横長比率 */}
            <div className="relative md:w-full max-w-[200px] md:max-w-none md:w-[385px] h-[200px] md:h-[300px] overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.28)]">
              <img
                src="/images/sightseeing_v1.jpg"
                alt="直売所・買い出し"
                className="
                  h-full w-full object-cover
                  transition-transform duration-700 ease-out
                  group-hover:scale-[1.04]
                "
              />
            </div>

            <div className="absolute inset-0 bg-neutral-900/0 transition duration-500 group-hover:bg-neutral-900/28" />

            {/* 右下ラベル */}
            <span
              className="
                absolute bottom-3 right-3
                text-white text-xs tracking-wider
                bg-black/55 px-4 py-2 rounded-full
              "
            >
              Tap to explore →
            </span>
          </div>
        </div>
      <p className="-mt-100 md:hidden block font-serif text-sm tracking-[0.18em] text-right py-6 px-6.5 text-neutral-500">
            STAY FLOW
          </p>
      </a>
    </div>
  </div>
</section>

       {/* Gallery */}
<section id="gallery" className="w-full py-0 scroll-mt-24 overflow-hidden">

  <div className="mt-0 space-y-0">
    {/* ===== 1段目：右へ流れる ===== */}
    <div className="relative w-full overflow-hidden">
      <div
        className="flex w-max"
        style={{
          animation: "marquee-right 40s linear infinite",
        }}
      >
        {[...Array(2)].map((_, loopIndex) =>
          Array.from({ length: 7 }).map((_, i) => (
            <div
              key={`row1-${loopIndex}-${i}`}
              className="aspect-[5/3] w-[200px] bg-neutral-200 overflow-hidden"
            >
              <img
                src={`/images/gallery_${i + 1}.jpg`}
                alt={`photo ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))
        )}
      </div>
    </div>

    {/* ===== 2段目：左へ流れる ===== */}
    <div className="relative w-full overflow-hidden">
      <div
        className="flex w-max"
        style={{
          animation: "marquee-left 40s linear infinite",
        }}
      >
        {[...Array(2)].map((_, loopIndex) =>
          Array.from({ length: 7 }).map((_, i) => (
            <div
              key={`row2-${loopIndex}-${i}`}
              className="aspect-[5/3] w-[200px] bg-neutral-200 overflow-hidden"
            >
              <img
                src={`/images/gallery_${i + 8}.jpg`}
                alt={`photo ${i + 8}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))
        )}
      </div>
    </div>
  </div>
</section>

 {/* Instagram CTA */}
      <section className="block hidden block bg-neutral-50/100">
        <div className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-semibold">周辺グルメ・観光情報を毎週更新</h2>
            <p className="mt-2 text-neutral-600">
              公式Instagramで最新スポットをご紹介しています。旅前の計画にも、滞在中の散策にも。
            </p>
            <a
              href="#"
              className="mt-5 inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium text-white hover:opacity-90 transition shadow-sm ring-1 ring-black/5"
              style={{ background: ENJI }}
            >
              Instagramを見る
            </a>
          </div>

          <div className="aspect-[4/3] rounded-none bg-white border border-neutral-200 grid place-items-center">
            <p className="text-sm text-neutral-500">Instagram フィード埋め込みエリア</p>
          </div>
        </div>
      </section>

{/* Access */}
<section id="access" className="w-full py-20 scroll-mt-24 bg-neutral-50/60">
  <div className="mx-auto max-w-5xl px-4">
    <div className="flex items-end justify-between gap-4">
      <div>
        <p className="text-xs tracking-[0.25em] text-neutral-500">ACCESS</p>
        <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
          アクセス
        </h2>
      </div>

      {/* 任意：小さなアクセント（ゴールドラインがあるなら馴染む） */}
      <div className="hidden sm:block h-px w-24 bg-neutral-300" />
    </div>

    <div className="mt-10 grid md:grid-cols-2 gap-6">
  {/* Info */}
  <div
    className="
      rounded-none
      border border-neutral-200/80
      bg-white
      p-7
      shadow-[0_8px_24px_rgba(0,0,0,0.04)]
      md:aspect-[9/3]
      min-w-0
    "
  >
    <h3 className="text-sm font-medium tracking-widest text-neutral-700">
      住所
    </h3>

    <p className="mt-3 text-sm text-neutral-700 leading-relaxed break-words">
      石川県加賀市橋立町ム-2
    </p>

    <dl className="mt-6 space-y-3 text-sm text-neutral-600">
      <div className="flex gap-3 flex-wrap md:flex-nowrap">
        <dt className="text-neutral-500 md:w-20 md:shrink-0">電車</dt>
        <dd className="min-w-0 break-words">JR加賀温泉駅から車で15分</dd>
      </div>

      <div className="flex gap-3 flex-wrap md:flex-nowrap">
        <dt className="text-neutral-500 md:w-20 md:shrink-0">お車</dt>
        <dd className="min-w-0 break-words">片山津ICから10分</dd>
      </div>

      <div className="flex gap-3 flex-wrap md:flex-nowrap">
        <dt className="text-neutral-500 md:w-20 md:shrink-0">駐車場</dt>
        <dd className="min-w-0 break-words">あり（無料）</dd>
      </div>
    </dl>

    <div className="mt-7 flex flex-wrap gap-2 min-w-0">
      <a
  href="https://www.google.com/maps/place/MAGONDO/@36.3511999,136.3075579,17z/data=!3m1!4b1!4m9!3m8!1s0x5ff8f9c3dc5cc69b:0x49446a19448de165!5m2!4m1!1i2!8m2!3d36.3511956!4d136.3101328!16s%2Fg%2F11l20c0ljf?authuser=0&entry=ttu&g_ep=EgoyMDI2MDEyMS4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D"
  target="_blank"
  rel="noopener noreferrer"
>
  Googleマップで開く ↗︎
</a>


      <button
        type="button"
        onClick={() =>
         navigator.clipboard.writeText("〒922-0554 石川県加賀市橋立町ム-2")
        }
        className="
          inline-flex items-center gap-2
          border border-neutral-200
          bg-white
          px-4 py-2
          text-xs font-medium tracking-widest text-neutral-700
          transition
          hover:bg-neutral-100
          max-w-full
        "
      >
        住所をコピー
      </button>
    </div>
  </div>

  {/* Map */}
  <div
    className="
      rounded-none
      border border-neutral-200/80
      overflow-hidden
      bg-white
      shadow-[0_8px_24px_rgba(0,0,0,0.04)]
      min-w-0
    "
  >
    {/* ここをiframeに置き換え */}
    <div className="relative">
      <iframe
      
  src="https://www.google.com/maps/embed?pb=XXXXXXXXXXXX"
  className="w-full h-full border-0"
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>


      <div className="absolute bottom-0 left-4 md:left-6 bg-white/80 backdrop-blur px-3 py-1">
        <p className="text-[11px] text-neutral-600">
          目印：〇〇（例：橋立港 / 〇〇神社 付近）
        </p>
      </div>
    </div>
  </div>
</div>

    {/* 下の区切り（サイト全体のゴールドラインと合わせる用） */}
    <div className="mt-14 h-px w-full bg-neutral-200" />
  </div>
</section>

      {/* Booking */}
<section id="booking" className="border-y border-neutral-200 scroll-mt-4 bg-neutral-100">
  <div className="mx-auto max-w-6xl px-4 py-5 max-md:max-w-[92vw] max-md:overflow-hidden">

    <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
      空室確認・ご予約
    </h2>
    <p className="mt-0 text-neutral-600 text-sm">
      公式予約が最もお得です。お電話でのご相談も承っております。
    </p>

    <div className="mt-5 grid md:grid-cols-2 gap-6">
      {/* 公式予約 */}
      <a
        href="https://vacation-stay.jp/search?adults=2&destination=MAGONDO%20橋立町&destinationSearch=MAGONDO&disinfection_measure_codes=ANY&property_types=house&sort=distance_asc"
        target="_blank"
        rel="noopener noreferrer"
        className="
          group relative overflow-hidden
          rounded-none border border-neutral-300
          bg-white p-5
          transition-all duration-500
          hover:-translate-y-1 hover:shadow-xl
        "
      >
        {/* hoverで浮かぶ写真 */}
        <img
          src="/images/magondo-booking.jpg"
          alt="MAGONDO 外観"
          className="
            absolute inset-0 h-full w-full object-cover
            opacity-0 scale-110
            transition-all duration-700 ease-out
            group-hover:opacity-60 group-hover:scale-100
          "
        />

        {/* 暗めオーバーレイ（白文字の可読性） */}
        <div
          className="
            absolute inset-0
            bg-black/0
            transition duration-700
            group-hover:bg-black/45
          "
        />

        {/* テキスト */}
        <div className="relative z-10">
          <p className="text-xs tracking-widest text-neutral-500 transition-colors duration-500 group-hover:text-white/80">
            OFFICIAL
          </p>

          <h3 className="mt-1 text-lg font-medium text-neutral-900 transition-colors duration-500 group-hover:text-white">
            公式予約（推奨）
          </h3>

          <p className="mt-1 text-sm text-neutral-700 leading-relaxed transition-colors duration-500 group-hover:text-white/85">
            ベストレート保証。空室状況をカレンダーで確認し、そのままご予約いただけます。
          </p>

          <div className="mt-4 flex items-center text-sm font-medium text-neutral-900 transition-colors duration-500 group-hover:text-white">
            <span className="mr-2">予約ページへ</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">↗︎</span>
          </div>
        </div>
      </a>

      {/* 電話予約（ここにも同じ演出を付けるなら画像だけ変える） */}
      <a
        href="tel:0000000000"
        className="
          group relative overflow-hidden
          rounded-none border border-neutral-300
          bg-white p-5
          transition-all duration-500
          hover:-translate-y-1 hover:shadow-lg
        "
      >
        {/* hoverで浮かぶ写真（電話用の写真に差し替えOK） */}
        <img
          src="/images/magondo-phone.jpg"
          alt="お電話でのご予約"
          className="
            absolute inset-0 h-full w-full object-cover
            opacity-0 scale-110
            transition-all duration-700 ease-out
            group-hover:opacity-55 group-hover:scale-100
          "
        />

        {/* 暗めオーバーレイ */}
        <div
          className="
            absolute inset-0
            bg-black/0
            transition duration-700
            group-hover:bg-black/45
          "
        />

        {/* テキスト */}
        <div className="relative z-10">
          <p className="text-xs tracking-widest text-neutral-500 transition-colors duration-500 group-hover:text-white/80">
            TEL
          </p>

          <h3 className="mt-1 text-lg font-medium text-neutral-900 transition-colors duration-500 group-hover:text-white">
            電話予約
          </h3>

          <p className="mt-1 text-sm text-neutral-700 leading-relaxed transition-colors duration-500 group-hover:text-white/85">
            ご不明点や人数のご相談など、お気軽にお電話ください。
          </p>

          <p className="mt-4 text-sm font-medium text-neutral-900 transition-colors duration-500 group-hover:text-white">
            受付 9:00–18:00<br />
            <span className="text-base">TEL：0761-71-2810</span>
          </p>
        </div>
      </a>
    </div>

    {/* ゴールドアクセント */}
    <div className="mt-4 h-px w-full bg-neutral-300" />
    <div className="mt-3 h-[2px] w-28 rounded-full" style={{ background: GOLD }} />
  </div>
</section>


      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 py-20 scroll-mt-24">
        <h2 className="text-2xl font-semibold">よくあるご質問</h2>
        <div className="mt-6 space-y-3">
          {[
            {
              q: "チェックイン / チェックアウトは？",
              a: "チェックイン15:00〜／チェックアウト11:00（仮）。セルフチェックイン対応可。",
            },
            { q: "駐車場はありますか？", a: "敷地内に無料駐車場をご用意しています（台数限定）。" },
            { q: "キャンセルポリシーは？", a: "ご到着7日前から所定のキャンセル料が発生します（仮）。" },
          ].map((item, i) => (
            <details key={i} className="group rounded-3xl border border-neutral-200 bg-white p-5">
              <summary className="flex cursor-pointer items-center justify-between">
                <span className="font-medium">{item.q}</span>
                <span className="text-neutral-400 group-open:rotate-45 transition">＋</span>
              </summary>
              <p className="mt-3 text-sm text-neutral-600">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-12 grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <p className="font-semibold">KAKUREGA STAY</p>
            <p className="mt-2 text-neutral-600">〒922-0554 石川県加賀市橋立町1-2-3</p>
            <p className="text-neutral-600">TEL 0761-71-2810 / Mail info@example.com</p>
          </div>

          <div>
            <p className="font-semibold">リンク</p>
            <ul className="mt-2 space-y-1 text-neutral-600">
              <li><a href="#about" className="hover:underline">お部屋</a></li>
              <li><a href="#booking" className="hover:underline">予約</a></li>
              <li><a href="#access" className="hover:underline">アクセス</a></li>
              <li><a href="#faq" className="hover:underline">FAQ</a></li>
            </ul>
          </div>

          <div>
            <p className="font-semibold">ポリシー</p>
            <ul className="mt-2 space-y-1 text-neutral-600">
              <li>利用規約</li>
              <li>プライバシー</li>
              <li>特定商取引法に基づく表示</li>
            </ul>
          </div>
        </div>

        <div className="text-center text-xs text-neutral-500 py-6">
          © {new Date().getFullYear()} KAKUREGA STAY
        </div>
      </footer>
    </div>
  );
}
