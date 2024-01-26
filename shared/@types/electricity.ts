import { Model } from "../contracts/model";

export interface Electricity extends Model {
  kwh: number,
  image?: string,
  createdAt: string,
  updatedAt: string,
  ElectricityMeter: {
    id: number,
    name: string,
    Unit: {
      id: string,
      name: string,
      Property: {
        id: string,
        name: string
      }
    }
  }
}

export interface ElectricityInput extends Omit<Electricity, "createdAt" | "updatedAt" | "ElectricityMeter" | "id"> {
  type: "create" | "update";
}