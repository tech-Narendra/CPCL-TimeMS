import React, { useEffect, useState } from 'react';
import { fetchPicklistEntriesByERC } from '../services/picklistService';
import { fetchEmployees } from '../services/employeeService';

const LEAVE_TYPE_PICKLIST_ERC = 'f1119d88-e752-0984-ebf6-0b6ab087cc49';

const ApplyLeaveModal = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    employeeERC: '',
    leaveTypeKey: '',
    fromDate: '',
    toDate: '',
    reason: ''
  });

  const [employees, setEmployees] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  /* =========================
     LOAD MASTER DATA
  ========================= */
  useEffect(() => {
    loadMasterData();
  }, []);

  const loadMasterData = async () => {
    try {
      setLoading(true);

      const [empRes, leaveTypeRes] = await Promise.all([
        fetchEmployees(),
        fetchPicklistEntriesByERC(LEAVE_TYPE_PICKLIST_ERC)
      ]);

      setEmployees(empRes || []);
      setLeaveTypes(leaveTypeRes || []);

    } catch (e) {
      alert('Failed to load form data');
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     HANDLERS
  ========================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (typeof onSuccess !== 'function') {
        throw new Error('onSuccess is not a function');
      }

      if (
        !form.employeeERC ||
        !form.leaveTypeKey ||
        !form.fromDate ||
        !form.toDate
      ) {
        alert('Please fill all mandatory fields');
        return;
      }

      const payload = {
        fromDate: form.fromDate,
        toDate: form.toDate,
        reason: form.reason,
        leaveType: { key: form.leaveTypeKey },
        leaveStatus: { key: 'Applied' },
        r_leaveEmployee_c_cpclEmployeeERC: form.employeeERC
      };

      console.log('[ApplyLeaveModal] Payload', payload);

      await onSuccess(payload);
      onClose();

    } catch (error) {
      console.error('[ApplyLeaveModal] Error', error);
      alert(
        error?.detail ||
        error?.title ||
        error?.message ||
        'Failed to apply leave'
      );
    }
  };

  /* =========================
     UI
  ========================= */
  return (
    <div className="modal-overlay">
      <div className="modal-container">

        <div className="modal-header">
          <h3>Apply Leave</h3>
          <span className="close-btn" onClick={onClose}>×</span>
        </div>

        <div className="modal-body">
          {loading ? (
            <div className="text-center p-4">Loading...</div>
          ) : (
            <div className="form-grid">

              <select
                name="employeeERC"
                value={form.employeeERC}
                onChange={handleChange}
              >
                <option value="">Select Employee</option>
                {employees.map(e => (
                  <option
                    key={e.externalReferenceCode}
                    value={e.externalReferenceCode}
                  >
                    {e.employeeName}
                  </option>
                ))}
              </select>

              <select
                name="leaveTypeKey"
                value={form.leaveTypeKey}
                onChange={handleChange}
              >
                <option value="">Select Leave Type</option>
                {leaveTypes.map(t => (
                  <option key={t.key} value={t.key}>
                    {t.name}
                  </option>
                ))}
              </select>

              <input
                type="date"
                name="fromDate"
                value={form.fromDate}
                onChange={handleChange}
                aria-label="From Date"
              />

              <input
                type="date"
                name="toDate"
                value={form.toDate}
                onChange={handleChange}
                aria-label="To Date"
              />

              <textarea
                name="reason"
                value={form.reason}
                onChange={handleChange}
                placeholder="Reason"
              />

            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            Apply Leave
          </button>
        </div>

      </div>
    </div>
  );
};

export default ApplyLeaveModal;
