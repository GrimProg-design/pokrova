import { useEffect, useState } from "react";
import "./Adverts.css";

interface Advert {
  id: number;
  title: string;
  content: string;
  price: string;
  createdAt: string;
}

export default function Adverts() {
  const [ads, setAds] = useState<Advert[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadData() {
      try {
        const res = await fetch(
          `http://localhost:3000/api/adverts?search=${encodeURIComponent(search)}&sort=${sort}`,
          { signal: controller.signal }
        );
        
        if (!res.ok) {
          throw new Error(`Ошибка сервера: ${res.status}`);
        }
        
        const data = (await res.json()) as Advert[];
        setAds(data);
      } catch (error: unknown) {
        // Проверяем, что ошибка — это не отмена запроса
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error("Ошибка загрузки:", error.message);
        }
      }
    }

    loadData();

    return () => controller.abort();
  }, [search, sort]);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="adverts-page">
      <h1>Объявления</h1>

      <div className="adverts-tools">
        <input 
          type="text" 
          placeholder="Поиск..." 
          onChange={(e) => setSearch(e.target.value)} 
        />
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="all">Все</option>
          <option value="new">Сначала новые</option>
          <option value="old">Сначала старые</option>
        </select>
      </div>

      <div className="adverts-list">
        {ads.length > 0 ? (
          ads.map((ad) => (
            <div 
              key={ad.id} 
              className={`ad-card ${expandedId === ad.id ? "expanded" : ""}`}
              onClick={() => toggleExpand(ad.id)}
            >
              <div className="ad-header">
                <h3>{ad.title}</h3>
                <span className="ad-price">{ad.price || "Бесплатно"}</span>
              </div>
              
              {expandedId === ad.id && (
                <div className="ad-content">
                  <p>{ad.content}</p>
                  <small>Опубликовано: {new Date(ad.createdAt).toLocaleDateString()}</small>
                </div>
              )}
              <div className="expand-hint">
                 {expandedId === ad.id ? "Свернуть ▲" : "Подробнее ▼"}
              </div>
            </div>
          ))
        ) : (
          <p className="no-data">Объявлений не найдено</p>
        )}
      </div>
    </div>
  );
}