import React, { useState } from 'react';

const ApplyLeaveModal = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState({
    type: 'Casual Leave',
    fromDate: '',
    toDate: '',
    reason: '',
    officer: 'John Doe'
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
  };

  return (
    <div className="modal-overlay">
      {/* Updated to modal-container */}
      <div className="modal-container">
        {/* Header */}
        <div className="modal-header">
          <h3>Apply for Leave</h3>
          <span className="close-btn" onClick={onClose}>×</span>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Wrapped in form-grid for consistent alignment */}
          <div className="form-grid">
            <div>
              <label>Leave Type</label>
              <select name="type" value={form.type} onChange={handleChange}>
                <option>Casual Leave</option>
                <option>Sick Leave</option>
              </select>
            </div>

            <div>
              <label>Reporting Officer</label>
              <input name="officer" value={form.officer} onChange={handleChange} />
            </div>

            <div>
              <label>From Date</label>
              <input type="date" name="fromDate" onChange={handleChange} />
            </div>

            <div>
              <label>To Date</label>
              <input type="date" name="toDate" onChange={handleChange} />
            </div>

            {/* Reason spanning full width */}
            <div style={{ gridColumn: "1 / -1" }}>
              <label>Reason</label>
              <textarea
                name="reason"
                rows="3"
                placeholder="Enter reason"
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyLeaveModal;