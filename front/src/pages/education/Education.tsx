import { useEffect, useState } from "react";
import Section_func from "../../logics/sections/Section_func";
import type { Sec_prop } from "../../types/sections.interface";
import "./Education.style.css"

export default function Education() {
    const [sections, setSections] = useState<Sec_prop[]>([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/directions?category=education`)
            .then(res => res.json())
            .then(data => setSections(data));
    }, []);

    return(
        <div className="education-wrapper">
            <h1 className="education-title">Образование</h1>
            <Section_func sections={sections}/>
        </div>
    )
}