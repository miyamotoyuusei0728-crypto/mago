import Link from "next/link";
import { newsItems } from "../../data/news";

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-[#f5f1e8] py-24">
      <div className="mx-auto max-w-6xl px-6">

        <h1 className="font-serif text-4xl mb-10">News</h1>

        <div className="border-t border-neutral-300">
          {newsItems.map((item, index) => (
            <Link
              key={index}
              href={`/news/${item.slug}`}
              className="block border-b border-neutral-300 py-6"
            >
              <p className="text-sm text-neutral-500">{item.date}</p>
              <h2 className="text-xl font-serif">{item.title}</h2>
              <p className="text-sm text-neutral-700">{item.text}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <Link href="/" className="underline">
            ホームに戻る
          </Link>
        </div>

      </div>
    </main>
  );
}