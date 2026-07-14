// Props:
// settings  — { currency, timezone, push_notifications, email_reports }
// onChange  — called with { field, value } when any setting changes
function GeneralSettings({ settings, onChange }) {
  const currencies = ['USD','PKR','EUR','GBP','INR','AED','SAR'];
  const timezones  = [
    { value:'UTC',           label:'(UTC+00:00) Universal Time' },
    { value:'Asia/Karachi',  label:'(UTC+05:00) Islamabad, Karachi' },
    { value:'America/New_York', label:'(UTC-05:00) Eastern Time' },
    { value:'Europe/London', label:'(UTC+00:00) London' },
    { value:'Asia/Dubai',    label:'(UTC+04:00) Dubai' },
  ];
 
  return (
    <div style={styles.panel}>
      <div style={styles.panelHeader}>
        <span style={{ fontSize:18 }}>&#9881;</span>
        <h3 style={styles.panelTitle}>General Settings</h3>
      </div>
 
      {/* Currency and Timezone dropdowns in a 2-column grid */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
        <div>
          <label style={styles.label}>Default Currency</label>
          <select
            value={settings.currency || 'USD'}
            onChange={(e) => onChange({ field:'currency', value:e.target.value })}
            style={styles.select}
          >
            {currencies.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={styles.label}>Timezone</label>
          <select
            value={settings.timezone || 'UTC'}
            onChange={(e) => onChange({ field:'timezone', value:e.target.value })}
            style={styles.select}
          >
            {timezones.map((tz) => (
              <option key={tz.value} value={tz.value}>{tz.label}</option>
            ))}
          </select>
        </div>
      </div>
 
      {/* Toggle rows */}
      <ToggleRow
        label='Push Notifications'
        sub='Receive alerts for budget limits and unusual spending.'
        checked={settings.push_notifications ?? true}
        onChange={(v) => onChange({ field:'push_notifications', value:v })}
      />
      <ToggleRow
        label='Email Reports'
        sub='Weekly summaries of your financial health.'
        checked={settings.email_reports ?? false}
        onChange={(v) => onChange({ field:'email_reports', value:v })}
      />
    </div>
  );
}
 
// Reusable toggle row component (used only inside this file)
function ToggleRow({ label, sub, checked, onChange }) {
  return (
    <div style={styles.toggleRow}>
      <div>
        <p style={{ fontSize:14, fontWeight:500, color:'var(--color-text)' }}>{label}</p>
        <p style={{ fontSize:12, color:'var(--color-text-muted)', marginTop:2 }}>{sub}</p>
      </div>
      {/* CSS toggle switch */}
      <div
        style={{
          ...styles.toggle,
          background: checked ? 'var(--color-primary)' : 'var(--color-surface-3)',
        }}
        onClick={() => onChange(!checked)}
      >
        <div style={{
          ...styles.thumb,
          // Slide right when checked, left when unchecked
          transform: checked ? 'translateX(20px)' : 'translateX(2px)',
        }} />
      </div>
    </div>
  );
}
 
const styles = {
  panel:       { background:'var(--color-surface)', borderRadius:'var(--radius-lg)', padding:24, border:'1px solid var(--color-border)' },
  panelHeader: { display:'flex', alignItems:'center', gap:10, marginBottom:20 },
  panelTitle:  { fontSize:17, fontWeight:600, color:'var(--color-text)' },
  label:       { display:'block', fontSize:12, color:'var(--color-text-muted)', marginBottom:6 },
  select: {
    width:'100%', background:'var(--color-surface-2)',
    border:'1px solid var(--color-border)', borderRadius:'var(--radius)',
    padding:'10px 12px', color:'var(--color-text)', fontSize:14, cursor:'pointer',
  },
  toggleRow: { display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:20 },
  toggle:    { width:44, height:24, borderRadius:12, cursor:'pointer', transition:'background 0.2s', position:'relative', flexShrink:0 },
  thumb:     { width:20, height:20, borderRadius:'50%', background:'#fff', position:'absolute', top:2, transition:'transform 0.2s', boxShadow:'0 1px 3px rgba(0,0,0,0.3)' },
};
 
export default GeneralSettings;
