import { Model } from "../contracts/model"

export interface Absence extends Model {
    title: string
    start: Date,
    end: Date,
    desc?: string
}