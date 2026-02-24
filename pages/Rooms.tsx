import React from 'react';
import { RoomStatus } from '../types';
import { BedDouble, CheckCircle, AlertTriangle, XCircle, Wrench } from 'lucide-react';
import { useRoomsController } from '../controllers/useRoomsController';

interface RoomsProps {
  tenantId: string;
}

// VIEW COMPONENT
export const Rooms: React.FC<RoomsProps> = ({ tenantId }) => {
  // Use Controller
  const { state } = useRoomsController(tenantId);
  const { rooms, loading } = state;

  const getStatusIcon = (status: RoomStatus) => {
    switch (status) {
      case RoomStatus.Available: return <CheckCircle size={16} className="text-green-500" />;
      case RoomStatus.Occupied: return <XCircle size={16} className="text-red-500" />;
      case RoomStatus.Dirty: return <AlertTriangle size={16} className="text-yellow-500" />;
      case RoomStatus.Maintenance: return <Wrench size={16} className="text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Room Management</h1>
          <p className="text-slate-500">View and update room status</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
            <p className="text-slate-500 col-span-full text-center py-10">Loading rooms...</p>
        ) : rooms.map(room => (
          <div key={room.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-blue-50 p-2.5 rounded-lg text-blue-600">
                <BedDouble size={24} />
              </div>
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                room.status === RoomStatus.Available ? 'bg-green-50 border-green-200 text-green-700' :
                room.status === RoomStatus.Occupied ? 'bg-red-50 border-red-200 text-red-700' :
                'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                {getStatusIcon(room.status)}
                {room.status}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-slate-900">Room {room.roomNumber}</h3>
              <p className="text-sm text-slate-500 mb-4">{room.type}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Price</span>
                  <p className="font-medium text-slate-900">${room.basePrice}/night</p>
                </div>
                <button className="text-sm text-blue-600 font-medium hover:text-blue-800">
                  Edit Details
                </button>
              </div>
            </div>
          </div>
        ))}
        {!loading && rooms.length === 0 && (
          <div className="col-span-full text-center py-12 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            No rooms configured for this tenant.
          </div>
        )}
      </div>
    </div>
  );
};