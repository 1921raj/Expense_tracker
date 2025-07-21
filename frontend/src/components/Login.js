import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState('employee');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isRegister ? '/register' : '/login';
      const payload = isRegister ? { email, password, role } : { email, password };
      const { data } = await axios.post(`http://localhost:5000/api/auth${endpoint}`, payload);

      if (isRegister) {
        toast.success('Registration successful! Please login.', { autoClose: 3000 });
        setIsRegister(false); // Switch to login
      } else {
        toast.success(`Login successful! Welcome ${data.user.role}`, { autoClose: 2000 });
        localStorage.setItem('token', data.token);
        setUser(data.user);
        setTimeout(() => {
          navigate(data.user.role === 'admin' ? '/admin' : '/');
        }, 2000);
      }
    } catch (error) {
      toast.error('Authentication failed. Check your credentials.');
      console.error(error);
    }
  };

  return (
    <>
      <div className="modern-login-container">
        <div className="glass-card">
          <h2 className="login-title">{isRegister ? 'Register' : 'Login'}</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {isRegister && (
              <div className="form-group">
                <label>Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="employee">Employee</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            )}

            <button type="submit" className="login-button">
              {isRegister ? 'Register' : 'Login'}
            </button>
          </form>

          <p className="toggle-link" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
          </p>
        </div>
      </div>

      <ToastContainer position="top-center" />
    </>
  );
};

export default Login;
