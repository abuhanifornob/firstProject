import { model, Schema } from 'mongoose';

import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';

import { TAcademicDepartment } from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  departmentFaculty: {
    type: Schema.Types.ObjectId,
    ref: AcademicFaculty,
  },
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
