import React, { useState } from 'react';
import { Card, Badge } from '../components/Shared';
import { ATTENDANCE_DATA as INITIAL_DATA } from '../data/mockData';

const AttendanceManagement = () => {
  // State for search and table data
  const [searchTerm, setSearchTerm] = useState("");
  const [attendanceList, setAttendanceList] = useState(INITIAL_DATA);

  // 1. Search Logic: Filters the list dynamically as you type
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    
    const filteredData = INITIAL_DATA.filter(row => 
      row.name.toLowerCase().includes(value) || 
      row.id.toLowerCase().includes(value) ||
      row.dept.toLowerCase().includes(value)
    );
    setAttendanceList(filteredData);
  };

  // 2. Import Logic: Triggers file selection
  const handleImport = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv, .json';
    
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        alert(`Uploading ${file.name} to Liferay backend...`);
        // Next step: Integration with your Spring Boot REST API
      }
    };
    fileInput.click();
  };

  return (
    <div className="attendance-container">
      {/* Header Section with Actions */}
      <div className="section-title-container">
        <span className="main-title">Attendance Management</span>
        
        <div className="header-actions">
          <div className="search-wrapper">
            <i className="fas fa-search"></i>
            <input 
              type="text" 
              className="search-input"
              placeholder="Search Name, ID or Dept..." 
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <br></br>          
          <button className="btn btn-primary btn-sm" onClick={handleImport}>
            <i className="fas fa-file-import"></i> 
            Import Attendance
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <Card sx={{ borderRadius: 6, p: 0, overflow: 'hidden' }}>
        <table className="custom-attendance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Emp ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Work Hours</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceList.length > 0 ? (
              attendanceList.map(row => (
                <tr key={row.id}>
                  <td>{row.date}</td>
                  <td><strong>{row.id}</strong></td>
                  <td>{row.name}</td>
                  <td>{row.dept}</td>
                  <td>{row.in}</td>
                  <td>{row.out}</td>
                  <td>{row.duration}</td>
                  <td><Badge status={row.status} /></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="empty-state">
                  <i className="fas fa-user-slash"></i>
                  <p>No records found matching "{searchTerm}"</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default AttendanceManagement;