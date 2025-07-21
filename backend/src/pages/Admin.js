import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from '../components/AdminDashboard';
import AuditLogs from '../components/AuditLogs';
import ExpenseList from '../components/ExpenseList';
import axios from 'axios';

const Admin = ({ user, setUser }) => {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
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

  const exportToCSV = () => {
    if (expenses.length === 0) {
      alert('No expenses to export.');
      return;
    }
    const headers = ['ID', 'Amount', 'Category', 'Date', 'Notes', 'Status'];
    const csvContent = [
      headers.join(','),
      ...expenses.map(exp => [
        exp.id,
        exp.amount,
        exp.category,
        exp.date,
        exp.notes,
        exp.status
      ].join(','))
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expenses.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="bg-gradient-to-r from-purple-700 to-blue-700 text-white p-4 rounded-lg shadow-lg mb-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-4xl font-bold">Admin Control Center</h1>
          <div className="space-x-4">
            <button
              onClick={() => navigate('/')}
              className="bg-green-600 hover:bg-green-500 font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Employee View
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-500 font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">Dashboard Insights</h2>
          <AdminDashboard />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-green-300 mb-4">Expense Management</h2>
          <button
            onClick={exportToCSV}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 mb-4"
          >
            Export to CSV
          </button>
          <ExpenseList expenses={expenses} user={user} onExpenseUpdated={fetchExpenses} />
        </div>
      </div>

      <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-yellow-300 mb-4">Audit Trail</h2>
        <AuditLogs />
      </div>
    </div>
  );
};

export default Admin;