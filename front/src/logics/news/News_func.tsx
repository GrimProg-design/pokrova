import type { NewsItem } from "../../types/news.interface";
import "./News_func.style.css";

interface Props {
  news: NewsItem[];
}

// универсальная функция для отображения новостей и подсчета их количества для дальнейшего применения стилей
export default function NewsFunc({ news }: Props) {
  const count = news.length;
  const wrapperClass = `news-wrapper news-count-${Math.min(count, 6)}`;

  return (
    <div className={wrapperClass}>
      {news.map((item) => (
        <article key={item.id} className="news-item">
          <h2>{item.title}</h2>

          {/* Если есть путь к картинке — рисуем её */}
          {item.imagePath && (
            <img
              src={`http://твой-nginx.com${item.imagePath}`}
              alt={item.title}
            />
          )}

          {/* Если есть видео — рисуем плеер */}
          {item.videoPath && (
            <video controls src={`http://твой-nginx.com${item.videoPath}`} />
          )}

          <p>{item.data}</p>
        </article>
      ))}
    </div>
  );
}
