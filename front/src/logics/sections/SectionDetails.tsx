import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface SectionsItem {
  id: number;
  title: string;
  content: string;
  imagePath?: string;
  category: string;
}

// Сори за путаницу в названиях секции и направления ( просто в разные дни писал совсем забылся
export default function SectionsDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<SectionsItem | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/directions/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(data))
      .catch((err) => console.error("Ошибка загрузки:", err));
  }, [id]);

  if (!item) return <div className="loader">Загрузка...</div>;

  return (
    <article className="direction-details">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Назад
      </button>

      <header className="details-header">
        <h1>{item.title}</h1>
      </header>

      {item.imagePath && (
        <div className="details-image">
          <img src={`http://localhost:3000${item.imagePath}`} alt={item.title} />
        </div>
      )}

      {/* Выводим наш отформатированный HTML из базы */}
      <div 
        className="details-content"
        dangerouslySetInnerHTML={{ __html: item.content }} 
      />
    </article>
  );
}