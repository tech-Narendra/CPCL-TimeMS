import React, { useEffect, useState } from 'react';
import { Card, Badge } from '../components/Shared';
import ApplyLeaveModal from '../components/ApplyLeaveModal';
import { fetchLeaves, applyLeave, updateLeaveStatus } from '../services/leaveService';
import { fetchEmployeeByERC } from '../services/employeeService';
import { formatDate } from '../utils/dateTimeUtil';

const LeaveManagement = () => {
  const [leaves, setLeaves] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const loadLeaves = async () => {
    console.log('[LeaveManagement] Fetching leaves');

    const res = await fetchLeaves();
    console.log('[Leaves API Response]', res);

    const items = res.items || [];

    const ercs = [...new Set(items.map(l => l.leaveEmployeeERC))];
    console.log('[Employee ERCs]', ercs);

    const employees = await Promise.all(ercs.map(fetchEmployeeByERC));

    const empMap = {};
    employees.filter(Boolean).forEach(e => {
      empMap[e.externalReferenceCode] = e.employeeName;
    });

    const enriched = items.map(l => {
      console.log('[Leave Row]', l);
      return {
        ...l,
        employeeName: empMap[l.leaveEmployeeERC] || 'Unknown'
      };
    });

    setLeaves(enriched);
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  const handleApplyLeave = async (payload) => {
    console.log('[LeaveManagement] handleApplyLeave', payload);
    await applyLeave(payload);
    await loadLeaves();
  };

  const updateStatus = async (id, status) => {
    console.log('[Update Status]', id, status);

    await updateLeaveStatus(id, status);
    loadLeaves();
  };

  return (
    <div>
      <div className="section-title">
        <span>Leave Management</span>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setShowModal(true)}
        >
          <i className="fas fa-plus"></i> Apply Leave
        </button>
      </div>

      <Card>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Type</th>
                <th>From</th>
                <th>To</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map(l => (
                <tr key={l.id}>
                  <td>{l.employeeName}</td>
                  <td>{l.leaveType?.name}</td>
                  <td>{formatDate(l.fromDate)}</td>
                  <td>{formatDate(l.toDate)}</td>
                  <td>{l.reason}</td>
                  <td>
                    <Badge status={l.leaveStatus?.name} />
                  </td>
                  <td>
                    {l.leaveStatus?.key === 'Applied' && (
                      <div className="d-flex flex-column gap-2">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => updateStatus(l.id, 'Approved')}
                        >
                          Approve
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => updateStatus(l.id, 'Rejected')}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {showModal && (
        <ApplyLeaveModal
          onClose={() => setShowModal(false)}
          onSuccess={handleApplyLeave}
        />
      )}

    </div>
  );
};

export default LeaveManagement;
