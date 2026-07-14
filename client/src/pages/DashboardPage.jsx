import { useState, useEffect } from 'react';
import StatCard           from '../components/dashboard/StatCard';
import MonthlyChart       from '../components/dashboard/MonthlyChart';
import CategoryChart      from '../components/dashboard/CategoryChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import { getSummary, getMonthlyData, getCategoryBreakdown } from '../api/analyticsApi';
import { getTransactions } from '../api/transactionsApi';
import { currentMonthYear } from '../utils/formatDate';
 
function DashboardPage() {
  // ── STATE ──────────────────────────────────────────
  // Each piece of data has its own state variable.
  // null = not loaded yet. {} or [] = loaded (possibly empty).
  const [summary,       setSummary]       = useState(null);
  const [monthlyData,   setMonthlyData]   = useState([]);
  const [categories,    setCategories]    = useState([]);
  const [recentTx,      setRecentTx]      = useState([]);
 
  // Loading state — true while any request is in-flight
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');
 
  // Current month and year for the summary and charts
  const { month, year } = currentMonthYear();
 
  // ── DATA FETCHING ──────────────────────────────────
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError('');
 
        // Fire all 4 requests in parallel using Promise.all
        // This is faster than awaiting them one by one.
        // If fetched sequentially: 4 × 100ms = 400ms
        // In parallel:             max(100ms) = 100ms
        const [summaryData, monthly, cats, recent] = await Promise.all([
          getSummary(month, year),
          getMonthlyData(year),
          getCategoryBreakdown(month, year),
          getTransactions({ limit: 3 }),
        ]);
 
        setSummary(summaryData);
        setMonthlyData(monthly);
        setCategories(cats);
        setRecentTx(recent.data);
 
      } catch (err) {
        setError('Failed to load dashboard: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
 
    loadDashboard();
  }, []); // [] — run once when the page mounts
 
  // ── RENDER ────────────────────────────────────────
  if (error) {
    return <div style={styles.error}>{error}</div>;
  }
 
  return (
    <div style={styles.page}>
 
      {/* Row 1: Three stat cards */}
      <div style={styles.statGrid}>
        <StatCard
          title='TOTAL INCOME'
          amount={summary?.total_income || 0}
          trend='+12% from last month'
          type='income'
          loading={loading}
        />
        <StatCard
          title='TOTAL EXPENSE'
          amount={summary?.total_expense || 0}
          trend='-4% from last month'
          type='expense'
          loading={loading}
        />
        <StatCard
          title='NET BALANCE'
          amount={summary?.net_balance || 0}
          trend='Stable overall trend'
          type='balance'
          loading={loading}
        />
      </div>
 
      {/* Row 2: Charts side by side */}
      <div style={styles.chartGrid}>
        <MonthlyChart  data={monthlyData} loading={loading} />
        <CategoryChart data={categories}  loading={loading} />
      </div>
 
      {/* Row 3: Recent transactions table */}
      <RecentTransactions transactions={recentTx} loading={loading} />
    </div>
  );
}
 
const styles = {
  page:      { display:'flex', flexDirection:'column', gap:24 },
  statGrid:  { display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 },
  chartGrid: { display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:20 },
  error:     { color:'var(--color-expense)', padding:20, background:'var(--color-surface)', borderRadius:'var(--radius-lg)' },
};
 
export default DashboardPage;
