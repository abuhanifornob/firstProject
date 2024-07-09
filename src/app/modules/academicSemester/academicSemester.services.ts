import { academicSemesterMapperCode } from './academicSemester.constants';
import { TAcademicSemister } from './academicSemester.interface';
import { AcademicSemister } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemister) => {
  if (academicSemesterMapperCode[payload.name] !== payload.code) {
    throw new Error(
      'Invalid Semester Code !! Please provide Acutual Semester Code',
    );
  }
  const result = await AcademicSemister.create(payload);
  return result;
};

const getAllAcademicSemeterFromDB = async () => {
  const result = await AcademicSemister.find();
  return result;
};
const getSingleAcademicSemeterFromDB = async (semesterId: string) => {
  const result = await AcademicSemister.findById(semesterId);
  return result;
};
const updateAcademicSemesterIntoDB = async (
  semesterId: string,
  payload: Partial<TAcademicSemister>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterMapperCode[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code');
  }

  const result = await AcademicSemister.findOneAndUpdate(
    { _id: semesterId },
    payload,
    {
      new: true,
    },
  );
  return result;
};
export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemeterFromDB,
  getSingleAcademicSemeterFromDB,
  updateAcademicSemesterIntoDB,
};
