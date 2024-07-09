import express from 'express';

import { studentValidats } from '../student/student.validation';
import validateRequet from '../../middleware/validateRequest';

import { UserController } from './user.controller';

const route = express.Router();

route.post(
  '/create-student',
  validateRequet(studentValidats.studentValidateSchema),
  UserController.createStudent,
);

export const UserRouters = route;
