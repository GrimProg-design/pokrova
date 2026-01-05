import { useEffect, useState } from "react";
import type { JSX } from "react"; 
import NewsFunc from "../../logics/news/News_func.tsx";
import type { NewsItem } from "../../types/news.interface.ts";
import "./Cossacks.style.css";

export default function Cossacks(): JSX.Element {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/news?type=cossack&limit=6")
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки новостей казачества:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loader">Загрузка новостей казачества...</div>;

  return (
    <div className="cossacks-wrapper">
      <h1 className="cossacks-title">Новости казачества</h1>
      
      {/* 3. Если новости есть — выводим, если нет — пишем об этом */}
      {news.length > 0 ? (
        <NewsFunc news={news} />
      ) : (
        <p className="no-news">В данном разделе пока нет новостей.</p>
      )}
    </div>
  );
}