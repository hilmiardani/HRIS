import { Model } from "../contracts/model"

interface DetailsBookingInput {
  unitTypeId: string
  count: number
  price: number
}

export interface BookingCustomer {
  name?: string,
  address?: string,
  city?: string,
  countryCode?: string
  email?: string,
  phone?: string,
  remarks?: string,
  zip?: string
}
export interface BookingDetail {
  count: number,
  unitType: { id: string, name: string }
}

export interface BookingAssignedUnit { id: string, name: string }

export interface OtaExtras { bookingId: string, name: string, ref: string }

export interface Subscription { colateralAmount?: number, monthlyBookingId?: string, reimbursed?: boolean, unsubscribedAt?: string }

export interface Booking extends Model {
  origin: string,
  term: string,
  customer: BookingCustomer,
  bookingDate: string
  checkInDate: string
  checkOutDate: string
  createdAt: string
  updatedAt: string
  units?: BookingAssignedUnit[]
  unitTypeId: string
  unitType: { id: string, name: string }
  count?: number
  price: number
  force?: boolean
  unitIds?: string[]
  otaExtras: OtaExtras
  actualCheckInDate?: string
  actualCheckOutDate?: string
  subscription?: Subscription
}

export interface BookingFitness extends Model {
  device_id: string
  customer_id: string
  detail: {
    count: number
    price: number
  },
  term: string
  platform_fee: number
  promo_id?: string
  discount: number
  total: number
  created_at: string
  updated_at: string
}