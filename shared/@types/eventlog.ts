import { Model } from "../contracts/model"

export interface EventLog extends Model {
    propertyId: string
    unitId?: string
    name: string
    description: string
    images: string[]
    createdAt: string
    updatedAt: string
}

export interface EventlogInput extends Omit<EventLog, "propertyId" | "unitId" | "createdAt" | "updatedAt" | "id"> {
    type: "create" | "update";
}