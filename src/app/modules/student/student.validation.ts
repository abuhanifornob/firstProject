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
  middleName: z.string(),
  lastName: z
    .string()
    .min(1, { message: 'Last Name is required' })
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Last Name must contain only alphabetic characters',
    }),
});
const updateUserNameZodValidateSchema = z.object({
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
    )
    .optional(),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, { message: 'Last Name is required' })
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Last Name must contain only alphabetic characters',
    })
    .optional(),
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
// Define the Update  Zod schema for the guardianSchema
const updateGuardianZodValidateSchema = z.object({
  fatherName: z
    .string()
    .min(1, { message: 'Father Name is required' })
    .optional(),
  fatherContactNo: z
    .string()
    .min(1, { message: 'Father Contact No is required' })
    .optional(),
  fatherOccupation: z
    .string()
    .min(1, { message: 'Father Occupation is required' })
    .optional(),
  motherName: z
    .string()
    .min(1, { message: 'Mother Name is required' })
    .optional(),
  motherContactNo: z
    .string()
    .min(1, { message: 'Mother Contact No is required' })
    .optional(),
  motherOccupation: z
    .string()
    .min(1, { message: 'Mother Occupation is required' })
    .optional(),
});

// Define the Zod schema for the localGuardinSchema
const localGuardinValidateSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  contactNo: z.string().min(1, { message: 'Contact No is required' }),
  occupation: z.string().min(1, { message: 'Occupation is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
});
const updateLocalGuardinZodValidateSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).optional(),
  contactNo: z
    .string()
    .min(1, { message: 'Contact No is required' })
    .optional(),
  occupation: z
    .string()
    .min(1, { message: 'Occupation is required' })
    .optional(),
  address: z.string().min(1, { message: 'Address is required' }).optional(),
});

// Define the Zod schema for the studentSchema
const studentValidateSchema = z.object({
  body: z.object({
    student: z.object({
      id: z.string(),

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
      academicDepartment: z.string(),
    }),
  }),
});
const updateStudentZodValidateSchema = z.object({
  body: z.object({
    student: z.object({
      id: z.string().optional(),

      name: updateUserNameZodValidateSchema.optional(),
      gender: z
        .enum(['male', 'female', 'other'], {
          errorMap: () => ({ message: 'Gender is not supported' }),
        })
        .optional(),
      dateOfBirth: z
        .string()
        .min(1, { message: 'Date of Birth is required' })
        .optional(),
      email: z
        .string()
        .email({ message: 'Email format is invalid' })
        .min(1, { message: 'Email is required' })
        .optional(),
      contactNo: z
        .string()
        .min(1, { message: 'Contact No is required' })
        .optional(),
      emergencyContactNo: z
        .string()
        .min(1, { message: 'Emergency Contact No is required' })
        .optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
          errorMap: () => ({ message: 'Blood Group is not supported' }),
        })
        .optional(),
      presentAddress: z
        .string()
        .min(1, { message: 'Present Address is required' })
        .optional(),
      permanentAddress: z
        .string()
        .min(1, { message: 'Present Address is required' })
        .optional(),
      guardian: updateGuardianZodValidateSchema.optional(),
      localGuardian: updateLocalGuardinZodValidateSchema.optional(),
      profileImg: z
        .string()
        .min(1, { message: 'Profile Image is required' })
        .optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const studentValidats = {
  studentValidateSchema,
  updateStudentZodValidateSchema,
};
