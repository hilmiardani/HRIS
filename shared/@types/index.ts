import { z } from "zod";
import { BOOKING_TERM, BOOKING_ORIGIN } from "../constants";
import dayjs from "dayjs";

export type AnyObject = { [key: string]: any };

export type BookingTerm = keyof typeof BOOKING_TERM;
export type BookingOrigin = keyof typeof BOOKING_ORIGIN;
export * from "./booking";
export * from "./availability";
export * from "./admin";
export * from "./auth";
export * from "./device";
export * from "./property";
export * from './rate'
export * from './unit'
export * from "./unitType";
export * from "./upload";
export * from "./profile"
export * from "./inventory"
export * from "./log"
export * from "./eventlog"
export * from './attendance'
export * from './request'
export * from './employee'
export * from './permission'

export type NestedPartial<T> = {
  [K in keyof T]?: T[K] extends any ? NestedPartial<T[K]> : T[K];
};

export const zDateFormat = z.string().refine((value) => {
  const pattern = /^\d{4}-\d{2}-\d{2}$/;
  switch (true) {
    case !pattern.test(value): return false
    case !dayjs(value, 'YYYY-MM-DD').isValid(): return false
    default: return true
  }
}, { message: 'Invalid date format. Expected "yyyy-mm-dd".' })


export const zSortFormat = z.number({coerce: true}).refine(
  (value) => (value === 1 || value === -1), 
  { message: 'invalid sort format' }
).optional()