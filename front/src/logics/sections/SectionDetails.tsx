import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./SectionDetails.css";

interface SectionsItem {
  id: number;
  title: string;
  content: string;
  imagePath?: string;
  innerImage1?: string;
  innerImage2?: string;
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

  const API = "http://localhost:3000";

  return (
    <article className="direction-details">
      <header className="details-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Назад
        </button>
        <h1>{item.title}</h1>
      </header>

      <div
        className="details-content"
        dangerouslySetInnerHTML={{ __html: item.content }}
      />

      {(item.innerImage1 || item.innerImage2) && (
        <div className="inner-images-grid">
          {item.innerImage1 && (
            <div className="inner-img-wrapper">
              <img
                src={`${API}${item.innerImage1}`}
                alt="Дополнительное фото 1"
              />
            </div>
          )}
          {item.innerImage2 && (
            <div className="inner-img-wrapper">
              <img
                src={`${API}${item.innerImage2}`}
                alt="Дополнительное фото 2"
              />
            </div>
          )}
        </div>
      )}
    </article>
  );
}
