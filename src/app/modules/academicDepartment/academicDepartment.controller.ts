import { StatusCodes } from 'http-status-codes';

import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import { AcademicDepartmentServices } from './academicDepartment.services';

const createAcademicDepartment = catchAsync(async (req, res, next) => {
  const academicDepartmentData = req.body;

  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDB(
      academicDepartmentData,
    );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic Department Create Successfuly',
    data: result,
  });
});

const getAllAcademicDepartment = catchAsync(async (req, res, next) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All Department Retrive Successfuly',
    data: result,
  });
});
const getSingalAcademicDepartment = catchAsync(async (req, res, next) => {
  const { departmentId } = req.params;
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(
      departmentId,
    );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'A Academic Department Retrive Successfuly',
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res, next) => {
  const { departmentId } = req.params;
  const payload = req.body;
  const result =
    await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
      departmentId,
      payload,
    );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic Department Successfuly',
    data: result,
  });
});
export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingalAcademicDepartment,
  updateAcademicDepartment,
};
