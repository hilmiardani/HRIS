import { Model } from "../contracts/model";

export interface Profile extends Model {
  name: string,
  password?: string,
  thumbnail?: string,
  email: string,

}

export interface ProfileUpdate extends Omit<Profile, "id"> {
  confirmPassword?: string
}