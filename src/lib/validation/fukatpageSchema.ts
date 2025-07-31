import {z} from 'zod';

export const customerCountSchema = z.object({
  customerId: z.string({required_error: 'Customer ID is required'}),
  leftCount: z.string().refine(
    (val) => {
      const num = Number(val);
      return !isNaN(num);
    },
    {message: 'Count must be at least 1'},
  ),
  rightCount: z.string().refine(
    (val) => {
      const num = Number(val);
      return !isNaN(num);
    },
    {message: 'Count must be at least 1'},
  ),
  pairCount: z.string().refine(
    (val) => {
      const num = Number(val);
      return !isNaN(num);
    },
    {message: 'Count must be at least 1'},
  ),
});

export const dusaraFukatPageSchema = z.object({
  customers: z.array(customerCountSchema),
});
