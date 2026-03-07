"use client";



import { useMemo, useState } from "react";

export default function ShopsPage() {
  const ENJI_HEX = "#6b1c2a";

  // ==== ここだけ実URLに差し替えてOK ====
  const BOOKING_URL = "https://example.com/booking"; // 予約ページ
  const TEL_NUMBER = "090-1234-5678"; // 電話番号（ハイフンOK）
  const TEL_HREF = `tel:${TEL_NUMBER.replace(/-/g, "")}`;

  const ROOMS = [
    { key: "dining", label: "MAGOICHI", href: "/dining" },
    { key: "rooms", label: "MAGONI", href: "/rooms" },
    { key: "sightseeing", label: "MAGOSAN", href: "/sightseeing" },
  ];
  // ===================================

  const plans = useMemo(
    () => ({
      standard: {
        label: "おすすめ",
        dayBlocks: [
          {
            day: "DAY 1",
            title: "到着と、夜の余白",
            items: [
              { time: "15:00", text: "チェックイン。深呼吸して、旅の速度を落とす。", img: "/images/a111.jpg" },
              { time: "16:00", text: "周辺を歩いて、文化と自然の空気を身体に入れる。", img: "/images/a21.jpg" },
              { time: "18:00", text: "山本屋で夕餉。土地の味を、静かに味わう。", img: "/images/a333.jpg" },
              { time: "20:00", text: "宿へ戻って晩酌。灯りを落として、夜を長く。", img: "/images/a4.jpg" },
            ],
          },
          {
            day: "DAY 2",
            title: "旬を買い、仕込む日",
            items: [
              { time: "午前", text: "直売所へ。マルヤ水産で“今日いちばん”を選ぶ。", img: "/images/b1.jpg" },
              { time: "昼", text: "宿で仕込み。キッチンが旅の舞台になる。", img: "/images/b2.jpg" },
              { time: "夕方", text: "散歩や温泉で整える。余白を、贅沢に。", img: "/images/b3.jpg" },
              { time: "夜", text: "一皿を仕上げて、ゆっくり食卓へ。", img: "/images/b4.jpg" },
            ],
          },
          {
            day: "DAY 3",
            title: "余韻を持ち帰る",
            items: [
              { time: "09:00", text: "朝の光とコーヒー。静かな時間が残る。", img: "/images/c1.jpg" },
              { time: "11:00", text: "チェックアウト。次の季節に、また。", img: "/images/c2.jpg" },
            ],
          },
        ],
      },

      longstay: {
        label: "長期滞在",
        dayBlocks: [
          {
            day: "DAY 1",
            title: "暮らしの準備を整える",
            items: [
              { time: "15:00", text: "チェックイン。まずは“住む”気分で空間を整える。", img: "/images/tyou/ls1.jpg" },
              { time: "16:00", text: "近所の動線チェック。買い出し・散歩のルートを掴む。", img: "/images/tyou/ls2.jpg" },
              { time: "18:00", text: "外で一度味わって、土地の“基準”を知る。", img: "/images/tyou/ls3.jpg" },
              { time: "20:00", text: "宿でゆっくり。翌日からのリズムを作る夜。", img: "/images/tyou/ls4.jpg" },
            ],
          },
          {
            day: "DAY 2",
            title: "ルーティンを手に入れる",
            items: [
              { time: "午前", text: "直売所で旬をまとめ買い。冷蔵庫が旅の台所になる。", img: "/images/tyou/ls5.jpg" },
              { time: "昼", text: "常備菜を少し。午後の自由が増える。", img: "/images/tyou/ls6.jpg" },
              { time: "夕方", text: "温泉や散歩を“習慣”に。心身を整える。", img: "/images/tyou/ls7.jpg" },
              { time: "夜", text: "一皿＋一杯。飾らない贅沢を、毎晩。", img: "/images/tyou/ls8.jpg" },
            ],
          },
          {
            day: "DAY 3+",
            title: "好きな場所が“いつもの場所”になる",
            items: [
              { time: "朝", text: "同じ朝でも、景色が少しずつ変わっていく。", img: "/images/tyou/ls9.jpg" },
              { time: "昼", text: "気分で外食。お気に入りの店に“ただいま”と言える。", img: "/images/tyou/ls10.jpg" },
              { time: "夜", text: "宿で仕上げる夜も、外で味わう夜も。自由に。", img: "/images/tyou/ls11.jpg" },
            ],
          },
        ],
      },
    }),
    []
  );

  const [planKey, setPlanKey] = useState("standard");
  const [open, setOpen] = useState(false);

  const activePlan = plans[planKey];
  const isClosed = !open; // 両方閉じてる時（= open が false）に使う
  const [menuOpen, setMenuOpen] = useState(false);


  return (
    <main className="w-full">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50">
        {/* うっすらガラス + 境界線 */}
        <div className="bg-white/70 backdrop-blur border-b border-neutral-200">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
            {/* 左：ロゴ/タイトル（HOMEリンク） */}
            <a
              href="/"
              className="font-serif text-sm md:text-base tracking-[0.18em] text-neutral-900 hover:opacity-80 transition"
            >
              MAGO
            </a>

            {/* 右：アクション */}
            <nav className="flex items-center gap-2">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-serif text-white shadow-sm hover:opacity-90 transition"
                style={{ backgroundColor: ENJI_HEX }}
              >
                予約
              </a>

              <a
                href={TEL_HREF}
                className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-serif border border-neutral-300 bg-white/80 hover:bg-white transition text-neutral-900"
              >
                電話
              </a>

              <div className="relative">

  <button
    onClick={() => setMenuOpen(v => !v)}
    className="
      inline-flex items-center justify-center
      rounded-full
      w-10 h-10
      border border-neutral-300
      bg-white/80 backdrop-blur
      hover:bg-white
      transition
      text-lg
    "
  >
    ≡
  </button>

  {/* ===== DROPDOWN ===== */}
 {menuOpen && (
  <div
    className="
      absolute right-0 mt-3
      w-30
      
      border border-neutral-200/70
      bg-white/85 backdrop-blur
      shadow-[0_18px_45px_rgba(0,0,0,0.12)]
      overflow-hidden
      animate-menuFade
      origin-top-right
      z-50
    "
  >
    {/* 先端の小さな三角（上品） */}
    <div className=" " />

    <nav className="relative py-2">
      <a
  href="/dining"
  className="
    flex flex-col items-center
    px-5 py-3
    font-serif text-[15px] tracking-[0.08em]
    text-neutral-900
    hover:bg-neutral-50/70
    transition
  "
>
  MAGO1

  {/* アンダーライン */}
  <span className="mt-1 h-px w-25 bg-neutral-400/70" />
</a>

   


      {/* 区切り：強すぎない横棒 */}
      <div className="mx-6 h-px bg-neutral-200/40" />
      <a
  href="/rooms"
  className="
    flex flex-col items-center
    px-5 py-3
    font-serif text-[15px] tracking-[0.08em]
    text-neutral-900
    hover:bg-neutral-50/70
    transition
  "
>
  MAGO2

  {/* アンダーライン */}
  <span className="mt-1 h-px w-25 bg-neutral-400/70" />
</a>

      <div className="mx-6 h-px bg-neutral-200/40" />
      <a
  href="/mago3"
  className="
    flex flex-col items-center
    px-5 py-3
    font-serif text-[15px] tracking-[0.08em]
    text-neutral-900
    hover:bg-neutral-50/70
    transition
  "
>
  MAGO3

  {/* アンダーライン */}
  <span className="mt-1 h-px w-25 bg-neutral-400/70" />
</a>
    </nav>
  </div>
)}

</div>

            </nav>
          </div>
        </div>
      </header>

      {/* ================= PLAN HERO ================= */}
      <section className="relative w-full overflow-hidden">
        <div className="h-[46vh] md:h-[56vh]">
          <img
            src="/images/plan_bg.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-black/70" />

          <div className="relative h-full flex items-center justify-center px-6">
            <div className="text-center text-white max-w-2xl">
              <p className="font-serif text-xs tracking-[0.32em] opacity-80">
                KAKUREGA STAY GUIDE
              </p>
              <h2 className="mt-4 font-serif text-4xl md:text-6xl leading-tight">
                暮らすように、旅をする
              </h2>
              <p className="mt-4 text-sm md:text-base text-white/80 leading-relaxed">
                「予定」より「余白」。その土地の旬と、静かな夜を持ち帰る時間。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TIMELINE (Editorial) ================= */}
      <section className="relative w-full bg-neutral-50">
        {/* うっすら背景 */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-200 to-transparent" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-14 md:py-24">
          {/* セクション見出し */}
          <div className="mb-10 md:mb-14">
            <p className="font-serif text-[11px] md:text-xs tracking-[0.28em] text-neutral-500">
              - RECOMMENDED PLAN -
            </p>

            <div className="mt-3">
 <div className="flex flex-col md:flex-row md:items-center gap-4">

  {/* タイトル */}
  <h3 className="font-serif text-2xl md:text-3xl text-neutral-800 whitespace-nowrap">
    {!open
      ? "暮らす旅のはじまり"
      : planKey === "standard"
      ? "3日で味わう、橋立のリズム"
      : "長期滞在の楽しみ方"}
  </h3>

  {/* 横棒（md以上のみ表示） */}
  <div className="
    hidden md:block
    flex-1
    h-px
    bg-neutral-200
    mx-4
  " />

  {/* ボタン */}
  <div className="hidden md:flex items-center md:justify-end">

    <div className="
      flex items-center
      rounded-full
      border border-neutral-200
      bg-white/80 backdrop-blur
      overflow-hidden
      shadow-sm
    ">

      {/* おすすめ */}
      <button
        type="button"
        onClick={() => {
          if (planKey === "standard") setOpen(v => !v);
          else {
            setPlanKey("standard");
            setOpen(true);
          }
        }}
        className={`
          px-5 py-2.5 text-sm font-serif transition-all
          ${
            planKey === "standard" && open
              ? "text-white rounded-l-full"
              : "text-neutral-700 hover:bg-neutral-100"
          }
        `}
        style={
          planKey === "standard" && open
            ? { backgroundColor: ENJI_HEX }
            : undefined
        }
      >
        おすすめ
      </button>

      <div className="w-px self-stretch bg-neutral-200" />

      {/* 長期滞在 */}
      <button
        type="button"
        onClick={() => {
          if (planKey === "longstay") setOpen(v => !v);
          else {
            setPlanKey("longstay");
            setOpen(true);
          }
        }}
        className={`
          px-5 py-2.5 text-sm font-serif transition-all
          ${
            planKey === "longstay" && open
              ? "text-white rounded-r-full"
              : "text-neutral-700 hover:bg-neutral-100"
          }
        `}
        style={
          planKey === "longstay" && open
            ? { backgroundColor: ENJI_HEX }
            : undefined
        }
      >
        長期滞在
      </button>

    </div>
  </div>
</div>

  {/* 下段：説明文（ボタンと分離したので揃う） */}
  <p className="mt-3 text-sm text-neutral-600 leading-relaxed max-w-2xl">
    {!open ? (
      <>
        旅のはじまりは、町の直売所や市場から。<br />
        その日に出会った旬を選び、宿のキッチンで仕上げる時間まで含めて、<br />
        MAGOの「暮らす旅」です。
      </>
    ) : planKey === "standard" ? (
      <>
        直売所で選ぶ旬、宿のキッチンで仕上げる時間。<br />
        “旅の全部”が、暮らしの延長になります。
      </>
    ) : (
      <>
        まとめ買い、仕込み、散歩、温泉。<br />
        日々のリズムが整うほど、旅は深くなる。
      </>
    )}
  </p>
  {/* Mobile Buttons */}
<div className="mt-5 flex  md:hidden">

  <div className="
    flex items-center
    rounded-full
    border border-neutral-200
    bg-white/90
    overflow-hidden
    shadow-sm
  ">

    {/* おすすめ */}
    <button
      type="button"
      onClick={() => {
        if (planKey === "standard") setOpen(v => !v);
        else {
          setPlanKey("standard");
          setOpen(true);
        }
      }}
      className={`
        px-4 py-2 text-sm font-serif transition-all
        ${
          planKey === "standard" && open
            ? "text-white rounded-l-full"
            : "text-neutral-700"
        }
      `}
      style={planKey === "standard" && open ? { backgroundColor: ENJI_HEX } : undefined}
    >
      おすすめ
    </button>

    <div className="w-px self-stretch bg-neutral-200" />

    {/* 長期滞在 */}
    <button
      type="button"
      onClick={() => {
        if (planKey === "longstay") setOpen(v => !v);
        else {
          setPlanKey("longstay");
          setOpen(true);
        }
      }}
      className={`
        px-4 py-2 text-sm font-serif transition-all
        ${
          planKey === "longstay" && open
            ? "text-white rounded-r-full"
            : "text-neutral-700"
        }
      `}
      style={planKey === "longstay" && open ? { backgroundColor: ENJI_HEX } : undefined}
    >
      長期滞在
    </button>

  </div>
</div>

</div>

          </div>

          {/* ===== 両方閉じてるときの「1枚画像」 ===== */}
          {isClosed && (
            <div className="mb-12 md:mb-16">
              <div className="relative overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
                <div className="aspect-[16/9] md:aspect-[16/9] w-full">
                  <img
                    src="/images/plan_closed1.jpg" // ←好きな1枚に差し替え
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* うっすらキャプション */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 text-white">
                  <p className="text-[11px] tracking-[0.32em] opacity-85">
                    MAGO — LIVING TRIP
                  </p>
                  <p className="mt-2 font-serif text-lg md:text-2xl leading-snug">
                    直売所で選ぶ旬、キッチンで仕上げる夜。
                    <br className="hidden md:block" />
                    旅を“暮らし”に寄せるだけで、記憶は深くなる。
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ===== Accordion Body ===== */}
          <div
            className={`
              overflow-hidden transition-[max-height,opacity] duration-500 ease-out
              ${open ? "max-h-[7000px] opacity-100" : "max-h-0 opacity-0"}
            `}
          >
            {activePlan.dayBlocks.map((block, bi) => (
              <div key={bi} className="mb-14 md:mb-24">
                {/* DAY見出し */}
                <div className="flex items-baseline justify-between gap-6">
                  <div>
                    <p className="text-[11px] md:text-xs tracking-[0.26em] text-neutral-400">
                      {block.day}
                    </p>
                    <h4 className="mt-2 font-serif text-xl md:text-2xl text-neutral-800">
                      {block.title}
                    </h4>
                  </div>
                  <div className="hidden md:block h-px w-40 bg-neutral-200" />
                </div>

                {/* 縦ライン + カード */}
                <div className="relative mt-8 md:mt-10 pl-5 md:pl-10">
                  {/* 縦ライン */}
                  <div className="absolute left-2 md:left-4 top-0 bottom-0 w-px bg-neutral-200" />

                  <div className="space-y-4 md:space-y-10">
                    {block.items.map((it, i) => (
                      <div key={i} className="relative">
                        {/* ドット（臙脂） */}
                        <div
                          className="absolute -left-[3px] md:-left-[1px] top-6 w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ring-4 ring-neutral-50"
                          style={{ backgroundColor: ENJI_HEX }}
                        />

                        {/* カード */}
                        <div
                          className="
                            grid grid-cols-[1fr_1.25fr]
                            md:grid-cols-[1fr_520px]
                            gap-3 md:gap-10
                            items-center
                            rounded-2xl
                            border border-neutral-200
                            bg-white/75
                            backdrop-blur
                            p-4 md:p-8
                            shadow-sm
                          "
                        >
                          {/* テキスト */}
                          <div className="min-w-0">
                            <p className="text-[11px] tracking-widest text-neutral-400">
                              {it.time}
                            </p>

                            <p className="mt-2 font-serif text-[15px] md:text-xl text-neutral-800 leading-relaxed">
                              {it.text}
                            </p>

                            <div className="mt-3 flex items-center gap-2">
                              <div className="h-px w-10 bg-neutral-300" />
                              <p className="text-[10px] text-neutral-500 tracking-[0.22em]">
                                KAKUREGA MOMENT
                              </p>
                            </div>
                          </div>

                          {/* 画像 */}
                          <div className="overflow-hidden rounded-xl">
                            <img
                              src={it.img}
                              alt=""
                              className="w-full aspect-[16/10] md:aspect-[16/9] object-cover"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          

          {/* ================= 下部：mago1/2/3 ボタン ================= */}
          <div className="mt-14 md:mt-20">
            <p className="text-center text-[11px] tracking-[0.28em] text-neutral-500">
              - ROOMS -
            </p>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ROOMS.map((r) => (
                <a
                  key={r.key}
                  href={r.href}
                  className="
                    group rounded-2xl border border-neutral-200 bg-white
                    px-5 py-4
                    shadow-sm hover:shadow-md transition
                    flex items-center justify-between
                  "
                >
                  <div>
                    <p className="text-[10px] tracking-[0.28em] text-neutral-500">
                      STAY
                    </p>
                    <p className="mt-1 font-serif text-lg text-neutral-900">
                      {r.label}
                    </p>
                  </div>
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center border border-neutral-200 bg-neutral-50 group-hover:bg-white transition"
                    style={{ boxShadow: "0 1px 0 rgba(0,0,0,0.02)" }}
                  >
                    <span className="text-neutral-700">→</span>
                  </div>
                </a>
              ))}
            </div>

            {/* 再度：予約 & 電話 */}
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-serif text-white shadow-sm hover:opacity-90 transition"
                style={{ backgroundColor: ENJI_HEX }}
              >
                予約する
              </a>
              <a
                href={TEL_HREF}
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-serif border border-neutral-300 bg-white hover:bg-neutral-50 transition text-neutral-900"
              >
                電話する
              </a>
            </div>
          </div>
          
        </div>
        
      </section>
      

    {/* ================= AREA LIST ================= */}
<section
  className="py-20 text-white"
  style={{ backgroundColor: ENJI_HEX }}
>
  <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-14">

    {/* ================= 直売所 ================= */}
<div>
  <h3 className="font-serif text-xl mb-5 tracking-wide">
    直売所
  </h3>

  <ul className="space-y-3">

    {/* マルヤ水産 */}
    <li>
      <a
        href="https://www.google.com/maps/place/https://www.google.com/maps/place/加賀・橋立港+マルヤ水産/@36.352499,136.0126264,11z/data=!4m6!3m5!1s0x5ff8f89938964bc1:0x72131c689d6816eb!8m2!3d36.352499!4d136.317497!16s%2Fg%2F1vzn5dx2?entry=ttu&g_ep=EgoyMDI2MDMwNC4xIKXMDSoASAFQAw%3D%3D"
        target="_blank"
        rel="noopener noreferrer"
        className="
          group flex items-center justify-between
          py-2 px-1
          opacity-90 hover:opacity-100
          transition
          border-b border-white/10 hover:border-white/40
        "
      >
        <span className="underline underline-offset-4 decoration-white/30 group-hover:decoration-white transition">
          マルヤ水産
        </span>

        <span className="text-xs opacity-0 group-hover:opacity-80 transition">
          ↗
        </span>
      </a>
    </li>

    {/* ヤマハ水産 */}
    <li>
      <a
        href="https://www.google.com/maps/place/やまは水産/@36.3531843,136.3179751,17z/data=!3m1!4b1!4m6!3m5!1s0x5ff8f89e998ff239:0x1761e4a7984791ee!8m2!3d36.35318!4d136.32055!16s%2Fg%2F1tgf7nb1?entry=ttu&g_ep=EgoyMDI2MDMwNC4xIKXMDSoASAFQAw%3D%3D"
        target="_blank"
        rel="noopener noreferrer"
        className="
          group flex items-center justify-between
          py-2 px-1
          opacity-90 hover:opacity-100
          transition
          border-b border-white/10 hover:border-white/40
        "
      >
        <span className="underline underline-offset-4 decoration-white/30 group-hover:decoration-white transition">
          ヤマハ水産
        </span>

        <span className="text-xs opacity-0 group-hover:opacity-80 transition">
          ↗
        </span>
      </a>
    </li>

  </ul>
</div>
    {/* ================= ダイニング ================= */}
    <div>
      <h3 className="font-serif text-xl mb-5 tracking-wide">
        ダイニング
      </h3>

      <ul className="space-y-3">

        {[
          ["山本屋","https://www.google.com/maps/place/磯料理+山本屋/@36.3524134,136.3159227,17z/data=!3m1!4b1!4m6!3m5!1s0x5ff8f8991ad0767f:0x9ef6fb0759ccc2f4!8m2!3d36.3524134!4d136.3159227!16s%2Fg%2F1tx4p6kg?entry=ttu&g_ep=EgoyMDI2MDIwNC4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D"],
        ["しんとく","https://www.google.com/maps/place/https://www.google.com/maps/place/しんとく/@36.3523207,136.3150756,17z/data=!3m1!4b1!4m6!3m5!1s0x5ff8f89938a7c4ef:0x9a3cd2c6191a9df9!8m2!3d36.3523164!4d136.3176505!16s%2Fg%2F1tfkl0q7?entry=ttu&g_ep=EgoyMDI2MDMwNC4xIKXMDSoASAFQAw%3D%3D"],
    ["舟重","https://www.google.com/maps/place/https://www.google.com/maps/place/食処+舟重/@36.3505637,136.3080342,17z/data=!3m1!4b1!4m6!3m5!1s0x5ff8f897a71bffff:0xb4dac829b2446e39!8m2!3d36.3505594!4d136.3106091!16s%2Fg%2F11cmn7l_q4?entry=ttu&g_ep=EgoyMDI2MDMwNC4xIKXMDSoASAFQAw%3D%3D"],
    ["和ダイニング波生","https://www.google.com/maps/place/https://www.google.com/maps/place/和ダイニング波生/@36.3519306,136.3075524,17z/data=!3m1!4b1!4m6!3m5!1s0x5ff8f897faed9951:0x7436e3c726a07ee!8m2!3d36.3519263!4d136.3101273!16s%2Fg%2F1tgw9s0q?entry=ttu&g_ep=EgoyMDI2MDMwNC4xIKXMDSoASAFQAw%3D%3D"],
    ["大漁","https://www.google.com/maps/place/https://www.google.com/maps/place/大漁/@36.3523233,136.3114531,17z/data=!3m1!4b1!4m6!3m5!1s0x5ff8f8985170049f:0x78561081f7de4e45!8m2!3d36.352319!4d136.314028!16s%2Fg%2F1th86_0b?entry=ttu&g_ep=EgoyMDI2MDMwNC4xIKXMDSoASAFQAw%3D%3D"],
    ["御食事処やしま","https://www.google.com/maps/place/https://www.google.com/maps/place/海鮮料理+やしま/@36.3531513,136.3182911,17z/data=!4m14!1m7!3m6!1s0x5ff8f89e9b8e355f:0xccfebf657abce0d6!2z5rW36a6u5paZ55CGIOOChOOBl-OBvg!8m2!3d36.353147!4d136.320866!16s%2Fg%2F1tfvstls!3m5!1s0x5ff8f89e9b8e355f:0xccfebf657abce0d6!8m2!3d36.353147!4d136.320866!16s%2Fg%2F1tfvstls?entry=ttu&g_ep=EgoyMDI2MDMwNC4xIKXMDSoASAFQAw%3D%3D"],
    ["割烹・料理旅館司","https://www.google.com/maps/place/https://www.google.com/maps/place/割烹·料理旅館+司/@36.3516769,136.3165182,17z/data=!4m9!3m8!1s0x5ff8f897893cd9ed:0x6bf23bae35121dc5!5m2!4m1!1i2!8m2!3d36.3516726!4d136.3190931!16s%2Fg%2F1tn012hy?entry=ttu&g_ep=EgoyMDI2MDMwNC4xIKXMDSoASAFQAw%3D%3D"],
        ].map(([name,url]) => (
          <li key={name}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group flex items-center justify-between
                py-2 px-1
                opacity-90 hover:opacity-100
                transition
                border-b border-white/10 hover:border-white/40
              "
            >
              <span className="underline underline-offset-4 decoration-white/30 group-hover:decoration-white transition">
                {name}
              </span>

              <span className="text-xs opacity-0 group-hover:opacity-80 transition">
                ↗
              </span>
            </a>
          </li>
        ))}

      </ul>
    </div>

    {/* ================= スイーツ ================= */}
    <div>
      <h3 className="font-serif text-xl mb-5 tracking-wide">
        スイーツ
      </h3>

      <ul className="space-y-3">

        {[
          ["スイーツ屋ハレルヤ","https://www.google.com/maps/place/https://www.google.com/maps/place/https://www.google.com/maps/place/スイーツ屋ハレルヤ/@36.3527495,136.3015594,15z/data=!4m6!3m5!1s0x5ff8f89ea07f8e3d:0xf38f188ea0157ba4!8m2!3d36.3527495!4d136.3206138!16s%2Fg%2F12qfltrcb?entry=ttu&g_ep=EgoyMDI2MDMwNC4xIKXMDSoASAFQAw%3D"],
          ["加佐ノ岬倶楽部","https://www.google.com/maps/place/https://www.google.com/maps/place/https://www.google.com/maps/place/https://www.google.com/maps/place/加佐ノ岬倶楽部/@36.3495886,136.2978055,17z/data=!3m1!4b1!4m6!3m5!1s0x5ff8f8bfbb048689:0x328ac36eb1e9ea63!8m2!3d36.3495843!4d136.3003804!16s%2Fg%2F1tptqgsf?entry=ttu&g_ep=EgoyMDI2MDMwNC4xIKXMDSoASAFQAw%3D%"],
        ].map(([name,url]) => (
          <li key={name}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group flex items-center justify-between
                py-2 px-1
                opacity-90 hover:opacity-100
                transition
                border-b border-white/10 hover:border-white/40
              "
            >
              <span className="underline underline-offset-4 decoration-white/30 group-hover:decoration-white transition">
                {name}
              </span>

              <span className="text-xs opacity-0 group-hover:opacity-80 transition">
                ↗
              </span>
            </a>
          </li>
        ))}

      </ul>
    </div>

  </div>
</section>

      
    </main>
    
  );
}
