import './Footer.css';

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        
        {/* Блок с лого и описанием */}
        <div className="footer-brand">
          <h3>Храм Покрова</h3>
          <p>Божьей Матери</p>
        </div>

        {/* Те самые мобильные контакты */}
        <div className="mobile-only-contacts">
          <div className="footer-divider"></div>
          <p className="contact-label">Наши контакты:</p>
          <div className="phones">
            <a href="tel:+996550882217">+996 550 88 22 17</a>
            <a href="tel:+996556054103">+996 556 05 41 03</a>
          </div>
          <p className="footer-address">г. Кант, ул. Центральная, 42</p>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Все права защищены</p>
          <p className="made-by">С любовью к приходу</p>
        </div>
      </div>
    </footer>
  );
}