import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
 
// Props:
// page       — current page number (1-based)
// totalPages — total number of pages
// total      — total number of records
// limit      — records per page
// onPageChange — called with new page number
function Pagination({ page, totalPages, total, limit, onPageChange }) {
  if (totalPages <= 1) return null; // Don't render if only 1 page
 
  // Calculate which page numbers to show
  // Shows: prev-button, up to 5 page numbers, next-button
  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, page - 2);          // Show 2 pages before current
    const end   = Math.min(totalPages, page + 2); // Show 2 pages after current
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };
 
  const from = (page - 1) * limit + 1;
  const to   = Math.min(page * limit, total);
 
  return (
    <div style={styles.wrapper}>
      <span style={styles.info}>
        Showing {from} to {to} of {total} transactions
      </span>
 
      <div style={styles.controls}>
        {/* Previous button */}
        <button
          style={{ ...styles.btn, opacity: page === 1 ? 0.4 : 1 }}
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          <FiChevronLeft size={16} />
        </button>
 
        {/* Page number buttons */}
        {getPageNumbers().map((num) => (
          <button
            key={num}
            style={{
              ...styles.btn,
              background: num === page ? 'var(--color-primary)' : 'transparent',
              color:      num === page ? '#fff'                 : 'var(--color-text-muted)',
              border:     num === page ? 'none'                 : '1px solid var(--color-border)',
            }}
            onClick={() => onPageChange(num)}
          >
            {num}
          </button>
        ))}
 
        {/* Ellipsis if there are more pages */}
        {totalPages > page + 2 && (
          <span style={styles.ellipsis}>...</span>
        )}
 
        {/* Next button */}
        <button
          style={{ ...styles.btn, opacity: page === totalPages ? 0.4 : 1 }}
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
        >
          <FiChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
 
const styles = {
  wrapper:  { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 20px' },
  info:     { fontSize:13, color:'var(--color-text-muted)' },
  controls: { display:'flex', gap:6, alignItems:'center' },
  btn: {
    width:32, height:32, borderRadius:'var(--radius)',
    display:'flex', alignItems:'center', justifyContent:'center',
    fontSize:13, fontWeight:500,
    color:'var(--color-text-muted)',
    border:'1px solid var(--color-border)',
    cursor:'pointer', transition:'all 0.15s',
  },
  ellipsis: { color:'var(--color-text-muted)', fontSize:13, padding:'0 4px' },
};
 
export default Pagination;
