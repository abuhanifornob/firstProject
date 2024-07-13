import { ZodError, ZodIssue } from 'zod';

import { TErrorSources, TGenerecErrorResponse } from '../interface/error';

const handleZoodError = (err: ZodError): TGenerecErrorResponse => {
  const statusCode = 400;
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  return {
    statusCode,
    errorSources,
    message: 'Zod Validation Error',
  };
};

export default handleZoodError;
