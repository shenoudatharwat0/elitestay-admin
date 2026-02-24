import React from 'react';
import { BookingStatus } from '../types';
import { Search, Filter, MoreHorizontal, Calendar } from 'lucide-react';
import { Modal } from '../components/Modal';
import { useBookingsController } from '../controllers/useBookingsController';

interface BookingsProps {
  tenantId: string;
}

// VIEW COMPONENT
export const Bookings: React.FC<BookingsProps> = ({ tenantId }) => {
  // Use Controller
  const { state, actions } = useBookingsController(tenantId);
  const { bookings, loading, isModalOpen, rooms, isSubmitting, formData } = state;

  const getStatusColor = (status: BookingStatus) => {
    switch(status) {
      case BookingStatus.Confirmed: return 'bg-blue-100 text-blue-700';
      case BookingStatus.CheckedIn: return 'bg-green-100 text-green-700';
      case BookingStatus.CheckedOut: return 'bg-slate-100 text-slate-700';
      case BookingStatus.Cancelled: return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Bookings</h1>
          <p className="text-slate-500">Manage reservations and guest stays</p>
        </div>
        <button 
          onClick={() => actions.setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm"
        >
          <Calendar size={18} />
          New Booking
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by guest, room, or ID..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 text-sm font-medium">
            <Filter size={16} />
            Filter
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Guest</th>
                <th className="px-6 py-4">Room</th>
                <th className="px-6 py-4">Check-in</th>
                <th className="px-6 py-4">Check-out</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Total</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-400">Loading bookings...</td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-400">No bookings found for this tenant.</td>
                </tr>
              ) : bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{booking.guestName}</div>
                    <div className="text-slate-500 text-xs">{booking.guestEmail}</div>
                  </td>
                  <td className="px-6 py-4 font-medium">{booking.roomNumber}</td>
                  <td className="px-6 py-4 text-slate-600">{new Date(booking.checkInDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-slate-600">{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-slate-900">
                    ${booking.totalAmount}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-600">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Booking Modal */}
      <Modal isOpen={isModalOpen} onClose={() => actions.setIsModalOpen(false)} title="New Booking">
        <form onSubmit={actions.handleCreateBooking} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Guest Name</label>
            <input 
              required
              type="text" 
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={formData.guestName}
              onChange={e => actions.updateFormData('guestName', e.target.value)}
              placeholder="e.g. John Smith"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Guest Email</label>
            <input 
              required
              type="email" 
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={formData.guestEmail}
              onChange={e => actions.updateFormData('guestEmail', e.target.value)}
              placeholder="john@example.com"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Check-in</label>
              <input 
                required
                type="date" 
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.checkInDate}
                onChange={e => actions.updateFormData('checkInDate', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Check-out</label>
              <input 
                required
                type="date" 
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.checkOutDate}
                onChange={e => actions.updateFormData('checkOutDate', e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Room</label>
            <select 
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              value={formData.roomId}
              onChange={e => actions.updateFormData('roomId', e.target.value)}
            >
              <option value="">Select a room...</option>
              {rooms.map(room => (
                <option key={room.id} value={room.id}>{room.roomNumber} ({room.type}) - ${room.basePrice}/night</option>
              ))}
            </select>
          </div>
          <div className="pt-4 flex justify-end space-x-3">
            <button 
              type="button" 
              onClick={() => actions.setIsModalOpen(false)}
              className="px-4 py-2 text-slate-700 font-medium hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? 'Creating...' : 'Create Booking'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};