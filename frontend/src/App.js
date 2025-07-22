import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import Admin from './pages/Admin';
import { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure this is imported

const App = () => {
  const [user, setUser] = useState(null);

  // ✅ Use environment variable or direct URL
  const API_BASE = process.env.REACT_APP_API_URL || 'https://expensetracker-production-6f05.up.railway.app';

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const { data } = await axios.get(`${API_BASE}/api/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(data.user);
        } catch (err) {
          console.error('Token invalid or expired', err);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
    };

    checkUser();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route path="/admin" element={<Admin user={user} setUser={setUser} />} />
      </Routes>
    </Router>
  );
};

export default App;
