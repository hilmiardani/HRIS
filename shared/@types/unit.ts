import { Model } from "../contracts/model";

export interface UnitInput {
  name: string;
  // propertyId?: string;
  thumbnail?: string;
  images?: string[];
}

interface UnitType {
  id: string
  name: string
}

export interface Unit extends Model {
  id: string,
  name: string,
  unitType: UnitType
  thumbnail?: string,
  images: string[]
  createdAt: string,
  deletedAt: string,
  lastElectricity?: lastElectricity
}

interface lastElectricity {
  id: number,
  kwh: number,
  electricityMeterId: number
}
