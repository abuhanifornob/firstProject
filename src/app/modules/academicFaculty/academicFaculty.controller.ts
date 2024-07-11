import { StatusCodes } from 'http-status-codes';

import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import { AcademicFacultyServices } from './academicFaculty.services';

const createAcademicFaculty = catchAsync(async (req, res, next) => {
  const academicFacultyData = req.body;

  const result =
    await AcademicFacultyServices.createAcademicFacultyIntoDB(
      academicFacultyData,
    );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic Faculty Create Successfuly',
    data: result,
  });
});
const getAllAcademicFaculty = catchAsync(async (req, res, next) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultyFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All academic Faculty Gett Successfuly Done',
    data: result,
  });
});
const getSingleAcademicFaculty = catchAsync(async (req, res, next) => {
  const { facultyId } = req.params;
  const result =
    await AcademicFacultyServices.getSingalAcademicFacultyFromDB(facultyId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single Academic Faculty Retrive Succefully',
    data: result,
  });
});
const updateAcademicFaculty = catchAsync(async (req, res, next) => {
  const { facultyId } = req.params;
  const facultyData = req.body;
  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
    facultyId,
    facultyData,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic Faculty Information Update Successfully',
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
