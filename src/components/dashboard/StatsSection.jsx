// src/components/dashboard/StatsSection.jsx
import React from "react";
import { THEME } from "../../theme";
import StatCard from "../common/StatCard";

const { colors, spacing } = THEME;

function WelcomeMessage({ isMobile, name = "Mwebe" }) {
  return (
    <>
      <h1
        style={{
          fontSize: isMobile ? 20 : 22,
          color: colors.navy,
          margin: isMobile ? "6px 0" : 0,
        }}
      >
        Welcome back, {name}
      </h1>
      <p
        style={{
          color: isMobile ? "#344b5a" : "#666",
          marginBottom: 11,
        }}
      >
        Here’s your financial snapshot today.
      </p>
    </>
  );
}

function StatsSection({ isMobile, scrollRef, statsData = [], userName }) {
  return (
    <div
      style={{
        padding: "1vh 0",
        backgroundColor: colors.lightGray,
      }}
    >
      <div style={{ paddingRight: isMobile ? spacing.pagePadding : 0 }}>
        <WelcomeMessage isMobile={isMobile} userName={userName} />
      </div>

      {isMobile ? (
        // Mobile: horizontal scroll
        <div
          ref={scrollRef}
          style={{
            display: "flex",
            overflowX: "auto",
            gap: 12,
            paddingBottom: 8,
            scrollbarWidth: "none",
          }}
        >
          <style>{`div::-webkit-scrollbar { display: none; }`}</style>
          {statsData.map((stat) => (
            <StatCard key={stat.title} title={stat.title} value={stat.value} />
          ))}
          {/* Spacer so last item scrolls fully into view */}
          <div style={{ minWidth: 1, flexShrink: 0 }} />
        </div>
      ) : (
        // Desktop: grid with 4 equal columns
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
            paddingTop: 10,
          }}
        >
          {statsData.map((stat) => (
            <StatCard key={stat.title} title={stat.title} value={stat.value} />
          ))}
        </div>
      )}
    </div>
  );
}


export default StatsSection;
