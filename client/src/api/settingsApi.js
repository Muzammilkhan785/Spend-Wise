const BASE = '/api/settings';
 
// GET /api/settings — get current user settings
export const getSettings = async () => {
  const res  = await fetch(BASE);
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;  // { currency, timezone, theme, push_notifications, ... }
};
 
// PUT /api/settings — update settings
export const updateSettings = async (body) => {
  const res = await fetch(BASE, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
};
