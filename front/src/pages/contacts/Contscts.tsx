import type { JSX } from "react";
import "./Contacts.style.css"

interface con {
  id: string;
  name: string;
  desc: string;
}

const contacts: con[] = [
  {
    id: "1",
    name: "Ilia",
    desc: "progger",
  },
  {
    id: "1",
    name: "Ilia",
    desc: "progger",
  },
  {
    id: "1",
    name: "Ilia",
    desc: "progger",
  },
];

export default function Contacts(): JSX.Element {
  return (
    <div className="contacts-wrapper">
        <h1 className="contacts-title">Контакты</h1>
        {contacts.map(contact => (
            <article key={contact.id} className="contacts-item">
                <h2>{contact.name}</h2>
                <p>{contact.desc}</p>
            </article>
        ))}
    </div>
  );
}
