import { useState, useEffect } from 'react';
import { FiX, FiDollarSign } from 'react-icons/fi';
import { createTransaction }  from '../../api/transactionsApi';
import { getCategories }      from '../../api/categoriesApi';
import { todayISO }           from '../../utils/formatDate';
 
// Props:
// onClose   — called when Cancel or X is clicked
// onSuccess — called after a transaction is successfully created (triggers list refresh)
function AddTransactionModal({ onClose, onSuccess }) {
  // ── FORM STATE ────────────────────────────────────
  // Each form field has its own state variable.
  const [type,        setType]        = useState('expense');  // 'income' | 'expense'
  const [amount,      setAmount]      = useState('');
  const [description, setDescription] = useState('');
  const [categoryId,  setCategoryId]  = useState('');
  const [date,        setDate]        = useState(todayISO()); // Default = today
 
  // ── UI STATE ──────────────────────────────────────
  const [categories, setCategories] = useState([]);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState('');

  // Load categories when the modal opens
  // Re-load when type changes (income shows only income categories)
  useEffect(() => {
    const loadCats = async () => {
      try {
        // Pass the type filter so only relevant categories appear
        const cats = await getCategories(type);
        setCategories(cats);
        // Auto-select the first category when type changes
        if (cats.length > 0) setCategoryId(String(cats[0].id));
      } catch (err) {
        console.error('Failed to load categories:', err.message);
      }
    };
    loadCats();
  }, [type]); // Re-run whenever 'type' changes

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    // Client-side validation before sending to server
    if (!amount || Number(amount) <= 0) {
      setError('Please enter a valid amount greater than 0');
      return;
    }
    if (!description.trim()) {
      setError('Please enter a description');
      return;
    }
    if (!categoryId) {
      setError('Please select a category');
      return;
    }
    if (!date) {
      setError('Please select a date');
      return;
    }
 
    try {
      setLoading(true);
      setError('');
 
      await createTransaction({
        type,
        amount:           Number(amount),   // Convert string to number
        description:      description.trim(),
        category_id:      Number(categoryId),
        transaction_date: date,
      });
 
      // Success: close modal and tell the parent to refresh the list
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Toggle button config for the Income/Expense switch
  const isExpense = type === 'expense';
 
  return (
    // Overlay — the dark semi-transparent background
    <div style={styles.overlay} onClick={onClose}>
 
      {/* Modal card — stopPropagation prevents closing when clicking inside */}
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
 
        {/* Header */}
        <div style={styles.modalHeader}>
          <div>
            <h2 style={styles.modalTitle}>Add Transaction</h2>
            <p style={styles.modalSub}>Record your latest financial activity</p>
          </div>
          <button style={styles.closeBtn} onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>
 
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Income / Expense Toggle */}
          <div style={styles.toggle}>
            <button
              type='button'  // IMPORTANT: prevent form submission
              style={{
                ...styles.toggleBtn,
                background: !isExpense ? 'rgba(16,185,129,0.2)' : 'transparent',
                color:      !isExpense ? 'var(--color-primary)'  : 'var(--color-text-muted)',
              }}
              onClick={() => setType('income')}
            >
              Income
            </button>
            <button
              type='button'
              style={{
                ...styles.toggleBtn,
                background: isExpense ? 'rgba(239,68,68,0.2)'   : 'transparent',
                color:      isExpense ? 'var(--color-expense)'   : 'var(--color-text-muted)',
                borderRadius: '0 20px 20px 0',
              }}
              onClick={() => setType('expense')}
            >
              Expense
            </button>
          </div>
 
          {/* Amount Field */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Amount</label>
            <div style={styles.amountWrap}>
              <FiDollarSign size={16} color='var(--color-expense)' style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)' }} />
              <input
                type='number'
                step='0.01'
                min='0.01'
                placeholder='0.00'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ ...styles.input, paddingLeft: 36 }}
                required
              />
            </div>
          </div>
 
          {/* Description Field */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Description</label>
            <input
              type='text'
              placeholder='What was this for?'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={styles.input}
              maxLength={255}
              required
            />
          </div>
 
          {/* Category + Date Row */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            {/* Category Dropdown */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                style={styles.input}
                required
              >
                <option value=''>Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
 
            {/* Date Picker */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Date</label>
              <input
                type='date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={styles.input}
                max={todayISO()}  // Cannot pick a future date
                required
              />
            </div>
          </div>
 
          {/* Error message */}
          {error && <p style={styles.error}>{error}</p>}
 
          {/* Action Buttons */}
          <div style={styles.actions}>
            <button type='button' style={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button
              type='submit'
              style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }}
              disabled={loading}
            >
              {loading ? 'Adding...' : '+ Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',          // Covers the entire viewport
    inset: 0,                   // Shorthand for top/right/bottom/left: 0
    background: 'rgba(0,0,0,0.7)', // Semi-transparent dark background
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,               // On top of everything
  },
  modal: {
    background: 'var(--color-surface)',
    borderRadius: 'var(--radius-lg)',
    padding: 32,
    width: '100%',
    maxWidth: 480,
    border: '1px solid var(--color-border)',
    boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
  },
  modalHeader: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24 },
  modalTitle:  { fontSize:20, fontWeight:700, color:'var(--color-text)' },
  modalSub:    { fontSize:13, color:'var(--color-text-muted)', marginTop:4 },
  closeBtn:    { color:'var(--color-text-muted)', padding:4, borderRadius:6 },
  form:        { display:'flex', flexDirection:'column', gap:20 },
  toggle: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    background: 'var(--color-surface-2)',
    borderRadius: 24,
    padding: 4,
    border: '1px solid var(--color-border)',
  },
  toggleBtn: {
    padding: '10px 0',
    borderRadius: 20,
    fontSize: 14, fontWeight: 600,
    transition: 'all 0.2s',
    cursor: 'pointer',
  },
  fieldGroup: { display:'flex', flexDirection:'column', gap:6 },
  label:      { fontSize:13, fontWeight:500, color:'var(--color-text-muted)' },
  amountWrap: { position:'relative' },
  input: {
    width: '100%',
    background: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius)',
    padding: '12px 14px',
    color: 'var(--color-text)',
    fontSize: 14,
  },
  error:     { color:'var(--color-expense)', fontSize:13, padding:'8px 12px', background:'rgba(239,68,68,0.1)', borderRadius:'var(--radius)' },
  actions:   { display:'flex', gap:12, justifyContent:'flex-end' },
  cancelBtn: { padding:'10px 24px', borderRadius:'var(--radius)', fontSize:14, color:'var(--color-text-muted)' },
  submitBtn: {
    padding:'10px 24px', borderRadius:'var(--radius)', fontSize:14, fontWeight:600,
    background:'var(--color-primary)', color:'#fff', cursor:'pointer',
    transition:'opacity 0.15s',
  },
};
 
export default AddTransactionModal;
