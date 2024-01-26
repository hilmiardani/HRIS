import { Model } from "../contracts/model"

export interface RequestLeave extends Model {
    day: string
    date: string
    request: string
    desc: string
}