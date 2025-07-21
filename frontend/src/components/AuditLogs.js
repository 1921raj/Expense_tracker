import { useEffect, useState } from 'react';
import axios from 'axios';
import './andit.css';

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
    <div className="audit-container">
      <h2 className="audit-title">Audit Logs</h2>
      <div className="table-wrapper">
        <table className="audit-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Action</th>
              <th>Details</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td>{log.email}</td>
                <td>{log.action}</td>
                <td>{log.details}</td>
                <td>{new Date(log.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogs;
