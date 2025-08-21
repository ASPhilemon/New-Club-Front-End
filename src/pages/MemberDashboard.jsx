// src/pages/HomeDashboard.jsx
import React, { useEffect, useRef, useState } from "react";
import { THEME } from "../theme";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import DataRow from "../components/common/DataRow";

const { colors, spacing, sizes } = THEME;

/* Small presentational stat card used inside this page. */
function LargeStatCard({ title, value }) {
  return (
    <div
      style={{
        backgroundColor: colors.navy,
        color: colors.softWhite,
        borderRadius: 12,
        padding: 20,
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div style={{ fontSize: 17, color: colors.softWhite, fontWeight: 900 }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color: colors.darkGold }}>{value}</div>
    </div>
  );
}

export default function MemberDashboard() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : true
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const headerRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(sizes.minInnerHeight);

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < 768);
    }
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    function computeHeights() {
      const headerH =
        headerRef.current?.getBoundingClientRect().height || sizes.headerHeight;
      const pagePad = spacing.pagePadding * 2;
      const h = Math.max(
        sizes.minInnerHeight,
        window.innerHeight - headerH - pagePad
      );
      setContentHeight(h);
    }

    computeHeights();
    window.addEventListener("resize", computeHeights);
    const t = setTimeout(computeHeights, 50);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", computeHeights);
    };
  }, [isMobile]);

  // sample data (replace with real values)
  const totalWorth = "UGX 2,505,000";
  const savingsOverview = {
    title: "Savings Overview",
    rows: [
      ["Savings this year", "UGX 1.5M"],
      ["Avg. monthly savings", "UGX 250K"],
      ["% Ownership", "20%"],
      ["Savings Category", "2.5M - 3M"],
      ["Your Category Membership", "5"],
    ],
  };
  const earningsOverview = {
    title: "Earnings Overview",
    rows: [
      ["Total Earnings", "UGX 10M"],
      ["Earnings this year", "UGX 1M"],
      ["Avg. monthly earnings", "UGX 0.33M"],
      ["Projected annual earnings", "3M"],
    ],
  };
  const loansOverview = {
    title: "Loans Overview",
    rows: [
      ["Current Loans", "UGX 8M"],
      ["Interest paid", "UGX 0.8M"],
      ["Current interest due", "UGX 0.3M"],
      ["Loan limit", "UGX 12M"],
    ],
  };
  const pointsOverview = {
    title: "Points Overview",
    rows: [
      ["Total Points", "3,200"],
      ["Points gained this year", "200"],
      ["Redeemed", "800"],
      ["Cash Equivalent", "UGX 3.2M"],
    ],
  };
  const clubOverview = {
    title: "Club Overview",
    rows: [
      ["Savings this year", "UGX 30M"],
      ["Earnings this year", "UGX 9M"],
      ["Loans this year", "UGX 25M"],
      ["Members", "30"],
    ],
  };

  const menuItems = [
    { text: "Deposits", to: "/deposits" },
    { text: "Earnings", to: "/earnings" },
    { text: "Loans", to: "/loans" },
    { text: "Points", to: "/points" },
    { text: "Discounts", to: "/discounts" },
    { text: "Club Deposits", to: "/club-deposits" },
    { text: "Club Earnings", to: "/club-earnings" },
  ];

  const toggleSidebar = () => setIsSidebarOpen((s) => !s);
  const sidebarTransform = isSidebarOpen
    ? "translateX(0)"
    : "translateX(-100%)";

  /* styles */
  const pageBase = {
    minHeight: "100vh",
    backgroundColor: colors.lightGray,
    display: "flex",
    overflow: "hidden",
  };
  const mainArea = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    position: "relative",
  };
  const largeCardBase = {
    backgroundColor: colors.white,
    borderRadius: 10,
    boxShadow: "0 6px 18px rgba(10,34,66,0.06)",
    border: `1px solid rgba(0,0,0,0.04)`,
    padding: "1vh",
    boxSizing: "border-box",
  };

  function DataGroup({ rows }) {
    return (
      <div style={{ marginBottom: isMobile ? 16 : 0 }}>
        {rows.map((r, i) => (
          <DataRow key={r[0]} label={r[0]} value={r[1]} index={i} small={isMobile} />
        ))}
      </div>
    );
  }

  return (
    <div style={pageBase}>
      <Sidebar
        isMobile={isMobile}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        transform={sidebarTransform}
        dashboard="member"
      />
      {isMobile && isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.45)",
            zIndex: 999,
          }}
        />
      )}

      <div style={mainArea}>
        <Header
          isMobile={isMobile}
          onToggle={toggleSidebar}
          headerRef={headerRef}
          dashboard="member"
        />

        {isMobile ? (
          <div
            style={{
              height: contentHeight,
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
              padding: `12px ${spacing.pagePadding}px ${spacing.pagePadding}px`,
            }}
          >
            {/* Greeting + Total Worth now inside scrollable area */}
            <div style={{ paddingTop: 10 }}>
              <h1
                style={{
                  fontSize: 20,
                  color: colors.navy,
                  margin: "6px 0",
                  fontWeight: 800,
                }}
              >
                Welcome back, Mwebe
              </h1>
              <p
                style={{
                  marginTop: 0,
                  marginBottom: 10,
                  color: "#344b5a",
                }}
              >
                Here's an overview of your account.
              </p>

              <LargeStatCard title="Total Worth" value={totalWorth} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12, marginTop: 16 }}>
              <div style={{ ...largeCardBase }}>
                <h3
                  style={{
                    color: colors.navy,
                    fontSize: 18,
                    margin: 0,
                  }}
                >
                  {savingsOverview.title}
                </h3>
                <div
                  style={{
                    height: 3,
                    width: isMobile ? 56 : 60,
                    backgroundColor: colors.gold,
                    borderRadius: 2,
                    margin: "10px 0 14px 0",
                  }}
                />
                <DataGroup rows={savingsOverview.rows} />
              </div>

              <div style={largeCardBase}>
                <h3 style={{ color: colors.navy, fontSize: 18, margin: 0 }}>
                  {earningsOverview.title}
                </h3>
                <div
                  style={{
                    height: 3,
                    width: isMobile ? 56 : 60,
                    backgroundColor: colors.gold,
                    borderRadius: 2,
                    margin: "10px 0 14px 0",
                  }}
                />
                <DataGroup rows={earningsOverview.rows} />
              </div>

              <div style={largeCardBase}>
                <h3 style={{ color: colors.navy, fontSize: 18, margin: 0 }}>
                  {loansOverview.title}
                </h3>
                <div
                  style={{
                    height: 3,
                    width: isMobile ? 56 : 60,
                    backgroundColor: colors.gold,
                    borderRadius: 2,
                    margin: "10px 0 14px 0",
                  }}
                />
                <DataGroup rows={loansOverview.rows} />
              </div>

              <div style={largeCardBase}>
                <h3 style={{ color: colors.navy, fontSize: 18, margin: 0 }}>
                  {pointsOverview.title}
                </h3>
                <div
                  style={{
                    height: 3,
                    width: isMobile ? 56 : 60,
                    backgroundColor: colors.gold,
                    borderRadius: 2,
                    margin: "10px 0 14px 0",
                  }}
                />
                <DataGroup rows={pointsOverview.rows} />
              </div>

              <div style={largeCardBase}>
                <h3 style={{ color: colors.navy, fontSize: 18, margin: 0 }}>
                  {clubOverview.title}
                </h3>
                <div
                  style={{
                    height: 3,
                    width: isMobile ? 56 : 60,
                    backgroundColor: colors.gold,
                    borderRadius: 2,
                    margin: "10px 0 14px 0",
                  }}
                />
                <DataGroup rows={clubOverview.rows} />
              </div>
            </div>
          </div>
        ) : (
          <main style={{ padding: 20, flex: 1, overflow: "hidden" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.6fr",
                gap: 20,
                height: "100%",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.gap }}>
                <div>
                  <h1 style={{ fontSize: 22, color: colors.navy, margin: 0, fontWeight: 800 }}>
                    Welcome back, Mwebe
                  </h1>
                  <p style={{ marginTop: 6 }}>Here's an overview of your account.</p>
                </div>

                <LargeStatCard title="Total Worth" value={totalWorth} />

                <div style={{ ...largeCardBase }}>
                  <h3 style={{ color: colors.navy, fontSize: 18, margin: 0 }}>{savingsOverview.title}</h3>
                  <div
                    style={{
                      height: 3,
                      width: isMobile ? 56 : 60,
                      backgroundColor: colors.gold,
                      borderRadius: 2,
                      margin: "10px 0 14px 0",
                    }}
                  />
                  <DataGroup rows={savingsOverview.rows} />
                </div>
              </div>

              <div style={{ height: contentHeight, display: "grid", gridTemplateRows: "1fr 1fr", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, height: "100%" }}>
                  <div style={{ ...largeCardBase, overflow: "hidden" }}>
                    <h3 style={{ color: colors.navy, fontSize: 18, margin: 0 }}>{earningsOverview.title}</h3>
                    <div
                      style={{
                        height: 3,
                        width: isMobile ? 56 : 60,
                        backgroundColor: colors.gold,
                        borderRadius: 2,
                        margin: "10px 0 14px 0",
                      }}
                    />
                    <DataGroup rows={earningsOverview.rows} />
                  </div>

                  <div style={{ ...largeCardBase, overflow: "hidden" }}>
                    <h3 style={{ color: colors.navy, fontSize: 18, margin: 0 }}>{loansOverview.title}</h3>
                    <div
                      style={{
                        height: 3,
                        width: isMobile ? 56 : 60,
                        backgroundColor: colors.gold,
                        borderRadius: 2,
                        margin: "10px 0 14px 0",
                      }}
                    />
                    <DataGroup rows={loansOverview.rows} />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, height: "100%" }}>
                  <div style={{ ...largeCardBase, overflow: "hidden" }}>
                    <h3 style={{ color: colors.navy, fontSize: 18, margin: 0 }}>{pointsOverview.title}</h3>
                    <div
                      style={{
                        height: 3,
                        width: isMobile ? 56 : 60,
                        backgroundColor: colors.gold,
                        borderRadius: 2,
                        margin: "10px 0 14px 0",
                      }}
                    />
                    <DataGroup rows={pointsOverview.rows} />
                  </div>

                  <div style={{ ...largeCardBase, overflow: "hidden" }}>
                    <h3 style={{ color: colors.navy, fontSize: 18, margin: 0 }}>{clubOverview.title}</h3>
                    <div
                      style={{
                        height: 3,
                        width: isMobile ? 56 : 60,
                        backgroundColor: colors.gold,
                        borderRadius: 2,
                        margin: "10px 0 14px 0",
                      }}
                    />
                    <DataGroup rows={clubOverview.rows} />
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
