import React from "react";
import BaseDetailsPage from "./BaseDetailsPage";

function LoansDetailsPage() {
    const pageName = "Loans";
    const statTitle = "Your Debt";
    const statValue = "UGX 3,200,000";

    const overviewGroup = {
        title: "Loans Overview",
        rows: [
            ["Loans this year", "UGX 8M"],
            ["Interest paid", "UGX 0.8M"],
            ["Current interest due", "UGX 0.3M"],
            ["Loan limit", "UGX 12M"],
        ],
    };

    const tableHeaders = ["Date", "Amount", "Source", "Account"];

    const allTransactions = [
        { id: 1, date: '2023-02-10', amount: 'UGX 1,500,000', source: 'Bank X', account: 'Loan Acct 001' },
        { id: 2, date: '2024-01-15', amount: 'UGX 3,000,000', source: 'Bank A', account: 'Loan Acct 003' },
        { id: 3, date: '2025-01-15', amount: 'UGX 2,000,000', source: 'Bank A', account: 'Loan Acct 005' },
        { id: 4, date: '2025-03-20', amount: 'UGX 3,000,000', source: 'Bank B', account: 'Loan Acct 006' },
        { id: 5, date: '2025-08-10', amount: 'UGX 2,800,000', source: 'Bank C', account: 'Loan Acct 007' },
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

export default LoansDetailsPage;