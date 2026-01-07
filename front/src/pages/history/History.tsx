import { useEffect, useState } from "react";
import type { JSX } from "react";
import "./History.css"

interface HistoryData {
  title: string;
  content: string;
}

export default function History(): JSX.Element {
  const [data, setData] = useState<HistoryData | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/history")
      .then((res) => res.json())
      .then((resData) => setData(resData))
      .catch((err) => console.error("Ошибка загрузки истории:", err));
  }, []);

  if (!data) return <div>Загрузка истории...</div>;

  return (
    <section aria-labelledby="history-title" className="history-section">
      <h2 className="h2-title">{data.title}</h2>
      <div 
        className="history-content"
        dangerouslySetInnerHTML={{ __html: data.content }} 
      />
    </section>
  );
}