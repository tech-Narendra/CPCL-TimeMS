import React from "react";

const AddEmployeeModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Header */}
        <div className="modal-header">
          <h3>Add New Employee</h3>
          <span className="close-btn" onClick={onClose}>×</span>
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="form-grid">
            <div>
              <label>Employee Number</label>
              <input type="text" />
            </div>

            <div>
              <label>Name</label>
              <input type="text" />
            </div>

            <div>
              <label>Department</label>
              <select>
                <option>HR</option>
                <option>IT</option>
                <option>Operations</option>
              </select>
            </div>

            <div>
              <label>Grade</label>
              <select>
                <option>P4</option>
                <option>P5</option>
                <option>A1</option>
              </select>
            </div>

            <div>
              <label>Type</label>
              <select>
                <option>Officer</option>
                <option>Non-Officer</option>
              </select>
            </div>

            <div>
              <label>Email</label>
              <input type="email" />
            </div>

            <div>
              <label>Mobile</label>
              <input type="text" />
            </div>

            <div>
              <label>Date of Joining</label>
              <input type="date" />
            </div>

            <div>
              <label>Reporting Officer</label>
              <select>
                <option>Select Reporting Officer</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary">
            Add Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
