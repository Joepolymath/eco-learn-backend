import { NextFunction, Request, Response } from 'express';
import uploads from '../utils/uploads';
import HttpException from '../utils/exceptions/http.exceptions';

export const uploadMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: 'No file uploaded', status: 'failure' });
    }

    const uploadResult = await uploads.upload(req.file, 'test');
    req.file.originalname = uploadResult as string;
    next();
  } catch (error: any) {
    next(new HttpException(500, error.message));
    if (error.message) return res.status(500).json({ message: error.message });
    return res
      .status(500)
      .json({ message: 'Unable to upload image (middleware)' });
  }
};
