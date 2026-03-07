"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export default function NewsList({ items }) {
  const perPage = 5;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(items.length / perPage);

  const visibleItems = useMemo(() => {
    const start = (page - 1) * perPage;
    return items.slice(start, start + perPage);
  }, [page, items]);

  const startNumber = (page - 1) * perPage + 1;
  const endNumber = Math.min(page * perPage, items.length);

  return (
    <div className="space-y-10">
      <div className="border-t border-neutral-800/20">
        {visibleItems.map((item, index) => (
          <Link
            key={`${item.slug}-${index}`}
            href={`/news/${item.slug}`}
            className="group block border-b border-neutral-800/15 py-8 transition-all duration-300 hover:bg-white/20"
          >
            <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-[150px_110px_1fr_90px] md:gap-6">
              <p className="text-[12px] tracking-[0.18em] text-neutral-500">
                {item.date}
              </p>

              <p className="text-[10px] tracking-[0.22em] text-[#8d744a] md:text-[11px]">
                {item.category}
              </p>

              <div className="space-y-2">
                <h3 className="font-serif text-[21px] leading-[1.6] tracking-[0.06em] text-neutral-900 md:text-[28px]">
                  {item.title}
                </h3>
                <p className="max-w-2xl text-[13px] leading-[2] tracking-[0.05em] text-neutral-700 md:text-[14px]">
                  {item.text}
                </p>
              </div>

              <div className="hidden justify-end pt-1 md:flex">
                <span className="border-b border-neutral-700/40 pb-1 text-[11px] tracking-[0.20em] text-neutral-700">
                  VIEW
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <p className="text-[12px] tracking-[0.18em] text-neutral-500">
          {startNumber}–{endNumber} / {items.length}
        </p>

        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
            className="border-b border-neutral-800/30 pb-1 text-[12px] tracking-[0.22em] text-neutral-800 disabled:cursor-not-allowed disabled:opacity-30"
          >
            前へ
          </button>

          <p className="text-[12px] tracking-[0.18em] text-neutral-500">
            {page} / {totalPages}
          </p>

          <button
            type="button"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === totalPages}
            className="border-b border-neutral-800/30 pb-1 text-[12px] tracking-[0.22em] text-neutral-800 disabled:cursor-not-allowed disabled:opacity-30"
          >
            次へ
          </button>
        </div>
      </div>
    </div>
  );
}