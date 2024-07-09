import { TAcademicSemister } from './academicSemester.interface';
import { AcademicSemister } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemister) => {
  const result = await AcademicSemister.create(payload);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};
