import { model, Schema } from 'mongoose';

import bcrypt from 'bcrypt';

import config from '../../config';

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

// middlewear or Hooks

// // Pre Hooks
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

//  Post Hooks

userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<TUsers>('User', userSchema);
