import { StatusCodes } from 'http-status-codes';

import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import { UserServices } from './user.services';

const createStudent = catchAsync(async (req, res, next) => {
  const { student: studentData, password } = req.body;

  const result = await UserServices.createSudentIntoDB(studentData, password);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Create Successfuly',
    data: result,
  });
});

export const UserController = {
  createStudent,
};
