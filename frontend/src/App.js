import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import Admin from './pages/Admin';
// import { useState } from 'react';
import { useEffect, useState } from 'react';
// function App() {
//   const [user, setUser] = useState(null);

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const { data } = await axios.get('http://localhost:5000/api/auth/profile', {
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
}

export default App;