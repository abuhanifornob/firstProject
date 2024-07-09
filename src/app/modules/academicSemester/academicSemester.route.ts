import express from 'express';

import validateRequet from '../../middleware/validateRequest';

import { AcademicSemesterController } from './academicSemester.controller';
import { academicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academicSemeter',
  validateRequet(academicSemesterValidation.academicSemesterZodValidationScema),
  AcademicSemesterController.createAcademicSemester,
);
router.get(
  '/:semesterId',
  AcademicSemesterController.getSingalAcademicSemester,
);
router.get('/', AcademicSemesterController.getAllAcademicSemester);

router.patch('/:semesterId', AcademicSemesterController.updateAcademicSemester);

export const AcademicSemesterRouters = router;
