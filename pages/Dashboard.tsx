import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Users, DollarSign, Key, TrendingUp } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { useDashboardController } from '../controllers/useDashboardController';

interface DashboardProps {
  tenantId: string;
}

// VIEW COMPONENT
export const Dashboard: React.FC<DashboardProps> = ({ tenantId }) => {
  // Use Controller
  const { state } = useDashboardController(tenantId);
  const { stats, recentBookings, loading, revenueData } = state;

  if (loading) {
    return <div className="flex items-center justify-center h-full text-slate-400">Loading Dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={`$${stats?.revenue.toLocaleString()}`} 
          icon={<DollarSign className="text-emerald-500" />} 
          trend="+12.5%" 
        />
        <StatCard 
          title="Occupancy Rate" 
          value={`${stats?.occupancyRate.toFixed(1)}%`} 
          icon={<Users className="text-blue-500" />} 
          trend="+4.2%" 
        />
        <StatCard 
          title="Check-ins Today" 
          value={stats?.todaysCheckIns.toString() || '0'} 
          icon={<Key className="text-purple-500" />} 
          trend="On track" 
        />
        <StatCard 
          title="Active Bookings" 
          value={stats?.occupiedRooms.toString() || '0'} 
          icon={<TrendingUp className="text-orange-500" />} 
          trend="-2 today" 
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold mb-4 text-slate-800">Weekly Revenue</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold mb-4 text-slate-800">Recent Activity</h3>
          <div className="space-y-4">
            {recentBookings.map(booking => (
              <div key={booking.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                    {booking.roomNumber}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{booking.guestName}</p>
                    <p className="text-xs text-slate-500">Checked in {new Date(booking.checkInDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  booking.status === 'CheckedIn' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {booking.status}
                </span>
              </div>
            ))}
            {recentBookings.length === 0 && <p className="text-slate-400 text-sm">No recent activity.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};