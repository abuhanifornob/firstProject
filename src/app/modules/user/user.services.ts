import mongoose from 'mongoose';

import { StatusCodes } from 'http-status-codes';

import config from '../../config';
import { AcademicSemister } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import AppError from '../../errors/appErrors';

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admissionSemester: any = await AcademicSemister.findById(
    payload.admissionSemester,
  );
  // create Manual ID
  userData.id = await generateStudnetId(admissionSemester);
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'User Create Faild');
    }

    // check User Create
    if (Object.keys(newUser).length) {
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id;
      const newStudent = await Student.create([payload], { session });
      if (!newStudent.length) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Student Create Faild !!');
      }
      await session.commitTransaction();
      session.endSession();
      return newStudent;
    }
  } catch (error) {
    session.abortTransaction();
    session.endSession();
  }
};

export const UserServices = {
  createSudentIntoDB,
};
