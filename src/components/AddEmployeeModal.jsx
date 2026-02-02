import React, { useEffect, useState } from 'react';
import {
  createEmployee,
  updateEmployeeByERC,
  fetchEmployees
} from '../services/employeeService';
import { fetchDepartments } from '../services/departmentService';
import { fetchPicklistEntriesByERC } from '../services/picklistService';

const GRADE_PICKLIST_ERC = '1cb65562-1983-8153-702f-b1576e33efb9';
const TYPE_PICKLIST_ERC = 'e782226e-5671-0c1e-fe21-61e48cfd94e7';
const STATUS_PICKLIST_ERC = '7d2269f7-ecb9-aabf-f8c1-0bac5e7ccaf5';

const AddEmployeeModal = ({
  onClose,
  onSuccess,
  mode = 'ADD',       // ADD | EDIT
  employee = null     // present only in EDIT
}) => {
  const [form, setForm] = useState({
    employeeNumber: '',
    employeeName: '',
    emailID: '',
    mobileNumber: '',
    dateOfJoining: '',
    departmentERC: '',
    gradeKey: '',
    typeKey: '',
    statusKey: '',
    reportingOfficerERC: ''
  });

  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [grades, setGrades] = useState([]);
  const [types, setTypes] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(false);

  /* =========================
     LOAD MASTER DATA
  ========================= */
  useEffect(() => {
    loadMasterData();
  }, []);

  /* =========================
     PREFILL FORM (EDIT)
  ========================= */
  useEffect(() => {
    if (mode === 'EDIT' && employee) {
      setForm({
        employeeNumber: employee.employeeNumber || '',
        employeeName: employee.employeeName || '',
        emailID: employee.emailID || '',
        mobileNumber: employee.mobileNumber || '',
        dateOfJoining: employee.dateOfJoining
          ? employee.dateOfJoining.split('T')[0]
          : '',
        departmentERC: employee.r_department_c_cpclDepartmentERC || '',
        gradeKey: employee.grade?.key || '',
        typeKey: employee.type?.key || '',
        statusKey: employee.employeeStatus?.key || '',
        reportingOfficerERC:
          employee.r_reportingOfficer_c_cpclEmployeeERC || ''
      });
    }
  }, [mode, employee]);

  const loadMasterData = async () => {
    try {
      setLoading(true);

      const [
        deptRes,
        empRes,
        gradeRes,
        typeRes,
        statusRes
      ] = await Promise.all([
        fetchDepartments(),
        fetchEmployees(),
        fetchPicklistEntriesByERC(GRADE_PICKLIST_ERC),
        fetchPicklistEntriesByERC(TYPE_PICKLIST_ERC),
        fetchPicklistEntriesByERC(STATUS_PICKLIST_ERC)
      ]);

      setDepartments(deptRes?.items || []);
      setEmployees(empRes || []);
      setGrades(gradeRes || []);
      setTypes(typeRes || []);
      setStatuses(statusRes || []);

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
      const payload = {
        employeeNumber: form.employeeNumber,
        employeeName: form.employeeName,
        emailID: form.emailID,
        mobileNumber: form.mobileNumber,
        dateOfJoining: form.dateOfJoining,

        grade: { key: form.gradeKey },
        type: { key: form.typeKey },
        employeeStatus: { key: form.statusKey },

        r_department_c_cpclDepartmentERC: form.departmentERC,
        r_reportingOfficer_c_cpclEmployeeERC: form.reportingOfficerERC
      };

      if (mode === 'ADD') {
        await createEmployee(payload);
      } else {
        await updateEmployeeByERC(
          employee.externalReferenceCode,
          payload
        );
      }

      onSuccess();
      onClose();

    } catch (error) {
      alert(error?.title || 'Failed to save employee');
    }
  };

  /* =========================
     UI
  ========================= */
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>{mode === 'ADD' ? 'Add Employee' : 'Edit Employee'}</h3>
          <span className="close-btn" onClick={onClose}>×</span>
        </div>

        <div className="modal-body">
          {loading ? (
            <div className="text-center p-4">Loading...</div>
          ) : (
            <div className="form-grid">

              <input
                name="employeeNumber"
                value={form.employeeNumber}
                onChange={handleChange}
                disabled={mode === 'EDIT'}
                placeholder="Employee Number"
              />

              <input
                name="employeeName"
                value={form.employeeName}
                onChange={handleChange}
                placeholder="Name"
              />

              <select
                name="departmentERC"
                value={form.departmentERC}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                {departments.map(d => (
                  <option
                    key={d.id}
                    value={d.externalReferenceCode}
                  >
                    {d.departmentName}
                  </option>
                ))}
              </select>

              <select
                name="gradeKey"
                value={form.gradeKey}
                onChange={handleChange}
              >
                <option value="">Select Grade</option>
                {grades.map(g => (
                  <option key={g.key} value={g.key}>
                    {g.name}
                  </option>
                ))}
              </select>

              <select
                name="typeKey"
                value={form.typeKey}
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                {types.map(t => (
                  <option key={t.key} value={t.key}>
                    {t.name}
                  </option>
                ))}
              </select>

              <input
                name="emailID"
                value={form.emailID}
                onChange={handleChange}
                placeholder="Email"
              />

              <input
                name="mobileNumber"
                value={form.mobileNumber}
                onChange={handleChange}
                placeholder="Mobile"
              />

              <input
                type="date"
                name="dateOfJoining"
                value={form.dateOfJoining}
                onChange={handleChange}
              />

              <select
                name="reportingOfficerERC"
                value={form.reportingOfficerERC}
                onChange={handleChange}
              >
                <option value="">Select Reporting Officer</option>
                {employees
                  .filter(e =>
                    mode === 'ADD'
                      ? true
                      : e.externalReferenceCode !== employee.externalReferenceCode
                  )
                  .map(e => (
                    <option
                      key={e.id}
                      value={e.externalReferenceCode}
                    >
                      {e.employeeName}
                    </option>
                  ))}
              </select>

              <select
                name="statusKey"
                value={form.statusKey}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                {statuses.map(s => (
                  <option key={s.key} value={s.key}>
                    {s.name}
                  </option>
                ))}
              </select>

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
            {mode === 'ADD' ? 'Add Employee' : 'Update Employee'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
