import React from "react";
import BaseDetailsPage from "./BaseDetailsPage";

function ClubDepositsDetailsPage() {
    const pageName = "Club Deposits";
    const statTitle = "Club Total Savings";
    const statValue = "UGX 60,505,000";

    const overviewGroup = {
        title: "Club Deposits",
        rows: [
            ["Savings this year", "UGX 30M"],
            ["Earnings this year", "UGX 9M"],
            ["Loans this year", "UGX 25M"],
            ["Members", "30"],
          ],
    };

    const tableHeaders = ["Date", "Amount", "Contributor", "Reference"];

    const allTransactions = [
        { id: 1, date: '2025-02-10', amount: 'UGX 2,000,000', contributor: 'J. Doe', reference: 'INV-001' },
        { id: 2, date: '2025-02-11', amount: 'UGX 1,500,000', contributor: 'A. Smith', reference: 'INV-002' },
        { id: 3, date: '2025-08-05', amount: 'UGX 3,000,000', contributor: 'M. Jones', reference: 'INV-025' },
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

export default ClubDepositsDetailsPage;