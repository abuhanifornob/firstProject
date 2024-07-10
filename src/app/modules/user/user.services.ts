import config from '../../config';
import { AcademicSemister } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';

import { TUsers } from './user.interface';
import { User } from './user.model';
import { generateStudnetId } from './user.utils';

const createSudentIntoDB = async (payload: TStudent, password: string) => {
  const userData: Partial<TUsers> = {};
  // if passord Missing
  if (!password) {
    userData.password = config.default_password as string;
  }
  userData.password = password;
  // set Role
  userData.role = 'student';

  const admissionSemester = await AcademicSemister.findById(
    payload.admissionSemester,
  );
  // create Manual ID
  userData.id = await generateStudnetId(admissionSemester);

  const result = await User.create(userData);

  // check User Create
  if (Object.keys(result).length) {
    payload.id = result.id;
    payload.user = result._id;
    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createSudentIntoDB,
};
