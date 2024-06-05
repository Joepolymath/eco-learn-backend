import UserServices from '../modules/users/services';
import UserController from '../modules/users/controllers';
import { IUserService } from '../modules/users/types/abstractions';
import userModel from '../modules/users/models';
import UserRepo from '../modules/users/dataAccess';
import CourseController from '../modules/courses/controllers';
import CourseServices from '../modules/courses/services';
import { ICourseService } from '../modules/courses/types/abstractions';

const userServices: IUserService = new UserServices();
const courseServices: ICourseService = new CourseServices();

// instantiated controllers
export const userController = new UserController(userServices);
export const courseController = new CourseController(courseServices);
