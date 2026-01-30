import React from 'react';
import { Line, Bar, Radar } from 'react-chartjs-2';
import { Card } from '../components/Shared';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, Filler, Tooltip, Legend);

const ReportsAnalytics = () => {
  const lineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      { label: 'Present', data: [45, 46, 44, 48], borderColor: '#4caf50', tension: 0.3 },
      { label: 'Absent', data: [5, 4, 6, 2], borderColor: '#f44336', tension: 0.3 }
    ]
  };

  const stackedBarData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      { label: 'Used', data: [10, 12, 8, 5], backgroundColor: '#ff9800' },
      { label: 'Balance', data: [20, 18, 22, 25], backgroundColor: '#4caf50' }
    ]
  };

  const radarData = {
    labels: ['Ops', 'HR', 'IT', 'Sales', 'Fin'],
    datasets: [{
      label: 'Efficiency Score',
      data: [85, 95, 90, 80, 88],
      backgroundColor: 'rgba(33, 150, 243, 0.2)',
      borderColor: '#2196f3',
      pointBackgroundColor: '#2196f3'
    }]
  };

  return (
    <div>
      <div className="section-title">
        <span>Reports & Analytics</span>
        <div style={{display: 'flex', gap: '10px'}}>
          <input type="date" className="btn btn-secondary" style={{border: '1px solid #ddd'}} />
          <button className="btn btn-primary btn-sm">Generate Report</button>
        </div>
      </div>
      
      <Card>
        <div className="section-title">Monthly Attendance Trend</div>
        <div className="chart-container" style={{height: '300px'}}>
          <Line data={lineData} options={{ maintainAspectRatio: false }} />
        </div>
      </Card>

      <div className="grid-2">
        <Card>
          <div className="section-title">Leave Analysis</div>
          <div className="chart-container">
            <Bar data={stackedBarData} options={{ maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true } } }} />
          </div>
        </Card>
        <Card>
          <div className="section-title">Department Efficiency</div>
          <div className="chart-container">
             <Radar data={radarData} options={{ maintainAspectRatio: false }} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReportsAnalytics;