import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import AttendanceManagement from './pages/AttendanceManagement';
import LeaveManagement from './pages/LeaveManagement';
import EmployeeManagement from './pages/EmployeeManagement';
import ShiftManagement from './pages/ShiftManagement';
import ReportsAnalytics from './pages/ReportsAnalytics';
import './App.css';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const renderContent = () => {
  switch (activeTab) {
    case 'dashboard':
      return <Dashboard setActiveTab={setActiveTab} />;
    case 'attendance':
      return <AttendanceManagement />;
    case 'leaves':
      return <LeaveManagement />;
    case 'employees':
      return <EmployeeManagement />;
    case 'shifts':
      return <ShiftManagement />;
    case 'reports':
      return <ReportsAnalytics />;
    default:
      return <Dashboard setActiveTab={setActiveTab} />;
  }
};
  

  return (
    <div id="time-mgmt-app">
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="main-content">
        <TopBar />
        <div className="content-area">
          {renderContent()}
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;