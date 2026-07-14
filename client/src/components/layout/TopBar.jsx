import { FiBell, FiHelpCircle } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
 
function TopBar() {
  // useLocation() returns the current URL info
  // We use it to display the correct page title in the topbar
  const { pathname } = useLocation();
 
  // Map URL path to human-readable page title
  const titles = {
    '/dashboard':    'Dashboard',
    '/transactions': 'Transaction History',
    '/settings':     'Settings',
  };
  const title = titles[pathname] || 'SpendWise';
 
  return (
    <header style={styles.topbar}>
      <h1 style={styles.title}>{title}</h1>
 
      <div style={styles.right}>
        {/* Search bar — visual only for now, not wired to API */}
        <input
          style={styles.search}
          placeholder='Search transactions...'
          type='text'
        />
        <button style={styles.iconBtn}><FiBell size={20} /></button>
        <button style={styles.iconBtn}><FiHelpCircle size={20} /></button>
        {/* Avatar circle with initials */}
        <div style={styles.avatar}>TU</div>
      </div>
    </header>
  );
}
 
const styles = {
  topbar: {
    height: 'var(--topbar-height)',
    background: 'var(--color-surface)',
    borderBottom: '1px solid var(--color-border)',
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 28px',
    position: 'sticky',        // Sticks to top of its scroll container
    top: 0, zIndex: 50,
  },
  title: { fontSize: 20, fontWeight: 700, color: 'var(--color-text)' },
  right: { display: 'flex', alignItems: 'center', gap: 12 },
  search: {
    background: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius)',
    padding: '8px 14px',
    color: 'var(--color-text)',
    fontSize: 14, width: 220,
  },
  iconBtn: { color: 'var(--color-text-muted)', padding: 6, borderRadius: 6 },
  avatar: {
    width: 36, height: 36, borderRadius: '50%',
    background: 'var(--color-surface-3)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 13, fontWeight: 700, color: 'var(--color-text)',
  },
};
 
export default TopBar;
