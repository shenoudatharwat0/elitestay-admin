import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { DashboardStats, Booking } from '../types';

export const useDashboardController = (tenantId: string) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for charts (View Data)
  const revenueData = [
    { name: 'Mon', revenue: 4000 },
    { name: 'Tue', revenue: 3000 },
    { name: 'Wed', revenue: 2000 },
    { name: 'Thu', revenue: 2780 },
    { name: 'Fri', revenue: 1890 },
    { name: 'Sat', revenue: 2390 },
    { name: 'Sun', revenue: 3490 },
  ];

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.getDashboardStats(tenantId),
      api.getBookings(tenantId)
    ]).then(([statsData, bookingsData]) => {
      setStats(statsData);
      setRecentBookings(bookingsData.slice(0, 5));
      setLoading(false);
    });
  }, [tenantId]);

  return {
    state: {
      stats,
      recentBookings,
      loading,
      revenueData
    }
  };
};