import { bookings, rooms, tenants, pricingRules } from './mockData';
import { Booking, DashboardStats, Room, Tenant, PricingRule, BookingStatus } from '../types';

// Simulates the Backend API & Mediator Pattern
export const api = {
  getTenants: async (): Promise<Tenant[]> => {
    return new Promise(resolve => setTimeout(() => resolve(tenants), 500));
  },

  getDashboardStats: async (tenantId: string): Promise<DashboardStats> => {
    // Simulates the GetDashboardStatsQuery handler
    const tenantRooms = rooms.filter(r => r.tenantId === tenantId);
    const tenantBookings = bookings.filter(b => b.tenantId === tenantId);
    
    const occupied = tenantRooms.filter(r => r.status === 'Occupied').length;
    const revenue = tenantBookings.reduce((sum, b) => sum + b.totalAmount, 0);
    
    // Dynamic calculation based on today's date
    const today = new Date().toISOString().split('T')[0];
    const todaysCheckIns = tenantBookings.filter(b => b.checkInDate.startsWith(today)).length;
    const todaysCheckOuts = tenantBookings.filter(b => b.checkOutDate.startsWith(today)).length;

    return new Promise(resolve => setTimeout(() => resolve({
      occupiedRooms: occupied,
      todaysCheckIns,
      todaysCheckOuts,
      revenue: revenue,
      occupancyRate: tenantRooms.length > 0 ? (occupied / tenantRooms.length) * 100 : 0
    }), 600));
  },

  getRooms: async (tenantId: string): Promise<Room[]> => {
    const tenantRooms = rooms.filter(r => r.tenantId === tenantId);
    return new Promise(resolve => setTimeout(() => resolve(tenantRooms), 400));
  },

  getBookings: async (tenantId: string): Promise<Booking[]> => {
    const tenantBookings = bookings.filter(b => b.tenantId === tenantId);
    // Sort by date desc
    tenantBookings.sort((a, b) => new Date(b.checkInDate).getTime() - new Date(a.checkInDate).getTime());
    return new Promise(resolve => setTimeout(() => resolve(tenantBookings), 400));
  },

  createBooking: async (booking: Omit<Booking, 'id' | 'totalAmount' | 'status'>): Promise<Booking> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const newBooking: Booking = {
          ...booking,
          id: Math.random().toString(36).substr(2, 9),
          totalAmount: Math.floor(Math.random() * 500) + 200, // Mock calculation
          status: BookingStatus.Confirmed
        };
        bookings.unshift(newBooking); // Add to mock DB
        resolve(newBooking);
      }, 800);
    });
  },

  getPricingRules: async (tenantId: string): Promise<PricingRule[]> => {
    const tenantRules = pricingRules.filter(pr => pr.tenantId === tenantId);
    return new Promise(resolve => setTimeout(() => resolve(tenantRules), 300));
  },

  createPricingRule: async (rule: Omit<PricingRule, 'id'>): Promise<PricingRule> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const newRule: PricingRule = {
          ...rule,
          id: Math.random().toString(36).substr(2, 9),
        };
        pricingRules.push(newRule);
        resolve(newRule);
      }, 800);
    });
  }
};