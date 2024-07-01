import express from 'express';

import { StudentController } from './student.controller';

const router = express.Router();

router.post('/create-student', StudentController.createStudent);

router.delete('/:studentID', StudentController.deleteStudent);
router.get('/:studentID', StudentController.getSingleStudents);
router.get('/', StudentController.getAllStudents);

export const StudentRoutes = router;
