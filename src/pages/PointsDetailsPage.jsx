import React from "react";
import BaseDetailsPage from "./BaseDetailsPage";

function PointsDetailsPage() {
    const pageName = "Points";
    const statTitle = "Your Points";
    const statValue = "1,250 pts";

    const overviewGroup = {
        title: "Points Summary",
        rows: [
            ["Points earned this year", "800"],
            ["Points redeemed", "250"],
            ["Cash equivalent", "UGX 125,000"],
            ["Next reward tier", "1,500 pts"],
        ],
    };

    const tableHeaders = ["Date", "Points", "Activity", "Status"];

    const allTransactions = [
        { id: 1, date: '2025-01-31', points: '+100', activity: 'Monthly Savings Goal', status: 'Awarded' },
        { id: 2, date: '2025-05-10', points: '-250', activity: 'Fee Discount', status: 'Redeemed' },
        { id: 3, date: '2025-08-01', points: '+50', activity: 'Loan Repayment', status: 'Awarded' },
    ];

    return (
        <BaseDetailsPage
            pageName={pageName}
            statTitle={statTitle}
            statValue={statValue}
            overviewGroup={overviewGroup}
            tableHeaders={tableHeaders}
            allTransactions={allTransactions}
            // Points don't have a UGX total, so we can override the total display
            formatTotal={(total) => `${total.toLocaleString()} pts`}
        />
    );
}

export default PointsDetailsPage;