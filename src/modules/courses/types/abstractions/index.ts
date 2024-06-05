import { ICourse, IEnrollCourse, IGetCourses } from '..';
import { IResponse } from '../../../../shared/utils/response.utils';
import { User } from '../../../users/dataAccess/entities/user.entity';

export interface ICourseService {
  createCourse(payload: ICourse): Promise<IResponse>;
  getAllCourses(query: IGetCourses): Promise<IResponse>;
  enrollCourse(payload: IEnrollCourse, userId: User): Promise<IResponse>;
}
