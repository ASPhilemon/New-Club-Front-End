import React from "react";
import { THEME } from "../../theme";
import YearTotalSelector from "../common/YearTotalSelector";
import TransactionRow from "./TransactionRow";
import { height } from "@fortawesome/free-solid-svg-icons/fa0";

const { colors, spacing, divider } = THEME;

function TransactionsTable({ headers = [], transactions = [] }) {
  // base per-column min width (adjust to taste)
  const perColMin = 180;
  const minTableWidth = headers.length * perColMin;

  return (
    <div style={{ marginTop: 16, overflow: "auto", maxWidth: "92vw", maxHeight: "90vh"}}>
      <table
        role="table"
        style={{ width: "100%", borderCollapse: "collapse", whiteSpace: "nowrap" }}
      >
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th
                key={header}
                style={{
                  textAlign: "left",
                  padding: "12px 14px",
                  fontWeight: 800,
                  fontSize: 14,
                  backgroundColor: colors.navy,
                  color: colors.gold,
                  borderBottom: `3px solid ${colors.gold}`, // thicker bottom border
                  borderRight: i < headers.length - 1 ? `1px solid ${divider}` : "none",
                  whiteSpace: "nowrap",
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {transactions.map((t, i) => (
            <TransactionRow key={i} data={t} index={i} columns={headers.length} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DetailsCard({ isMobile, selectedYear, onYearChange, years, total, transactions, tableHeaders }) {
  const largeCardBase = {
    backgroundColor: colors.white,
    padding: spacing.cardPadding,
    borderRadius: 10,
    boxShadow: "0 3px 8px rgba(0,0,0,0.06)",
    border: `1px solid ${divider}`,
    boxSizing: "border-box",
  };

  return (
    <section style={{ ...largeCardBase, height: "100%", padding: "2vw" }}>
      <div style={{ marginBottom: 12 }}>
        <YearTotalSelector selectedYear={selectedYear} total={total} years={years} onYearChange={onYearChange} />
      </div>
      <TransactionsTable headers={tableHeaders} transactions={transactions} />
    </section>
  );
}

export default DetailsCard;