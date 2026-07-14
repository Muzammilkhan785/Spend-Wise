import Sidebar from './Sidebar';
import TopBar from './TopBar';
 
// AppLayout is the master shell — every page is wrapped in this.
// It receives 'children' (the page content) and renders it in the main area.
// It also receives onAddTransaction to pass down to the Sidebar button.
function AppLayout({ children, onAddTransaction }) {
  return (
    <div style={styles.shell}>
      {/* Fixed left sidebar */}
      <Sidebar onAddTransaction={onAddTransaction} />
 
      {/* Everything to the right of the sidebar */}
      <div style={styles.main}>
        {/* Sticky top bar */}
        <TopBar />
 
        {/* Scrollable page content */}
        <div style={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}
 
const styles = {
  shell: {
    display: 'flex',
    minHeight: '100vh',
  },
  main: {
    marginLeft: 'var(--sidebar-width)',  // Push right of the fixed sidebar
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  content: {
    flex: 1,
    padding: 28,
    overflowY: 'auto',
  },
};
 
export default AppLayout;
