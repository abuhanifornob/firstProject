import { Request, Response } from 'express';

import { UserServices } from './user.services';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData, password } = req.body;

    const result = await UserServices.createSudentIntoDB(studentData, password);
    res.status(200).json({
      success: true,
      message: 'Student Create Successfuly',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something Went Wrong',
      error: error,
    });
  }
};

export const UserController = {
  createStudent,
};
