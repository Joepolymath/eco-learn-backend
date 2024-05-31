import { IUser } from '..';
import { IResponse } from '../../../../shared/utils/response.utils';
import { ILogin } from '..';

export interface IUserService {
  signUp(payload: IUser): Promise<IResponse>;
  login(payload: ILogin): Promise<IResponse>;
}
