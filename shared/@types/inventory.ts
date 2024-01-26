import { Model } from "../contracts/model"

export interface Inventory extends Model {
  name: string,
  amount: number,
  createdAt: string,
  updatedAt: string,
  property: {
    id: string,
    name: string
  }
  unit?: {
    id: string,
    name: string
  }
}

export interface InventoryInput extends Omit<Inventory, "createdAt" | "updatedAt" | "property"> {
  type: "create" | "update";
}