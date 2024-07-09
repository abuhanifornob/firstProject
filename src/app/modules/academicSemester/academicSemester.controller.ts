import { StatusCodes } from 'http-status-codes';

import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import { AcademicSemesterServices } from './academicSemester.services';

const createAcademicSemester = catchAsync(async (req, res, next) => {
  const academicSemesterData = req.body;

  const result =
    await AcademicSemesterServices.createAcademicSemesterIntoDB(
      academicSemesterData,
    );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic Semester Create Successfuly',
    data: result,
  });
});

const getAllAcademicSemester = catchAsync(async (req, res, next) => {
  const result = await AcademicSemesterServices.getAllAcademicSemeterFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic Semester Create Successfuly',
    data: result,
  });
});
const getSingalAcademicSemester = catchAsync(async (req, res, next) => {
  const { semesterId } = req.params;
  const result =
    await AcademicSemesterServices.getSingleAcademicSemeterFromDB(semesterId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'A Academic Semister Get Successfuly',
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res, next) => {
  const { semesterId } = req.params;
  const payload = req.body;
  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
    semesterId,
    payload,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'A Academic Semister Get Successfuly',
    data: result,
  });
});
export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingalAcademicSemester,
  updateAcademicSemester,
};
