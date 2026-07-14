import { useState, useEffect } from 'react';
import GeneralSettings  from '../components/settings/GeneralSettings';
import AppearancePanel  from '../components/settings/AppearancePanel';
import DataExport       from '../components/settings/DataExport';
import SecurityPanel    from '../components/settings/SecurityPanel';
import { getSettings, updateSettings } from '../api/settingsApi';
 
function SettingsPage() {
  // Settings loaded from the server
  const [settings, setSettings] = useState({
    currency:           'USD',
    timezone:           'UTC',
    theme:              'dark',
    push_notifications: true,
    email_reports:      false,
    high_contrast:      false,
  });
 
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [saved,    setSaved]    = useState(false);  // Show 'Saved!' feedback
  const [error,    setError]    = useState('');
 
  // Load settings when page mounts
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getSettings();
        setSettings(data);
      } catch (err) {
        setError('Failed to load settings: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);
 
  // Handle individual field changes from child components
  // Each child calls onChange({ field: 'currency', value: 'PKR' })
  const handleChange = ({ field, value }) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setSaved(false);  // Hide 'Saved!' when user makes a new change
  };
 
  // Save all settings at once
  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      await updateSettings(settings);
      setSaved(true);
      // Hide the success message after 3 seconds
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError('Failed to save: ' + err.message);
    } finally {
      setSaving(false);
    }
  };
 
  if (loading) {
    return <div style={{ color:'var(--color-text-muted)', padding:40 }}>Loading settings...</div>;
  }
 
  return (
    <div style={styles.page}>
      <div style={styles.pageHeader}>
        <h1 style={styles.h1}>Preferences</h1>
        <p style={styles.sub}>Manage your account settings, currency preferences, and interface appearance.</p>
      </div>
 
      {/* Top row: General (wider) + Appearance (narrower) */}
      <div style={styles.topGrid}>
        <GeneralSettings settings={settings} onChange={handleChange} />
        <AppearancePanel
          theme={settings.theme}
          highContrast={settings.high_contrast}
          onChange={handleChange}
        />
      </div>
 
      {/* SpendWise Premium upsell banner */}
      <div style={styles.premiumBanner}>
        <div style={{ display:'flex', alignItems:'center', gap:16 }}>
          <span style={{ fontSize:28 }}>&#10024;</span>
          <div>
            <p style={{ fontSize:16, fontWeight:600, color:'var(--color-text)' }}>SpendWise Premium</p>
            <p style={{ fontSize:13, color:'var(--color-text-muted)', marginTop:2 }}>
              Unlock advanced analytics, multi-currency wallets, and collaborative budgeting.
            </p>
          </div>
        </div>
        <button style={styles.upgradeBtn}>Upgrade Plan</button>
      </div>
 
      {/* Bottom row: Data & Export + Security */}
      <div style={styles.bottomGrid}>
        <DataExport />
        <SecurityPanel />
      </div>
 
      {/* Fixed bottom action bar */}
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.actionBar}>
        <button style={styles.cancelBtn} onClick={() => window.history.back()}>
          Cancel Changes
        </button>
        <button
          style={{ ...styles.saveBtn, opacity: saving ? 0.7 : 1 }}
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Preferences'}
        </button>
      </div>
    </div>
  );
}
 
const styles = {
  page:          { display:'flex', flexDirection:'column', gap:24 },
  pageHeader:    { marginBottom:4 },
  h1:            { fontSize:24, fontWeight:700, color:'var(--color-text)' },
  sub:           { fontSize:14, color:'var(--color-text-muted)', marginTop:6 },
  topGrid:       { display:'grid', gridTemplateColumns:'1.3fr 1fr', gap:20 },
  bottomGrid:    { display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 },
  premiumBanner: { background:'var(--color-surface)', border:'1px solid var(--color-border)', borderRadius:'var(--radius-lg)', padding:24, display:'flex', justifyContent:'space-between', alignItems:'center' },
  upgradeBtn:    { padding:'10px 24px', background:'var(--color-text)', color:'var(--color-bg)', borderRadius:'var(--radius)', fontWeight:600, fontSize:14, cursor:'pointer' },
  error:         { color:'var(--color-expense)', fontSize:13 },
  actionBar:     { display:'flex', justifyContent:'flex-end', gap:12, paddingTop:8, borderTop:'1px solid var(--color-border)', marginTop:8 },
  cancelBtn:     { padding:'10px 24px', fontSize:14, color:'var(--color-text-muted)', cursor:'pointer', borderRadius:'var(--radius)' },
  saveBtn:       { padding:'10px 28px', background:'var(--color-text)', color:'var(--color-bg)', borderRadius:'var(--radius)', fontSize:14, fontWeight:600, cursor:'pointer', transition:'opacity 0.15s' },
};
 
export default SettingsPage;
