// src/components/layout/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { THEME } from "../../theme";

const { colors, sizes } = THEME;

/* Scoped CSS to hide internal scrollbar but keep scrolling behaviour */
const SidebarScrollStyle = () => (
  <style>{`
    .gs-sidebar::-webkit-scrollbar { width: 0; height: 0; }
    .gs-sidebar { -ms-overflow-style: none; scrollbar-width: none; }
    .gs-sidebar a:focus, .gs-sidebar button:focus {
      outline: 2px solid rgba(212,175,55,0.25);
      outline-offset: 2px;
    }
  `}</style>
);

/* Dashboard registry — canonical list of dashboards (name, label, route) */
const DASHBOARDS = [
  { name: "member", label: "Member Dashboard", to: "/" },
  { name: "temporary", label: "Temporary Savings", to: "/temporary-savings" },
  { name: "admin", label: "Admin Dashboard", to: "/admin" },
];

/* Profile header */
function ProfileHeader({ profile }) {
  const name = profile?.name || "Mwebe";
  const avatar = profile?.avatar || "https://via.placeholder.com/80";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 0 10px 28px", // left align with nav items
        marginTop: 8,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <img
        src={avatar}
        alt={`${name} avatar`}
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          objectFit: "cover",
          border: `3px solid ${colors.gold}`,
          display: "block",
        }}
      />
      <div style={{ color: colors.gold, fontWeight: 700, fontSize: 16 }}>{name}</div>
    </div>
  );
}

/* Single nav item */
function NavLinkItem({ text, to = "#", onClick, isActive }) {
  return (
    <Link to={to} onClick={onClick} style={{ textDecoration: "none", width: "100%" }}>
      <div
        style={{
          padding: "10px 16px",
          cursor: "pointer",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          color: isActive ? colors.navy : "rgba(255,255,255,0.95)",
          backgroundColor: isActive ? colors.gold : "transparent",
          fontSize: 14,
          fontWeight: isActive ? 800 : 600,
          margin: "0.7vh 0",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          width: "calc(100% - 28px)", // align with nav padding
          marginLeft: 28,
        }}
      >
        {text}
      </div>
    </Link>
  );
}

/* Sidebar action button (link) */
function SidebarAction({ text, to, onClose }) {
  const inner = (
    <div
      style={{
        width: "100%",
        backgroundColor: colors.gold,
        color: colors.navy,
        padding: "10px 12px",
        borderRadius: 6,
        cursor: "pointer",
        fontWeight: 700,
        textAlign: "center",
        boxSizing: "border-box",
      }}
    >
      {text}
    </div>
  );

  const handleClick = () => {
    if (typeof onClose === "function") onClose();
  };

  return (
    <div style={{ padding: "10px 28px 0 28px", boxSizing: "border-box" }}>
      {to ? (
        <Link to={to} onClick={handleClick} style={{ textDecoration: "none", display: "block" }}>
          {inner}
        </Link>
      ) : (
        <button onClick={handleClick} style={{ border: "none", background: "transparent", width: "100%", padding: 0 }}>
          {inner}
        </button>
      )}
    </div>
  );
}

/**
 * Sidebar props:
 * - dashboard: string key of current dashboard (one of DASHBOARDS[].name). Defaults to "member".
 * - navLinks: optional array [{text, to}, ...] to override default links
 * - profile: optional { name, avatar }
 * - isMobile, isOpen, onClose, transform
 *
 * NOTE: legacy props (actionButtons, switchDashboardLabel, onSwitchDashboard) have been removed.
 */
function Sidebar({
  dashboard = "member",
  navLinks = null,
  profile = null,
  isMobile,
  isOpen,
  onClose,
  transform,
}) {
  const location = useLocation();

  // default navLinks if none provided
  const defaultNavLinks = [
    { text: "Home", to: "/" },
    { text: "Deposits", to: "/deposits" },
    { text: "Earnings", to: "/earnings" },
    { text: "Points", to: "/points" },
    { text: "Loans", to: "/loans" },
    { text: "Discounts", to: "/discounts" },
    { text: "Club Deposits", to: "/club-deposits" },
    { text: "Club Earnings", to: "/club-earnings" },
  ];

  const linksToRender = Array.isArray(navLinks) && navLinks.length > 0 ? navLinks : defaultNavLinks;

  // Build action buttons by taking all DASHBOARDS except the active one
  const actionsToRender = DASHBOARDS.filter((d) => d.name !== dashboard).map((d) => ({
    text: d.label,
    to: d.to,
  }));

  const isActiveLink = (to) => {
    if (!to) return false;

    // Normalize "home" links so both "/" and "/home" match
    if (to === "/") {
      return location.pathname === "/" || location.pathname === "/home";
    }

    // Handle temporary dashboard home
    if (to === "/temporary-savings") {
      return (
        location.pathname === "/temporary-savings" ||
        location.pathname === "/temporary/home"
      );
    }

    // Handle admin dashboard home
    if (to === "/admin") {
      return (
        location.pathname === "/admin" ||
        location.pathname === "/admin/home"
      );
    }

    // Generic match: exact or child paths
    return (
      location.pathname === to ||
      location.pathname.startsWith(to + "/")
    );
  };


  const sidebarStyleBase = {
    width: sizes.sidebarWidth,
    backgroundColor: colors.navy,
    color: colors.white,
    padding: "20px 0",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    minHeight: "100vh",
    overflowY: "auto", // internal scroll
  };

  return (
    <>
      <SidebarScrollStyle />
      <aside
        className="gs-sidebar"
        style={{
          ...sidebarStyleBase,
          position: isMobile ? "fixed" : "static",
          top: 0,
          left: 0,
          height: isMobile ? "100%" : "100vh",
          transform: isMobile ? transform : "none",
          transition: isMobile ? "transform 320ms cubic-bezier(.2,.9,.3,1)" : "none",
          zIndex: isMobile ? 1000 : "auto",
        }}
        aria-label="Main sidebar"
      >
        <ProfileHeader profile={profile} />

        <nav style={{ width: "100%", paddingTop: 8 }}>
          {linksToRender.map((link) => (
            <NavLinkItem
              key={link.to || link.text}
              text={link.text}
              to={link.to}
              onClick={onClose}
              isActive={isActiveLink(link.to)}
            />
          ))}

          <div style={{ paddingTop: 8 }}>
            {actionsToRender.map((btn, idx) => (
              <SidebarAction key={idx} text={btn.text} to={btn.to} onClose={onClose} />
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
