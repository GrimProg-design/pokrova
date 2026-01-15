import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Adverts.css";

interface Advert {
  id: number;
  title: string;
  price: string;
  images: string[]; // Поменяли на массив
}

export default function Adverts() {
  const [ads, setAds] = useState<Advert[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    async function loadData() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/adverts?search=${encodeURIComponent(
            search
          )}&sort=${sort}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setAds(data);
      } catch (error) {
        if ((error as Error).name !== "AbortError") console.error(error);
      }
    }
    loadData();
    return () => controller.abort();
  }, [search, sort]);

  return (
    <div className="adverts-container">
      <header className="adverts-header">
        <h1>Объявления</h1>
        <div className="adverts-tools">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Поиск объявлений..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filter-wrapper">
            <select
              className="sort-select"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="all">🔥 Рекомендуем</option>
              <option value="new">🆕 Новинки</option>
              <option value="old">⏳ Старые</option>
            </select>
          </div>
        </div>
      </header>

      <div className="adverts-grid">
        {ads.map((ad) => (
          <div
            key={ad.id}
            className="ad-item"
            onClick={() => navigate(`/advert/${ad.id}`)}
          >
            <div className="ad-image-wrapper">
              {ad.images && ad.images.length > 0 ? (
                // Берем ПЕРВУЮ фотку для превью
                <img
                  src={`${import.meta.env.VITE_API_URL_BASE}${ad.images[0]}`}
                  alt={ad.title}
                />
              ) : (
                <div className="ad-placeholder">Нет фото</div>
              )}
              {ad.images?.length > 1 && <span className="photo-count"></span>}
            </div>
            <div className="ad-info">
              <span className="ad-item-price">{ad.price || "Договорная"}</span>
              <h3 className="ad-item-title">{ad.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
