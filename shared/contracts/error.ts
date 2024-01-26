export type ValidationError<T = any> = Record<keyof T, string[]>
