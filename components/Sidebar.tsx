import React from 'react';
import { LayoutDashboard, CalendarDays, BedDouble, Settings, LogOut, Hotel } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl">
      <div className="p-6 flex items-center space-x-3 border-b border-slate-700">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Hotel className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">EliteStay</h1>
          <p className="text-xs text-slate-400">Management OS</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <NavItem 
          icon={<LayoutDashboard size={20} />} 
          label="Dashboard" 
          active={currentPage === 'dashboard'} 
          onClick={() => onNavigate('dashboard')}
        />
        <NavItem 
          icon={<CalendarDays size={20} />} 
          label="Bookings" 
          active={currentPage === 'bookings'} 
          onClick={() => onNavigate('bookings')}
        />
        <NavItem 
          icon={<BedDouble size={20} />} 
          label="Rooms" 
          active={currentPage === 'rooms'} 
          onClick={() => onNavigate('rooms')}
        />
        <div className="pt-4 pb-2">
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">System</p>
        </div>
        <NavItem 
          icon={<Settings size={20} />} 
          label="Pricing Rules" 
          active={currentPage === 'pricing'} 
          onClick={() => onNavigate('pricing')}
        />
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button className="flex items-center space-x-3 text-slate-400 hover:text-white transition-colors w-full px-4 py-2">
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

const NavItem = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      active 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);