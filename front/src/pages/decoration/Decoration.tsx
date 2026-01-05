import { useEffect, useState } from "react";
import Section_func from "../../logics/sections/Section_func";
import type { Sec_prop } from "../../types/sections.interface";
import "./Decoration.style.css";

export default function Decoration() {
    const [sections, setSections] = useState<Sec_prop[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/directions?category=decoration")
            .then(res => res.json())
            .then(data => setSections(data))
            .catch(err => console.error("Ошибка загрузки украшения:", err));
    }, []);

    return(
        <div className="decoration-wrapper">
            <h1 className="decoration-title">Украшение Храма</h1>
            {sections.length > 0 ? (
                <Section_func sections={sections}/>
            ) : (
                <p style={{textAlign: 'center'}}>Раздел наполняется...</p>
            )}
        </div>
    )
}