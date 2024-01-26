import { z } from "zod";

export const zDateFormat = z.string().refine((value) => {
  const pattern = /^\d{4}-\d{2}-\d{2}$/;
  return pattern.test(value);
}, { message: 'Invalid date format. Expected "yyyy-mm-dd".' });
