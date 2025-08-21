import React, { useState, useEffect, useRef } from "react";
import { THEME } from "../theme";
import BaseDetailsPage from "./BaseDetailsPage"; // We'll create a base layout component

function DepositsDetailsPage() {
    const pageName = "Deposits";
    const statTitle = "Total Savings";
    const statValue = "UGX 15,000,000";

    const overviewGroup = {
        title: "Savings & Deposits",
        rows: [
            ["Savings this year", "UGX 15M"],
            ["Avg. monthly savings", "UGX 1.25M"],
            ["Earnings this year", "UGX 4M"],
            ["Avg. monthly earnings", "UGX 0.33M"],
          ],
    };

    const tableHeaders = ["Date", "Amount", "Source", "Account"];

    const allTransactions = [
        { id: 1, date: '2025-01-20', amount: 'UGX 500,000', source: 'Salary', account: 'Main Savings' },
        { id: 2, date: '2025-03-15', amount: 'UGX 1,200,000', source: 'Bonus', account: 'Main Savings' },
        { id: 3, date: '2025-08-12', amount: 'UGX 300,000', source: 'Mobile Money', account: 'Main Savings' },
        { id: 1, date: '2025-01-20', amount: 'UGX 500,000', source: 'Salary', account: 'Main Savings' },
        { id: 2, date: '2025-03-15', amount: 'UGX 1,200,000', source: 'Bonus', account: 'Main Savings' },
        { id: 3, date: '2025-08-12', amount: 'UGX 300,000', source: 'Mobile Money', account: 'Main Savings' },
        { id: 1, date: '2025-01-20', amount: 'UGX 500,000', source: 'Salary', account: 'Main Savings' },
        { id: 2, date: '2025-03-15', amount: 'UGX 1,200,000', source: 'Bonus', account: 'Main Savings' },
        { id: 3, date: '2025-08-12', amount: 'UGX 300,000', source: 'Mobile Money', account: 'Main Savings' },
        { id: 1, date: '2025-01-20', amount: 'UGX 500,000', source: 'Salary', account: 'Main Savings' },
        { id: 2, date: '2025-03-15', amount: 'UGX 1,200,000', source: 'Bonus', account: 'Main Savings' },
        { id: 3, date: '2025-08-12', amount: 'UGX 300,000', source: 'Mobile Money', account: 'Main Savings' },
        { id: 1, date: '2025-01-20', amount: 'UGX 500,000', source: 'Salary', account: 'Main Savings' },
        { id: 2, date: '2025-03-15', amount: 'UGX 1,200,000', source: 'Bonus', account: 'Main Savings' },
        { id: 3, date: '2025-08-12', amount: 'UGX 300,000', source: 'Mobile Money', account: 'Main Savings' },
        { id: 1, date: '2025-01-20', amount: 'UGX 500,000', source: 'Salary', account: 'Main Savings' },
        { id: 2, date: '2025-03-15', amount: 'UGX 1,200,000', source: 'Bonus', account: 'Main Savings' },
        { id: 3, date: '2025-08-12', amount: 'UGX 300,000', source: 'Mobile Money', account: 'Main Savings' },
        { id: 1, date: '2025-01-20', amount: 'UGX 500,000', source: 'Salary', account: 'Main Savings' },
        { id: 2, date: '2025-03-15', amount: 'UGX 1,200,000', source: 'Bonus', account: 'Main Savings' },
        { id: 3, date: '2025-08-12', amount: 'UGX 300,000', source: 'Mobile Money', account: 'Main Savings' },
        { id: 1, date: '2025-01-20', amount: 'UGX 500,000', source: 'Salary', account: 'Main Savings' },
        { id: 2, date: '2025-03-15', amount: 'UGX 1,200,000', source: 'Bonus', account: 'Main Savings' },
        { id: 3, date: '2025-08-12', amount: 'UGX 300,000', source: 'Mobile Money', account: 'Main Savings' },
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

export default DepositsDetailsPage;