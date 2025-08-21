import React from "react";
import { THEME } from "../../theme";

const { colors, mobileRowBg } = THEME;

function DataRow({ label, value, index = 0, small = false }) {
  const navRow = index % 2 === 0;
  const rowBg = navRow ? mobileRowBg.navy : mobileRowBg.gold;
  const rightColor = navRow ? colors.gold : colors.navy;
  const leftColor = navRow ? colors.white : colors.navy; // Changed for better contrast on gold

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.5vh",
        backgroundColor: rowBg,
        borderRadius: 6,
        marginBottom: 4,
        animation: "rowFade 420ms ease both",
      }}
    >
      <div style={{ color: leftColor, fontWeight: 600, fontSize: small ? 15 : 16 }}>
        {label}
      </div>
      <div style={{ color: rightColor, fontWeight: 600, fontSize: 16 }}>
        {value}
      </div>
    </div>
  );
}

export default DataRow;