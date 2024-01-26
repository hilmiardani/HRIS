import { Model } from "../contracts/model"

export interface Log extends Model {
    context: string
    level: number
    data: {
        message: string
    }
    id: string
    timestamp: string
}