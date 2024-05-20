import { v2 as cloudinary, UploadApiOptions } from 'cloudinary';

import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from '../../../configs/env.config';
import HttpException from '../../exceptions/http.exceptions';

class Cloudinary {
  private apiKey: string = CLOUDINARY_API_KEY;
  private cloudName: string = CLOUDINARY_CLOUD_NAME;
  private apiSecret: string = CLOUDINARY_API_SECRET;
  private resourceType: string = 'image';

  constructor() {
    cloudinary.config({
      cloud_name: this.cloudName,
      api_key: this.apiKey,
      api_secret: this.apiSecret,
    });
  }

  public async upload(file: Express.Multer.File, folderName: string) {
    try {
      // Encode the Buffer to base64
      const base64EncodedFile = file.buffer.toString('base64');

      // Upload file to Cloudinary
      const result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${base64EncodedFile}`,
        {
          folder: folderName,
          resource_type: this.resourceType,
          public_id: file.originalname,
        } as UploadApiOptions
      );
      return result;
    } catch (error) {
      throw new HttpException(500, 'Unable to upload with cloudinary');
    }
  }

  public async rollback(imageUrl: string): Promise<void> {
    try {
      const publicId = imageUrl.split('/').pop()?.split('.')[0];
      if (!publicId) {
        throw new Error('Invalid image URL');
      }

      const deleteResult = await cloudinary.uploader.destroy(publicId);
      console.log({ deleteResult });
      console.log(`Image ${imageUrl} deleted successfully`);
    } catch (error) {}
  }
}

export default new Cloudinary();
