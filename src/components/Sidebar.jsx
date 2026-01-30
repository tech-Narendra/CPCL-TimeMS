import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-th-large' },
    { id: 'attendance', label: 'Attendance Management', icon: 'fa-clock' },
    { id: 'employees', label: 'Employee Management', icon: 'fa-users' },
    { id: 'leave', label: 'Leave Management', icon: 'fa-calendar-minus' },
    { id: 'shifts', label: 'Shift Management', icon: 'fa-business-time' },
    { id: 'reports', label: 'Reports & Analytics', icon: 'fa-chart-line' },
  ];

  return (
    
    <div className="sidebar">
      <div className="sidebar-header">
        <img
  src="https://tse2.mm.bing.net/th/id/OIP.zdXIj5keMoogoG0EuYChLAHaFW?rs=1&pid=ImgDetMain&o=7&rm=3"
  alt="CPCL Logo"
  style={{ height: "40px", marginRight: "12px" }}
/>

        <i className="fas fa-clock" style={{marginRight: 10}}></i> CPCL TimeMS
      </div>
      <nav style={{marginTop: 10}}>
        {items.map(item => (
          <div 
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <i className={`fas ${item.icon}`}></i> {item.label}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;