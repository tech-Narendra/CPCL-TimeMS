import React, { useState, useEffect } from 'react';
import { Card, Badge } from '../components/Shared';
import AddEmployeeModal from '../components/AddEmployeeModal';

import {
  fetchEmployees,
  fetchEmployeeByERC,
  deleteEmployeeByERC
} from '../services/employeeService';

import { fetchDepartmentByERC } from '../services/departmentService';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);

  /* =========================
     HELPERS
  ========================= */
  const formatDate = (isoDate) => {
    if (!isoDate) return '-';
    return new Date(isoDate).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  /* =========================
     LOAD EMPLOYEES
  ========================= */
  const loadEmployees = async () => {
    try {
      setLoading(true);

      const employeeList = await fetchEmployees();

      const departmentERCs = new Set();
      const managerERCs = new Set();

      employeeList.forEach(emp => {
        if (emp.r_department_c_cpclDepartmentERC) {
          departmentERCs.add(emp.r_department_c_cpclDepartmentERC);
        }
        if (emp.r_reportingOfficer_c_cpclEmployeeERC) {
          managerERCs.add(emp.r_reportingOfficer_c_cpclEmployeeERC);
        }
      });

      const departmentMap = new Map();
      const managerMap = new Map();

      await Promise.all([
        ...Array.from(departmentERCs).map(async erc => {
          const dept = await fetchDepartmentByERC(erc);
          if (dept) departmentMap.set(erc, dept.departmentName);
        }),
        ...Array.from(managerERCs).map(async erc => {
          const mgr = await fetchEmployeeByERC(erc);
          if (mgr) managerMap.set(erc, mgr.employeeName);
        })
      ]);

      const enrichedEmployees = employeeList.map(emp => ({
        ...emp,
        departmentName:
          departmentMap.get(emp.r_department_c_cpclDepartmentERC) || 'N/A',
        reportingOfficerName:
          managerMap.get(emp.r_reportingOfficer_c_cpclEmployeeERC) || 'N/A'
      }));

      setEmployees(enrichedEmployees);
    } catch (error) {
      console.error('Failed to load employees:', error);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     DELETE EMPLOYEE
  ========================= */
  const handleDelete = async (employeeERC) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) {
      return;
    }

    try {
      await deleteEmployeeByERC(employeeERC);
      loadEmployees();
    } catch (error) {
      alert(
        error?.title ||
        'Unable to delete employee. Please check relationships.'
      );
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  /* =========================
     UI
  ========================= */
  return (
    <>
      <div className="section-title">
        <span>Employee Management</span>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setOpenModal(true)}
        >
          <i className="fas fa-plus"></i> Add Employee
        </button>
      </div>

      <Card>
        <div className="table-responsive">
          {loading ? (
            <div className="p-4 text-center">Loading Records...</div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Emp ID</th>
                  <th>Full Name</th>
                  <th>Department</th>
                  <th>Type</th>
                  <th>Grade</th>
                  <th>DOJ</th>
                  <th>Status</th>
                  <th>Reporting To</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.length > 0 ? (
                  employees.map(emp => (
                    <tr key={emp.id}>
                      <td>{emp.employeeNumber}</td>
                      <td>{emp.employeeName}</td>
                      <td>{emp.departmentName}</td>
                      <td>{emp.type?.name || 'N/A'}</td>
                      <td>{emp.grade?.name || 'N/A'}</td>
                      <td>{formatDate(emp.dateOfJoining)}</td>
                      <td>
                        <Badge status={emp.employeeStatus?.name || 'Unknown'} />
                      </td>
                      <td>{emp.reportingOfficerName}</td>
                      <td align="center">
                        <button className="btn btn-sm btn-primary me-1"
                          onClick={() => setEditEmployee(emp)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() =>
                            handleDelete(emp.externalReferenceCode)
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center p-4">
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </Card>

      {(openModal || editEmployee) && (
        <AddEmployeeModal
          mode={editEmployee ? 'EDIT' : 'ADD'}
          employee={editEmployee}
          onClose={() => {
            setOpenModal(false);
            setEditEmployee(null);
          }}
          onSuccess={loadEmployees}
        />
      )}
    </>
  );
};

export default EmployeeManagement;
