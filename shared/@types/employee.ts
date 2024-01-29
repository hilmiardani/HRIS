import { Model } from "../contracts/model"

export interface Employee extends Model {
    name: string
    jobTitle: string
    attendance: number
    absence: number
    sickLeave: number
    remaining: number
    phone: string
    email: string
}