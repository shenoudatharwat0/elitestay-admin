import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Tenant } from '../types';

export const useAppController = () => {
  const [currentTenantId, setCurrentTenantId] = useState<string>('t1');
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [currentPage, setCurrentPage] = useState<string>('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getTenants().then(data => {
      setTenants(data);
      if (data.length > 0) setCurrentTenantId(data[0].id);
      setLoading(false);
    });
  }, []);

  const currentTenant = tenants.find(t => t.id === currentTenantId);

  return {
    state: {
      currentTenantId,
      tenants,
      currentPage,
      loading,
      currentTenant
    },
    actions: {
      setCurrentTenantId,
      setCurrentPage
    }
  };
};