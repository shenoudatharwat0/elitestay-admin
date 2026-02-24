import React from 'react';
import { Bell } from 'lucide-react';
import { Tenant } from '../types';

interface HeaderProps {
  currentPage: string;
  currentTenant: Tenant;
  tenants: Tenant[];
  onTenantChange: (tenantId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentPage, 
  currentTenant, 
  tenants, 
  onTenantChange 
}) => {
  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8 z-10">
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-semibold text-slate-800 capitalize">{currentPage.replace('-', ' ')}</h2>
      </div>

      <div className="flex items-center space-x-6">
        {/* Multi-tenant Switcher simulating Middleware resolution */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-slate-500">Tenant:</span>
          <select 
            className="bg-slate-100 border-none rounded-md text-sm font-medium py-1 px-3 focus:ring-2 focus:ring-blue-500 outline-none"
            value={currentTenant.id}
            onChange={(e) => onTenantChange(e.target.value)}
          >
            {tenants.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        <button className="relative p-2 text-slate-400 hover:text-blue-600 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-sm">
          AD
        </div>
      </div>
    </header>
  );
};