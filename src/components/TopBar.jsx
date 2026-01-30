import React from 'react';

const TopBar = () => (
  <div className="top-bar">
    
    <div style={{fontSize: '1.2rem', fontWeight: 'bold', color: '#333'}}>
      Time Management System
    </div>
    <div className="user-profile">
      <div style={{textAlign: 'right'}}>
        <div style={{fontWeight: 'bold', fontSize: '1rem'}}>John Doe</div>
        <div style={{fontSize: '0.8rem', color: '#666'}}>Grade: D</div>
      </div>
      <div className="user-avatar">JD</div>
    </div>
  </div>
);

export default TopBar;