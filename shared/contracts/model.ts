export interface TimeStamps {
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
export type TimeStampKeys = keyof TimeStamps;
export interface Model extends TimeStamps {
  id: string;
  page?: number;
  lastPage?: number;
}