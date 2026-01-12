import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { NewsItem } from "../../types/news.interface.ts";
import "./NewsDetails.css";

export default function NewsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<NewsItem | null>(null);

  useEffect(() => {
    // ПРОВЕРКА: Если id это не число, то выходим и не мучаем бэкенд
    if (!id || isNaN(Number(id))) {
      console.warn("Ждем нормальный ID, пока получили:", id);
      return;
    }

    fetch(`http://localhost:3000/api/news/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(data));
  }, [id]);

  if (!item) return <div className="loader">Загрузка новости...</div>;

  const API = "http://localhost:3000";

  return (
    <article className="direction-details">
      {" "}
      {/* Используем тот же класс для общего стиля */}
      <header className="details-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Назад
        </button>
        <h1>{item.title}</h1>
        {/* Пустой блок для идеальной центровки по сетке 100px 1fr 100px */}
        <div className="header-spacer" style={{ width: "100px" }}></div>
      </header>
      <div className="details-content">
        <p>{item.data}</p>
      </div>
      {item.imagePath && (
        <div className="main-news-image">
          <img src={`${API}${item.imagePath}`} alt={item.title} />
        </div>
      )}
      {item.videoPath && (
        <div className="news-video">
          <video controls src={`${API}${item.videoPath}`} />
        </div>
      )}
    </article>
  );
}
