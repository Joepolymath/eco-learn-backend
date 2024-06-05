import { Course } from '../dataAccess/entities/course.entity';

export interface ILesson {
  title: string;
  description?: string;
  objectives?: string[];
  overview?: string;
  content: string;
  vidUrl?: string;
  course?: Course;
  courseId: number;
}

export interface IGetLesson {
  skip?: number;
  limit?: number;
  courseId?: number;
  course?: Course;
}
