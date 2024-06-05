import { Document } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description: string;
  users?: any[];
  lessons?: any[];
}

export interface IGetCourses {
  skip?: number;
  limit?: number;
  title?: string;
}

export interface IEnrollCourse {
  id: number;
}
