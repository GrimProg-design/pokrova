import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AdvertDetails.css";

interface AdvertDetailsData {
  id: number;
  title: string;
  price: string;
  content: string;
  images: string[]; // Массив картинок
  createdAt: string;
}

export default function AdvertDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ad, setAd] = useState<AdvertDetailsData | null>(null);

  useEffect(() => {
    if (!id) return;
    async function loadDetail() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/adverts/${id}`
        );
        if (!res.ok) throw new Error("Ошибка загрузки");
        const data = (await res.json()) as AdvertDetailsData;
        setAd(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    loadDetail();
  }, [id]);

  if (!ad) return <div className="loader">Загрузка объявления...</div>;

  const API_BASE = import.meta.env.VITE_API_URL_BASE;

  return (
    <div className="details-page">
      <div className="details-nav">
        <button className="back-link" onClick={() => navigate(-1)}>
          ← Назад
        </button>
      </div>

      <div className="details-wrapper">
        {/* ГАЛЕРЕЯ */}
        <div className="details-media">
          <div className="slider-container">
            {ad.images && ad.images.length > 0 ? (
              ad.images.map((img, index) => (
                <div key={index} className="slider-item">
                  <img
                    src={`${API_BASE}${img}`}
                    alt={`${ad.title} - ${index + 1}`}
                  />
                </div>
              ))
            ) : (
              <div className="ad-placeholder">Нет фото</div>
            )}
          </div>
          {ad.images?.length > 1 && (
            <div className="slider-hint">Листайте вправо →</div>
          )}
        </div>

        <div className="details-info">
          <div className="info-header">
            <h1>{ad.title}</h1>
            <span className="details-price">{ad.price || "Договорная"}</span>
          </div>

          <div className="details-description">
            <h3>Описание</h3>
            <p>{ad.content}</p>
          </div>

          <div className="details-meta">
            <span>
              Опубликовано: {new Date(ad.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
