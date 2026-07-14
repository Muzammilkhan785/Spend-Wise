// Props:
// data    — array: [{ category, amount, percentage, color }]
// loading — boolean
function SpendBreakdown({ data = [], loading }) {
  if (loading) {
    return <div style={{ ...styles.panel, height:300, opacity:0.4 }} />;
  }
 
  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>Spend Breakdown</h3>
 
      <div style={styles.list}>
        {data.map((item, i) => (
          <div key={i} style={styles.item}>
            {/* Category name and percentage on the same row */}
            <div style={styles.itemHeader}>
              <span style={styles.name}>{item.category}</span>
              <span style={styles.pct}>{item.percentage}%</span>
            </div>
 
            {/* Progress bar background */}
            <div style={styles.track}>
              {/* Filled portion — width is percentage% */}
              <div
                style={{
                  ...styles.fill,
                  width:      item.percentage + '%',
                  // Use the category color from DB, fallback to green
                  background: item.color || 'var(--color-primary)',
                  // Limit width to 100% in case of rounding errors
                  maxWidth:   '100%',
                }}
              />
            </div>
          </div>
        ))}
      </div>
 
      {/* Smart Saving suggestion box */}
      <div style={styles.smartSaving}>
        <div style={styles.smartHeader}>
          <span style={{ color:'var(--color-primary)', fontWeight:700, fontSize:15 }}>Smart Saving</span>
          <span style={{ color:'var(--color-income)', fontWeight:700 }}>+$4,200.00</span>
        </div>
        <p style={styles.smartText}>
          Based on your trends, you could save $140 by canceling unused subscriptions.
        </p>
        <button style={styles.smartLink}>View Recommendations →</button>
      </div>
    </div>
  );
}
 
const styles = {
  panel:       { background:'var(--color-surface)', borderRadius:'var(--radius-lg)', padding:24, border:'1px solid var(--color-border)' },
  title:       { fontSize:18, fontWeight:600, color:'var(--color-text)', marginBottom:20 },
  list:        { display:'flex', flexDirection:'column', gap:16 },
  item:        { display:'flex', flexDirection:'column', gap:6 },
  itemHeader:  { display:'flex', justifyContent:'space-between', alignItems:'center' },
  name:        { fontSize:14, color:'var(--color-text)' },
  pct:         { fontSize:14, fontWeight:600, color:'var(--color-text)' },
  track:       { height:6, background:'var(--color-surface-2)', borderRadius:3, overflow:'hidden' },
  fill:        { height:'100%', borderRadius:3, transition:'width 0.4s ease' },
  smartSaving: { marginTop:24, padding:16, background:'var(--color-surface-2)', borderRadius:'var(--radius)' },
  smartHeader: { display:'flex', justifyContent:'space-between', marginBottom:8 },
  smartText:   { fontSize:13, color:'var(--color-text-muted)', lineHeight:1.5, marginBottom:12 },
  smartLink:   { fontSize:13, color:'var(--color-primary)', fontWeight:600 },
};
 
export default SpendBreakdown;
