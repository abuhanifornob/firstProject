import { ZodError, ZodIssue } from 'zod';

import { TErrorSources } from '../interface/error';

const handleZoodError = (err: ZodError) => {
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
