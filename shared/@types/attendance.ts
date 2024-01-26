import { Model } from "../contracts/model"

export interface Attendance extends Model {
  day: string
  date: string
  time: string
  desc: string
}