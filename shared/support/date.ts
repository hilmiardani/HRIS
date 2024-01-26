import dayjs from "dayjs"
import { range } from "./array"

const NOW = dayjs()

export const dateTime = (date: string) => {
  return dayjs(date).format("D MMMM YYYY H:m")
}
export const dMY = (date: string) => {
  return dayjs(date).format("D MMMM YYYY")
}

export const yearRangeFrom = (year: number) => {
  const currentYear = Number(NOW.format("YYYY"));
  return range(year, currentYear)
}