import {count} from 'console';
import {z} from 'zod';

export const epinCountSchema = z.object({
  paidAmount: z
    .string()
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num > 0;
      },
      {message: 'Count must be at least 1 and greater than 0'},
    )
    .transform((val) => Number(val)),
  imageFile: z.instanceof(FileList).refine((files) => files.length > 0, {
    message: 'At least one file is required',
  }),
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

  type: z
    .enum(['ZERO', 'REGULAR'], {
      required_error: 'Type is required',
      invalid_type_error: 'Type must be either zero or regular',
    })
    .optional(),

  OTP: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const num = Number(val);
        return !isNaN(num) && num > 0;
      },
      {message: 'OTP must be a valid number greater than 0'},
    ),
});
