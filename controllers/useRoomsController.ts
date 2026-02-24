import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Room } from '../types';

export const useRoomsController = (tenantId: string) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getRooms(tenantId).then(data => {
      setRooms(data);
      setLoading(false);
    });
  }, [tenantId]);

  return {
    state: {
      rooms,
      loading
    }
  };
};