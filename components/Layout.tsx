import React from 'react';
import { Tenant } from '../types';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
  currentTenant: Tenant;
  tenants: Tenant[];
  onTenantChange: (tenantId: string) => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentTenant, 
  tenants, 
  onTenantChange,
  currentPage,
  onNavigate
}) => {
  return (
    <div className="flex h-screen bg-slate-50 text-slate-900">
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Header 
          currentPage={currentPage} 
          currentTenant={currentTenant} 
          tenants={tenants} 
          onTenantChange={onTenantChange} 
        />

        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
};