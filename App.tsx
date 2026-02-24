import React from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Bookings } from './pages/Bookings';
import { Rooms } from './pages/Rooms';
import { Pricing } from './pages/Pricing';
import { useAppController } from './controllers/useAppController';

const App: React.FC = () => {
  // Use Controller
  const { state, actions } = useAppController();
  const { currentTenantId, tenants, currentPage, loading, currentTenant } = state;

  if (loading || !currentTenant) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50 flex-col gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="text-slate-500 font-medium">Loading EliteStay...</p>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard tenantId={currentTenantId} />;
      case 'bookings':
        return <Bookings tenantId={currentTenantId} />;
      case 'rooms':
        return <Rooms tenantId={currentTenantId} />;
      case 'pricing':
        return <Pricing tenantId={currentTenantId} />;
      default:
        return <div className="text-center py-20 text-slate-500">Page under construction: {currentPage}</div>;
    }
  };

  return (
    <Layout 
      currentTenant={currentTenant}
      tenants={tenants}
      onTenantChange={actions.setCurrentTenantId}
      currentPage={currentPage}
      onNavigate={actions.setCurrentPage}
    >
      {renderPage()}
    </Layout>
  );
};

export default App;