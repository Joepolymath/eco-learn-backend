import admin from 'firebase-admin';
import { promisify } from 'util';

import logger from '../../../configs/logs.config';
import HttpException from '../../exceptions/http.exceptions';
import { FIREBASE_STORAGE_BUCKET } from '../../../configs/env.config';

const serviceAccount = require('../../../../../awarome-7d3cf-firebase-adminsdk-usr6w-cc567eacf6.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: FIREBASE_STORAGE_BUCKET,
});

class Firebase {
  private bucket = admin.storage().bucket();

  constructor() {
    this.bucket.acl.default
      .add({
        entity: 'allUsers',
        role: 'READER',
      })
      .then(() => {
        console.log('Default ACL set to public read access.');
      })
      .catch((error) => {
        console.error('Error setting default ACL:', error);
      });
  }

  public async upload(file: Express.Multer.File) {
    try {
      const fileName = Date.now() + '-' + file.originalname;
      const fileUpload = this.bucket.file(fileName);

      const blobStream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      blobStream.on('error', (error) => {
        logger.error(error);
        throw new Error('Unable to upload image with firebase');
      });

      const finishEventPromise = promisify(blobStream.on).bind(blobStream)(
        'finish'
      );

      blobStream.end(file.buffer);

      await finishEventPromise;

      const imageUrl = `https://storage.googleapis.com/${this.bucket.name}/${fileUpload.name}`;
      return imageUrl;
    } catch (error) {
      console.log('CAUGHT ERROR: ', error);
      throw new HttpException(500, 'Unable to upload image with firebase');
    }
  }

  public async rollBack(
    imageName: string,
    folderName: string = '.'
  ): Promise<void> {
    try {
      const deletedFirebaseFile = await admin
        .storage()
        .bucket()
        .file(`${folderName}/${imageName}`)
        .delete();
      console.log({ deletedFirebaseFile });
      console.log(`File ${imageName} deleted successfully`);
    } catch (error) {
      logger.error('Error deleting file', error);
    }
  }
}

export default new Firebase();
