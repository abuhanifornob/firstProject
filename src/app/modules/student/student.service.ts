import { TStudent } from './student.interface';
import { Student } from './student.model';

const createSudentIntoDB = async (student: TStudent) => {
  if (await Student.isUserExists(student.id)) {
    throw new Error('This User is Already Exist');
  }
  const result = await Student.create(student);

  //.........for Custom Instance Method
  // const studentInstance = new Student(student);
  // if (await studentInstance.isUserExist(student.id)) {
  //   throw new Error('This User is Already Exist');
  // }
  // const result = await studentInstance.save();
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

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};
export const StudentServices = {
  createSudentIntoDB,
  getAllStudentFromDB,
  getSingleStudnetFromDB,
  deleteStudentFromDB,
};
