const BASE = '/api/categories';
 
// GET /api/categories — all categories (optionally filtered by type)
// type can be 'income', 'expense', or omitted for all
export const getCategories = async (type = '') => {
  const url = type ? BASE + '?type=' + type : BASE;
  const res  = await fetch(url);
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;  // Array of { id, name, icon, color, type }
};
