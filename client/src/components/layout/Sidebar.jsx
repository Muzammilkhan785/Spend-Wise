import { NavLink, useNavigate } from 'react-router-dom';
import { FiGrid, FiList, FiSettings, FiHelpCircle, FiLogOut, FiPlus } from 'react-icons/fi';
 
// Props:
// onAddTransaction — function called when '+ Add Transaction' is clicked
function Sidebar({ onAddTransaction }) {
  const navigate = useNavigate();
 
  // Navigation items array — makes it easy to add more pages later
  const navItems = [
    { to: '/dashboard',    icon: FiGrid,     label: 'Dashboard'    },
    { to: '/transactions', icon: FiList,     label: 'Transactions' },
    { to: '/settings',     icon: FiSettings, label: 'Settings'     },
  ];
 
  return (
    <aside style={styles.sidebar}>
      {/* Brand Logo */}
      <div style={styles.brand}>
        <div style={styles.brandIcon}>
          <span style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: 14 }}>SW</span>
        </div>
        <div>
          <p style={{ fontWeight: 700, fontSize: 16, color: 'var(--color-text)' }}>SpendWise</p>
          <p style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>PERSONAL FINANCE</p>
        </div>
      </div>
 
      {/* Navigation Links */}
      <nav style={styles.nav}>
        {navItems.map((item) => (
          // NavLink is like <a> but adds an 'active' class when the URL matches
          // The className function receives { isActive } so we can style the active link
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              ...styles.navLink,
              backgroundColor: isActive ? 'var(--color-surface-2)' : 'transparent',
              color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
              borderLeft: isActive ? '3px solid var(--color-primary)' : '3px solid transparent',
            })}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
 
      {/* Add Transaction Button */}
      <button style={styles.addBtn} onClick={onAddTransaction}>
        <FiPlus size={16} />
        <span>Add Transaction</span>
      </button>
 
      {/* Bottom Links */}
      <div style={styles.bottom}>
        <button style={styles.bottomLink}>
          <FiHelpCircle size={16} />
          <span>Help</span>
        </button>
        <button style={styles.bottomLink}>
          <FiLogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
 
// Inline styles object — keeps styles co-located with the component
const styles = {
  sidebar: {
    width: 'var(--sidebar-width)',
    minHeight: '100vh',
    background: 'var(--color-surface)',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 0',
    position: 'fixed',
    left: 0, top: 0, bottom: 0,
    borderRight: '1px solid var(--color-border)',
    zIndex: 100,
  },
  brand: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '0 20px 24px 20px',
    borderBottom: '1px solid var(--color-border)',
    marginBottom: 16,
  },
  brandIcon: {
    width: 36, height: 36, borderRadius: 8,
    background: 'var(--color-surface-2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  nav: { flex: 1, padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 4 },
  navLink: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '10px 12px',
    borderRadius: 'var(--radius)',
    fontSize: 14, fontWeight: 500,
    transition: 'all 0.15s',
    textDecoration: 'none',
  },
  addBtn: {
    margin: '16px 12px',
    padding: '10px 16px',
    background: 'var(--color-primary)',
    color: '#fff',
    borderRadius: 'var(--radius)',
    display: 'flex', alignItems: 'center', gap: 8,
    fontSize: 14, fontWeight: 600,
    justifyContent: 'center',
    transition: 'background 0.15s',
  },
  bottom: { padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 4 },
  bottomLink: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '10px 12px',
    color: 'var(--color-text-muted)',
    borderRadius: 'var(--radius)',
    fontSize: 14,
  },
};
 
export default Sidebar;
