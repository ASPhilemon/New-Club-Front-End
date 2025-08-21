import React, { useState, useEffect, useRef } from "react";
import { THEME } from "../theme";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import ScrollContainer from "../components/layout/ScrollContainer";
import MobileNavMenu from "../components/common/MobileNavMenu";
import DetailsCard from "../components/details/DetailsCard";
import StatCard from "../components/common/StatCard";
import DetailsWelcomeMessage from "../components/details/DetailsWelcomeMessage";
import DetailsOverviewSection from "../components/details/DetailsOverviewSection";

function BaseDetailsPage({ pageName, statTitle, statValue, overviewGroup, tableHeaders, allTransactions, formatTotal }) {
    const { colors, spacing, sizes } = THEME;
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [innerHeight, setInnerHeight] = useState(sizes.minInnerHeight);
    const [selectedYear, setSelectedYear] = useState(2025);
    const headerRef = useRef(null);
    const sectionBarRef = useRef(null);

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    useEffect(() => {
        if (isMobile) {
            function computeInnerHeight() {
                const h = headerRef.current?.offsetHeight || sizes.headerHeight;
                const s = sectionBarRef.current?.offsetHeight || 50;
                const pad = spacing.pagePadding * 2;
                const newHeight = Math.max(sizes.minInnerHeight, window.innerHeight - h - s - pad);
                setInnerHeight(newHeight);
            }
            const t = setTimeout(computeInnerHeight, 50);
            window.addEventListener("resize", computeInnerHeight);
            return () => { clearTimeout(t); window.removeEventListener("resize", computeInnerHeight); };
        }
    }, [isMobile, spacing.pagePadding, sizes.headerHeight, sizes.minInnerHeight]);

    const years = [2023, 2024, 2025];
    const filteredTransactions = allTransactions.filter((t) => t.date.startsWith(selectedYear.toString()));
    
    const totalValue = filteredTransactions.reduce((sum, t) => {
        const valueKey = Object.keys(t)[1];
        const value = t[valueKey];
        if (typeof value === 'string' && value.startsWith('UGX')) {
            return sum + parseInt(value.replace(/UGX |,/g, ""));
        } else if (typeof value === 'string' && value.includes('pts')) {
            return sum + parseInt(value.replace(/pts|,/g, ""));
        }
        return sum + (parseInt(value) || 0);
    }, 0);

    const formattedTotal = formatTotal ? formatTotal(totalValue) : `UGX ${totalValue.toLocaleString()}`;

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const sidebarTransform = isSidebarOpen ? "translateX(0)" : "translateX(-100%)";
    
    // Updated menu items to include routes for navigation
    const menuItems = [
        { text: "Deposits", to: "/deposits" },
        { text: "Earnings", to: "/earnings" },
        { text: "Loans", to: "/loans" },
        { text: "Points", to: "/points" },
        { text: "Discounts", to: "/discounts" },
        { text: "Club Deposits", to: "/club-deposits" },
        { text: "Club Earnings", to: "/club-earnings" },
    ];

    return (
        <div style={{ minHeight: "100vh", backgroundColor: colors.lightGray, display: "flex", overflow: 'hidden' }}>
            <Sidebar isMobile={isMobile} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} transform={sidebarTransform} />
            {isMobile && isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.45)", zIndex: 999 }} />}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", height: '100vh' }}>
                <Header isMobile={isMobile} onToggle={toggleSidebar} headerRef={headerRef} />
                {isMobile ? (
                    <>
                        <div ref={sectionBarRef} className="mobile-nav-container" style={{ backgroundColor: colors.lightGray }}>
                            <MobileNavMenu items={menuItems} activeItem={pageName} />
                        </div>
                        <div style={{margin: "0 2vw", height: "100%"}}>
                            <DetailsCard isMobile={isMobile} selectedYear={selectedYear} onYearChange={(e) => setSelectedYear(parseInt(e.target.value))} years={years} total={formattedTotal} transactions={filteredTransactions} tableHeaders={tableHeaders} />
                        </div>
                    </>
                ) : (
                    <main style={{ padding: 20, flex: 1, overflow: 'hidden' }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 20, height: "100%" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: spacing.gap }}>
                                <div>
                                    <DetailsWelcomeMessage pageName={pageName} />
                                    <StatCard title={statTitle} value={statValue} />
                                </div>
                                <DetailsOverviewSection isMobile={false} overviewGroup={overviewGroup} />
                            </div>
                            <div>
                                <DetailsCard isMobile={false} selectedYear={selectedYear} onYearChange={(e) => setSelectedYear(parseInt(e.target.value))} years={years} total={formattedTotal} transactions={filteredTransactions} tableHeaders={tableHeaders} />
                            </div>
                        </div>
                    </main>
                )}
            </div>
        </div>
    );
}

export default BaseDetailsPage;