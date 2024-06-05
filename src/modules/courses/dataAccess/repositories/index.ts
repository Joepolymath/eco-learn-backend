import { AppDataSource } from '../../../../shared/configs/db/pg.config';
import { Choice } from '../entities/choice.entity';
import { Course } from '../entities/course.entity';
import { Lesson } from '../entities/lesson.entity';
import { Question } from '../entities/question.entity';
import { Quiz } from '../entities/quiz.entity';
// import { User } from '../entities/course.entity';

export const courseRepository = AppDataSource.getRepository(Course);
export const lessonRepository = AppDataSource.getRepository(Lesson);
export const quizRepository = AppDataSource.getRepository(Quiz);
export const questionRepository = AppDataSource.getRepository(Question);
export const choiceRepository = AppDataSource.getRepository(Choice);
