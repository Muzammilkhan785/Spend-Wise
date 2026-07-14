import { FiShield, FiClock } from 'react-icons/fi';
 
// This panel is display-only for now (biometric login requires auth phase)
function SecurityPanel() {
  return (
    <div style={styles.panel}>
      <div style={styles.panelHeader}>
        <FiShield size={18} color='var(--color-primary)' />
        <h3 style={styles.panelTitle}>Security</h3>
        <span style={styles.badge}>STRONG</span>
      </div>
 
      <div style={styles.row}>
        <div style={styles.iconCircle}>&#9664;</div>
        <div style={{ flex:1 }}>
          <p style={styles.rowTitle}>Biometric Login</p>
          <p style={styles.rowSub}>Enabled on 2 devices</p>
        </div>
        <button style={styles.manageBtn}>Manage</button>
      </div>
 
      <div style={styles.row}>
        <div style={styles.iconCircle}><FiClock size={16} /></div>
        <div>
          <p style={styles.rowTitle}>Last Activity</p>
          <p style={styles.rowSub}>Today, 2:45 PM (Lahore, PK)</p>
        </div>
      </div>
    </div>
  );
}
 
const styles = {
  panel:      { background:'var(--color-surface)', borderRadius:'var(--radius-lg)', border:'1px solid var(--color-border)', overflow:'hidden' },
  panelHeader:{ display:'flex', alignItems:'center', gap:10, padding:'20px 20px 16px 20px', borderBottom:'1px solid var(--color-border)' },
  panelTitle: { fontSize:16, fontWeight:600, color:'var(--color-text)', flex:1 },
  badge:      { fontSize:11, fontWeight:700, color:'var(--color-primary)', background:'rgba(16,185,129,0.1)', padding:'3px 8px', borderRadius:20, letterSpacing:1 },
  row:        { display:'flex', alignItems:'center', gap:12, padding:'16px 20px', borderBottom:'1px solid var(--color-border)' },
  iconCircle: { width:36, height:36, borderRadius:8, background:'var(--color-surface-2)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--color-text-muted)', flexShrink:0 },
  rowTitle:   { fontSize:14, fontWeight:500, color:'var(--color-text)' },
  rowSub:     { fontSize:12, color:'var(--color-text-muted)', marginTop:2 },
  manageBtn:  { fontSize:13, fontWeight:600, color:'var(--color-primary)', padding:'6px 12px', borderRadius:6, background:'transparent' },
};
 
export default SecurityPanel;
