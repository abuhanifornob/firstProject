import mongoose from 'mongoose';

import { StatusCodes } from 'http-status-codes';

import { User } from '../user/user.model';
import AppError from '../../errors/appErrors';

import { TStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudentFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'departmentFaculty',
      },
    });
  return result;
};

const getSingleStudnetFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'departmentFaculty',
      },
    });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const userExists = await Student.isUserExists(id);
  if (!userExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User id Not Exists');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deleteStudent = await Student.updateOne(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteStudent) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Student Delete Faild');
    }
    const deleteUser = await User.updateOne(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteUser) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User Delete Faild');
    }
    await session.commitTransaction();
    await session.endSession();
    return deleteStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, 'Studet delete False');
  }
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingData } = payload;

  const modifiedData: Record<string, unknown> = {
    ...remainingData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedData[`localGuardian.${key}`] = value;
    }
  }
  const result = await Student.updateOne({ id }, modifiedData, {
    new: true,
  });
  return result;
};
export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudnetFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
