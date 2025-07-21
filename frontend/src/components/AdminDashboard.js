import { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';
import './admin.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
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
    fetchExpenses();
  }, []);

  const categoryData = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + parseFloat(expense.amount);
    return acc;
  }, {});

  const monthlyData = expenses.reduce((acc, expense) => {
    const month = new Date(expense.date).toLocaleString('default', { month: 'short', year: 'numeric' });
    acc[month] = (acc[month] || 0) + parseFloat(expense.amount);
    return acc;
  }, {});

  const barChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: 'Total Expenses by Category',
        data: Object.values(categoryData),
        backgroundColor: 'rgba(61, 148, 247, 0.5)',
        borderColor: 'rgba(96, 165, 250, 1)',
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: 'Expenses Over Time',
        data: Object.values(monthlyData),
        fill: false,
        borderColor: 'rgba(253, 224, 71, 1)',
        backgroundColor: 'rgba(253, 224, 71, 0.5)',
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Admin Dashboard</h2>

      <div className="charts-section">
        <div className="chart-card">
          <h3 className="chart-title">Expenses by Category</h3>
          <Bar data={barChartData} />
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Expenses Over Time</h3>
          <Line data={lineChartData} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
