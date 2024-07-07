import { Schema, model } from 'mongoose';

import validator from 'validator';

import bcrypt from 'bcrypt';

import config from '../../config';

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
  password: {
    type: String,
    required: [true, 'password is Requred'],
    unique: true,
    maxlength: [20, "Don't accept more then 20 charecter"],
    min: [7, "Don't accept less then 7 charecter"],
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
  contactNo: { type: String, required: true },
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
  isActive: {
    type: String,
    enum: {
      values: ['active', 'blocked'],
      message: '{VALUE} is not supported',
    },
    default: 'active',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// middlewear or Hooks

// Pre Hooks
studentSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

//  Post Hooks

studentSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
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
