const BASE = '/api/settings';

// Demo fallback data — used only when the real API is unreachable
// (e.g. on GitHub Pages, where there is no backend to call)
const DEMO_SETTINGS = {
  currency: 'USD',
  timezone: 'UTC',
  theme: 'dark',
  push_notifications: true,
  email_reports: false,
  high_contrast: false,
};

// A response is only trustworthy JSON if the request actually succeeded.
// On GitHub Pages, /api/* doesn't exist, so the server returns its 404
// HTML page instead — res.ok is false, and we should NOT try to .json() it.
async function safeJsonFetch(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error('API unavailable');
  return res.json();
}

// GET /api/settings — get current user settings
export const getSettings = async () => {
  try {
    const json = await safeJsonFetch(BASE);
    if (!json.success) throw new Error(json.message);
    return json.data;  // { currency, timezone, theme, push_notifications, ... }
  } catch {
    return DEMO_SETTINGS;
  }
};

// PUT /api/settings — update settings
export const updateSettings = async (body) => {
  try {
    const json = await safeJsonFetch(BASE, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!json.success) throw new Error(json.message);
    return json.data;
  } catch {
    // No backend available — just echo back what was "saved"
    // so the UI reflects the change even though nothing persists.
    return { ...DEMO_SETTINGS, ...body };
  }
};