import UserServices from '../modules/users/services';
import UserController from '../modules/users/controllers';
import { IUserService } from '../modules/users/types/abstractions';
import { IAuthService } from '../modules/auth/types/abstractions';
import AuthServices from '../modules/auth/services';
import userModel from '../modules/users/models';
import UserRepo from '../modules/users/dataAccess';
import AuthController from '../modules/auth/controllers';

const userServices: IUserService = new UserServices();

const userRepo = new UserRepo(userModel);
const authServices: IAuthService = new AuthServices(userRepo);

// instantiated controllers
export const userController = new UserController(userServices);
export const authController = new AuthController(authServices);
