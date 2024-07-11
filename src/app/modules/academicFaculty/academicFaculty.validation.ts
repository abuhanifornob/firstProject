import { z } from 'zod';

const AcademicFacultyZodValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Semester Name Must be String',
    }),
  }),
});

const UpdateAcademicFacultyZodValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic Semester Name Must be String',
      })
      .optional(),
  }),
});

export const AcademicFacultyValidation = {
  AcademicFacultyZodValidationSchema,
  UpdateAcademicFacultyZodValidationSchema,
};
