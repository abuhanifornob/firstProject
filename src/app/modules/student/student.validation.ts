import { z } from 'zod';

// Define the Zod schema for the userNameSchema
const userNameValidateSchema = z.object({
  firstName: z
    .string()
    .min(3, {
      message: 'First Name is less than 3 characters, which is not acceptable',
    })
    .max(20, {
      message: 'Name is more than 20 characters, which is not acceptable',
    })
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: 'First Name must be capitalized',
      },
    ),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, { message: 'Last Name is required' })
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Last Name must contain only alphabetic characters',
    }),
});

// Define the Zod schema for the guardianSchema
const guardianValidateSchema = z.object({
  fatherName: z.string().min(1, { message: 'Father Name is required' }),
  fatherContactNo: z
    .string()
    .min(1, { message: 'Father Contact No is required' }),
  fatherOccupation: z
    .string()
    .min(1, { message: 'Father Occupation is required' }),
  motherName: z.string().min(1, { message: 'Mother Name is required' }),
  motherContactNo: z
    .string()
    .min(1, { message: 'Mother Contact No is required' }),
  motherOccupation: z
    .string()
    .min(1, { message: 'Mother Occupation is required' }),
});

// Define the Zod schema for the localGuardinSchema
const localGuardinValidateSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  contactNo: z.string().min(1, { message: 'Contact No is required' }),
  occupation: z.string().min(1, { message: 'Occupation is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
});

// Define the Zod schema for the studentSchema
const studentValidateSchema = z.object({
  body: z.object({
    student: z.object({
      id: z.string().min(1, { message: 'ID is required' }),

      name: userNameValidateSchema,
      gender: z.enum(['male', 'female', 'other'], {
        errorMap: () => ({ message: 'Gender is not supported' }),
      }),
      dateOfBirth: z.string().min(1, { message: 'Date of Birth is required' }),
      email: z
        .string()
        .email({ message: 'Email format is invalid' })
        .min(1, { message: 'Email is required' }),
      contactNo: z.string().min(1, { message: 'Contact No is required' }),
      emergencyContactNo: z
        .string()
        .min(1, { message: 'Emergency Contact No is required' }),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
        errorMap: () => ({ message: 'Blood Group is not supported' }),
      }),
      presentAddress: z
        .string()
        .min(1, { message: 'Present Address is required' }),
      permanentAddress: z
        .string()
        .min(1, { message: 'Present Address is required' }),
      guardian: guardianValidateSchema,
      localGuardian: localGuardinValidateSchema,
      profileImg: z.string().min(1, { message: 'Profile Image is required' }),
      admissionSemester: z.string(),
    }),
  }),
});

export const studentValidats = {
  studentValidateSchema,
};
