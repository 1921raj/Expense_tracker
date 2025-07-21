import { useEffect, useState } from 'react';
import axios from 'axios';

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/audit-logs', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setLogs(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="p-4 table-auto border border-gray-600 text-sm text-white">
      <h2 className="text-2xl mb-4 text-white">Audit Logs</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-600 text-sm text-white">
          <thead>
            <tr className="bg-gray-800 text-gray-200">
              <th className="p-3 border border-gray-600">ID</th>
              <th className="p-3 border border-gray-600">User</th>
              <th className="p-3 border border-gray-600">Action</th>
              <th className="p-3 border border-gray-600">Details</th>
              <th className="p-3 border border-gray-600">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="bg-gray-900 hover:bg-gray-800">
                <td className="p-3 border border-gray-700">{log.id}</td>
                <td className="p-3 border border-gray-700">{log.email}</td>
                <td className="p-3 border border-gray-700">{log.action}</td>
                <td className="p-3 border border-gray-700">{log.details}</td>
                <td className="p-3 border border-gray-700">{new Date(log.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogs;
    