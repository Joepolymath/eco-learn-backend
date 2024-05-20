export interface IEnv {
  PORT: string;
  DB_URI: string;
  NODE_ENV: string;
  API_KEY: string;
  BCRYPT_SALT: string;
  SEND_CHAMP_API_KEY: string;
  SEND_CHAMP_URL: string;
  JWT_SECRET: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  CLOUDINARY_CLOUD_NAME: string;
  FIREBASE_STORAGE_BUCKET: string;
}
