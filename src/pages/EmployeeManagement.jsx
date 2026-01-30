import React, { useState, useEffect } from 'react';
import { Card, Badge } from '../components/Shared';
import AddEmployeeModal from '../components/AddEmployeeModal';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  // 1. THE GET METHOD (Replicating your CURL)
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      
      // Get the live CSRF token from the Liferay environment
      const authToken = window.Liferay ? window.Liferay.authToken : '';

      const response = await fetch('/o/c/cpclemployees/', {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'x-csrf-token': authToken
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      // Based on your data, we MUST access 'items'
      console.log("Full JSON Data Received:", data);
      setEmployees(data.items || []);

    } catch (error) {
      console.error("GET Request Failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Load data automatically
  useEffect(() => {
    fetchEmployees();
  }, []);

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
        {loading ? (
          <div className="p-4 text-center">Loading Records...</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Emp ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Type</th>
                <th>Grade</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((emp) => (
                  <tr key={emp.id}>
                    {/* Using exact keys from your verified JSON */}
                    <td>{emp.empNumber}</td>
                    <td>{emp.fullName}</td>
                    <td>{emp.emailAddress}</td>
                    
                    {/* Handling nested picklist objects */}
                    <td>{emp.employeeType?.name || 'N/A'}</td>
                    <td>{emp.grade?.name || 'N/A'}</td>
                    <td>
                      {/* Using 'statues' as spelled in your database */}
                      <Badge status={emp.statues?.name || 'Unknown'} />
                    </td>
                    
                    <td>
                      <button className="btn btn-secondary btn-sm">
                        <i className="fas fa-edit"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-4">
                    No records found. Check permissions for "CpclEmployee" object.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </Card>

      {openModal && (
        <AddEmployeeModal 
          onClose={() => setOpenModal(false)} 
          onSuccess={fetchEmployees} 
        />
      )}
    </>
  );
};

export default EmployeeManagement;