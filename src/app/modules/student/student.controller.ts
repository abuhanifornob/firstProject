/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes';

import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import { StudentServices } from './student.service';

const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student retrive Successfuly',
    data: result,
  });
});
const getSingleStudents = catchAsync(async (req, res, next) => {
  const { studentID } = req.params;
  const result = await StudentServices.getSingleStudnetFromDB(studentID);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'A Student retrive Successfuly',
    data: result,
  });
});
const deleteStudent = catchAsync(async (req, res, next) => {
  const { studentID } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentID);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student Deleted Successfuly',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res, next) => {
  const { studentID } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateStudentIntoDB(studentID, student);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student Update Successfuly',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudents,
  deleteStudent,
  updateStudent,
};
