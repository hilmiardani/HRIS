import { Model } from "../contracts/model"

export type PromoType = "FIX" | "PERCENTAGE";

export interface Promo extends Model {
  name: string,
  type?: PromoType,
  image?: string,
  amount: string,
  createdAt?: string,
  updatedAt?: string,
}

export interface PromoInput extends Omit<Promo, "createdAt" | "updatedAt"> {
  typeModal: "create" | "update",
}