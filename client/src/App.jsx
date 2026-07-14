import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout          from './components/layout/AppLayout';
import DashboardPage      from './pages/DashboardPage';
import TransactionsPage   from './pages/TransactionsPage';
import SettingsPage       from './pages/SettingsPage';
import AddTransactionModal from './components/transactions/AddTransactionModal';
 
function App() {
  const [modalOpen, setModalOpen] = useState(false);
 
  // Called after a transaction is successfully created.
  // In a real app you would invalidate data cache here.
  const handleTransactionSuccess = () => {
    setModalOpen(false);
    // The DashboardPage and TransactionsPage re-fetch when they mount.
    // For now, a window.location.reload() would refresh all data.
    // In a later phase you can use React context or events for a softer refresh.
  };
 
  return (
    <BrowserRouter>
      <AppLayout onAddTransaction={() => setModalOpen(true)}>
        <Routes>
          <Route path='/' element={<Navigate to='/dashboard' replace />} />
          <Route path='/dashboard'    element={<DashboardPage />} />
          <Route path='/transactions' element={<TransactionsPage />} />
          <Route path='/settings'     element={<SettingsPage />} />
        </Routes>
 
        {/* Modal renders on top of the current page */}
        {modalOpen && (
          <AddTransactionModal
            onClose={() => setModalOpen(false)}
            onSuccess={handleTransactionSuccess}
          />
        )}
      </AppLayout>
    </BrowserRouter>
  );
}
 
export default App;
