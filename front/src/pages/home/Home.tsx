import { useEffect, useState } from "react";
import type { JSX } from "react"; 
import "./Home.css";
import NewsFunc from "../../logics/news/News_func.tsx";
import type { NewsItem } from "../../types/news.interface.ts";

export default function Home(): JSX.Element {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/news?type=main&limit=6`)
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch((err) => console.error("Ошибка загрузки:", err));
  }, []);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="home-wrapper">
      <h1 className="title">Новости прихода</h1>
      <NewsFunc news={news} />
    </div>
  );
}
