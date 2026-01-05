import type { JSX } from "react";
import { Link } from "react-router-dom"; // Импортируем Link
import "./Section_func.style.css";
import type { Sec_prop } from "../../types/sections.interface";

interface SectionProp {
    sections: Sec_prop[]
}

export default function Section_func({sections}: SectionProp): JSX.Element{
    const count = sections.length;
    const wrapperClass = `sections-wrapper sections-count-${Math.min(count, 4)}`;

    return(
        <div className={wrapperClass}>
            {sections.map(section => (
                <Link to={`/directions/${section.id}`} key={section.id} className="section-item-link">
                    <article className="section-item">
                        <h3>{section.title}</h3>
                    </article>
                </Link>
            ))}
        </div>
    )
}