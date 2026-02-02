import React, { useEffect, useState } from 'react';
import { Card, Badge } from '../components/Shared';
import { fetchAttendance } from '../services/attendance';
import { fetchEmployeeByERC } from '../services/employeeService';
import { fetchDepartmentByERC } from '../services/departmentService';
import { formatDate, formatTime } from '../utils/dateTimeUtil';

const AttendanceManagement = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [allData, setAllData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // 1️ Fetch attendance punches
        const attendanceRes = await fetchAttendance();
        const punches = attendanceRes.items || [];

        // 2️ Collect unique employee ERCs
        const employeeERCs = [
          ...new Set(punches.map(p => p.r_employeePunch_c_cpclEmployeeERC))
        ];

        // 3️ Fetch employees
        const employeeResponses = await Promise.all(
          employeeERCs.map(erc => fetchEmployeeByERC(erc))
        );

        const employeeMap = {};
        employeeResponses.forEach(emp => {
          employeeMap[emp.externalReferenceCode] = {
            empId: emp.employeeNumber,
            name: emp.employeeName,
            departmentERC: emp.r_department_c_cpclDepartmentERC
          };
        });

        // 4️ Collect unique department ERCs
        const departmentERCs = [
          ...new Set(
            Object.values(employeeMap)
              .map(e => e.departmentERC)
              .filter(Boolean)
          )
        ];

        // 5️ Fetch departments
        const departmentResponses = await Promise.all(
          departmentERCs.map(erc => fetchDepartmentByERC(erc))
        );

        const departmentMap = {};
        departmentResponses.forEach(dept => {
          departmentMap[dept.externalReferenceCode] =
            dept.departmentName || dept.name;
        });

        // 6️ Enrich attendance data
        const enriched = punches.map(p => {
          const empERC = p.r_employeePunch_c_cpclEmployeeERC;
          const emp = employeeMap[empERC];

          return {
            id: p.id,
            attendanceDate: formatDate(p.attendanceDate),
            attendanceTime: formatTime(p.attendanceTime),
            punchType: p.punchType?.name,
            status: p.punchStatus?.name || 'Valid',
            empId: emp?.empId || '-',
            employeeName: emp?.name || 'Unknown',
            departmentName: departmentMap[emp?.departmentERC] || '-'
          };
        });

        setAttendanceList(enriched);
        setAllData(enriched);
      } catch (err) {
        console.error(err);
        alert('Failed to load attendance data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  //  Search
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = allData.filter(row =>
      row.employeeName.toLowerCase().includes(value) ||
      row.empId.toLowerCase().includes(value) ||
      row.departmentName.toLowerCase().includes(value) ||
      row.punchType.toLowerCase().includes(value)
    );

    setAttendanceList(filtered);
  };

  return (
    <div className="attendance-container">
      <div className="section-title-container">
        <span className="main-title">Attendance Management</span>

        <input
          type="text"
          placeholder="Search emp / dept"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <Card>
        <div className="table-responsive">
          {loading ? (
            <p>Loading attendance...</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Emp ID</th>
                  <th>Employee</th>
                  <th>Department</th>
                  <th>Punch Type</th>
                  <th>Time</th>
                  <th>Punch Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceList.map(row => (
                  <tr key={row.id}>
                    <td>{row.attendanceDate}</td>
                    <td>{row.empId}</td>
                    <td>{row.employeeName}</td>
                    <td>{row.departmentName}</td>
                    <td>{row.punchType}</td>
                    <td>{row.attendanceTime}</td>
                    <td>
                      <Badge status={row.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AttendanceManagement;
