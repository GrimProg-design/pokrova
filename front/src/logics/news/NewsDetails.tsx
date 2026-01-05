import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { NewsItem } from "../../types/news.interface.ts";

export default function NewsDetails() {
  const { id } = useParams();
  const [item, setItem] = useState<NewsItem | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/news/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(data));
  }, [id]);

  if (!item) return <div>Загрузка новости...</div>;

  return (
    <div className="news-detail-page">
      <h1>{item.title}</h1>
      {item.imagePath && <img src={`http://твой-nginx.com${item.imagePath}`} />}
      
      <div className="full-content">
        <p>{item.data}</p>
      </div>
      
      {item.videoPath && (
        <video controls src={`http://твой-nginx.com${item.videoPath}`} />
      )}
    </div>
  );
}