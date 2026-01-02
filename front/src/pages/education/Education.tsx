import type { JSX } from "react";
import "./Education.style.css"
import Section_func from "../../logics/sections/Section_func";

const db = [
    {id: '1', title: 'Education'},
    {id: '2', title: 'Education2'},
    {id: '3', title: 'Education3'},
    {id: '4', title: 'Education4'},
]

export default function Education(): JSX.Element {
    return(
        <div className="education-wrapper">
            <h1 className="education-title">Образование</h1>
            <Section_func sections={db}/>
        </div>
    )
}