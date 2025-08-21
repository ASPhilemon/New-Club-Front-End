// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import PageFade from "./components/animations/PageFade";

import MemberDashboard from "./pages/MemberDashboard";
import SavingsDashboard from "./pages/SavingsDashboard";

// Import all page components
import LoansDetailsPage from "./pages/LoansDetailsPage";
import DepositsDetailsPage from "./pages/DepositsDetailsPage";
import EarningsDetailsPage from "./pages/EarningsDetailsPage";
import PointsDetailsPage from "./pages/PointsDetailsPage";
import DiscountsDetailsPage from "./pages/DiscountsDetailsPage";
import ClubDepositsDetailsPage from "./pages/ClubDepositsDetailsPage";
import ClubEarningsDetailsPage from "./pages/ClubEarningsDetailsPage";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    // AnimatePresence wraps the route tree and enables exit animations.
    // `mode="wait"` ensures exit animation completes before a new route enters.
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {/* Main Dashboard Route */}
        <Route path="/" element={<PageFade><MemberDashboard /></PageFade>} />
        <Route path="/temporary-savings" element={<PageFade><SavingsDashboard /></PageFade>} />

        {/* All Details Page Routes */}
        <Route path="/loans" element={<PageFade><LoansDetailsPage /></PageFade>} />
        <Route path="/deposits" element={<PageFade><DepositsDetailsPage /></PageFade>} />
        <Route path="/earnings" element={<PageFade><EarningsDetailsPage /></PageFade>} />
        <Route path="/points" element={<PageFade><PointsDetailsPage /></PageFade>} />
        <Route path="/discounts" element={<PageFade><DiscountsDetailsPage /></PageFade>} />
        <Route path="/club-deposits" element={<PageFade><ClubDepositsDetailsPage /></PageFade>} />
        <Route path="/club-earnings" element={<PageFade><ClubEarningsDetailsPage /></PageFade>} />

        {/* A default route for home */}
        <Route path="/home" element={<PageFade><MemberDashboard /></PageFade>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}
