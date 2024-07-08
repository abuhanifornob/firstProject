import { NextFunction, Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';

import sendResponse from '../../utils/sendResponse';

import { UserServices } from './user.services';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { student: studentData, password } = req.body;

    const result = await UserServices.createSudentIntoDB(studentData, password);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'User Create Successfuly',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserController = {
  createStudent,
};
