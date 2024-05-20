import { ILogin } from '..';
import { IResponse } from '../../../../shared/utils/response.utils';

export interface IAuthService {
  login(payload: ILogin): Promise<IResponse>;
}
