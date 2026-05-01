import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

interface INewsItem {
  id: number;
  title: string;
  type: string;
  createdAt: string;
}

export default function AdminNewsList() {
  const [news, setNews] = useState<INewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadNews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/news?limit=100`);
      if (!res.ok) throw new Error("Ошибка загрузки");
      const data = await res.json();

      const newsArray = Array.isArray(data) ? data : data.items;
      setNews(newsArray || []);
    } catch (error) {
      console.error("Failed to load news:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить эту новость?")) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/news/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("adminToken") || "",
        },
      });

      if (res.ok) {
        loadNews();
      } else {
        alert("Ошибка при удалении");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (loading && news.length === 0) return <div>Загрузка списка...</div>;

  return (
    <div className="admin-news-list">
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1>Управление новостями</h1>
        <Link
          to="/admin/news/create"
          className="add-btn"
          style={{
            padding: "10px 20px",
            backgroundColor: "#2ecc71",
            color: "white",
            textDecoration: "none",
            borderRadius: "5px",
          }}
        >
          + Создать новость
        </Link>
      </header>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "white",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead style={{ background: "#04304f", color: "white" }}>
          <tr>
            <th style={{ padding: "15px", textAlign: "left" }}>ID</th>
            <th style={{ padding: "15px", textAlign: "left" }}>Заголовок</th>
            <th style={{ padding: "15px", textAlign: "left" }}>Категория</th>
            <th style={{ padding: "15px", textAlign: "center" }}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {news.map((item) => (
            <tr key={item.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "15px" }}>{item.id}</td>
              <td style={{ padding: "15px" }}>{item.title}</td>
              <td style={{ padding: "15px" }}>{item.type}</td>
              <td style={{ padding: "15px", textAlign: "center" }}>
                <Link
                  to={`/admin/news/edit/${item.id}`}
                  style={{
                    marginRight: "15px",
                    textDecoration: "none",
                    fontSize: "18px",
                  }}
                >
                  ✏️
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {news.length === 0 && (
        <p style={{ textAlign: "center", padding: "20px" }}>
          Новостей пока нет.
        </p>
      )}
    </div>
  );
}
