import { Types } from 'mongoose';

export type TAcademicDepartment = {
  name: string;
  departmentFaculty: Types.ObjectId;
};
