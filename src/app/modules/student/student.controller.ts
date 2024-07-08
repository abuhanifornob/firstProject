import { NextFunction, Request, RequestHandler, Response } from 'express';

import { StatusCodes } from 'http-status-codes';

import sendResponse from '../../utils/sendResponse';

import { StudentServices } from './student.service';

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

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

export const StudentController = {
  getAllStudents,
  getSingleStudents,
  deleteStudent,
};
