import type { JSX } from "react";
import "./Construction.style.css";
import NewsFunc from "../../logics/news/News_func";
import type { NewsDB } from "../../types/news.interface";

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

export default function Construction(): JSX.Element {
  return (
    <div className="construction-wrapper">
      <h1 className="construction-title">Ремонт и строительство</h1>
      <NewsFunc news={db} />
    </div>
  );
}
