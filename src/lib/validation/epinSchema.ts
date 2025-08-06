import {count} from 'console';
import {z} from 'zod';

export const epinCountSchema = z.object({
  paidAmount: z.string(),
  epins: z
    .array(
      z.object({
        price: z
          .string()
          .refine((val) => {
            const num = Number(val);
            return [3150, 3300, 3600].includes(num);
          })
          .transform((val) => Number(val)),
        count: z.string().transform((val) => Number(val)),
      }),
    )
    .min(1, {message: 'At least one E-Pin is required'}),
});

export const epinSchema = z.object({
  count: z
    .string()
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num > 0;
      },
      {message: 'Count must be at least 1 and greater than 0'},
    )
    .transform((val) => Number(val)),
  price: z
    .string()
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num > 0;
      },
      {message: 'Amount must be at least 1 and greater than 0'},
    )
    .transform((val) => Number(val)),
});

// Validation schema
export const epinProductSchema = z.object({
  count: z
    .string()
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num > 0;
      },
      {message: 'Count must be at least 1 and greater than 0'},
    )
    .transform((val) => Number(val)),

  price: z
    .string()
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num > 0;
      },
      {message: 'Price must be at least 1 and greater than 0'},
    )
    .transform((val) => Number(val)),
});
