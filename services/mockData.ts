import { Booking, BookingStatus, Room, RoomStatus, RoomType, Tenant, PricingRule } from '../types';

// Mock Tenants
export const tenants: Tenant[] = [
  { id: 't1', name: 'EliteStay Downtown', subdomain: 'downtown', subscriptionStatus: 'Active' },
  { id: 't2', name: 'EliteStay Resort', subdomain: 'resort', subscriptionStatus: 'Active' }
];

// Mock Rooms
export const rooms: Room[] = [
  // Tenant 1 Rooms
  { id: 'r1', tenantId: 't1', roomNumber: '101', type: RoomType.Single, basePrice: 120, status: RoomStatus.Occupied, isMaintenance: false },
  { id: 'r2', tenantId: 't1', roomNumber: '102', type: RoomType.Double, basePrice: 180, status: RoomStatus.Available, isMaintenance: false },
  { id: 'r3', tenantId: 't1', roomNumber: '201', type: RoomType.Suite, basePrice: 350, status: RoomStatus.Maintenance, isMaintenance: true },
  { id: 'r4', tenantId: 't1', roomNumber: '202', type: RoomType.Double, basePrice: 180, status: RoomStatus.Available, isMaintenance: false },
  
  // Tenant 2 Rooms
  { id: 'r5', tenantId: 't2', roomNumber: 'Villa-A', type: RoomType.Penthouse, basePrice: 1200, status: RoomStatus.Available, isMaintenance: false },
  { id: 'r6', tenantId: 't2', roomNumber: 'Villa-B', type: RoomType.Suite, basePrice: 800, status: RoomStatus.Occupied, isMaintenance: false },
];

// Mock Bookings
export const bookings: Booking[] = [
  // Tenant 1 Bookings
  { 
    id: 'b1', tenantId: 't1', roomId: 'r1', roomNumber: '101', 
    guestName: 'John Doe', guestEmail: 'john@example.com', 
    checkInDate: new Date().toISOString(), 
    checkOutDate: new Date(Date.now() + 86400000 * 3).toISOString(), 
    totalAmount: 360, status: BookingStatus.CheckedIn 
  },
  { 
    id: 'b2', tenantId: 't1', roomId: 'r2', roomNumber: '102', 
    guestName: 'Jane Smith', guestEmail: 'jane@example.com', 
    checkInDate: new Date(Date.now() + 86400000).toISOString(), 
    checkOutDate: new Date(Date.now() + 86400000 * 4).toISOString(), 
    totalAmount: 540, status: BookingStatus.Confirmed 
  },
  
  // Tenant 2 Bookings
  { 
    id: 'b3', tenantId: 't2', roomId: 'r6', roomNumber: 'Villa-B', 
    guestName: 'Alice Johnson', guestEmail: 'alice@corp.com', 
    checkInDate: new Date(Date.now() - 86400000).toISOString(), 
    checkOutDate: new Date(Date.now() + 86400000 * 5).toISOString(), 
    totalAmount: 4800, status: BookingStatus.CheckedIn 
  },
];

// Mock Pricing Rules
export const pricingRules: PricingRule[] = [
  {
    id: 'pr1', tenantId: 't1', name: 'Summer Season Spike', roomType: RoomType.Suite,
    adjustmentPercentage: 20, startDate: new Date().toISOString(), endDate: new Date(Date.now() + 86400000 * 30).toISOString(),
    isActive: true
  },
  {
    id: 'pr2', tenantId: 't1', name: 'Weekend Discount', roomType: RoomType.Single,
    adjustmentPercentage: -10, startDate: new Date().toISOString(), endDate: new Date(Date.now() + 86400000 * 7).toISOString(),
    isActive: true
  },
  {
    id: 'pr3', tenantId: 't2', name: 'VIP Package', roomType: RoomType.Penthouse,
    adjustmentPercentage: 15, startDate: new Date().toISOString(), endDate: new Date(Date.now() + 86400000 * 60).toISOString(),
    isActive: false
  }
];