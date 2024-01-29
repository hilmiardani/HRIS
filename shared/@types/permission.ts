import { Model } from "../contracts/model"

export interface Permission extends Model {
    day?: string
    startDate: string
    endDate: string
    type: string
    desc: string
    files?: string[]
}