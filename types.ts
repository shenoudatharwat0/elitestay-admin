// Equivalent to Domain/Entities in the PDF

export enum RoomStatus {
  Available = 'Available',
  Occupied = 'Occupied',
  Dirty = 'Dirty',
  Maintenance = 'Maintenance'
}

export enum RoomType {
  Single = 'Single',
  Double = 'Double',
  Suite = 'Suite',
  Penthouse = 'Penthouse'
}

export enum BookingStatus {
  Confirmed = 'Confirmed',
  CheckedIn = 'CheckedIn',
  CheckedOut = 'CheckedOut',
  Cancelled = 'Cancelled'
}

export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  subscriptionStatus: 'Active' | 'Inactive';
}

export interface Room {
  id: string;
  tenantId: string;
  roomNumber: string;
  type: RoomType;
  basePrice: number;
  status: RoomStatus;
  isMaintenance: boolean;
}

export interface Booking {
  id: string;
  tenantId: string;
  roomId: string;
  roomNumber: string; // Flattened for UI
  guestName: string;
  guestEmail: string;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
  status: BookingStatus;
}

export interface DashboardStats {
  occupiedRooms: number;
  todaysCheckIns: number;
  todaysCheckOuts: number;
  revenue: number;
  occupancyRate: number;
}

export interface PricingRule {
  id: string;
  tenantId: string;
  name: string;
  roomType: RoomType;
  adjustmentPercentage: number; // e.g., 10 for +10%, -15 for -15%
  startDate: string;
  endDate: string;
  isActive: boolean;
}