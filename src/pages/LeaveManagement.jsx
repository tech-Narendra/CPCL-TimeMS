import React, { useState } from 'react';
import { Card, Badge } from '../components/Shared';
import { LEAVE_REQUESTS } from '../data/mockData';
import ApplyLeaveModal from '../components/ApplyLeaveModal';

const LeaveManagement = () => {
  const [showModal, setShowModal] = useState(false);

  const handleApplyLeave = data => {
    console.log('Leave Applied:', data);
    // later: API call here
  };

  return (
    <div className="grid-2">
      <div style={{ gridColumn: 'span 2' }}>
        <div className="section-title">
          <span>Leave Applications</span>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowModal(true)}
          >
            <i className="fas fa-plus"></i> Apply Leave
          </button>
        </div>
      </div>

      <Card>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Date</th>
              <th>Days</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {LEAVE_REQUESTS.map(req => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.name}</td>
                <td>{req.type}</td>
                <td>{req.start} - {req.end}</td>
                <td>{req.days}</td>
                <td><Badge status={req.status} /></td>
                <td>
                  {req.status === 'Pending' && (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => alert(`Approved ${req.id}`)}
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card>
        <div className="section-title">Leave Balance</div>
        <div style={{ marginTop: '20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'5px' }}>
              <span>Casual Leave</span>
              <span style={{ fontWeight:'bold' }}>10 / 12</span>
            </div>
            <div style={{ height:'10px', background:'#e0e0e0', borderRadius:'5px' }}>
              <div style={{ width:'83%', height:'100%', background:'#4caf50', borderRadius:'5px' }} />
            </div>
          </div>

          <div>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'5px' }}>
              <span>Sick Leave</span>
              <span style={{ fontWeight:'bold' }}>8 / 10</span>
            </div>
            <div style={{ height:'10px', background:'#e0e0e0', borderRadius:'5px' }}>
              <div style={{ width:'80%', height:'100%', background:'#2196f3', borderRadius:'5px' }} />
            </div>
          </div>
        </div>
      </Card>

      {showModal && (
        <ApplyLeaveModal
          onClose={() => setShowModal(false)}
          onSubmit={handleApplyLeave}
        />
      )}
    </div>
  );
};

export default LeaveManagement;
