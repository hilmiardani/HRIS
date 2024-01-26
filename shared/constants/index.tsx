import axios from "axios";

export const HOST = process.env["NEXT_PUBLIC_API_HOST"];
axios.defaults.baseURL = HOST

export const BOOKING_TERM = ["DAILY", "MONTHLY"] as const
export const BOOKING_ORIGIN = ["OTA", "MANULA", "BOOKING_ENGINE"]

export * from "./tableMetaData"
export * from './validator'
