import { ICourse, IEnrollCourse, IGetCourses } from '..';
import { IResponse } from '../../../../shared/utils/response.utils';
import { User } from '../../../users/dataAccess/entities/user.entity';
import { IGetLesson, ILesson } from '../lesson.types';

export interface ICourseService {
  createCourse(payload: ICourse): Promise<IResponse>;
  getAllCourses(query: IGetCourses): Promise<IResponse>;
  enrollCourse(payload: IEnrollCourse, userId: User): Promise<IResponse>;
  createLesson(payload: ILesson): Promise<IResponse>;
  getAllLessons(query: IGetLesson): Promise<IResponse>;
}
