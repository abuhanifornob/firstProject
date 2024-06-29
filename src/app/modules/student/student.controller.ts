import { Request, Response } from 'express';

import { StudentServices } from './student.service';
import studentValidateSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    // zod Validation
    const zodParseData = studentValidateSchema.parse(studentData);
    const result = await StudentServices.createSudentIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: 'Student Create Successfuly',
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

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
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

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudents,
};
