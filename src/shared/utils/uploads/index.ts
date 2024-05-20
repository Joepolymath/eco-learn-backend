import multer from 'multer';
import cloudinary from './cloudinary';
import firebase from './firebase';

class Upload {
  constructor() {}

  public init(): multer.Multer {
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });
    return upload;
  }

  public async upload(file: Express.Multer.File, folderName: string) {
    try {
      const result = await firebase.upload(file);
      console.log({ resultWithFirebase: result });
      return result;
    } catch (error) {
      try {
        const result = await cloudinary.upload(file, folderName);
        console.log({ resultWithCloudinary: result.secure_url });
        return result.secure_url;
      } catch (error) {
        throw new Error('Unable to upload image');
      }
    }
  }
}

export default new Upload();
