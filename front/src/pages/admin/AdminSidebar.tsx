import { Link, useNavigate } from 'react-router-dom';
import "./Admin.css"

export default function AdminSidebar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  return (
    <div className="admin-sidebar">
      <h2>Админка</h2>
      <nav>
        <div className="nav-group">НОВОСТИ</div>
        <Link to="/admin/news">Все новости</Link>
        <Link to="/admin/news/create">Добавить новость</Link>
        
        <div className="nav-group">ХРАМ</div>
        <Link to="/admin/contacts">Контакты</Link>
        <Link to="/admin/schedule">Расписание</Link>
        
        <div className="nav-group">МАГАЗИН</div>
        <Link to="/admin/adverts">Объявления</Link>
      </nav>
      <button onClick={logout} className="logout-btn">Выйти</button>
    </div>
  );
}