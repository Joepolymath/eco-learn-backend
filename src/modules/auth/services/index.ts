import { IDataRepo } from '../../../shared/types/abstractions/data';
import HttpException from '../../../shared/utils/exceptions/http.exceptions';
import responseUtils from '../../../shared/utils/response.utils';
import { IUser } from '../../users/types';
import bcrypt from '../../users/utils/bcrypt';
import { ILogin } from '../types';
import { generateToken } from '../utils/authTokens';

class AuthServices {
  constructor(private userRepo: IDataRepo<IUser>) {}

  public async login(payload: ILogin) {
    const foundUser = await this.userRepo.findOne({ userId: payload.userId });
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
      _id: foundUser._id,
      email: foundUser.email,
      name: foundUser.name,
      userId: foundUser.userId,
    };

    const accessToken = generateToken(loginData);

    loginData.accessToken = accessToken;

    return responseUtils.buildResponse({
      data: loginData,
      message: 'Login Successful',
    });
  }
}

export default AuthServices;
