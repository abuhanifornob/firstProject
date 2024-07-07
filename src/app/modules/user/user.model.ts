import { model, Schema } from 'mongoose';

import { TUsers } from './user.interface';

const userSchema = new Schema<TUsers>(
  {
    id: {
      type: String,
    },
    password: {
      type: String,
      max: [20, 'maximum password Character is 20'],
      min: [4, 'Password is minimum 4 Chareter type'],
    },
    neendsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'student', 'faculty'],
        message: '{VALUE} is not supported',
      },
    },
    status: {
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
  },
  {
    timestamps: true,
  },
);

export const User = model<TUsers>('User', userSchema);
