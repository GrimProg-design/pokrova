import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('adminToken', data.token);
      navigate('/admin');
    } else {
      alert('Ошибка доступа!');
    }
  };

  return (
    <div className="login-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
        <h2>Вход в панель</h2>
        <input type="text" placeholder="Логин" onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Пароль" onChange={e => setPassword(e.target.value)} />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}