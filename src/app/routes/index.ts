import { Router } from 'express';

import { StudentRoutes } from '../modules/student/studnet.route';
import { UserRouters } from '../modules/user/user.route';

const router = Router();

const moduleRoute = [
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/users',
    route: UserRouters,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
