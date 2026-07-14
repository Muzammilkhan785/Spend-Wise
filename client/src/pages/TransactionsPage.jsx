import { useState, useEffect, useCallback } from 'react';
import FilterBar       from '../components/transactions/FilterBar';
import TransactionRow  from '../components/transactions/TransactionRow';
import SpendBreakdown  from '../components/transactions/SpendBreakdown';
import Pagination      from '../components/transactions/Pagination';
import AddTransactionModal from '../components/transactions/AddTransactionModal';
import { getTransactions, deleteTransaction } from '../api/transactionsApi';
import { getBreakdown }  from '../api/analyticsApi';
import { currentMonthYear } from '../utils/formatDate';
import { formatCurrency } from '../utils/formatCurrency';
 
function TransactionsPage() {
  // ── FILTER + PAGINATION STATE ───────────────────────
  const [filter,      setFilter]      = useState('all');    // 'all'|'income'|'expense'
  const [page,        setPage]        = useState(1);
  const LIMIT = 7;                                           // Transactions per page
 
  // ── DATA STATE ──────────────────────────────────────
  const [transactions, setTransactions] = useState([]);
  const [meta,         setMeta]          = useState({});     // { total, totalPages, page }
  const [breakdown,    setBreakdown]     = useState([]);
 
  // ── UI STATE ────────────────────────────────────────
  const [loading,      setLoading]    = useState(true);
  const [error,        setError]      = useState('');
  const [showModal,    setShowModal]  = useState(false);
  const [editTx,       setEditTx]     = useState(null);  // Transaction being edited
 
  const { month, year } = currentMonthYear();
 
  // ── FETCH TRANSACTIONS ─────────────────────────────
  // useCallback memoizes the function so it does not re-create on every render.
  // It only re-creates when filter or page changes.
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
 
      const params = {
        page,
        limit: LIMIT,
        month,
        year,
        // Only send type param when filter is not 'all'
        ...(filter !== 'all' && { type: filter }),
      };
 
      const [txResult, bkResult] = await Promise.all([
        getTransactions(params),
        getBreakdown(month, year),
      ]);
 
      setTransactions(txResult.data);
      setMeta(txResult.meta);
      setBreakdown(bkResult);
    } catch (err) {
      setError('Failed to load: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [filter, page]);  // Re-fetch when filter or page changes
 
  useEffect(() => { loadData(); }, [loadData]);
 
  // ── HANDLERS ────────────────────────────────────────
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setPage(1);  // Reset to page 1 when filter changes
  };
 
  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      loadData(); // Refresh list after deletion
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };
 
  // ── RENDER ──────────────────────────────────────────
  return (
    <div style={styles.page}>
 
      {/* Left main column */}
      <div style={styles.main}>
 
        {/* Header: total spending summary */}
        <div style={styles.summaryHeader}>
          <div>
            <h2 style={styles.h2}>Total Spending (Current Month)</h2>
            {meta.total && (
              <p style={{ fontSize:13, color:'var(--color-income)', marginTop:4 }}>
                {meta.total} transactions found
              </p>
            )}
          </div>
          <FilterBar activeFilter={filter} onFilterChange={handleFilterChange} />
        </div>
 
        {/* Transactions table card */}
        <div style={styles.card}>
          {/* Table column headers */}
          <div style={styles.tableHeader}>
            <span style={styles.th}>DESCRIPTION</span>
            <span style={styles.th}>DATE</span>
            <span style={styles.th}>CATEGORY</span>
            <span style={{ ...styles.th, textAlign:'right' }}>AMOUNT</span>
            <span style={styles.th}></span>
          </div>
 
          {error && <p style={styles.error}>{error}</p>}
 
          {loading ? (
            <p style={styles.loadingMsg}>Loading transactions...</p>
          ) : transactions.length === 0 ? (
            <p style={styles.emptyMsg}>No transactions found.</p>
          ) : (
            transactions.map((tx) => (
              <TransactionRow
                key={tx.id}
                transaction={tx}
                onDelete={handleDelete}
                onEdit={(t) => { setEditTx(t); setShowModal(true); }}
              />
            ))
          )}
 
          {/* Pagination at the bottom of the card */}
          {meta.totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={meta.totalPages}
              total={meta.total}
              limit={LIMIT}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>
 
      {/* Right sidebar panel */}
      <div style={styles.right}>
        <SpendBreakdown data={breakdown} loading={loading} />
      </div>
 
      {/* Add/Edit Transaction Modal */}
      {showModal && (
        <AddTransactionModal
          onClose={() => { setShowModal(false); setEditTx(null); }}
          onSuccess={() => { setShowModal(false); setEditTx(null); loadData(); }}
        />
      )}
    </div>
  );
}
 
const styles = {
  page:   { display:'grid', gridTemplateColumns:'1fr 300px', gap:24, alignItems:'start' },
  main:   { display:'flex', flexDirection:'column', gap:20 },
  right:  { position:'sticky', top:'calc(var(--topbar-height) + 28px)' },
  summaryHeader: { display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 },
  h2:     { fontSize:20, fontWeight:700, color:'var(--color-text)' },
  card:   { background:'var(--color-surface)', borderRadius:'var(--radius-lg)', border:'1px solid var(--color-border)', overflow:'hidden' },
  tableHeader: { display:'grid', gridTemplateColumns:'44px 1fr 120px 160px 130px 70px', gap:12, padding:'12px 20px', borderBottom:'1px solid var(--color-border)' },
  th:         { fontSize:11, fontWeight:600, color:'var(--color-text-faint)', letterSpacing:0.8 },
  loadingMsg: { padding:40, textAlign:'center', color:'var(--color-text-muted)' },
  emptyMsg:   { padding:40, textAlign:'center', color:'var(--color-text-muted)' },
  error:      { padding:16, color:'var(--color-expense)', margin:16, background:'rgba(239,68,68,0.1)', borderRadius:'var(--radius)' },
};
 
export default TransactionsPage;
