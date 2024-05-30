import UserServices from '../modules/users/services';
import UserController from '../modules/users/controllers';
import { IUserService } from '../modules/users/types/abstractions';
import userModel from '../modules/users/models';
import UserRepo from '../modules/users/dataAccess';

const userServices: IUserService = new UserServices();

// instantiated controllers
export const userController = new UserController(userServices);
