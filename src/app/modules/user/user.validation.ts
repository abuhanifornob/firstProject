import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    id: z.string(),
    password: z
      .string({
        invalid_type_error: 'Password must be a string',
      })
      .max(20, { message: "Password cann't more then 20 Character" })
      .optional(),
    neendsPasswordChange: z.boolean().optional().default(true),
    role: z.enum(['admin', 'student', 'faculty']),
    status: z.enum(['active', 'blocked']),
    isDeleted: z.boolean().optional().default(false),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    password: z
      .string({
        invalid_type_error: 'Password must be a string',
      })
      .max(20, { message: "Password cann't more then 20 Character" })
      .optional(),
    neendsPasswordChange: z.boolean().optional().default(true).optional(),
    role: z.enum(['admin', 'student', 'faculty']).optional(),
    status: z.enum(['active', 'blocked']).optional(),
    isDeleted: z.boolean().optional().default(false).optional(),
  }),
});
export const UserValidation = {
  userValidationSchema,
  updateUserValidationSchema,
};
