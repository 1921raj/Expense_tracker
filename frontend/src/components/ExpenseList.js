import { useEffect, useState } from 'react';
import axios from 'axios';
import './expense.css'; // Import custom CSS

const ExpenseList = () => {
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

  const handleStatusChange = async (id, newStatus) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/expenses/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setExpenses((prev) =>
        prev.map((exp) => (exp.id === id ? { ...exp, status: newStatus } : exp))
      );
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  return (
    <div className="expense-container">
      <h2 className="expense-title">Expense List</h2>
      <div className="expense-table-container">
        <table className="expense-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Notes</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.id}</td>
                <td>{expense.email}</td>
                <td>${expense.amount}</td>
                <td>{expense.category}</td>
                <td>{expense.date}</td>
                <td>{expense.notes}</td>
                <td>
                  <span className={`status-badge status-${expense.status}`}>
                    {expense.status}
                  </span>
                </td>
                <td>
                  <select
                    className="expense-select"
                    value={expense.status}
                    onChange={(e) => handleStatusChange(expense.id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;
