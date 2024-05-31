import { Document } from 'mongoose';

export interface IUser extends Document {
  track?: string;
  dob?: Date | string;
  name?: string;
  email?: string;
  password?: string;
  userId?: string;
}

export interface ILogin {
  email: string;
  password: string;
}
