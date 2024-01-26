import { Model } from "../contracts/model";

export type ElectricityMeterType = "COUNT_UP" | "COUNT_DOWN";

export interface ElectricityMeter extends Model {
  name: string,
  unitId: string,
  electricityMeterType?: ElectricityMeterType,
  image?: string,
  createdAt: string,
  updatedAt: string,
  unit: {
    id: string,
    name: string
  }
}

export interface ElectricityMeterInput extends Omit<ElectricityMeter, "createdAt" | "updatedAt" | "unitId" | "unit"> {
  type: "create" | "update",
}