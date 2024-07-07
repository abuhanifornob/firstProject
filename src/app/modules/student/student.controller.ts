import { Request, Response } from 'express';

import { StudentServices } from './student.service';

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'Student retrive Successfuly',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};
const getSingleStudents = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;
    const result = await StudentServices.getSingleStudnetFromDB(studentID);
    res.status(200).json({
      success: true,
      message: 'Student retrive Successfuly',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something Went Wrong',
      error: error,
    });
  }
};
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;
    console.log(studentID);
    const result = await StudentServices.deleteStudentFromDB(studentID);
    res.status(200).json({
      success: true,
      message: 'Student Deleted Successfuly',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Something Went Wrong',
      error: err,
    });
  }
};

export const StudentController = {
  getAllStudents,
  getSingleStudents,
  deleteStudent,
};
