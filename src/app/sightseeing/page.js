"use client";
import Mago3 from "@/app/components/Mago3";


const roomSlides = [
  { src: "/images/room311.jpg", title: "外観", },
  { src: "/images/room321.jpg", title: "リビング", },
  { src: "/images/room331.jpg", title: "キッチン", },
  { src: "/images/room341.jpg", title: "寝室",  },
];



export default function SightseePage() {
  const info = {
    nameJa: "まごんどう",
    nameJaname: "MAGOSAN",
    catch: "旅の拠点は泊まるだけでは終わらない",
    lead:
      "最大5名まで泊まれる、一棟貸しのコンドミニアム。泊まるだけでは終わらない、旅の中心になる場所です。仲間と、家族と、大切な人たちと。それぞれの過ごし方ができる、あなただけの隠れ家へ。",
    price: "1泊 ¥35,200〜（1棟あたり）",
    checkin: "15:00〜",
    checkout: "〜10:00",
    address: "石川県加賀市橋立町ラ１０１番地１",
    capacity: "1〜5名",
    layout: "2LDK",
    area: "190㎡",
    image: "/images/about_magondo3.jpg",
    rooms: [
      { label: "寝室", value: "1（シングル×2）" },
      { label: "浴室", value: "1" },
      { label: "バス・トイレ", value: "それぞれ独立" },
      { label: "キッチン", value: "完備" },
    ],
    notes: [
      "朝食・夕食は応相談（事前にご連絡ください）",
      "チェックイン・チェックアウトの際は管理棟MAGONDOにお立ち寄りください。",
    ],
    cafe: [
      { label: "MAGONDOカフェ", value: "11:00〜17:00（定休日：水・木）" },
      { label: "MAGONDO夜カフェ", value: "19:00〜23:00（要予約）" },
      { label: "コンドミニアム", value: "IN 15:00〜23:00 ／ OUT 〜翌10:00" },
    ],
    stay: [
      { label: "最短滞在", value: "1泊" },
      { label: "最長滞在", value: "30泊" },
      { label: "届出審査済み", value: "石川県指令南加保第３９３号" },
    ],
    extra: "2名以上の場合：1名追加ごとに +¥5,500/泊",
    cancel: [
      "チェックイン5日前まではキャンセル無料",
      "チェックイン4日前〜当日：合計料金の100%",
    ],
    houseRules: [
      { label: "ペット", value: "不可" },
      { label: "喫煙", value: "不可" },
      { label: "イベント・パーティ", value: "不可" },
    ],
    bookingUrl: "https://vacation-stay.jp/listings/666651?adults=2",
    telUrl: "tel:0000000000",
    mapUrl: "#",
  };

  const amenities = [
    "キッチン",
    "洗濯機",
    "ソープ、シャンプー、歯ブラシ",

    "冷蔵庫",
    "TV",
    "タオル、石鹸、トイレットペーパー、洗剤",

"調理器具",
    "Wi-Fiネット接続",
    "掃除用具",

"食器",
    "エアコン",
    "窓あり",

"電子レンジ",
"ヘアドライヤー",
"畳",
 "コンロ",
    
    
    
    
    
    
  ];

  // ミニマル版：箱なし
  const Stat = ({ label, value }) => (
    <div className="text-sm">
      <div className="text-[11px] tracking-[0.22em] text-neutral-500">{label}</div>
      <div className="mt-1 font-semibold text-neutral-900">{value}</div>
    </div>
  );

  const SectionTitle = ({ en, ja }) => (
    <div className="mb-4">
      <div className="text-[11px] tracking-[0.28em] text-neutral-500">{en}</div>
      <h2 className="mt-2 text-lg font-semibold text-neutral-900">{ja}</h2>
      <div className="mt-3 h-px w-full bg-neutral-200" />
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* 上の装飾ライン：不要なら消してOK */}
      <div className="h-px w-full bg-neutral-200" />

      <header className="sticky top-0 z-50 bg-neutral-50/85 backdrop-blur border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <span className="text-sm font-semibold text-neutral-900">宿について</span>
            <span className="hidden sm:inline text-[11px] tracking-[0.28em] text-neutral-500">
              MAGONDO
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={info.bookingUrl}
              className="hidden sm:inline-flex items-center border border-neutral-900 px-4 py-2 text-xs font-semibold hover:bg-neutral-900 hover:text-white transition"
            >
              ネット予約
            </a>
            <a
              href={info.telUrl}
              className="hidden sm:inline-flex items-center border border-neutral-300 px-4 py-2 text-xs font-semibold hover:bg-neutral-100 transition"
            >
              電話
            </a>
            <a href="/" className="text-sm underline text-neutral-700 hover:text-neutral-900">
              ← トップへ戻る
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
        {/* HERO */}
        <section className="mt-0 md:-mt-24 min-h-[70svh] w-full flex items-center pb-10">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid grid-cols-12 items-center gap-8 mt-0">
              {/* 左：テキスト */}
              <div className="col-span-12 md:col-span-5 ">
                <span className="text-[11px] tracking-[0.35em] text-neutral-600">
                  HIDEAWAY STAY
                </span>

                {/* 縦書き（位置は “余白” で調整。変な -mt や ml-46 は削除） */}
                <h1
                  className="font-serif mt-6 md:text-5xl text-3xl font-semibold text-neutral-900 leading-tight"
                  style={{ writingMode: "vertical-rl" }}
                >
                  {info.nameJa}
                </h1>
                 <div
                  className="md:hidden block 
                  
                    w-[calc(100vw-((100vw-100px)/3))]
                   ml-auto
                    max-w-none
                    aspect-[19/10] 
                    overflow-hidden
                   -mt-38
                    z-10
                  "
                >
                  <img
                    src={info.image}
                    alt="蔵の宿 MAGONDO"
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <h2 className="z-2 font-serif mt-7 md:mt-10 text-2xl sm:text-4xl font-semibold text-neutral-900">
                  {info.nameJaname}
                </h2>
                
               
                <p className="font-serif md:mt-5 mt-0 md:text-lg text-lg text-neutral-700">
                  {info.catch}
                </p>
                

                <p className="md:mt-4 mt-3 max-w-md text-ms text-neutral-600 leading-relaxed">
                  {info.lead}
                </p>
            

                <div className="hidden md:block mt-8 flex flex-wrap gap-3">
                  <a
                    href={info.bookingUrl}
                    className="border border-neutral-300 px-6 py-3 text-sm tracking-widest text-neutral-900 hover:bg-neutral-100 transition"
                  >
                    予約する
                  </a>
                </div>
                {/* 固定CTA：予約する（スクロールしても常に表示） */}
<div className="fixed inset-x-0 bottom-0 z-50 p-3 sm:hidden">
  <a
    href={info.bookingUrl}
    className="block w-full rounded-xl border border-neutral-300 bg-white/90 backdrop-blur px-6 py-4 text-center text-sm tracking-widest text-neutral-900 shadow-lg hover:bg-neutral-100 transition"
  >
    予約する
  </a>
</div>

                {/* 主要スペック（箱なし） */}
                <div className="md:mt-10 mt-5 grid gap-8 border-t border-neutral-200 pt-6 grid-cols-3">
                  <Stat label="定員" value={info.capacity} />
                  <Stat label="広さ" value={info.area} />
                 <Stat label="間取り" value={info.layout} />
                  
                 
                </div>
                <div className=" md:hidden block  border-t border-neutral-200 md:mt-5 mt-5"></div>
              </div>

              {/* 右：画像 */}
              <div className="col-span-12 md:col-span-7">
                <div
                  className="hidden md:block 
                    w-screen -mx-4
                    md:mx-0 md:w-[calc(100vw-((100vw-100px)/2))]
                    md:ml-auto
                    max-w-none
                    aspect-[19/6] md:aspect-[19/21]
                    overflow-hidden
                  "
                >
                  <img
                    src={info.image}
                    alt="蔵の宿 MAGONDO"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
          
        </section>
 <div className=" hidden md:block  border-t border-neutral-200 "></div>
       
       
        {/* スライダー横：テキスト */}
         <section className="hidden md:block -mt-10 md:mt-12 ">
 <div className="mx-auto w-full max-w-6xl px-6 ">
  <div className="flex flex-col md:flex-row items-center gap-3">
    <div className="md:w-2/3 w-full ">
      <Mago3 slides={roomSlides} peek={48} />
    </div>

    <div className="md:w-1/3 w-full text-center ml-5">
      <h2 className="font-serif text-4xl font-semibold mb-3 text-center">{info.nameJaname}</h2>
      <p className="font-serif text-neutral-600 leading-relaxed text-center tracking-[-0.04em] ">
        広々とした空間と、みんなで使えるキッチン。

      </p>
      <p className="font-serif tracking-[-0.04em] text-neutral-600 leading-relaxed text-center">
        朝はゆっくり準備して、夜は語らいの時間を。
      </p>
    </div>
  </div>
</div>

          
        </section>
         {/* スライダー横：テキスト */}
         <section className="md:hidden block -mt-10 md:mt-12 ">

  
  <div className="">
    <div className="">
      <h2 className="font-serif text-4xl font-semibold mb-3 text-center">{info.nameJaname}</h2>
      <div className="md:w-2/3 w-full ">
      <Mago3 slides={roomSlides} peek={48} />
    </div>
      <p className="mt-3 font-serif text-neutral-600 leading-relaxed text-center tracking-[-0.04em] ">
        畳の香りに包まれた静かな一棟貸し空間。
      </p>
      <p className="font-serif tracking-[-0.04em] text-neutral-600 leading-relaxed text-center">
        季節の光と風を感じながらお過ごしください。
      </p>
    </div>
   
  </div>


          
        </section>

        {/* DETAILS */}
        <section className="mt-10">
          <SectionTitle en="DETAILS" ja="お部屋の情報" />

          <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 border-t border-neutral-200 pt-6">
            <Stat label="施設タイプ" value="和風の一棟貸しコンドミニアム" />
             <Stat label="チェックイン" value={info.checkin} />
                  <Stat label="チェックアウト" value={info.checkout} />
            
            {info.rooms.map((r) => (
              <Stat key={r.label} label={r.label} value={r.value} />
            ))}
            <Stat label="料金" value={info.price} />
            <Stat label="住所" value={info.address} />
          </div>

          <div className="mt-6 border-t border-neutral-200 pt-6">
            <div className="text-sm font-semibold text-neutral-900">補足</div>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700">
              {info.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* CAFE */}
        <section className="mt-10">
          <SectionTitle en="CAFE" ja="カフェ情報" />

          <div className="border-t border-neutral-200 pt-6 space-y-4">
            {info.cafe.map((c) => (
              <div
                key={c.label}
                className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1"
              >
                <div className="text-sm font-semibold text-neutral-900">{c.label}</div>
                <div className="text-sm text-neutral-700">{c.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* AMENITIES */}
        <section className="mt-10">
          <SectionTitle en="AMENITIES" ja="設備・アメニティ" />

          <div className="border-t border-neutral-200 pt-6">
            <div className="grid gap-x-8 gap-y-2 grid-cols-1 md:grid-cols-3">
              {amenities.map((a) => (
                <div key={a} className="text-sm text-neutral-700">
                  {a}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* POLICY */}
        <section className="mt-10">
          <SectionTitle en="POLICY" ja="滞在・料金・ルール" />

          <div className="grid gap-10 lg:grid-cols-12 border-t border-neutral-200 pt-6">
            {/* 左：滞在 */}
            <div className="lg:col-span-5">
              <div className="text-sm font-semibold text-neutral-900">滞在情報</div>

              <div className="mt-4 space-y-3">
                {info.stay.map((s) => (
                  <div
                    key={s.label}
                    className="flex justify-between gap-6 text-sm border-b border-neutral-200 pb-3"
                  >
                    <span className="text-neutral-600">{s.label}</span>
                    <span className="font-semibold text-neutral-900">{s.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-neutral-200 pt-4">
                <div className="text-[11px] tracking-[0.28em] text-neutral-500">EXTRA GUEST</div>
                <div className="mt-2 text-sm font-semibold text-neutral-900">{info.extra}</div>
              </div>
            </div>

            {/* 右：各種 */}
            <div className="lg:col-span-7 space-y-10">
              <div>
                <div className="text-sm font-semibold text-neutral-900">キャンセルポリシー</div>
                <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                  {info.cancel.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-sm font-semibold text-neutral-900">ハウスルール</div>
                <div className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-3">
                  {info.houseRules.map((r) => (
                    <div key={r.label} className="text-sm">
                      <div className="text-[11px] tracking-[0.22em] text-neutral-500">{r.label}</div>
                      <div className="mt-1 font-semibold text-neutral-900">{r.value}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-xs text-neutral-500">
                  静かな滞在のため、近隣へのご配慮をお願いします。
                </div>
              </div>

             
            </div>
          </div>
        </section>

        {/* FOOT CTA（箱なし） */}
        <section className="mt-12 border-t border-neutral-200 pt-8">
          <div className="text-[11px] tracking-[0.28em] text-neutral-500">YOUR PRIVATE HIDEAWAY</div>
          <h3 className="mt-2 text-xl sm:text-2xl font-semibold text-neutral-900">
            あなただけの隠れ家へ。
          </h3>
          <p className="mt-3 text-sm sm:text-base text-neutral-700 leading-relaxed">
            朝の支度も、夜のくつろぎも、ここから始まります。旅の時間をつなぐ、やさしい場所。
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href={info.bookingUrl}
              className="border border-neutral-900 px-6 py-3 text-sm font-semibold hover:bg-neutral-900 hover:text-white transition text-center"
            >
              予約する
            </a>
            <a
              href={info.mapUrl}
              className="border border-neutral-300 px-6 py-3 text-sm font-semibold hover:bg-neutral-100 transition text-center"
            >
              地図を見る
            </a>
          </div>
        </section>

        <footer className="mt-10 pb-10 text-xs text-neutral-500">
          <div className="h-px w-full bg-neutral-200" />
          <div className="mt-4">
            表記の内容は予告なく変更になる場合があります。最新情報は予約ページまたはお電話でご確認ください。
          </div>
        </footer>
      </main>
    </div>
  );
}
