import React from "react";

export default function ApplyPermissionModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>Apply for Permission</h3>
          <span className="close-btn" onClick={onClose}>×</span>
        </div>

        <div className="modal-body">
          <div className="form-grid">
            <div>
              <label>Date</label>
              <input type="date" />
            </div>

            <div>
              <label>Permission Hours</label>
              <select>
                <option>1 Hour</option>
                <option>2 Hours</option>
                <option>3 Hours</option>
              </select>
            </div>

            <div>
              <label>From Time</label>
              <input type="time" />
            </div>

            <div>
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
