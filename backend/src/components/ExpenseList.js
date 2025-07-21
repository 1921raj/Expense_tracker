import axios from 'axios';

const ExpenseList = ({ expenses, user, onExpenseUpdated }) => {
  const handleStatusChange = async (expenseId, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/expenses/${expenseId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      onExpenseUpdated();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Expenses</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            {user.role === 'admin' && <th className="p-2">User</th>}
            <th className="p-2">Amount</th>
            <th className="p-2">Category</th>
            <th className="p-2">Date</th>
            <th className="p-2">Notes</th>
            <th className="p-2">Status</th>
            {user.role === 'admin' && <th className="p-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id} className="border-b">
              <td className="p-2">{expense.id}</td>
              {user.role === 'admin' && <td className="p-2">{expense.email}</td>}
              <td className="p-2">${expense.amount}</td>
              <td className="p-2">{expense.category}</td>
              <td className="p-2">{expense.date}</td>
              <td className="p-2">{expense.notes}</td>
              <td className="p-2">{expense.status}</td>
              {user.role === 'admin' && (
                <td className="p-2">
                  <select
                    onChange={(e) => handleStatusChange(expense.id, e.target.value)}
                    value={expense.status}
                    className="p-1 border rounded"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;