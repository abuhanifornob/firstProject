import { TStudent } from './student.interface';
import { Student } from './student.model';

const createSudentIntoDB = async (student: TStudent) => {
  const result = await Student.create(student);
  return result;
};

const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudnetFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const StudentServices = {
  createSudentIntoDB,
  getAllStudentFromDB,
  getSingleStudnetFromDB,
};
