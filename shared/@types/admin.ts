import { Model } from "../contracts/model";

export interface AdminInput {
  email: string;
  name: string;
  password?: string;
  thumbnail?: string;
}

export interface Admin extends Model {
  name: string
  jobTitle: string
  email: string
  phone: string
  password?: string
  thumbnail?: string
}
