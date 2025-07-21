import { useState } from 'react';
import axios from 'axios';
import './form.css'; // Import the custom CSS

const ExpenseForm = ({ user, onExpenseAdded }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/expenses',
        { amount, category, date, notes },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      onExpenseAdded();
      setAmount('');
      setCategory('');
      setDate('');
      setNotes('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="expense-form-container">
      <h2 className="expense-form-title">Add Expense</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes"
        />
        <button type="submit" className="expense-submit-btn">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
