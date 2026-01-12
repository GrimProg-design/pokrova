import { useState } from "react";
import type { JSX } from "react";
import Buttons from "./SidebarButtons";
import './Sidebar.css'

interface SidebarLink {
  path: string;
  text: string;
}

interface SidebarConfig {
  directions: SidebarLink[];
  archive: SidebarLink[];
}

const navLinksSidebar: SidebarConfig = {
  directions: [
    { path: '/education', text: 'Образование' },
    { path: '/social-service', text: 'Социальное служение' },
    { path: '/cossacks', text: 'Казачество' },
    { path: '/construction', text: 'Ремонт и строительство' },
    { path: '/decoration', text: 'Украшение Храма' },
  ],
  archive: [
    { path: '/archive/main', text: 'Главные новости' },
    { path: '/archive/cossack', text: 'Новости казаков' },
    { path: '/archive/construction', text: 'Новости строительста' }
  ]
};

export default function Sidebar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Кнопка бургера для мобилок */}
      <button className={`menu-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h2 className="sidebar-main-title">Информация</h2>
        
        <section className="sidebar-section">
          <h3 className="sidebar-title">Направления</h3>
          <div className="sidebar-menu">
            {navLinksSidebar.directions.map((link) => (
              <Buttons key={link.path} path={link.path} value={link.text} isActive={false} />
            ))}
          </div>
        </section>

        <section className="sidebar-section">
          <h3 className="sidebar-title">Архив</h3>
          <div className="sidebar-menu">
            {navLinksSidebar.archive.map((link) => (
              <Buttons key={link.path} path={link.path} value={link.text} isActive={false} />
            ))}
          </div>
        </section>
      </aside>
      
      {/* Оверлей для закрытия кликом по пустому месту (только на мобилках) */}
      {isOpen && <div className="sidebar-overlay" onClick={toggleMenu}></div>}
    </>
  );
}