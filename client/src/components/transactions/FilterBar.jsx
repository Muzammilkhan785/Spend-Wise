// Props:
// activeFilter — 'all' | 'income' | 'expense'
// onFilterChange — function called with the new filter value
function FilterBar({ activeFilter = 'all', onFilterChange }) {
  const filters = [
    { value: 'all',     label: 'All Types' },
    { value: 'income',  label: 'Income'    },
    { value: 'expense', label: 'Expense'   },
  ];
 
  return (
    <div style={styles.bar}>
      <span style={styles.label}>FILTERS</span>
      <div style={styles.buttons}>
        {filters.map((f) => (
          <button
            key={f.value}
            style={{
              ...styles.btn,
              // Active button: green border + green text
              // Inactive: subtle border + muted text
              border: activeFilter === f.value
                ? '1px solid var(--color-primary)'
                : '1px solid var(--color-border)',
              color: activeFilter === f.value
                ? 'var(--color-primary)'
                : 'var(--color-text-muted)',
              background: activeFilter === f.value
                ? 'rgba(16,185,129,0.1)'   // Transparent green tint
                : 'transparent',
            }}
            onClick={() => onFilterChange(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
 
const styles = {
  bar:     { display:'flex', alignItems:'center', gap:16 },
  label:   { fontSize:12, fontWeight:600, color:'var(--color-text-faint)', letterSpacing:1 },
  buttons: { display:'flex', gap:8 },
  btn: {
    padding:'6px 16px', borderRadius:20, fontSize:13, fontWeight:500,
    cursor:'pointer', transition:'all 0.15s',
  },
};
 
export default FilterBar;
