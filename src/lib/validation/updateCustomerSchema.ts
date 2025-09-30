import {z} from 'zod';

export const updateCustomerSchema = z
  .object({
    // crnNo: z
    //   .string({required_error: 'CRN No is required'})
    //   .min(5, {message: 'CRN No must be at least 5 characters'}),
    sponsorId: z.string().optional(),
    phoneNumber: z.string().optional(),
    
    firstName: z.string().optional(),
    gender: z.string().optional(),
    dob: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    flatNo: z.string().optional(),
    areaName: z.string().optional(),
    landMark: z.string().optional(),
    pinCode: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    aadharNo: z.string().optional(),
    panNo: z.string().optional(),
    bankName: z.string().optional(),
    bankAccNo: z.string().optional(),
    bankIFSC: z.string().optional(),
    bankBranch: z.string().optional(),
    // upiId: z
    //   .string({message: 'UPI Id is required'})
    //   .min(1, 'UPI Id is required')
    //   .regex(/^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{3,}$/g)
    //   .optional(),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  });
