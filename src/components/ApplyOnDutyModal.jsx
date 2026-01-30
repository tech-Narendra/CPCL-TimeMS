import React from "react";

export default function ApplyOnDutyModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>Apply for On Duty</h3>
          <span className="close-btn" onClick={onClose}>×</span>
        </div>

        <div className="modal-body">
          <div className="form-grid">
            <div>
              <label>OD Type</label>
              <select>
                <option>First Half</option>
                <option>Second Half</option>
                <option>Full Day</option>
              </select>
            </div>

            <div>
              <label>Date</label>
              <input type="date" />
            </div>

            <div>
              <label>Purpose</label>
              <input type="text" />
            </div>

            <div>
              <label>Place of Visit</label>
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
