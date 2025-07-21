import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import Admin from './pages/Admin';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

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