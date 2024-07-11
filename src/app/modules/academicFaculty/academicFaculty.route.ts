import express from 'express';

import validateRequet from '../../middleware/validateRequest';

import { AcademicFacultyControllers } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequet(
    AcademicFacultyValidation.createdAcademicFacultyZodValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
);
router.get('/:facultyId', AcademicFacultyControllers.getSingleAcademicFaculty);
router.patch(
  '/:facultyId',
  validateRequet(
    AcademicFacultyValidation.updateAcademicFacultyZodValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFaculty,
);
router.get(
  '/',

  AcademicFacultyControllers.getAllAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
