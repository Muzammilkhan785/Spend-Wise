import { getCategoryIcon } from '../../utils/categoryIcons';
import { formatDate }      from '../../utils/formatDate';
import { formatCurrency }  from '../../utils/formatCurrency';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';
 
// Props:
// transaction — full transaction object from the API
// onDelete    — called with transaction.id when delete is clicked
// onEdit      — called with transaction when edit is clicked
function TransactionRow({ transaction: tx, onDelete, onEdit }) {
  const Icon      = getCategoryIcon(tx.category_icon);
  const isExpense = tx.type === 'expense';
 
  return (
    <div style={styles.row}>
      {/* Icon circle */}
      <div style={styles.iconWrap}>
        <Icon size={18} color='var(--color-primary)' />
      </div>
 
      {/* Description + sub-label */}
      <div style={styles.descCol}>
        <p style={styles.desc}>{tx.description}</p>
        <p style={styles.sub}>{tx.category_name}</p>
      </div>
 
      {/* Date */}
      <span style={styles.date}>{formatDate(tx.transaction_date, 'short')}</span>
 
      {/* Category badge */}
      <span style={{
        ...styles.badge,
        // Use the category color from the database for the badge background
        background: (tx.category_color || '#374151') + '33', // 33 = 20% opacity in hex
        color:       tx.category_color || 'var(--color-text-muted)',
      }}>
        {tx.category_name?.toUpperCase()}
      </span>
 
      {/* Amount — red for expense, green for income */}
      <span style={{
        ...styles.amount,
        color: isExpense ? 'var(--color-expense)' : 'var(--color-income)',
      }}>
        {isExpense ? '-' : '+'}{formatCurrency(tx.amount)}
      </span>
 
      {/* Action buttons — shown on hover via CSS */}
      <div style={styles.actions}>
        <button style={styles.actionBtn} onClick={() => onEdit(tx)} title='Edit'>
          <FiEdit2 size={14} />
        </button>
        <button
          style={{ ...styles.actionBtn, color: 'var(--color-expense)' }}
          onClick={() => {
            if (window.confirm('Delete this transaction?')) onDelete(tx.id);
          }}
          title='Delete'
        >
          <FiTrash2 size={14} />
        </button>
      </div>
    </div>
  );
}
 
const styles = {
  row: {
    display: 'grid',
    // icon | description | date | badge | amount | actions
    gridTemplateColumns: '44px 1fr 120px 160px 130px 70px',
    alignItems: 'center',
    gap: 12,
    padding: '16px 20px',
    borderBottom: '1px solid var(--color-border)',
    transition: 'background 0.1s',
  },
  iconWrap: {
    width:40, height:40, borderRadius:'var(--radius)',
    background:'var(--color-surface-2)',
    display:'flex', alignItems:'center', justifyContent:'center',
    flexShrink:0,
  },
  descCol:  { minWidth:0 },  // minWidth:0 lets text truncate inside flex/grid
  desc:     { fontSize:14, fontWeight:500, color:'var(--color-text)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' },
  sub:      { fontSize:12, color:'var(--color-text-muted)', marginTop:2 },
  date:     { fontSize:13, color:'var(--color-text-muted)' },
  badge: {
    display:'inline-block', padding:'3px 10px',
    borderRadius:20, fontSize:11, fontWeight:600, letterSpacing:0.5,
    whiteSpace:'nowrap',
  },
  amount:   { fontSize:14, fontWeight:700, textAlign:'right' },
  actions:  { display:'flex', gap:4, justifyContent:'flex-end' },
  actionBtn:{ padding:6, borderRadius:6, color:'var(--color-text-muted)', transition:'color 0.15s' },
};
 
export default TransactionRow;
