import { Request, Response } from 'express';

import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    const result = await StudentServices.createSudentIntoDB(studentData);
    res.status(200).json({
      success: true,
      message: 'Student Create Successfuly',
      data: result,
    });
  } catch (error) {
    console.log(error);
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
  } catch (err) {
    console.log(err);
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
  } catch (err) {
    console.log(err);
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudents,
};
