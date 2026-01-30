import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Card } from '../components/Shared';
import ChangeShiftModal from '../components/ChangeShiftModal';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ShiftManagement = () => {
  const [showShiftModal, setShowShiftModal] = useState(false);

  const handleShiftUpdate = data => {
    console.log('Shift Updated:', data);
    // API integration later
  };

  const barData = {
    labels: ['Morning', 'Evening', 'Night', 'General'],
    datasets: [
      {
        label: 'Employees',
        data: [20, 15, 5, 10],
        backgroundColor: ['#4caf50', '#2196f3', '#673ab7', '#ff9800'],
      },
    ],
  };

  const pieData = {
    labels: ['Manall Refinery', 'Corporate Office', 'Remote'],
    datasets: [
      {
        data: [30, 15, 5],
        backgroundColor: ['#0d47a1', '#42a5f5', '#90caf9'],
      },
    ],
  };

  return (
    <div>
      <div className="section-title">
        <span>Shift Management</span>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setShowShiftModal(true)}
        >
          <i className="fas fa-plus"></i> Assign Shift
        </button>
      </div>

      <div className="grid-2">
        <Card>
          <div className="section-title">Shift Distribution</div>
          <div className="chart-container">
            <Bar
              data={barData}
              options={{
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true } },
              }}
            />
          </div>
        </Card>

        <Card>
          <div className="section-title">Location - wise Employees</div>
          <div className="chart-container">
            <Pie
              data={pieData}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </Card>
      </div>

      {showShiftModal && (
        <ChangeShiftModal
          onClose={() => setShowShiftModal(false)}
          onSubmit={handleShiftUpdate}
        />
      )}
    </div>
  );
};

export default ShiftManagement;
