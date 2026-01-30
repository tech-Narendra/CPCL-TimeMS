import React from 'react';

export const Card = ({ children, className }) => <div className={`card ${className}`}>{children}</div>;

export const Badge = ({ status }) => {
  let cls = 'badge-present';
  if (status === 'Absent' || status === 'Sick Leave' || status === 'Rejected') cls = 'badge-absent';
  if (status === 'Late' || status === 'Pending') cls = status === 'Pending' ? 'badge-pending' : 'badge-late';
  if (status === 'Approved') cls = 'badge-approved';
  return <span className={`badge ${cls}`}>{status}</span>;
};