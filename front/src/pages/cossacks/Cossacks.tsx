import type { JSX } from "react";
import NewsFunc from "../../logics/news/News_func.tsx";
import type { NewsDB } from "../../types/news.interface.ts";
import "./Cossacks.style.css";

export default function Cossacks(): JSX.Element {
  const db: NewsDB = [
    {
      id: "1",
      title: "Hello",
      data: "Some data from db",
    },
    {
      id: "2",
      title: "Вторая новость",
      data: "Текст второй новости",
    },
    {
      id: "2",
      title: "третья новость",
      data: "Текст второй новости",
    },
    {
      id: "2",
      title: "четвертая новость",
      data: "Текст второй новости",
    },
    {
      id: "2",
      title: "Пятая новость",
      data: "Текст второй новости",
    },
    {
      id: "2",
      title: "Шестая новость",
      data: "Текст второй новости",
    },
  ];

  return (
    <div className="cossacks-wrapper">
      <h1 className="cossacks-title">Новости казачества</h1>
      <NewsFunc news={db} />
    </div>
  );
}
