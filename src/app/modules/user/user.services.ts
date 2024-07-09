import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';

import { TUsers } from './user.interface';
import { User } from './user.model';

const createSudentIntoDB = async (payload: TStudent, password: string) => {
  const userData: Partial<TUsers> = {};
  // if passord Missing
  if (!password) {
    userData.password = config.default_password as string;
  }
  userData.password = password;
  // set Role
  userData.role = 'student';

  // create Manual ID
  userData.id = '2030200001';

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
