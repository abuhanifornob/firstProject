import QueryBuilder from '../../builder/QueryBuilder';

import { CourseSearchableFields } from './course.constant';
import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};
const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};

const getSinglecoureFromDB = async (id: string) => {
  const result = await Course.findById(id);
  return result;
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndDelete(id);
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...remainingUpdateData } = payload;

  //Step -1 Update non Primitive Data Basic information
  const updateBasicCourseInfo = await Course.findByIdAndUpdate(
    id,
    remainingUpdateData,
    {
      new: true,
      runValidators: true,
    },
  );
  // find thear PreREqusition Course
  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    const deletePreRequisite = preRequisiteCourses
      .filter((el) => el.course && el.isDeleted)
      .map((el) => el.course);
    // Remove Delete Prerequisiton Data
    await Course.findByIdAndUpdate(id, {
      $pull: { preRequisiteCourses: { course: { $in: deletePreRequisite } } },
    });
    const newPreRequisites = preRequisiteCourses.filter(
      (el) => el.course && !el.isDeleted,
    );
    await Course.findByIdAndUpdate(id, {
      $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
    });
  }
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

export const CourseServices = {
  getAllCourseFromDB,
  createCourseIntoDB,
  getSinglecoureFromDB,
  deleteCourseFromDB,
  updateCourseIntoDB,
};
