import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
    <div className="flex items-center justify-between mb-4">
      <span className="text-slate-500 text-sm font-medium">{title}</span>
      <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
    </div>
    <div className="flex items-end justify-between">
      <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{trend}</span>
    </div>
  </div>
);