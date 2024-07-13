import { ErrorRequestHandler } from 'express';

import { ZodError } from 'zod';

import config from '../config';
import AppError from '../errors/appErrors';
import handleCastError from '../errors/castError';
import handleDuplicateError from '../errors/handleDuplicateError';
import handleMongooseError from '../errors/handleMongooseError';
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
  } else if (err?.name === 'CastError') {
    const modifiedMongooseError = handleCastError(err);
    errorSources = modifiedMongooseError?.errorSources;
    statusCode = modifiedMongooseError?.statusCode;
    message = modifiedMongooseError?.message;
  } else if (err?.code === 11000) {
    const modifiedMongooseError = handleDuplicateError(err);
    errorSources = modifiedMongooseError?.errorSources;
    statusCode = modifiedMongooseError?.statusCode;
    message = modifiedMongooseError?.message;
  } else if (err instanceof AppError) {
    errorSources = [
      {
        path: '',
        message: err.message,
      },
    ];
    statusCode = err?.statusCode;
    message = err?.message;
  } else if (err instanceof Error) {
    errorSources = [
      {
        path: '',
        message: err.message,
      },
    ];
    message = err?.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
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
