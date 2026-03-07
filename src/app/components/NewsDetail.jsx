import Link from "next/link";

export default function NewsDetail({ item }) {
  return (
    <article className="relative overflow-hidden bg-[#f5f1e8] py-24 md:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-[#efe7da]/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 md:px-10">
        <div className="mb-10 flex flex-wrap items-center gap-4 text-[11px] tracking-[0.22em] text-neutral-500 md:mb-14">
          <span>{item.date}</span>
          <span className="text-[#8d744a]">{item.category}</span>
        </div>

        <h1 className="font-serif text-[30px] leading-[1.6] tracking-[0.08em] text-neutral-900 md:text-[44px]">
          {item.title}
        </h1>

        <p className="mt-6 text-[14px] leading-[2.1] tracking-[0.05em] text-neutral-700 md:text-[16px]">
          {item.text}
        </p>

        {item.image && (
          <div className="mt-12 overflow-hidden rounded-[24px]">
            <img
              src={item.image}
              alt={item.title}
              className="h-[280px] w-full object-cover md:h-[420px]"
            />
          </div>
        )}

        <div className="mt-12 space-y-6">
          {item.body.map((paragraph, index) => (
            <p
              key={index}
              className="text-[14px] leading-[2.2] tracking-[0.05em] text-neutral-800 md:text-[16px]"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-16 border-t border-neutral-800/15 pt-8">
          <p className="mb-5 text-[11px] tracking-[0.24em] text-neutral-500">
            LINKS
          </p>

          <div className="flex flex-col gap-4">
            {item.links?.map((link, index) => (
              <Link
                key={`${link.href}-${index}`}
                href={link.href}
                className="inline-flex w-fit items-center gap-2 border-b border-neutral-800/30 pb-1 text-[13px] tracking-[0.08em] text-neutral-800 transition-opacity hover:opacity-70"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-neutral-800/15 pt-8 md:flex-row md:items-center md:justify-between">
          <Link
            href="/news"
            className="inline-flex w-fit items-center gap-2 border-b border-neutral-800/30 pb-1 text-[12px] tracking-[0.22em] text-neutral-800"
          >
            ← 一覧へ戻る
          </Link>

          <Link
            href="/"
            className="inline-flex w-fit items-center gap-2 border-b border-neutral-800/30 pb-1 text-[12px] tracking-[0.22em] text-neutral-800"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    </article>
  );
}