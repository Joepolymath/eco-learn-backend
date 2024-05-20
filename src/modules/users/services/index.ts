import { IDataRepo } from '../../../shared/types/abstractions/data';
import UserRepo from '../dataAccess';
import { IUser } from '../types';
import userModel from '../models';
import HttpException from '../../../shared/utils/exceptions/http.exceptions';
import bcrypt from '../utils/bcrypt';
import { BCRYPT_SALT } from '../../../shared/configs/env.config';
import responseUtils from '../../../shared/utils/response.utils';
import { generateUserId } from '../utils/random.utils';

class UserServices {
  constructor(private userRepo: IDataRepo<IUser> = new UserRepo(userModel)) {}

  public async signUp(payload: IUser) {
    const foundUser = await this.userRepo.findOne({ email: payload.email });
    if (foundUser) {
      return new HttpException(400, 'User Email Exists');
    }

    const hashSalt = await bcrypt.generateSalt(Number(BCRYPT_SALT));
    payload.password = await bcrypt.hashPassword(
      <string>payload.password,
      hashSalt
    );

    payload.userId = generateUserId();
    let foundUserId = await this.userRepo.findOne({ userId: payload.userId });
    while (foundUserId) {
      payload.userId = generateUserId();
      foundUserId = await this.userRepo.findOne({ userId: payload.userId });
    }

    const newUser = await this.userRepo.create(payload);
    const savedUser = await this.userRepo.save(newUser);

    return responseUtils.buildResponse({
      data: savedUser,
      message: 'SignUp Successful',
    });
  }
}

export default UserServices;
