import type { JSX } from "react";
import { Link } from "react-router-dom";
import "./Section_func.style.css";
import type { Sec_prop } from "../../types/sections.interface";

interface SectionProp {
  sections: Sec_prop[];
}

export default function Section_func({ sections }: SectionProp): JSX.Element {
  const API_URL = "http://localhost:3000";

  return (
    <div className="sections-wrapper">
      {sections.map((section) => {
        const backgroundImage = section.imagePath
          ? `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.7)), url(${API_URL}${section.imagePath})`
          : `linear-gradient(45deg, #ccc, #999)`;

        return (
          <Link
            to={`/directions/${section.id}`}
            key={section.id}
            className="section-item-link"
            style={{ backgroundImage }}
          >
            <article className="section-item">
              <h3 className="section-title">{section.title}</h3>
            </article>
          </Link>
        );
      })}
    </div>
  );
}
