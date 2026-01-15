import { useEffect, useState } from "react";
import "./Contacts.style.css";

interface IContact {
  id: number;
  fullName: string;
  position: string;
  image: string;
  bio: string;
}

export default function Contacts() {
  const [people, setPeople] = useState<IContact[]>([]);
  const API_BASE = import.meta.env.VITE_API_URL_BASE;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/contacts`)
      .then((res) => res.json())
      .then((data) => setPeople(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="contacts-page">
      <h1 className="h2-title">Контакты</h1>
      <div className="contacts-grid">
        {people.map((person) => (
          <article key={person.id} className="contact-card">
            <div className="inside-button">
              <figure className="photo-wrapper">
                <img
                  src={
                    person.image
                      ? `${API_BASE}${person.image}`
                      : "/placeholder-user.png"
                  }
                  alt={person.fullName}
                  className="contact-img"
                />
                <figcaption>{person.fullName}</figcaption>
              </figure>
              <div className="info-wrapper">
                <h3>{person.position}</h3>
                <p className="main-about-contacts">{person.bio}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
