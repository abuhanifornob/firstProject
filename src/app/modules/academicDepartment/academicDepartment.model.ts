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

academicDepartmentSchema.pre('save', async function (next) {
  const isExitsDepartmentName = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isExitsDepartmentName) {
    throw new Error(`${this.name} Department is Already Exits`);
  }
  next();
});

// academicDepartmentSchema.pre('findOne', async function (next) {
//   const quary = this.getQuery();
//   const isExistsId = await AcademicDepartment.findById(quary._id);
//   console.log(isExistsId);

//   //   if (!isExistsId) {
//   //     throw new Error(`This id is not Found Please Correct Id`);
//   //   }
//   next();
// });

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
