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
        backgroundColor: 'rgba(147, 197, 253, 0.5)',
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
    <div className="p-4 bg-gray-900 text-white rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">Admin Dashboard</h2>

      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <div className="flex-1 bg-gray-800 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl mb-2 text-blue-300 font-semibold">Expenses by Category</h3>
          <Bar data={barChartData} />
        </div>
        <div className="flex-1 bg-gray-800 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl mb-2 text-yellow-300 font-semibold">Expenses Over Time</h3>
          <Line data={lineChartData} />
        </div>
      </div>

      <div className="text-center mt-6">
       
      </div>
    </div>
  );
};

export default AdminDashboard;
