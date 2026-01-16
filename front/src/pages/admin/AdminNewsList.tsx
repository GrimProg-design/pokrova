import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminNewsList() {
  const [news, setNews] = useState<any[]>([]);

  const loadNews = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/news?limit=100`);
    const data = await res.json();
    setNews(data);
  };

  useEffect(() => { loadNews(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить эту новость?')) return;
    
    await fetch(`${import.meta.env.VITE_API_URL}/news/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': localStorage.getItem('adminToken') || '' }
    });
    loadNews(); // Обновляем список
  };

  return (
    <div className="admin-news-list">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1>Новости</h1>
        <Link to="/admin/news/create" className="add-btn">+ Создать</Link>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Заголовок</th>
            <th>Категория</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {news.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.type}</td>
              <td>
                {/* Ссылка на редактирование (тут будет твоя форма, но с предзаполненными данными) */}
                <Link to={`/admin/news/edit/${item.id}`}>✏️</Link>
                <button onClick={() => handleDelete(item.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}