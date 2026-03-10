"use client";

import AboutDesktopSlider from "./components/AboutDesktopSlider";
import Link from "next/link";
import { useEffect, useMemo, useState, useRef } from "react";
import MobileInfinitePeekSlider from "./components/MobileInfinitePeekSlider";
import AboutInfiniteSlider from "./components/AboutInfiniteSlider";
import NewsSection from "./components/NewsSection";



/**
 * MAGONDO – KAKUREGA STAY (single-file / stable responsive)
 * - 臙脂×ゴールド×黒
 * - 固定px依存を md: 以上に寄せ、モバイルは“崩れない配置”を優先
 * - id重複なし 
 * - app/page.js にそのまま貼り替えOK
 */
// ✅ 追加：ファーストビュー表紙（スクロールでふわっと消える）

export default function Site() {
  useEffect(() => {
  // ブラウザのスクロール復元を止める（特にSafari対策）
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  // URLに #hash が無いなら、必ずトップへ
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }
}, []);
function Cover({ ENJI, bgImage = "/images/introne.jpg", logoSrc = "/images/logo.svg" }) {

  const [done, setDone] = useState(false);
  const [leaving, setLeaving] = useState(false); // フェード用

  useEffect(() => {
    if (done) return;

    // 表紙中は本体スクロールをロック
    const prevOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    const prevOverscroll = document.body.style.overscrollBehavior;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";

    return () => {
      document.documentElement.style.overflow = prevOverflow;
      document.body.style.overflow = prevBodyOverflow;
      document.body.style.overscrollBehavior = prevOverscroll;
    };
  }, [done]);

  const close = () => {
    if (leaving || done) return;
    setLeaving(true);
    // フェードアウトしてから消す
    window.setTimeout(() => setDone(true), 220);
  };

  if (done) return null;

  return (
    <div
      aria-hidden={leaving ? "true" : "false"}
      className="fixed inset-0 z-[80] pointer-events-auto select-none"
      style={{
        opacity: leaving ? 0 : 1,
        transition: "opacity 220ms ease-out",
      }}
      onClick={close}
      onTouchEnd={(e) => {
        e.preventDefault(); // iOSでの挙動防止
        close();
      }}
    >
      {/* 背景 */}
      <div className="absolute inset-0">
        <img src={bgImage} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/65" />
      </div>

      {/* 中央コンテンツ */}
      <div className="relative h-full w-full flex items-center justify-center">
        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="grid items-center gap-10 md:grid-cols-[1fr_1fr]">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-4">
                <img
                  src={logoSrc}
                  alt="KAKUREGA STAY"
                  className="h-14 w-14 md:h-16 md:w-16 opacity-95"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div className="text-white">
                  <p className="text-xs tracking-[0.35em] opacity-80">KAKUREGA STAY</p>
                  <h1 className="mt-1 text-3xl md:text-5xl font-serif font-light tracking-[0.08em]">
                    MAGONDO
                  </h1>
                </div>
              </div>

              <div className="mt-6 h-px w-48 md:w-72 bg-white/60" />

              <p className="mt-5 text-white/85 text-sm md:text-base font-serif tracking-[0.12em]">
                北前船の物語が息づく、海辺の小さな宿
              </p>

              {/* ここだけ文言変更 */}
              <p className="mt-10 text-white/70 text-xs tracking-[0.3em]">
                TAP TO ENTER
              </p>
            </div>
            

            <div className="hidden md:flex justify-end">
              <div
                className="text-white/85 font-serif text-lg leading-relaxed"
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  letterSpacing: "0.18em",
                }}
              >
                加賀橋立 — 受け継がれる時間
              </div>
            </div>

            <div className="md:hidden">
              <p className="text-white/80 text-xs tracking-[0.28em] font-serif">
                加賀橋立 — 受け継がれる時間
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
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
  const forceTop = () => {
    // hash付き直リンク（#aboutとか）だけは尊重
    if (window.location.hash) return;

    // Safariの復元に勝つために「複数回」上書き
    window.scrollTo(0, 0);
    requestAnimationFrame(() => window.scrollTo(0, 0));
    setTimeout(() => window.scrollTo(0, 0), 0);
    setTimeout(() => window.scrollTo(0, 0), 50);
    setTimeout(() => window.scrollTo(0, 0), 200);
  };

  // 可能なら復元OFF
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  // 通常ロード
  forceTop();

  // bfcache復元（Safariがここで勝手にスクロール戻す）
  window.addEventListener("pageshow", forceTop);

  return () => {
    window.removeEventListener("pageshow", forceTop);
  };
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
  <>
    <Cover ENJI={ENJI} bgImage="/images/introne1.jpg" />
    

    <div className="min-h-screen text-neutral-900 selection:bg-[#9E1B21]/20 selection:text-[#0B0B0B]">
      {/* === Global Brush Background (軽量化：モバイルは1枚 / md以上は縦チェーン) === */}
     <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none">

  {/* ===== 背景画像（全面） ===== */}
  <img
    src="/images/intro_bg1.jpg"
    alt=""
    className="
       w-full h-full object-cover
    "
  />
  <div className="absolute inset-0 bg-black/15" />
<div
      className="
        pointer-events-none
        absolute inset-0
        z-0
        bg-gradient-to-b
        from-neutral-900/80
        via-neutral-900/40
        to-transparent
      "
    />
  {/* ===== 下フェード ===== */}
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />



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

{/* ===================== Hero + Intro（共通背景で包む） ===================== */}
<section className="relative w-full overflow-hidden">
  {/* ===== 共通背景 ===== */}
  <div className="pointer-events-none absolute inset-0 -z-10">
    {/* 背景画像 */}
    <div
      className="
        absolute inset-0
        bg-[url('/images/bg_mobile.jpg')]
        md:bg-[url('/images/bg_mobile.jpg')]
        bg-cover bg-center
      "
    />

    {/* 暗幕 */}
    <div className="absolute inset-0 bg-black/35 md:bg-black/20" />

    {/* うっすらグラデ */}
    <div
      className="
        absolute inset-0
        bg-gradient-to-b
        from-black/10 via-transparent to-black/20
      "
    />
  </div>

  {/* ===================== Hero ===================== */}
<section className="relative w-full">

  <div className="relative z-10 mx-auto max-w-6xl px-4 pt-12 pb-8 md:py-0">

    <div className="grid items-center gap-8 md:grid-cols-[1fr_1.25fr] md:gap-8 md:min-h-[60vh]">

      {/* ===================== Left Text ===================== */}
      <div className="relative z-10 mt-0 md:mt-0">

        {/* ===== Desktop ===== */}
        <div className="hidden md:block">

          <h1 className="text-left text-7xl text-white font-serif font-thin leading-tight tracking-wide">
            <span>KAKUREGA</span>
            <span className="block mt-1 opacity-90">STAY</span>
          </h1>

          <div className="mt-6 flex items-center gap-3 font-serif">
            <div className="h-px w-[260px] bg-neutral-300" />

            <p className="text-xl text-white tracking-[0.18em]">
              HASHITATE
            </p>
          </div>

        </div>


        {/* ===== Mobile ===== */}
        <div className="md:hidden">

          <h1 className="text-left text-4xl text-white font-serif leading-tight tracking-wide">
            <span>KAKUREGA</span>
            <span className="block opacity-90">STAY</span>
          </h1>

          <div className="mt-0 flex items-center gap-3 font-serif">
            <div className="h-px w-20 bg-white/70" />

            <p className="text-sm text-white tracking-[0.18em]">
              HASHITATE
            </p>
          </div>

        </div>

      </div>


      {/* ===================== Right Visual ===================== */}
      <div className="hidden md:flex relative z-10 items-center justify-center">

        <div
          className="
            relative
            w-full
            max-w-[450px]
            aspect-square
          "
        >

          <img
            src="/images/rogo6.png"
            alt="橋立の風景"
            className="w-full h-full object-cover object-center rounded-2xl"
          />

          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-black/0" />

        </div>

      </div>

    </div>

  </div>

  {/* Hero corner accent */}
  <div
    className="absolute -right-24 -top-24 h-64 w-64 rounded-full blur-3xl opacity-20"
    style={{ background: `radial-gradient(circle, ${ENJI}, transparent 60%)` }}
  />

</section>

  {/* ===================== Intro ===================== */}
  <section id="intro" className="relative w-full scroll-mt-24 pb-10 md:pb-30">
    <div className="relative z-10 mx-auto max-w-6xl px-4">

      {/* ===== Desktop ===== */}
      <div className="hidden md:block font-serif text-white">
        <p className="text-lg lg:text-xl opacity-80 align-middle">
          加賀の海辺、橋立
        </p>

        <h2 className="text-4xl lg:text-5xl font-thin tracking-wide leading-tight text-white">
          MAGONDO
        </h2>

        <div className="mt-6 h-px w-full bg-white/50" />

        <div className="mt-8 max-w-3xl space-y-3">
          <p className="text-base leading-8">
            静けさを大切にした、「隠れ家」ステイ。海辺の散歩、蔵の空気、和とモダンが混ざる時間。
          </p>
        </div>
      </div>

      {/* ===== Mobile ===== */}
      <div className="md:hidden font-serif text-white pt-2">
        <p className="text-sm tracking-[0.16em] opacity-80">
          加賀の海辺、橋立
        </p>

        <h2 className="mt-1 text-3xl leading-tight tracking-wide">
          MAGONDO
        </h2>

        <div className="mt-2 h-px w-20 bg-white/70" />

        <div className="mt-4 max-w-[28rem] space-y-2 text-sm leading-7 text-white/95">
          <p>静けさを大切にした、「隠れ家」ステイ。</p>
          <p>海辺の散歩、蔵の空気、和とモダンが混ざる時間。</p>
        </div>
      </div>
    </div>
  </section>
</section>


{/* ===================== ROOMS bar ===================== */}
<section className="w-full mt-0">
  <div
    className="flex flex-col items-center justify-center w-full h-[2px] md:h-[4px]"
    style={{ backgroundColor: ENJI }}
  >
  </div>
</section>



<section className="relative overflow-hidden bg-[#f5f1e8] py-10 md:py-32">
  {/* 背景 */}
  <div className="absolute inset-0">
    <img
      src="/images/hashitate_port.jpg"
      alt=""
      className="h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-[#f5f1e8]/45" />
  </div>

  <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-10">
    {/* justify-start にして、タイトルは ml-auto で右端へ */}
    <div className="flex items-start justify-start gap-14 md:gap-24">
      {/* 左：本文（md以上：縦） */}
      <div className="[font-family:var(--font-mincho)] text-neutral-800 font-light">
{/* SP：横書き */}
<div className="md:hidden max-w-[32rem] text-left font-serif text-neutral-900">

  <p className="text-[10px] tracking-[0.28em] text-neutral-700/80">
    STORY OF MAGONDO
  </p>

  <div className="mt-2 h-px w-16 bg-neutral-700/30 " />

  <h3 className="mt-6 text-[22px] leading-[1.9] tracking-[0.06em]">
    北前船の物語が息づく港町で。
  </h3>

  <div className="mt-6 space-y-4 text-[14px] leading-[2.0] tracking-[0.03em] text-neutral-800">

    <p>
      「MAGONDO」は、北前船で栄えた加賀・橋立の
      古民家を改装した一棟貸しの宿です。
    </p>

    <p>
      板塀と石垣、赤瓦が連なる町並みの中で、
      静かな時間を過ごすことができます。
    </p>

    <p>
      観光ではなく、暮らすように滞在する。
      橋立で過ごす特別な時間を。
    </p>

  </div>

</div>

        {/* md以上：縦組み（本文は幅を固定して重なり防止） */}
       <div
  className="hidden md:block text-[17px] font-serif leading-[2.45] tracking-[0.10em] w-[560px]"
  style={{
    writingMode: "vertical-rl",
    textOrientation: "upright",
  }}
>
          「MAGONDO」は、
          <br />
          北前船で栄えた加賀・橋立の
          <br />
          築百年以上の古民家を改装した
          <br />
          一棟貸しの宿です。
          <span className="opacity-60">　</span>
          板塀と石垣、赤瓦が連なる町並み。
          <br />
          かつて船主や船頭が暮らした
          <br />
          “橋立北前船主型”と呼ばれる
          <br />
          歴史ある景観の中に、
          <br />
          静かに佇んでいます。
          <span className="opacity-60">　</span>
          伝統建築の趣を残しながら、
          <br />
          現代の快適さをそっと重ねる。
          <br />
          壊すのではなく、継ぐという選択。
          <span className="opacity-60">　</span>
          観光ではなく、
          <br />
          暮らすように滞在するという体験を。
          <br />
          石川県加賀市・橋立町で、
          <br />
          心をほどく特別な時間を。
        </div>
      </div>

      {/* 右：タイトル（右寄せ固定／幅固定で絶対重ならない） */}
      <div
        className="hidden md:block ml-auto flex-none w-[240px] [font-family:var(--font-mincho)] text-neutral-900 font-serif text-[30px] leading-[2.15] tracking-[0.14em]"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
      >
        北前船の物語が息づく港町で、
        <br />
        和の贅沢に憩う隠れ宿。
      </div>
    </div>
  </div>
</section>
<section className=" w-full py- mt-0">
  <div
    className="flex flex-col items-center justify-center w-full h-[2px] md:h-[3px]"
    style={{ backgroundColor: ENJI }}
  >
  </div>
</section>

{/* About（お部屋） */}
<section
  id="about"
  className="
    relative mt-0 md:mt-0 scroll-mt-24
    py-13 md:py-20
  "
>
   <div className=" absolute inset-0 bg-neutral-50" />
  {/* ===== 中身だけ幅制限（ここが今までのサイズを保つ） ===== */}
  <div className="relative z-10 mx-auto max-w-6xl px-4">
    <div className="grid md:grid-cols-[360px_minmax(0,1fr)] items-start gap-10">
      {/* 左：縦書き（モバイルは横書き） */}
      <div className="font-serif text-neutral-800">
        <div className="text-lg md:[writing-mode:vertical-rl] leading-relaxed">
          <span className="hidden md:block md:relative md:-left-[-35px] text-3xl mt-15 md:text-4xl">
            古民家について
          </span>
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden w-screen -mx-4 max-w-[520px] mt-0">
          <MobileInfinitePeekSlider
            slides={aboutSlides}
            gapPx={16}
            cardRatio={0.76}
            edgeFade={true}
            aspect="16/10"
            radius="xl"
          />
        </div>

        <div className="mt-2 md:mt-0 md:ml-4">
          <div className="md:mt-5 h-px w-full md:w-[360px] bg-neutral-200" />

          <div className="mt-5 text-sm text-neutral-600 md:text-left text-center">
            <p>風土や建物の特色を活かしながら、</p>
          </div>

          <p className="mt-2 text-sm text-neutral-600">
            <span className="block md:text-left text-center">
              三つの宿がそれぞれ異なる魅力を持っています
            </span>
          </p>
        </div>
      </div>

      {/* Desktop Slider */}
     <div className="hidden md:block ">
  <AboutDesktopSlider slides={aboutSlides} />
</div>
    </div>
  </div>
</section>

<div
    className="flex flex-col items-center justify-center w-full h-[0px] md:h-[4px]"
    style={{ backgroundColor: ENJI }}
  >
  </div>

      
      
      
      
      
<section id="experience" className="relative md:mt-0 py-0 md:py-20 overflow-hidden">

  {/* ===== 背景画像 ===== */}
  <div className="absolute inset-0 -z-10">
    <img
      src="/images/experience-bg20.jpg"   // ← 好きな画像に変更
      alt=""
      className="w-full h-full object-cover"
    />
  </div>

  {/* ===== 暗めオーバーレイ（文字を見やすくする） ===== */}
  <div className="absolute inset-0 -z-0 bg-black/20" />

  <div className="relative z-10 mx-auto max-w-6xl px-4 py-0 md:mb-5"> </div>
        
       <div className="relative z-10 mx-auto max-w-6xl px-4 py-0 md:mb-5">

  <div className="w-full py-6 flex items-center gap-4">

    <span className="text-white text-3xl tracking-[0.em] font-serif">
      Looks Experience
    </span>

    {/* 横ライン */}
    <span className="flex-1 h-px bg-white/70"></span>

    <span className="text-white text-xl tracking-[0.1em] font-serif">
      MAGONDO
    </span>

  </div>



         

<div className="w-full py-4 block md:hidden">
  <div>
    <span className="text-black text-2xl tracking-[0.em] font-serif">
     Looks Experience
    </span>

    {/* 横棒 */}
    <span className="mx-3 text-black opacity-70">
      —
    </span>

    <span className="text-black text-xs tracking-[0.em] font-serif">
       MAGONDO
    </span>
  </div>
</div>
<div className="text-left mb-8 md:mb-12">

  <p className="
    font-serif
    text-sm md:text-base
    text-white
    leading-relaxed
    
  ">
    設えや空気感の異なる三つの宿。過ごし方に合わせて、滞在のかたちをお選びください。
  </p>

  <p className="
    mt-4
    text-[11px] md:text-[13px]
    tracking-[0.35em]
    uppercase
    text-neutral-500
    font-serif
  ">
    Choose Your Stay
  </p>

</div>

          <div className="grid grid-cols-3 md:grid-cols-3 md:gap-8 gap-2 justify-items-center md:mt-0 mt-0">   
  {/* 宿 */}
  <a href="/dining" className="group block">
  <div className="flex items-center gap-3">
    

      <div className="
  relative
  w-full max-w-[150px] md:max-w-none md:w-[300px]
  h-[150px] md:h-[300px]
  overflow-hidden
  rounded-lg

    ring-1 ring-white
group-hover:ring-neutral-500
transition duration-300 /* ← 白枠 */

">

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
<div className="text-center">
    <p className="
     text-sm
    px-4 py-1
    inline-block
    font-serif mt-3  text-center
     ring-1 text-white ring-white
group-hover:text-neutral-500/80 group-hover:ring-neutral-500/50
transition  /* ← 白枠 */
  ">
      - MAGOICHI View more -
    </p>
    </div>
  </a>

  {/* カフェ */}
  <a href="/rooms" className="group block">
  <div className="flex items-center gap-3">
    

      <div className="
  relative
  w-full max-w-[150px] md:max-w-none md:w-[300px]
  h-[150px] md:h-[300px]
  overflow-hidden
  rounded-lg

  ring-1 ring-white
group-hover:ring-neutral-500
transition duration-300 /* ← 白枠 */

">

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

    <div className="text-center">
    <p className="
     text-sm
    px-4 py-1
    inline-block
    font-serif mt-3 text-center
    ring-1 text-white ring-white
group-hover:text-neutral-500/80 group-hover:ring-neutral-500/50
transition  /* ← 白枠 */
  ">
      - MAGONI View more -
    </p>
    </div>
  </a>

  {/* 周辺 */}
  <a href="/sightseeing" className="group block">
  <div className="flex items-center gap-3">
   

      <div className="
  relative
  w-full max-w-[150px] md:max-w-none md:w-[300px]
  h-[150px] md:h-[300px]
  overflow-hidden
  rounded-lg

    ring-1 ring-white
group-hover:ring-neutral-500
transition duration-300 /* ← 白枠 */

">

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

       <div className="text-center">
    <p className="
     text-sm
    px-4 py-1
    inline-block
    font-serif mt-3 text-center
    ring-1 text-white ring-white
group-hover:text-neutral-500/80 group-hover:ring-neutral-500/50
transition  /* ← 白枠 */
  ">
      - MAGOSAN View more -
    </p>
    </div>
    
        </a>
        </div>
        </div>
      </section>
<div
    className="flex flex-col items-center justify-center w-full h-[50px] md:h-[3px]"
    style={{ backgroundColor: ENJI }}
  >
  </div>










     {/* Kura（蔵の宿） */}
<section id="kura" className="relative w-full scroll-mt-24 py-20 md:mt-0 mt-15">
  {/* 背景グラデーション（フル幅） */}
  <div
    className="
    pointer-events-none absolute inset-0 
 
  bg-neutral-100/100" 
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
<section id="experience-more" className="relative md:-mt-0 mt-0 py-9">
 <div className="pointer-events-none absolute inset-0">
  <img
    src="/images/experience_bg.jpg"
    alt=""
    className="h-full w-full object-cover"
  />

  {/* 暗幕（文字を読みやすくする） */}
  <div className="absolute inset-0 bg-neutral-500/65" />
</div>
  <div className="relative z-10 mx-auto max-w-6xl px-4 py-10 md:mt-0 -mt-46">
    {/* 縦ライン */}
<div className="md:absolute md:left-215 md:-top-19 md:bottom-6 h-20 md:w-px md:bg-neutral-300/70 " />
{/* 縦ライン */}
<div className="md:absolute md:left-214 md:-top-19 md:bottom-6 h-20 md:w-px md:bg-neutral-300/70 " />
    {/* 見出し */}
    <div className="flex items-center gap-2 mb-12 relative ">
      
      <h2 className="text-base font-serif text-white md:ml-[10px] ml-[0px] md:-top-3 md:mt-3 mt-6">
        KAKUREGA Stay Guide
      </h2>
      {/* ライン */}
        <div className="hidden md:block md:mt-2  center h-px w-full md:w-[335px] bg-neutral-50" />
      <h3 className="md:tracking-[-0.0em] tracking-[-0.04em] text-4xl md:text-7xl font-serif text-neutral-200  absolute md:right-3 -top-3">
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
          <p className="hidden md:block font-serif text-sm tracking-[0.18em] text-neutral-200">
            -STAY FLOW-
          </p>

          <h4 className="mt-4 font-serif text-2xl text-neutral-50 tracking-wide">
           暮らす旅のはじまり
          </h4>

          <div className="mt-5 space-y-3 text-base leading-relaxed text-white">
            <p>
              旅のはじまりは、町の直売所や市場から。
            </p>
            <p>
            出会った旬を選び、宿のキッチンで仕上げる時間まで含めて、
            </p>
            <p>MAGOの「暮らす旅」です。</p>
          </div>

        
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




<div
    className="flex flex-col items-center justify-center w-full h-[50px] md:h-[3px]"
    style={{ backgroundColor: ENJI }}
  >
  </div>
<NewsSection />

{/* ================= GALLERY ================= */}
<section id="gallery" className="w-full scroll-mt-24 overflow-hidden">

  <div className="space-y-">

    {/* ===== 1段目：右へ流れる ===== */}
    <div className="relative w-full overflow-hidden">
      <div
        className="flex w-max gap-"
        style={{
          animation: "marquee-right 40s linear infinite",
        }}
      >
        {[...Array(2)].map((_, loopIndex) =>
          Array.from({ length: 7 }).map((_, i) => (
            <div
              key={`row1-${loopIndex}-${i}`}
              className="
                aspect-[5/3]
                w-[250px]
                overflow-hidden
                rounded-
                shadow-[0_10px_30px_rgba(0,0,0,0.15)]
              "
            >
              <img
                src={`/images/g/gallery_${i + 1}.jpg`}
                alt={`gallery ${i + 1}`}
                className="
                  w-full h-full object-cover
                  transition-transform duration-700 ease-out
                  hover:scale-105
                "
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
        className="flex w-max gap-"
        style={{
          animation: "marquee-left 40s linear infinite",
        }}
      >
        {[...Array(2)].map((_, loopIndex) =>
          Array.from({ length: 7 }).map((_, i) => (
            <div
              key={`row2-${loopIndex}-${i}`}
              className="
                aspect-[5/3]
                w-[250px]
                overflow-hidden
                rounded-
                shadow-[0_10px_30px_rgba(0,0,0,0.15)]
              "
            >
              <img
                src={`/images/g/gallery_${i + 8}.jpg`}
                alt={`gallery ${i + 8}`}
                className="
                  w-full h-full object-cover
                  transition-transform duration-700 ease-out
                  hover:scale-105
                "
                loading="lazy"
              />
            </div>
          ))
        )}
      </div>
    </div>

  </div>
</section>


<div
    className="flex flex-col items-center  bg-neutral-400/100 justify-center w-full h-[50px] md:h-[3px]"
    
  >
  </div>




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
<section id="access" className="w-full py-5 scroll-mt-24 bg-neutral-400/60">
  <div className="mx-auto max-w-5xl px-4">
    <div className="flex items-end justify-between gap-4">
      <div>
        <p className="text-xs tracking-[0.25em] text-neutral-300">ACCESS</p>
        <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-200">
          アクセス
        </h2>
      </div>

      {/* 任意：小さなアクセント（ゴールドラインがあるなら馴染む） */}
      <div className="hidden sm:block h-px w-24 bg-neutral-200" />
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
    <div className="mt-7 mb-8 h-px w-full bg-neutral-200" />
  </div>
</section>







<div
    className="flex flex-col items-center justify-center w-full h-[50px] md:h-[3px]"
    style={{ backgroundColor: ENJI }}
  >
  </div>




  
      {/* Booking */}
<section id="booking" className="border-y border-neutral-200 scroll-mt-4 bg-neutral-100">
  <div className="mx-auto max-w-6xl px-4 py-15 max-md:max-w-[92vw] max-md:overflow-hidden">

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
          src="/images/booking/magondo-booking1.jpg"
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
          src="/images/booking/magondo-phone.jpg"
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



<div
    className="flex flex-col items-center justify-center w-full h-[50px] md:h-[3px]"
    style={{ backgroundColor: ENJI }}
  >
  </div>




  

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 py-20 scroll-mt-24">
        
        <h2 className="text-2xl text-white font-semibold">よくあるご質問</h2>
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
      <footer className="bg-neutral-100 border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-12 grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <p className="text-neutral-400 font-semibold">KAKUREGA STAY</p>
            <p className="mt-2 text-neutral-500">〒922-0554 石川県加賀市橋立町1-2-3</p>
            <p className="text-neutral-600">TEL 0761-71-2810 / Mail info@example.com</p>
          </div>

          <div>
            <p className="text-neutral-400 font-semibold">リンク</p>
            <ul className="mt-2 space-y-1 text-neutral-500">
              <li><a href="#about" className="hover:underline">お部屋</a></li>
              <li><a href="#booking" className="hover:underline">予約</a></li>
              <li><a href="#access" className="hover:underline">アクセス</a></li>
              <li><a href="#faq" className="hover:underline">FAQ</a></li>
            </ul>
          </div>

          <div>
            <p className="text-neutral-400 font-semibold">ポリシー</p>
            <ul className="mt-2 space-y-1 text-neutral-500">
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
<Link
  href="/shops"
  className="
    fixed bottom-0 right-0
    w-45 h-45
    bg-[#9E1B21]
    text-white
    flex items-center justify-center
    text-sm font-serif
    rounded-tl-full
    shadow-xl
    z-50
    hover:scale-105
    transition
    flex items-right 
pl-10 pt-10
  "
>
  
  HOW TO ENJOY<br/>過ごし方<br/>MAGONDO<br/>tap─────→
</Link>

  
  </>
);
}