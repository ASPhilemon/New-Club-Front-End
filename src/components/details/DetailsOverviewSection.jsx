import React from "react";
import { THEME } from "../../theme";
import DataRow from "../common/DataRow";

function DetailsOverviewSection({ isMobile, overviewGroup }) {
    const { colors, spacing, divider } = THEME;
    const largeCardBase = {
        backgroundColor: colors.white, padding: spacing.cardPadding, borderRadius: 10, height: "60vh",
        boxShadow: "0 3px 8px rgba(0,0,0,0.06)", border: `1px solid ${divider}`, boxSizing: "border-box",
    };

    function DataGroup({rows }) {
        return (
            <div>
                {rows.map((r, i) => (
                    <DataRow key={r[0]} label={r[0]} value={r[1]} index={i} small={!isMobile} />
                ))}
            </div>
        );
    }
    
    return (
        <section style={{ ...largeCardBase }}>
            <h3 style={{ color: colors.navy, fontSize: 18, margin: 0 }}> Overview</h3>
            <div style={{ height: 3, width: "17%", backgroundColor: colors.gold, borderRadius: 2, margin: "14px 0 14px 0" }}/>
            <DataGroup rows={overviewGroup.rows} />
        </section>
    );
}

export default DetailsOverviewSection;