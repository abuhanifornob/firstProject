import { Router } from 'express';

import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicSemesterRouters } from '../modules/academicSemester/academicSemester.route';
import { StudentRoutes } from '../modules/student/studnet.route';
import { UserRouters } from '../modules/user/user.route';

const router = Router();

const moduleRoute = [
  {
    path: '/users',
    route: UserRouters,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academicSemester',
    route: AcademicSemesterRouters,
  },
  {
    path: '/academicFaculty',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academicDepartment',
    route: AcademicDepartmentRoutes,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
