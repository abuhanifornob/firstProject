import { TAcademicSemister } from '../academicSemester/academicSemester.interface';

import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudentId = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  ).sort({ createdAt: -1 });

  return lastStudentId?.id ? lastStudentId.id : undefined;
};
export const generateStudnetId = async (payload: TAcademicSemister) => {
  let currentId = (0).toString();

  const lastStudentId = await findLastStudentId();
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentSemesterYear = lastStudentId?.substring(0, 4);
  if (
    lastStudentId &&
    lastStudentSemesterCode === payload.code &&
    lastStudentSemesterYear === payload.year
  ) {
    currentId = lastStudentId.substring(6);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};
