import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import Badge from "../components/Badge";
import QuickActions from "./QuickActions";
import { ATTENDANCE_DATA } from "../data/mockData";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

/* ===== Stat Cards ===== */
const stats = [
  {
    label: "Total Employees",
    value: 50,
    color: "#2563eb",
    icon: "fas fa-users",
    bg: "#e0e7ff",
  },
  {
    label: "Present Today",
    value: 45,
    color: "#16a34a",
    icon: "fas fa-user-check",
    bg: "#dcfce7",
  },
  {
    label: "On Leave",
    value: 3,
    color: "#f59e0b",
    icon: "fas fa-calendar-times",
    bg: "#fef3c7",
  },
  {
    label: "Late Today",
    value: 2,
    color: "#dc2626",
    icon: "fas fa-exclamation-triangle",
    bg: "#fee2e2",
  },
];

/* ===== Doughnut Data ===== */
const doughnutData = {
  labels: ["Present", "Absent", "Late", "Leave"],
  datasets: [
    {
      data: [45, 0, 2, 3],
      backgroundColor: ["#16a34a", "#ef4444", "#f59e0b", "#2563eb"],
      borderWidth: 0,
    },
  ],
};

const Dashboard = () => {
  return (
    <Box p={3} bgcolor="#f8fafc" minHeight="100vh">
      {/* ===== Stat Cards ===== */}
    <Grid container spacing={4} columns={12} mb={3}>
  {stats.map((s, i) => (
    <Grid key={i} xs={12} sm={6} md={3}>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 6,
          borderLeft: `4px solid ${s.color}`,
          bgcolor: "#fff",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            {s.value}
          </Typography>
          <Typography color="text.secondary">{s.label}</Typography>
        </Box>

        <Box
          sx={{
            width: 50,
            height: 58,
            borderRadius: "60%",
            bgcolor: s.bg,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <i className={s.icon} style={{ color: s.color }}></i>
        </Box>
      </Paper>
    </Grid>
  ))}
</Grid>

      <Box mb={1}>
        <QuickActions />
      </Box>

 {/* Container with a standard spacing to avoid huge gaps */}
<Grid container spacing={1} columns={2}>
  
  {/* Left Section: Attendance Overview */}
  <Grid item xs={2} md={1}>
    <Paper sx={{ p: 2, borderRadius: 6, height: '100%' }} elevation={10}>
      <Typography variant="h4"  fontWeight={600} mb={2}>
        Attendance Overview
      </Typography>

      <Box height={200} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Doughnut
          data={doughnutData}
          options={{
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "right",
                labels: { boxWidth: 29, padding: 12 },
              },
            },
          }}
        />
      </Box>
    </Paper>
  </Grid>

  {/* Right Section: Today's Attendance */}
  <Grid item xs={2} md={1}>
    <Paper sx={{ p: 2, borderRadius: 6, height: '100%' }} elevation={10}>
      <Typography variant="h4" fontWeight={600} mb={2}>
        Today's Attendance
      </Typography>

      <Table>
        <TableHead sx={{ backgroundColor: '#f8f9fa' }}>
          <TableRow>
            <TableCell><b>Emp ID</b></TableCell>
            <TableCell><b>Name</b></TableCell>
            <TableCell><b>Department</b></TableCell>
            <TableCell align="center"><b>Status</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ATTENDANCE_DATA.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.dept}</TableCell>
              <TableCell align="center">
                <Badge status={row.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  </Grid>
</Grid>
    </Box>
  );
};

export default Dashboard;
