import { AppDataSource } from '../../../../shared/configs/db/pg.config';
import { User } from '../entities/course.entity';

export const userRepository = AppDataSource.getRepository(User);
