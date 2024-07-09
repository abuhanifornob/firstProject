import { model, Schema } from 'mongoose';

import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.constants';
import { TAcademicSemister } from './academicSemester.interface';

const academicSemesterSchema = new Schema<TAcademicSemister>(
  {
    name: {
      type: String,
      enum: AcademicSemesterName,
      required: true,
    },
    code: {
      type: String,
      enum: AcademicSemesterCode,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: Months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: Months,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

academicSemesterSchema.pre('save', async function (next) {
  const isExitsAcademicSemesterName = await AcademicSemister.findOne({
    name: this.name,
    year: this.year,
  });
  if (isExitsAcademicSemesterName) {
    throw new Error('Academic Semeter is Alrey Exists');
  }
  next();
});

export const AcademicSemister = model<TAcademicSemister>(
  'AcademicSemister',
  academicSemesterSchema,
);
