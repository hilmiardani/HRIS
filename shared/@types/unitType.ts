import { Model } from "../contracts/model";

export interface UnitTypeInput {
  name: string;
  // propertyId?: string;
  thumbnail?: string;
  images?: string[];
}

export interface UnitType extends Model {
  name: string;
  propertyId: string;
  thumbnail?: string;
  images?: string[];
}
