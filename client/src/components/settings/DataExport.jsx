import { FiDownload, FiTrash2 } from 'react-icons/fi';
import { exportTransactionsCSV } from '../../api/transactionsApi';
 
function DataExport() {
  const handleExport = () => {
    // Opens the CSV download in a new browser tab
    // The server sets Content-Disposition: attachment so the browser downloads it
    exportTransactionsCSV();
  };
 
  const handleClearCache = () => {
    // Clear any cached state — for now just refreshes the page
    // In a production app you would also clear React Query cache, localStorage, etc.
    if (window.confirm('Clear cache? The page will refresh.')) {
      window.location.reload();
    }
  };
 
  return (
    <div style={styles.panel}>
      <div style={styles.panelHeader}>
        <span style={{ color:'var(--color-primary)', fontSize:18 }}>&#8801;</span>
        <div>
          <h3 style={styles.panelTitle}>Data &amp; Export</h3>
          <p style={{ fontSize:12, color:'var(--color-text-muted)', marginTop:2 }}>
            Control your transaction history and data visibility settings.
          </p>
        </div>
      </div>
 
      <button style={styles.actionRow} onClick={handleExport}>
        <span style={styles.actionLabel}>Export Transaction CSV</span>
        <FiDownload size={18} color='var(--color-text-muted)' />
      </button>
 
      <button style={{ ...styles.actionRow, borderBottom:'none' }} onClick={handleClearCache}>
        <span style={styles.actionLabel}>Clear Cache</span>
        <FiTrash2 size={18} color='var(--color-text-muted)' />
      </button>
    </div>
  );
}
 
const styles = {
  panel:       { background:'var(--color-surface)', borderRadius:'var(--radius-lg)', border:'1px solid var(--color-border)', overflow:'hidden' },
  panelHeader: { display:'flex', gap:14, alignItems:'flex-start', padding:'20px 20px 16px 20px', borderBottom:'1px solid var(--color-border)' },
  panelTitle:  { fontSize:16, fontWeight:600, color:'var(--color-text)' },
  actionRow: {
    width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center',
    padding:'16px 20px', borderBottom:'1px solid var(--color-border)',
    background:'transparent', cursor:'pointer', textAlign:'left',
    transition:'background 0.15s',
  },
  actionLabel: { fontSize:14, color:'var(--color-text)' },
};
 
export default DataExport;
