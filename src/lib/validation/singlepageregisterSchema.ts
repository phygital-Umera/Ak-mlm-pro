import {z} from 'zod';

export const customerRegistrationSchema = z
  .object({
    crnNo: z
      .string({required_error: 'CRN No is required'})
      .min(5, {message: 'CRN No must be at least 5 characters'}),
    sponsorId: z
      .string({required_error: 'Sponsor ID is required'})
      .min(5, {message: 'Sponsor ID must be at least 5 characters'}),
    availablePositions: z.string(),

    firstName: z
      .string({required_error: 'First name is required'})
      .min(3, {message: 'First name must be at least 3 characters'}),
    lastName: z
      .string({required_error: 'Last name is required'})
      .min(3, {message: 'Last name must be at least 3 characters'}),
    gender: z.string({required_error: 'Gender is required'}),
    dob: z.string({required_error: 'Date of birth is required'}),
    email: z
      .string({required_error: 'Email is required'})
      .email({message: 'Email must be valid'}),
    phone: z
      .string({required_error: 'Mobile number is required'})
      .regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number format'),
    flatNo: z.string().optional(),
    // areaName: z.string().optional(),
    // landMark: z.string().optional(),
    pinCode: z
      .string()
      .regex(/^\d{6}$/, 'Invalid PIN code')
      .optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    aadharNo: z.string().optional(),
    panNo: z.string().optional(),
    bankName: z.string().optional(),
    bankAccNo: z.string().optional(),
    bankIFSC: z.string().optional(),
    bankBranch: z.string().optional(),
    upiId: z.string().optional(),
    password: z
      .string({required_error: 'Password is required'})
      .min(6, {message: 'Password must be at least 6 characters'}),
    confirmPassword: z
      .string({required_error: 'Confirm Password is required'})
      .min(6, {message: 'Confirm Password must be at least 6 characters'}),
    productId: z.string({required_error: 'Product ID is required'}),
    epinNo: z.string({required_error: 'EPIN No is required'}),
    side: z.enum(['LEFT', 'RIGHT'], {
      errorMap: () => ({message: "Please select either 'LEFT' or 'RIGHT'."}),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  });
