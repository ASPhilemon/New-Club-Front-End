// src/pages/SavingsDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import StatsSection from "../components/dashboard/StatsSection";

const temporaryLinks = [
  { text: "Home", to: "/savings" },
  { text: "My Contributions", to: "/savings/contributions" },
  { text: "Withdrawals", to: "/savings/withdrawals" },
  { text: "Goals", to: "/savings/goals" },
];

const temporaryStats = [
    { title: "Target Savings", value: "UGX 5,000,000" },
    { title: "Saved So Far", value: "UGX 2,200,000" },
    { title: "Remaining Balance", value: "UGX 2,800,000" },
    { title: "Progress", value: "44%" },
  ];
  
const temporaryOverviewGroups = [
  {
    title: "My Contributions",
    rows: [
      ["This year", "UGX 5M"],
      ["This month", "UGX 600K"],
      ["Last month", "UGX 550K"],
    ],
  },
  {
    title: "Withdrawals",
    rows: [
      ["This year", "UGX 1M"],
      ["Pending", "UGX 200K"],
    ],
  },
];

function SavingsDashboard({ }) {
    
  const navigate = useNavigate();

  return (
<DashboardLayout
  StatsComponent={(props) => (
    <StatsSection {...props} statsData={temporaryStats} userName="Mwebe" />
  )}
  navLinks={temporaryLinks}
  overviewGroups={temporaryOverviewGroups}
  dashboard="temporary"
/>

  );
}

export default SavingsDashboard;
