export default function ShopsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <header className="mb-12">
        <p className="font-serif text-sm tracking-[0.18em] text-neutral-500">
          -KAKUREGA Stay Guide-
        </p>
        <h1 className="mt-4 font-serif text-4xl md:text-5xl text-neutral-800">
          直売所・買い出しの楽しみ方
        </h1>
        <p className="mt-4 text-neutral-600 leading-relaxed">
          旅のはじまりは、町の直売所や市場から。
          その日に出会った旬を選び、宿のキッチンで仕上げる時間まで含めて、
          MAGOの「暮らす旅」です。
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-8">
        <article className="border border-neutral-200 bg-white/60 p-6">
          <h2 className="font-serif text-xl text-neutral-800">おすすめの流れ</h2>
          <ul className="mt-3 space-y-2 text-sm text-neutral-600 leading-relaxed">
            <li>・午前：直売所で旬を選ぶ</li>
            <li>・昼：宿で仕込み（軽く休憩）</li>
            <li>・夕方：散歩や温泉</li>
            <li>・夜：キッチンで一皿、ゆっくり味わう</li>
          </ul>
        </article>

        <article className="border border-neutral-200 bg-white/60 p-6">
          <h2 className="font-serif text-xl text-neutral-800">買うもののヒント</h2>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
            野菜・惣菜・地元の調味料・器など。
            少しだけでも「旅の手触り」が変わります。
          </p>
        </article>
      </section>

      <div className="mt-14">
        <a
          href="/"
          className="inline-flex items-center gap-2 border-b border-neutral-400 hover:border-neutral-800 transition"
        >
          ← トップへ戻る
        </a>
      </div>
    </main>
  );
}
