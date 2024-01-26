import { Model } from "../contracts/model"
import { Admin } from "./admin"

export interface RateMass {
  price: number
  date: string
  available?: number
  totalUnit?: number
  dailyBooked?: number
  monthlyBooked?: number
  modified?: number
}

export interface UpdateRatesMass {
  startDate?: any
  endDate?: any
  days: string[]
  price?: any
}

interface RateHistory {
  price: number
  date: string
}
export interface Rate {
  price: number
  history: RateHistory[]
}
export interface UpdateRate {
  date?: any,
  price: number
}

export interface PriceSuggestion extends Model {
  date: string
  price: number
  occupancy: number
  propertyId: string
  unitTypeId: string
  timestamp: string
  createdAt: string
}

export interface HistoryPrice extends Model {
  date: number
  available: number
  dailyBooked: number
  monthlyBooked: number
  modified: number
  totalUnit: number
  admin?: Admin
  price: number
  rateAvailabilityHistoryId: number
  propertyId: number
  unitTypeId: number
  createdAt: string
}

export interface DetailModifier extends Model {
  count: number
  startDate: string
  endDate: string
  propertyId: string
  unitTypeId: string
  createdAt: string
  updatedAt: string
}

export interface RateNew extends Model {
  name: string
  price: number
  createdAt: string
  updatedAt: string
}

export interface RateInput extends Omit<RateNew, "createdAt" | "updatedAt"> {
  typeModal: "create" | "update",
}

export type ModalType = "create" | "update";