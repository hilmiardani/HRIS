import { BookingTerm } from "."
import { Model } from "../contracts/model"

export type AvailabilityUnitType = {
  id: string
  name: string
}

export type AvailabilityUnit = {
  id: string
  name: string
  unitType: string
  UnitType?: AvailabilityUnitType
}

export type AvailabiltyCustomer = {
  name?: string
  email?: string
  phone?: string
}

export interface AvailabilityMatrix extends Model {
  customer?: AvailabiltyCustomer
  checkInDate?: string
  checkOutDate?: string
  price?: number
  units: AvailabilityUnit[]
  term: BookingTerm
  startDate?: string
  endDate?: string
  unitTypeId?: string
}
