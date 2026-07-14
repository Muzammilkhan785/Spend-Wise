import { useNavigate } from 'react-router-dom';
import { getCategoryIcon } from '../../utils/categoryIcons';
import { formatDate } from '../../utils/formatDate';
import { formatCurrency } from '../../utils/formatCurrency';
 
// Props:
// transactions — array of the 3 most recent transactions
// loading — boolean
function RecentTransactions({ transactions = [], loading }) {
  const navigate = useNavigate();
 
  if (loading) {
    return <div style={{ ...styles.card, height: 200, opacity: 0.4 }} />;
  }
 
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>Recent Transactions</h3>
        <button
          style={styles.viewAll}
          onClick={() => navigate('/transactions')}
        >
          View All
        </button>
      </div>
 
      {/* Table header row */}
      <div style={styles.tableHeader}>
        <span style={styles.th}>DESCRIPTION</span>
        <span style={styles.th}>CATEGORY</span>
        <span style={styles.th}>DATE</span>
        <span style={{ ...styles.th, textAlign: 'right' }}>AMOUNT</span>
      </div>
 
      {/* Transaction rows */}
      {transactions.map((tx) => {
        const Icon = getCategoryIcon(tx.category_icon);
        const isExpense = tx.type === 'expense';
        return (
          <div key={tx.id} style={styles.row}>
            <div style={styles.descCell}>
              <div style={styles.iconWrap}><Icon size={16} /></div>
              <span style={styles.desc}>{tx.description}</span>
            </div>
            <span style={styles.category}>{tx.category_name}</span>
            <span style={styles.date}>{formatDate(tx.transaction_date, 'short')}</span>
            <span style={{
              ...styles.amount,
              color: isExpense ? 'var(--color-expense)' : 'var(--color-income)',
            }}>
              {isExpense ? '-' : '+'}{formatCurrency(tx.amount)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
 
const styles = {
  card: { background:'var(--color-surface)', borderRadius:'var(--radius-lg)', padding:24, border:'1px solid var(--color-border)' },
  header: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 },
  title: { fontSize:18, fontWeight:600, color:'var(--color-text)' },
  viewAll: { fontSize:13, color:'var(--color-text-muted)', cursor:'pointer' },
  tableHeader: { display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:12, padding:'8px 0', borderBottom:'1px solid var(--color-border)', marginBottom:8 },
  th: { fontSize:11, fontWeight:600, color:'var(--color-text-faint)', letterSpacing:0.8 },
  row: { display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:12, padding:'14px 0', borderBottom:'1px solid var(--color-border)', alignItems:'center' },
  descCell: { display:'flex', alignItems:'center', gap:10 },
  iconWrap: { width:32, height:32, borderRadius:8, background:'var(--color-surface-2)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--color-primary)', flexShrink:0 },
  desc: { fontSize:14, fontWeight:500, color:'var(--color-text)' },
  category: { fontSize:13, color:'var(--color-text-muted)' },
  date: { fontSize:13, color:'var(--color-text-muted)' },
  amount: { fontSize:14, fontWeight:600, textAlign:'right' },
};
 
export default RecentTransactions;
