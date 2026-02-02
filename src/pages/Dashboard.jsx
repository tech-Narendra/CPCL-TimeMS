import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";

const cards = [
  { label: "Total Employees", tab: "employees", color: "#2563eb" },
  { label: "Attendance", tab: "attendance", color: "#16a34a" },
  { label: "On Leave", tab: "leaves", color: "#f59e0b" },
];

const Dashboard = ({ setActiveTab }) => {
  if (typeof setActiveTab !== "function") {
    console.error("setActiveTab not provided to Dashboard");
    return null;
  }

  return (
    <Box p={3} bgcolor="#f8fafc" minHeight="100vh">
      <Typography variant="h5" fontWeight={600} mb={3}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              onClick={() => setActiveTab(card.tab)}
              sx={{
                p: 3,
                borderRadius: 3,
                cursor: "pointer",
                borderLeft: `5px solid ${card.color}`,
                textAlign: "center",
                transition: "0.2s",
                "&:hover": {
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <Typography variant="h6" fontWeight={700}>
                {card.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
