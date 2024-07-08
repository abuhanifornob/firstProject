/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from 'express';

import cors from 'cors';

import router from './app/routes';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import notFounApi from './app/middleware/notFound';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.use(globalErrorHandler);

app.use(notFounApi);

export default app;
