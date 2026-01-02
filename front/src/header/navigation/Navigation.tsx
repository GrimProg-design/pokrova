import { useLocation } from "react-router-dom";
import Buttons from "./Buttons";
import { useState, useRef, useEffect } from "react";
import type { JSX } from "react";
import "./Navigation.css";

const navLinks = [
  { path: "/", value: "Главная" },
  { path: "/history", value: "История прихода" },
  { path: "/schedule", value: "Расписание" },
  { path: "/advert", value: "Объявление" },
  { path: "/contacts", value: "Контакты" }
];

export default function Navigation(): JSX.Element {
  const location = useLocation();
  const [lineStyle, setLineStyle] = useState({ left: 0, width: 0 });
  
  const elementsRef = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  useEffect(() => {
    const activeElement = elementsRef.current[location.pathname];
    
    if (activeElement) {
      setLineStyle({
        left: activeElement.offsetLeft,
        width: activeElement.offsetWidth
      });
    }
  }, [location.pathname]);

  return (
    <nav className="nav-container">
      <div className="nav-wrapper">
        <div className="nav-menu">
          {navLinks.map((link) => (
            <Buttons
              key={link.path}
              ref={(el) => { elementsRef.current[link.path] = el; }}
              path={link.path}
              value={link.value}
            />
          ))}
          <div 
            className="navigator-line" 
            style={{ 
              transform: `translateX(${lineStyle.left}px)`, 
              width: `${lineStyle.width}px` 
            }} 
          />
        </div>
      </div>
    </nav>
  );
}