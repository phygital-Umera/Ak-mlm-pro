import {z} from 'zod';

export const customerListSchema = z.object({
  sponsorId: z
    .string()
    .min(5, {message: 'Sponsor ID must be at least 5 characters'}),
});

enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export const updateProfileSchema = z.object({
  phoneNumber: z.string().optional(),
  password: z.string().optional(),
  fullname: z.string().optional(),
  dob: z.string().optional(),
  gender: z.nativeEnum(Gender).optional(),
  email: z.string().email().optional(),
  pinCode: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  aadharNo: z.string().optional(),
  panNo: z.string().optional(),
  // upiId: z
  //   .string({required_error: 'UPI ID is required'})
  //   .min(6, 'UPI ID must be at least 6 characters'),
  landMark: z.string().optional(),
  flatNo: z.string().optional(),
  areaName: z.string().optional(),
  bankName: z.string().optional(),
  bankAccNo: z.string().optional(),
  bankIFSC: z.string().optional(),
  bankBranch: z.string().optional(),
  sponsorId: z.string().optional(),
  crn: z.string().optional(),
});
