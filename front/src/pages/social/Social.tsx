import { useEffect, useState } from "react";
import Section_func from "../../logics/sections/Section_func";
import type { Sec_prop } from "../../types/sections.interface";
import "./Social.style.css"; 

export default function Social() {
    const [sections, setSections] = useState<Sec_prop[]>([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/directions?category=social`)
            .then(res => res.json())
            .then(data => setSections(data))
            .catch(err => console.error("Ошибка загрузки социалки:", err));
    }, []);

    return(
        <div className="social-wrapper">
            <h1 className="social-title">Социальное служение</h1>
            {sections.length > 0 ? (
                <Section_func sections={sections}/>
            ) : (
                <p style={{textAlign: 'center'}}>Данные загружаются или раздел пуст...</p>
            )}
        </div>
    )
}