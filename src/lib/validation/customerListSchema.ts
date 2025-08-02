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
  phoneNumber: z
    .string({required_error: 'Phone number is required'})
    .length(10, 'Phone number must be exactly 10 digits'),

  password: z
    .string({required_error: 'Password is required'})
    .min(8, 'Password must be at least 8 characters'),

  fullname: z.string({required_error: 'Full name is required'}),

  dob: z
    .string({required_error: 'Date of Birth is required'})
    .min(1, 'Date of Birth is required'),

  gender: z.nativeEnum(Gender, {required_error: 'Gender is required'}),

  pinCode: z
    .string({required_error: 'PIN Code is required'})
    .length(6, 'PIN Code must be exactly 6 digits'),

  city: z
    .string({required_error: 'City is required'})
    .min(3, 'City must be at least 3 characters'),

  state: z
    .string({required_error: 'State is required'})
    .min(3, 'State must be at least 3 characters'),

  aadharNo: z
    .string({required_error: 'Aadhar number is required'})
    .length(12, 'Aadhar number must be exactly 12 digits'),

  panNo: z
    .string({required_error: 'PAN number is required'})
    .length(10, 'PAN number must be exactly 10 characters'),

  upiId: z
    .string({required_error: 'UPI ID is required'})
    .min(6, 'UPI ID must be at least 6 characters'),

  landMark: z
    .string({required_error: 'Landmark is required'})
    .min(3, 'Landmark must be at least 3 characters'),

  flatNo: z
    .string({required_error: 'Flat number is required'})
    .min(1, 'Flat number must be at least 1 characters'),

  areaName: z
    .string({required_error: 'Area name is required'})
    .min(3, 'Area name must be at least 3 characters'),

  bankName: z
    .string({required_error: 'Bank name is required'})
    .min(3, 'Bank name must be at least 3 characters'),

  bankAccNo: z
    .string({required_error: 'Bank account number is required'})
    .min(5, 'Bank account number must be at least 5 characters'),

  bankIFSC: z
    .string({required_error: 'IFSC code is required'})
    .length(11, 'IFSC code must be exactly 11 characters'),

  bankBranch: z
    .string({required_error: 'Bank branch is required'})
    .min(3, 'Bank branch must be at least 3 characters'),
});
