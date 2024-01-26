export interface MonthlyAnalytic {
  totalRoom: number
  property: property
  unitType: unitType
  averageMonthlyPrice: number
  totalMonthlyRevenue: number
  avgDailyRate: number
  mtdRevenuePerRoom: number
}

export interface DailyAnalytic {
  property: property
  unitType: unitType
  totalRoom: number
  closedRoom: number
  soldRoom: number
  availableRoom: number
  avgDailyRoomRate: number
  currentRate: number
  totalRevenue: number
  occRate: number
  mtdRevenuePerRoom: number
}

export interface AllAnalytic {
  property: property
  unitType: unitType
  totalRoom: number
  totalMonthly: number
  totalDaily: number
  totalUnsold: number
  occRate: number
  mtdRevenuePerRoom: number
  rawMtDRevenue: number
}

export interface TotalDailyAnalytics {
  totalRoom: number
  closedRoom: number
  soldRoom: number
  avgDailyRoomRate: number
  currentRate: number
  totalRevenue: number
  occRate: number
  totalAvailable: number
}

export interface TotalMonthlyAnalytics {
  totalRoom: number
  averageMonthlyPrice: number
  totalMonthlyRevenue: number
  avgDailyRate: number
}

export interface TotalAllAnalytics {
  totalRoom: number
  totalMonthly: number
  totalClosed: number
  totalDaily: number
  totalUnsold: number
  occRate: number
  totalMtdRevenuePerRoom: number
}

interface property {
  id: string
  name: string
}

interface unitType {
  id: string
  name: string
}
