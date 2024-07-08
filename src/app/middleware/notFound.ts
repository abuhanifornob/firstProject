import { NextFunction, Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';

const notFounApi = (req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'API Not Found',
    error: '',
  });
  next();
};

export default notFounApi;
