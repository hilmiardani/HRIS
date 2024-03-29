import { Model } from "../contracts/model"

export interface RequestLeave extends Model {
    day?: string
    startDate: string
    endDate: string
    type: string
    desc: string
    files?: string[]
}