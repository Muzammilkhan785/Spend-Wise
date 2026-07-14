import { FiTrendingUp, FiTrendingDown, FiDollarSign } from 'react-icons/fi';
import { formatCurrency } from '../../utils/formatCurrency';
 
// Props:
// title   — 'TOTAL INCOME' | 'TOTAL EXPENSE' | 'NET BALANCE'
// amount  — number, e.g. 12450.00
// trend   — '+12% from last month'  (string)
// type    — 'income' | 'expense' | 'balance'  (controls colors)
// loading — boolean (shows skeleton while fetching)
function StatCard({ title, amount, trend, type = 'balance', loading }) {
  // Choose icon and color based on card type
  const config = {
    income:  { icon: FiTrendingUp,   color: 'var(--color-income)',  trendColor: 'var(--color-income)' },
    expense: { icon: FiTrendingDown,  color: 'var(--color-expense)', trendColor: 'var(--color-expense)' },
    balance: { icon: FiDollarSign,    color: 'var(--color-text)',    trendColor: 'var(--color-text-muted)' },
  };
  const { icon: Icon, color, trendColor } = config[type];
 
  if (loading) {
    return <div style={{ ...styles.card, ...styles.skeleton }} />;
  }
 
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <p style={styles.title}>{title}</p>
        <Icon size={20} color={color} />
      </div>
      <p style={{ ...styles.amount, color }}>
        {formatCurrency(amount)}
      </p>
      {trend && (
        <p style={{ ...styles.trend, color: trendColor }}>{trend}</p>
      )}
    </div>
  );
}
 
const styles = {
  card: {
    background: 'var(--color-surface)',
    borderRadius: 'var(--radius-lg)',
    padding: '24px',
    border: '1px solid var(--color-border)',
  },
  skeleton: {
    height: 120,
    animation: 'pulse 1.5s ease-in-out infinite',
    opacity: 0.4,
  },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  title: { fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)', letterSpacing: 1 },
  amount: { fontSize: 32, fontWeight: 700, marginBottom: 8 },
  trend: { fontSize: 13 },
};
 
export default StatCard;
