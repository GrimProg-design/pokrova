import './Header.css';
import pigeonRight from "../assets/pigeon-right.png";
import hram from "../assets/hram.png";
import pigeonleft from "../assets/pigeon-left.png";
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="main-header">
      <div className="header-content">
        
        <div className="header-contacts">
          <div className="phones">
            <a href="tel:+996550882217">+996 550 88 22 17</a>
            <a href="tel:+996556054103">+996 556 05 41 03</a>
          </div>
          <p className="header-address">г. Кант, ул. Центральная, 42</p>
        </div>

        <div className="header-logo-section">
          <img src={pigeonRight} alt="" className="pigeon p-right" />
          <img src={hram} alt="Храм" className="hram-img" />
          <h1 className="header-title">
            ХРАМ ПОКРОВА <br />
            <span className="subtitle">БОЖЬЕЙ МАТЕРИ</span>
          </h1>
          <img src={pigeonleft} alt="" className="pigeon p-left" />
        </div>

        <div className="support-container">
          <Link to="/support" className="btn-donate">
            Пожертвовать
          </Link>
        </div>

      </div>
    </header>
  );
}