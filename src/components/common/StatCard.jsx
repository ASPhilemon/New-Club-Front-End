import React from "react";
import { THEME } from "../../theme";

const { colors, spacing } = THEME;

// Style adjustments for the stat card
const statCardBase = {
  backgroundColor: colors.navy,
  borderRadius: 10,
  boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "row",
  padding: "3vh",
  flexShrink: 0, // still needed for mobile scroll
};


function StatCard({ title, value }) {
  return (
    <div style={statCardBase}>
      <div style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", marginBottom: 8 }}>
        {title}
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, color: colors.gold }}>
        {value}
      </div>
    </div>
  );
}

export default StatCard;