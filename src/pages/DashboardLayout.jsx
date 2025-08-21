// src/layout/DashboardLayout.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { THEME } from "../theme";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import DataRow from "../components/common/DataRow";
import StatsSection from "../components/dashboard/StatsSection"; // default stats area

const { colors, spacing, divider } = THEME;

/**
 * OverviewSection - small helper used by DashboardLayout
 * Accepts overviewGroups: [{ title, rows: [[label, value], ...] }, ...]
 */
export function OverviewSection({ isMobile, overviewGroups = [], groupRefs = null }) {
  const largeCardBase = {
    backgroundColor: colors.white,
    padding: spacing.cardPadding,
    borderRadius: 10,
    boxShadow: "0 3px 8px rgba(0,0,0,0.06)",
    border: `1px solid ${divider}`,
    boxSizing: "border-box",
  };

  function DataGroup({ title, rows, startIndex }) {
    return (
      <div style={{ marginBottom: isMobile ? 16 : 0 }}>
        <h4 style={{ color: colors.navy, fontSize: 15, margin: "0 0 8px 0", fontWeight: "bold" }}>{title}</h4>
        {rows.map((r, i) => (
          <DataRow key={r[0]} label={r[0]} value={r[1]} index={startIndex + i} small={isMobile} />
        ))}
      </div>
    );
  }

  // cumulative index so zebra striping continues across groups
  let cumulativeIndex = 0;

  return (
    <section style={{ ...largeCardBase, padding: isMobile ? spacing.cardPadding : 20 }}>
      <h3 style={{ color: colors.navy, fontSize: 18, margin: 0 }}>Overview</h3>
      <div style={{ height: 3, width: isMobile ? 56 : 60, backgroundColor: colors.gold, borderRadius: 2, margin: "10px 0 14px 0" }} />
      <div
        style={{
          display: isMobile ? "block" : "grid",
          gridTemplateColumns: isMobile ? "none" : "1fr auto 1fr auto 1fr",
          gap: isMobile ? 0 : 16,
          alignItems: "start",
        }}
      >
        {overviewGroups.map((group, idx) => {
          const groupElem = (
            <div
              key={group.title}
              ref={(el) => {
                if (groupRefs && Array.isArray(groupRefs.current)) groupRefs.current[idx] = el;
              }}
            >
              <DataGroup title={group.title} rows={group.rows} startIndex={cumulativeIndex} />
            </div>
          );

          cumulativeIndex += group.rows.length;

          return (
            <React.Fragment key={group.title}>
              {groupElem}
              {idx < overviewGroups.length - 1 && !isMobile && <div style={{ width: 1, backgroundColor: "#eee", alignSelf: "stretch" }} />}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}

/**
 * DashboardLayout - the generic layout used by specific dashboard pages
 *
 * Props:
 * - StatsComponent: component to render the top stats area (defaults to StatsSection)
 * - navLinks: array of { text, to } for Sidebar
 * - overviewGroups: overview data groups
 */
export default function DashboardLayout({
  StatsComponent = StatsSection,
  navLinks = [],
  overviewGroups = [],
  dashboard="member"  // or "temporary" or "admin"
}) {
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const headerRef = useRef(null);

  // scroll sync refs for mobile
  const statsScrollRef = useRef(null);
  const overviewScrollRef = useRef(null);
  const isSyncingRef = useRef(null);
  const syncClearTimeout = useRef(null);
  const groupRefs = useRef([]);

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < 768);
    }
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const statsEl = statsScrollRef.current;
    const overviewEl = overviewScrollRef.current;
    if (!statsEl || !overviewEl) return;

    const clearLock = () => {
      if (syncClearTimeout.current) clearTimeout(syncClearTimeout.current);
      syncClearTimeout.current = setTimeout(() => {
        isSyncingRef.current = null;
      }, 120);
    };

    const handleStatsScroll = () => {
      if (isSyncingRef.current === "overview") return;
      isSyncingRef.current = "stats";
      const maxScrollLeft = Math.max(0, statsEl.scrollWidth - statsEl.clientWidth);
      const percent = maxScrollLeft > 0 ? statsEl.scrollLeft / maxScrollLeft : 0;
      const maxScrollTop = Math.max(0, overviewEl.scrollHeight - overviewEl.clientHeight);
      overviewEl.scrollTop = Math.round(maxScrollTop * percent);
      clearLock();
    };

    const handleOverviewScroll = () => {
      if (isSyncingRef.current === "stats") return;
      isSyncingRef.current = "overview";
      const maxScrollTop = Math.max(0, overviewEl.scrollHeight - overviewEl.clientHeight);
      const percent = maxScrollTop > 0 ? overviewEl.scrollTop / maxScrollTop : 0;
      const maxScrollLeft = Math.max(0, statsEl.scrollWidth - statsEl.clientWidth);
      statsEl.scrollLeft = Math.round(maxScrollLeft * percent);
      clearLock();
    };

    statsEl.addEventListener("scroll", handleStatsScroll, { passive: true });
    overviewEl.addEventListener("scroll", handleOverviewScroll, { passive: true });

    return () => {
      statsEl.removeEventListener("scroll", handleStatsScroll);
      overviewEl.removeEventListener("scroll", handleOverviewScroll);
      if (syncClearTimeout.current) clearTimeout(syncClearTimeout.current);
    };
  }, [isMobile]);

  const toggleSidebar = () => setIsSidebarOpen((s) => !s);
  const sidebarTransform = isSidebarOpen ? "translateX(0)" : "translateX(-100%)";

  return (
    <div style={{ minHeight: "100vh", backgroundColor: colors.lightGray, display: "flex" }}>
<Sidebar
  dashboard={dashboard}       // tell Sidebar which dashboard is active
  navLinks={navLinks}      // optional: page-provided nav links
  isMobile={isMobile}
  isOpen={isSidebarOpen}
  onClose={() => setIsSidebarOpen(false)}
  transform={sidebarTransform}
/>

      {isMobile && isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.45)", zIndex: 999 }} />}

      <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      <Header isMobile={isMobile} onToggle={toggleSidebar} headerRef={headerRef} dashboard={dashboard} />

        {isMobile ? (
          <>
            <div style={{ padding: `0 ${spacing.pagePadding}px`, boxSizing: "border-box" }}>
              <StatsComponent isMobile={true} scrollRef={statsScrollRef} />
            </div>

            <div ref={overviewScrollRef} style={{ flex: 1, overflowY: "auto", padding: `0 ${spacing.pagePadding}px ${spacing.pagePadding}px` }}>
              <OverviewSection isMobile={true} overviewGroups={overviewGroups} groupRefs={groupRefs} />
            </div>
          </>
        ) : (
          <main style={{ flex: 1, overflowY: "auto", padding: 20 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.gap }}>
              <StatsComponent isMobile={false} />
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
