import { notFound } from "next/navigation";
import NewsDetail from "../../components/NewsDetail";
import { newsItems } from "../../../data/news";

export function generateStaticParams() {
  return newsItems.map((item) => ({
    slug: item.slug,
  }));
}

export default function NewsDetailPage({ params }) {
  const item = newsItems.find((news) => news.slug === params.slug);

  if (!item) {
    notFound();
  }

  return <NewsDetail item={item} />;
}