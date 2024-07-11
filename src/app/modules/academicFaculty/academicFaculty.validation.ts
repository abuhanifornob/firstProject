import { z } from 'zod';

const createdAcademicFacultyZodValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Semester Name Must be String',
    }),
  }),
});

const updateAcademicFacultyZodValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic Semester Name Must be String',
      })
      .optional(),
  }),
});

export const AcademicFacultyValidation = {
  createdAcademicFacultyZodValidationSchema,
  updateAcademicFacultyZodValidationSchema,
};
