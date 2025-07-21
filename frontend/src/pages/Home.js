import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import axios from 'axios';
import './home.css'; // Import custom CSS

const Home = ({ user, setUser }) => {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchExpenses();
  }, [user, navigate]);

  const fetchExpenses = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/expenses', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setExpenses(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="page-wrapper">
      <div className="content-box">
        <div className="header">
          <h1 className="header-title">💸 Expense Tracker</h1>
          <div className="user-actions">
            <span className="user-info">{user?.email} ({user?.role})</span>
            {user?.role === 'admin' && (
              <button
                onClick={() => navigate('/admin')}
                className="btn btn-admin"
              >
                Admin Dashboard
              </button>
            )}
            <button
              onClick={handleLogout}
              className="btn btn-logout"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="mb-6">
          <ExpenseForm user={user} onExpenseAdded={fetchExpenses} />
        </div>

        <div>
          <ExpenseList expenses={expenses} user={user} onExpenseUpdated={fetchExpenses} />
        </div>
      </div>
    </div>
  );
};

export default Home;
