import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from '../components/AdminDashboard';
import AuditLogs from '../components/AuditLogs';
import ExpenseList from '../components/ExpenseList';
import axios from 'axios';
import './admin.css'; // Custom CSS

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
    <div className="min-h-screen">
      {/* Header */}
      <div className="header-container">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h1 className="header-title">Admin Control Center</h1>
          <div className="flex items-center space-x-4 action-buttons">
            <span className="font-semibold text-lg">{user.username}</span>
            <button onClick={() => navigate('/')} className="btn-green">
              Employee View
            </button>
            <button onClick={handleLogout} className="btn-red">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard & Expense Section */}
      <div className="grid">
        <div className="card">
          <h2 className="text-purple-300">Dashboard Insights</h2>
          <AdminDashboard />
        </div>
        <div className="card">
          <h2 className="text-green-300">Expense Management</h2>
          <button onClick={exportToCSV} className="btn-export">
            Export to CSV
          </button>
          <ExpenseList expenses={expenses} user={user} onExpenseUpdated={fetchExpenses} />
        </div>
      </div>

      {/* Audit Trail */}
      <div className="card mt-6">
        <h2 className="text-yellow-300">Audit Trail</h2>
        <AuditLogs />
      </div>
    </div>
  );
};

export default Admin;
