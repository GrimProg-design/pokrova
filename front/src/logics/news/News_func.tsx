import { Link } from "react-router-dom"; // Установи: npm install react-router-dom
import type { NewsItem } from "../../types/news.interface";
import "./News_func.style.css";

interface Props {
  news: NewsItem[];
}

export default function NewsFunc({ news }: Props) {
  const count = news.length;
  const wrapperClass = `news-wrapper news-count-${Math.min(count, 6)}`;

  return (
    <div className={wrapperClass}>
      {news.map((item) => (
        <Link to={`/news/${item.id}`} key={item.id} className="news-card">
          {/* Теперь тут класс .news-card */}
          <div className="news-card-image">
            {item.imagePath ? (
              <img
                src={`http://localhost:3000${item.imagePath}`}
                alt={item.title}
              />
            ) : (
              <div className="placeholder">Нет фото</div>
            )}
          </div>
          <div className="news-card-content">
            <h2>{item.title}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
}
