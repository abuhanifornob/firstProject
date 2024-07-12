import { ErrorRequestHandler } from 'express';

import { ZodError, ZodIssue } from 'zod';

import mongoose, { CastError } from 'mongoose';

import config from '../config';
import handleZoodError from '../errors/handleZodError';
import { TErrorSources } from '../interface/error';

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something Want Wrong';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: '',
    },
  ];

  const handleMongooseError = (err: mongoose.Error.ValidationError) => {
    const errorSources: TErrorSources = Object.values(err?.errors).map(
      (val) => {
        return {
          path: val?.path,
          message: val?.message,
        };
      },
    );
    return {
      statusCode: 400,
      message: 'Mongoose Validation Error',
      errorSources,
    };
  };

  if (err instanceof ZodError) {
    const modifiedZodError = handleZoodError(err);
    errorSources = modifiedZodError?.errorSources;
    statusCode = modifiedZodError?.statusCode;
    message = modifiedZodError?.message;
  } else if (err?.name === 'ValidationError') {
    const modifiedMongooseError = handleMongooseError(err);
    errorSources = modifiedMongooseError?.errorSources;
    statusCode = modifiedMongooseError?.statusCode;
    message = modifiedMongooseError?.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: config.node_env === 'development' ? err?.stack : 'null',
  });
  next();
};

//Error Pattern

/*
success:
message:
errorSource:[{
path:
message
}]
stack:
*/
