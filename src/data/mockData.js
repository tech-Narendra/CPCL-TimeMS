export const EMPLOYEES = [
  { id: 'EMP001', name: 'Raj Kumar', dept: 'Operations', grade: 'C', type: 'Full-time', doj: '2021-05-15', status: 'Active', reporting: 'Amit Sharma' },
  { id: 'EMP002', name: 'Priya Singh', dept: 'HR', grade: 'B', type: 'Full-time', doj: '2020-08-10', status: 'Active', reporting: 'John Doe' },
  { id: 'EMP003', name: 'Amit Sharma', dept: 'IT', grade: 'A', type: 'Contract', doj: '2022-01-20', status: 'Active', reporting: 'John Doe' },
  { id: 'EMP004', name: 'Sneha Reddy', dept: 'Finance', grade: 'B', type: 'Full-time', doj: '2019-11-05', status: 'On Leave', reporting: 'John Doe' },
];

export const ATTENDANCE_DATA = [
  { date: '11/10/2025', id: 'EMP001', name: 'Raj Kumar', dept: 'Operations', in: '09:00 AM', out: '06:00 PM', duration: '9h 0m', status: 'Present' },
  { date: '11/10/2025', id: 'EMP002', name: 'Priya Singh', dept: 'HR', in: '09:15 AM', out: '06:15 PM', duration: '9h 0m', status: 'Late' },
  { date: '11/10/2025', id: 'EMP003', name: 'Amit Sharma', dept: 'IT', in: '09:00 AM', out: '06:30 PM', duration: '9h 30m', status: 'Present' },
];

export const LEAVE_REQUESTS = [
  { id: 'LV001', name: 'Raj Kumar', type: 'Casual Leave', start: '2025/10/15', end: '2025/10/16', days: 2, reason: 'Personal Work', status: 'Pending' },
  { id: 'LV002', name: 'Priya Singh', type: 'Sick Leave', start: '2025/10/10', end: '2025/10/11', days: 2, reason: 'Medical', status: 'Approved' },
];