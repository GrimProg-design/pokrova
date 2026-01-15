import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewsFunc from "../../logics/news/News_func";
import type { NewsItem } from "../../types/news.interface";
import "./Archive.css";

interface ArchiveResponse {
  items: NewsItem[];
  totalPages: number;
  currentPage: number;
}

export default function Archive() {
  const { type } = useParams<{ type: string }>();
  const [data, setData] = useState<ArchiveResponse | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const titles: Record<string, string> = {
    main: "Главные новости",
    cossack: "Казачество",
    construction: "Социальное служение",
  };

  // Сброс страницы при смене категории (без useEffect, чтобы не было каскада)
  const [prevType, setPrevType] = useState(type);
  if (type !== prevType) {
    setPrevType(type);
    setPage(1);
    setData(null); // Обнуляем данные, чтобы показать лоадер
  }

  useEffect(() => {
    let isMounted = true;

    const fetchArchive = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/news/archive?type=${type}&page=${page}&limit=4`
        );
        const resData = await response.json();

        if (isMounted) {
          setData(resData);
          setLoading(false);
        }
      } catch (err) {
        console.error("Ошибка загрузки архива:", err);
        if (isMounted) setLoading(false);
      }
    };

    fetchArchive();
    return () => { isMounted = false; };
  }, [type, page]);

  if (loading && !data) return <div className="loader">Загрузка...</div>;

  return (
    <div className="archive-page">
      <header className="details-header">
        <h1 style={{ gridColumn: "2" }}>{titles[type || "main"]}</h1>
        <div style={{ width: "100px" }}></div>
      </header>

      <div className="archive-list">
        {data?.items && data.items.length > 0 ? (
          // ПЕРЕДАЕМ ФЛАГ АРХИВА ТУТ
          <NewsFunc news={data.items} isArchive={true} />
        ) : (
          <p style={{ textAlign: "center" }}>Новостей в этом разделе пока нет</p>
        )}
      </div>

      {data && data.totalPages > 1 && (
        <div className="pagination">
          <button 
            disabled={page === 1} 
            onClick={() => {
                setPage((p) => p - 1);
                window.scrollTo(0, 0);
            }}
          > ← Назад </button>

          <span className="page-info">
            Страница {page} из {data.totalPages}
          </span>

          <button 
            disabled={page === data.totalPages} 
            onClick={() => {
                setPage((p) => p + 1);
                window.scrollTo(0, 0);
            }}
          > Вперед → </button>
        </div>
      )}
    </div>
  );
}