import { useEffect, useState } from "react";
import type { JSX } from "react"; 
import "./Construction.style.css";
import NewsFunc from "../../logics/news/News_func";
import type { NewsItem } from "../../types/news.interface";

export default function Construction(): JSX.Element {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/news?type=construction&limit=6`)
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки новостей строительства:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loader">Загрузка данных по строительству...</div>;

  return (
    <div className="construction-wrapper">
      <h1 className="construction-title">Ремонт и строительство</h1>
      
      {news.length > 0 ? (
        <NewsFunc news={news} />
      ) : (
        <p className="no-news">Пока новостей о строительстве нет.</p>
      )}
    </div>
  );
}