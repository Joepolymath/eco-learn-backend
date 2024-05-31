import { DataSource } from 'typeorm';
import logger from '../logs.config';
import { User } from '../../../modules/users/dataAccess/entities/user.entity';
import {
  PG_DB,
  PG_HOST,
  PG_PASSWORD,
  PG_PORT,
  PG_USERNAME,
} from '../env.config';
import { Course } from '../../../modules/courses/dataAccess/entities/course.entity';
import { Lesson } from '../../../modules/courses/dataAccess/entities/lesson.entity';
import { Quiz } from '../../../modules/courses/dataAccess/entities/quiz.entity';
import { Question } from '../../../modules/courses/dataAccess/entities/question.entity';
import { Choice } from '../../../modules/courses/dataAccess/entities/choice.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: PG_HOST,
  port: Number(PG_PORT),
  username: PG_USERNAME,
  password: PG_PASSWORD,
  database: PG_DB,
  synchronize: true,
  logging: false,
  entities: [User, Course, Lesson, Quiz, Question, Choice],
  migrations: [],
  subscribers: [],
});

const connectDb = async (uri?: string) => {
  logger.info('Connecting to Postgresql...');
  try {
    const connDataSource = await AppDataSource.initialize();
    logger.info(
      `Postgres Database connected successfully. DataSource: ${connDataSource}`
    );
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

export default connectDb;
