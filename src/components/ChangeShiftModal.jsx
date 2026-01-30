import React, { useState } from 'react';

const ChangeShiftModal = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState({
    employee: '',
    shift: 'G1 - 36 hours/week',
    from: '',
    to: '',
    reason: ''
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
      {/* Changed "modal" to "modal-container" to match your CSS */}
      <div className="modal-container">
        {/* Header */}
        <div className="modal-header">
          <h3>Change Shift</h3>
          <span className="close-btn" onClick={onClose}>×</span>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Using "form-grid" as requested for consistent layout */}
          <div className="form-grid">
            <div>
              <label>Employee</label>
              <select name="employee" onChange={handleChange}>
                <option value="">Select Employee</option>
                <option value="John">John</option>
                <option value="Sarah">Sarah</option>
              </select>
            </div>

            <div>
              <label>New Shift</label>
              <select name="shift" value={form.shift} onChange={handleChange}>
                <option>G1 - 36 hours/week</option>
                <option>G2 - 40 hours/week</option>
                <option>Night Shift</option>
              </select>
            </div>

            <div>
              <label>Effective From</label>
              <input type="date" name="from" onChange={handleChange} />
            </div>

            <div>
              <label>Effective To</label>
              <input type="date" name="to" onChange={handleChange} />
            </div>

            {/* Note: If you want the textarea to take full width, 
                ensure your CSS handles spans within the grid */}
            <div style={{ gridColumn: "1 / -1" }}>
              <label>Reason for Change</label>
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
            Update Shift
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeShiftModal;