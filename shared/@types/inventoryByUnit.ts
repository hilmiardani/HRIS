import { Model } from "../contracts/model"

interface unit {
  id: string,
  name: string
}

interface property {
  id: string,
  name: string
}
export interface InventoryByUnit extends Model {
  name: string,
  amount: number,
  createdAt: string,
  updatedAt: string,
  unit: unit
  property: property

}

export interface inventoryByUnitInput extends Omit<InventoryByUnit, "createdAt" | "updatedAt" | "property" | "unit"> {
  type: "create" | "update";
}