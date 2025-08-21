import React from "react";
import BaseDetailsPage from "./BaseDetailsPage";

function EarningsDetailsPage() {
    const pageName = "Earnings";
    const statTitle = "Total Earnings";
    const statValue = "UGX 4,250,000";

    const overviewGroup = {
        title: "Earnings Overview",
        rows: [
            ["Savings this year", "UGX 15M"],
            ["Avg. monthly savings", "UGX 1.25M"],
            ["Earnings this year", "UGX 4M"],
            ["Avg. monthly earnings", "UGX 0.33M"],
          ],
    };

    const tableHeaders = ["Date", "Amount", "Description", "Account"];

    const allTransactions = [
        { id: 1, date: '2025-02-28', amount: 'UGX 150,000', description: 'Monthly Interest', account: 'Main Savings' },
        { id: 2, date: '2025-06-30', amount: 'UGX 400,000', description: 'Dividend Payout', account: 'Investment Acct' },
        { id: 3, date: '2025-07-31', amount: 'UGX 180,000', description: 'Monthly Interest', account: 'Main Savings' },
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

export default EarningsDetailsPage;