import express from 'express';

import { createAdminValidationSchema } from '../admin/admin.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { studentValidats } from '../student/student.validation';
import validateRequet from '../../middleware/validateRequest';

import { UserController } from './user.controller';

const route = express.Router();

route.post(
  '/create-student',
  validateRequet(studentValidats.studentValidateSchema),
  UserController.createStudent,
);

route.post(
  '/create-faculty',
  validateRequet(createFacultyValidationSchema),
  UserController.createFaculty,
);

route.post(
  '/create-admin',
  validateRequet(createAdminValidationSchema),
  UserController.createAdmin,
);
export const UserRouters = route;
