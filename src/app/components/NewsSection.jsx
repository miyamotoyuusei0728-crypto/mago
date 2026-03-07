import Link from "next/link";
import { newsItems } from "../../data/news";

export default function NewsSection() {
  const latestNews = newsItems.slice(0, 3);

  return (
    <section
      id="news"
      className="relative overflow-hidden bg-[#f5f1e8] py-24 md:py-32"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-[#efe7da]/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-10">
        <div className="mb-12 flex items-center gap-4 md:mb-16 md:gap-6">
          <p className="font-serif text-[26px] tracking-[0.12em] text-neutral-900 md:text-[38px]">
            News
          </p>
          <div className="h-px flex-1 bg-neutral-800/20" />
          <p className="text-[11px] tracking-[0.30em] text-neutral-700 md:text-[12px]">
            お知らせ
          </p>
        </div>

        <div className="mb-10 max-w-2xl md:mb-14">
          <p className="text-sm leading-[2.1] tracking-[0.08em] text-neutral-700 md:text-[15px]">
            MAGONDOでの出来事や季節のご案内、
            橋立での過ごし方を静かにお届けします。
          </p>
        </div>

        <div className="border-t border-neutral-800/20">
          {latestNews.map((item, index) => (
            <Link
              key={`${item.slug}-${index}`}
              href={`/news/${item.slug}`}
              className="group block border-b border-neutral-800/15 py-7 transition-all duration-300 hover:bg-white/20 md:py-8"
            >
              <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-[140px_110px_1fr_90px] md:gap-6">
                <p className="text-[12px] tracking-[0.18em] text-neutral-500">
                  {item.date}
                </p>

                <p className="text-[10px] tracking-[0.22em] text-[#8d744a] md:text-[11px]">
                  {item.category}
                </p>

                <div className="space-y-2">
                  <h3 className="font-serif text-[20px] leading-[1.6] tracking-[0.06em] text-neutral-900 md:text-[24px]">
                    {item.title}
                  </h3>
                  <p className="max-w-2xl text-[13px] leading-[2] tracking-[0.05em] text-neutral-700 md:text-[14px]">
                    {item.text}
                  </p>
                </div>

                <div className="hidden justify-end pt-1 md:flex">
                  <span className="border-b border-neutral-700/40 pb-1 text-[11px] tracking-[0.20em] text-neutral-700 transition-all duration-300 group-hover:tracking-[0.28em]">
                    VIEW
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-end md:mt-12">
          <Link
            href="/news"
            className="group inline-flex items-center gap-3 border-b border-neutral-800/40 pb-1 text-[11px] tracking-[0.22em] text-neutral-800 transition-all duration-300 hover:opacity-70 md:text-[12px] md:tracking-[0.28em]"
          >
            <span>すべてのお知らせを見る</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}