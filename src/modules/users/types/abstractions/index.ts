import { IUser } from '..';
import { IResponse } from '../../../../shared/utils/response.utils';

export interface IUserService {
  signUp(payload: IUser): Promise<IResponse>;
}
