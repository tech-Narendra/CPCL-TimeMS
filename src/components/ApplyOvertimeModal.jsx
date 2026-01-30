import React from "react";

export default function ApplyOvertimeModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>Apply for Overtime</h3>
          <span className="close-btn" onClick={onClose}>×</span>
        </div>

        <div className="modal-body">
          <div className="form-grid">
            <div>
              <label>Date</label>
              <input type="date" />
            </div>

            <div>
              <label>OT Hours</label>
              <input type="number" placeholder="Enter hours" />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label>Reason</label>
              <input type="text" />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary">Submit</button>
        </div>
      </div>
    </div>
  );
}
