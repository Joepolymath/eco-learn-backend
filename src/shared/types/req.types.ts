import { Request } from 'express';
import { IUser } from '../../modules/users/types';
import { User } from '../../modules/users/dataAccess/entities/user.entity';

export interface IRequest extends Request {
  userIpAddress?: string;
  user?: User;
}
