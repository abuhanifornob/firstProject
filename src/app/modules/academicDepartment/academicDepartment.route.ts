import express from 'express';

import validateRequet from '../../middleware/validateRequest';

import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create-academic-department',
  // validateRequet(
  //   AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  // ),
  AcademicDepartmentController.createAcademicDepartment,
);
router.get(
  '/:departmentId',

  AcademicDepartmentController.getSingalAcademicDepartment,
);
router.patch(
  '/:departmentId',
  validateRequet(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.updateAcademicDepartment,
);
router.get(
  '/',

  AcademicDepartmentController.getAllAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
