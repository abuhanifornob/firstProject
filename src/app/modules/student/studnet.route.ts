import express from 'express';

import validateRequet from '../../middleware/validateRequest';

import { StudentController } from './student.controller';
import { studentValidats } from './student.validation';

const router = express.Router();
// Router Middlewear
router.delete('/:studentID', StudentController.deleteStudent);
router.patch(
  '/:studentID',
  //   validateRequet(studentValidats.updateStudentZodValidateSchema),
  StudentController.updateStudent,
);
router.get('/:studentID', StudentController.getSingleStudents);
router.get('/', StudentController.getAllStudents);

export const StudentRoutes = router;
