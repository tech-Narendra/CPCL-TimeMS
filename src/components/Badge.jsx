// src/components/Badge.jsx
import React from "react";
import { Box } from "@mui/material";

const Badge = ({ status }) => {
  let color = "";
  switch (status) {
    case "Present":
      color = "#4caf50";
      break;
    case "Absent":
      color = "#f44336";
      break;
    case "Late":
      color = "#ff9800";
      break;
    case "Leave":
      color = "#2196f3";
      break;
    default:
      color = "#9e9e9e";
  }

  return (
    <Box
      sx={{
        display: "inline-block",
        px: 1.5,
        py: 0.5,
        borderRadius: "12px",
        backgroundColor: color,
        color: "#fff",
        fontSize: "0.8rem",
        fontWeight: "bold",
        textAlign: "center",
      }}
    >
      {status}
    </Box>
  );
};

export default Badge;
