import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Booking, Room } from '../types';

interface BookingFormData {
  guestName: string;
  guestEmail: string;
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
}

export const useBookingsController = (tenantId: string) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<BookingFormData>({
    guestName: '',
    guestEmail: '',
    roomId: '',
    checkInDate: '',
    checkOutDate: ''
  });

  const fetchData = () => {
    setLoading(true);
    api.getBookings(tenantId).then(data => {
      setBookings(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
    api.getRooms(tenantId).then(setRooms);
  }, [tenantId]);

  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const selectedRoom = rooms.find(r => r.id === formData.roomId);
      
      await api.createBooking({
        tenantId,
        roomId: formData.roomId,
        roomNumber: selectedRoom?.roomNumber || 'Unknown',
        guestName: formData.guestName,
        guestEmail: formData.guestEmail,
        checkInDate: new Date(formData.checkInDate).toISOString(),
        checkOutDate: new Date(formData.checkOutDate).toISOString()
      });

      setIsModalOpen(false);
      setFormData({ guestName: '', guestEmail: '', roomId: '', checkInDate: '', checkOutDate: '' });
      fetchData();
    } catch (error) {
      console.error('Failed to create booking:', error);
      alert('Failed to create booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: keyof BookingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return {
    state: {
      bookings,
      loading,
      isModalOpen,
      rooms,
      isSubmitting,
      formData
    },
    actions: {
      setIsModalOpen,
      handleCreateBooking,
      updateFormData
    }
  };
};