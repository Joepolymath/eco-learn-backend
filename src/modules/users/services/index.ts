import { IDataRepo } from '../../../shared/types/abstractions/data';
import { IUser } from '../types';
import HttpException from '../../../shared/utils/exceptions/http.exceptions';
import bcrypt from '../utils/bcrypt';
import { BCRYPT_SALT } from '../../../shared/configs/env.config';
import responseUtils from '../../../shared/utils/response.utils';
import { userRepository } from '../dataAccess/repositories';
import { User } from '../dataAccess/entities/user.entity';
import { Repository } from 'typeorm';
import { generateToken } from '../utils/authTokens';
import { ILogin } from '../types';

class UserServices {
  constructor(private userRepo: Repository<User> = userRepository) {}

  public async signUp(payload: IUser) {
    const foundUser = await this.userRepo.findOne({
      where: [{ email: payload.email }],
    });
    if (foundUser) {
      return new HttpException(400, 'User Email Exists');
    }

    const hashSalt = await bcrypt.generateSalt(Number(BCRYPT_SALT));
    payload.password = await bcrypt.hashPassword(
      <string>payload.password,
      hashSalt
    );

    const newUser = await this.userRepo.create(payload);
    const savedUser = await this.userRepo.save(newUser);

    return responseUtils.buildResponse({
      data: savedUser,
      message: 'SignUp Successful',
    });
  }

  async login(payload: ILogin) {
    const foundUser = await this.userRepo.findOne({
      where: [{ email: payload.email }, { password: payload.password }],
    });

    if (!foundUser) {
      return new HttpException(404, 'User not found');
    }

    const passwordIsValid = await bcrypt.compare(
      payload.password,
      <string>foundUser.password
    );
    if (!passwordIsValid) {
      return new HttpException(400, 'Invalid Password');
    }

    const loginData: any = {
      id: foundUser.id,
      email: foundUser.email,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
    };

    const accessToken = generateToken(loginData);

    loginData.accessToken = accessToken;

    return responseUtils.buildResponse({
      data: loginData,
      message: 'Login Successful',
    });
  }
}

export default UserServices;
