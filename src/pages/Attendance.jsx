import React, { useMemo } from 'react';
import { RAW_ATTENDANCE, EMPLOYEES, SHIFTS } from '../data/mockData';

const Attendance = () => {

  const processedData = useMemo(() => {
    const grouped = {};
    
    // Group by Emp and Date
    RAW_ATTENDANCE.forEach(log => {
      const key = `${log.empId}-${log.date}`;
      if(!grouped[key]) grouped[key] = { logs: [] };
      grouped[key].logs.push(log);
    });

    // Process FILO
    return Object.keys(grouped).map(key => {
      const empId = key.split('-')[0];
      const emp = EMPLOYEES.find(e => e.id === empId) || { name: 'Unknown', shift: 'G1' };
      const logs = grouped[key].logs.sort((a,b) => a.time.localeCompare(b.time));
      
      const firstIn = logs.find(l => l.type === 'In')?.time || 'Missing';
      const lastOut = [...logs].reverse().find(l => l.type === 'Out')?.time || 'Missing';
      
      const shiftDetails = SHIFTS[emp.shift] || { start: '00:00', end: '00:00' };
      
      // Simple status logic
      let status = 'Present';
      if (firstIn === 'Missing' || lastOut === 'Missing') status = 'LOP';
      else if (firstIn > shiftDetails.start) status = 'Late';

      return {
        empId,
        name: emp.name,
        date: key.split('-')[1],
        firstIn,
        lastOut,
        shift: emp.shift,
        status
      };
    });
  }, []);

  return (
    <div className="content-area">
      <div className="header-row">
        <h2>Daily Attendance (FILO Processed)</h2>
        <div>
          <button className="btn-secondary">Upload Biometric</button>
          <button className="btn-primary">Run FILO Logic</button>
        </div>
      </div>
      
      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Shift</th>
              <th>First In (FILO)</th>
              <th>Last Out (FILO)</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {processedData.map((row, idx) => (
              <tr key={idx}>
                <td>{row.empId}</td>
                <td>{row.name}</td>
                <td>{row.date}</td>
                <td>{row.shift}</td>
                <td>{row.firstIn}</td>
                <td>{row.lastOut}</td>
                <td>
                  <span className={`status ${row.status === 'Present' ? 'active' : 'error'}`}>
                    {row.status}
                  </span>
                </td>
                <td><button className="btn-link">Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;