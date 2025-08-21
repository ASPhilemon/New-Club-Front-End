import React from "react";
import BaseDetailsPage from "./BaseDetailsPage";

function ClubEarningsDetailsPage() {
    const pageName = "Club Earnings";
    const statTitle = "Club Total Earnings";
    const statValue = "UGX 9,120,000";

    const overviewGroup = {
        title: "Club Earnings",
        rows: [
            ["Savings this year", "UGX 30M"],
            ["Earnings this year", "UGX 9M"],
            ["Loans this year", "UGX 25M"],
            ["Members", "30"],
          ],
    };

    const tableHeaders = ["Date", "Amount", "Description", "Source"];

    const allTransactions = [
        { id: 1, date: '2025-03-31', amount: 'UGX 1,500,000', description: 'Q1 Dividends', source: 'Stock Market' },
        { id: 2, date: '2025-06-30', amount: 'UGX 3,000,000', description: 'Q2 Dividends', source: 'Stock Market' },
    ];

    return (
        <BaseDetailsPage
            pageName={pageName}
            statTitle={statTitle}
            statValue={statValue}
            overviewGroup={overviewGroup}
            tableHeaders={tableHeaders}
            allTransactions={allTransactions}
        />
    );
}

export default ClubEarningsDetailsPage;