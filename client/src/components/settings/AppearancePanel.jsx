import { useEffect } from 'react';

// Props:
// theme       — 'light' | 'dark'
// highContrast— boolean
// onChange    — called with { field, value }
function AppearancePanel({ theme = 'dark', highContrast = false, onChange }) {
  // Apply theme to the HTML root element so CSS [data-theme] selector takes effect
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [theme]);

  return (
    <div style={styles.panel}>
      <div style={styles.panelHeader}>
        <span style={{ fontSize:18 }}>&#127760;</span>
        <h3 style={styles.panelTitle}>Appearance</h3>
      </div>
      <p style={{ fontSize:13, color:'var(--color-text-muted)', marginBottom:16 }}>
        Select your preferred interface theme
      </p>
 
      {/* Theme cards */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:20 }}>
        {['light','dark'].map((t) => (
          <button
            key={t}
            type='button'
            onClick={() => onChange({ field:'theme', value:t })}
            style={{
              ...styles.themeCard,
              border: theme === t
                ? '2px solid var(--color-primary)'
                : '2px solid var(--color-border)',
            }}
          >
            {/* Mini preview of the theme */}
            <div style={{
              width:'100%', height:60, borderRadius:6, marginBottom:10,
              background: t === 'dark' ? '#1f2937' : '#f3f4f6',
              border: '1px solid var(--color-border)',
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              <div style={{ width:20, height:20, borderRadius:'50%', background: t==='dark'?'var(--color-primary)':'#10b981' }} />
            </div>
            <span style={{ fontSize:13, color:'var(--color-text)', fontWeight: theme===t?600:400 }}>
              {t.charAt(0).toUpperCase() + t.slice(1)} Mode
            </span>
          </button>
        ))}
      </div>
 
      {/* High contrast toggle */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ fontSize:14, color:'var(--color-text)' }}>&#9680; High Contrast</span>
        <div
          style={{
            width:44, height:24, borderRadius:12, cursor:'pointer',
            background: highContrast ? 'var(--color-primary)' : 'var(--color-surface-3)',
            position:'relative', transition:'background 0.2s',
          }}
          onClick={() => onChange({ field:'high_contrast', value:!highContrast })}
        >
          <div style={{
            width:20, height:20, borderRadius:'50%', background:'#fff',
            position:'absolute', top:2, transition:'transform 0.2s',
            transform: highContrast ? 'translateX(20px)' : 'translateX(2px)',
          }} />
        </div>
      </div>
    </div>
  );
}
 
const styles = {
  panel:       { background:'var(--color-surface)', borderRadius:'var(--radius-lg)', padding:24, border:'1px solid var(--color-border)' },
  panelHeader: { display:'flex', alignItems:'center', gap:10, marginBottom:12 },
  panelTitle:  { fontSize:17, fontWeight:600, color:'var(--color-text)' },
  themeCard:   { background:'var(--color-surface-2)', borderRadius:'var(--radius)', padding:16, cursor:'pointer', textAlign:'center', transition:'border 0.15s' },
};
 
export default AppearancePanel;
