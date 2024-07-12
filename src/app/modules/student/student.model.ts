import { Schema, model } from 'mongoose';

import validator from 'validator';

import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicSemister } from '../academicSemester/academicSemester.model';
import { User } from '../user/user.model';

import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [20, 'Name is More then 20 Charecter is not acceptebel'],
    min: [3, 'First Name is Less then 3 Charecter is not Acceptebel'],
    validate: {
      validator: function (value: string) {
        const firstNameCapital = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameCapital === value;
      },
      message: '{VALUE} is not Capitalized ',
    },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),

      message: '{VALUE} is not Accept only String',
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  motherName: { type: String, required: true },
  motherContactNo: { type: String, required: true },
  motherOccupation: { type: String, required: true },
});

const localGuardinSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  contactNo: { type: String, required: true },
  occupation: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: [true, 'ID is Requred'], unique: true },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User is Requred'],
    unique: true,
    ref: User,
  },
  name: {
    type: userNameSchema,
    required: [true, 'Name is Required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not supported',
    },
    required: [true, 'Gender is Requred'],
  },
  dateOfBirth: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is Email format',
    },
  },
  contactNo: { type: String, required: true, unique: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: '{VALUE} is not supported',
    },
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardinSchema,
    required: true,
  },
  profileImg: { type: String, required: true },
  admissionSemester: {
    type: Schema.Types.ObjectId,
    ref: AcademicSemister,
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: AcademicDepartment,
  },
});

//.............Quary Hooks

studentSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// .... Static Method.....
studentSchema.statics.isUserExists = async function (id: string) {
  const existsUser = await Student.findOne({ id });
  return existsUser;
};
// For Custom Instance Method
// studentSchema.methods.isUserExist = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

// 3. Create a Model.

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
