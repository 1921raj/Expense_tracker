import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import axios from 'axios';

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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-5xl bg-gray-800 p-6 rounded-2xl shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-4xl font-bold mb-4 md:mb-0">💸 Expense Tracker</h1>
          <div className="text-sm md:text-base text-gray-300 flex items-center gap-4">
            <span className="bg-gray-700 px-3 py-1 rounded">{user?.email} ({user?.role})</span>
            {user?.role === 'admin' && (
              <button
                onClick={() => navigate('/admin')}
                className="bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded shadow text-white"
              >
                Admin Dashboard
              </button>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded shadow text-white"
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
