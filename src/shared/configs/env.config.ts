import dotenv from 'dotenv';
import { IEnv } from '../types/env.types';
dotenv.config();

declare var process: {
  env: any;
};

export const {
  PORT,
  DB_URI,
  NODE_ENV,
  API_KEY,
  BCRYPT_SALT,
  JWT_SECRET,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
  FIREBASE_STORAGE_BUCKET,
  PG_DB,
  PG_HOST,
  PG_PASSWORD,
  PG_PORT,
  PG_USERNAME,
}: IEnv = process.env;
